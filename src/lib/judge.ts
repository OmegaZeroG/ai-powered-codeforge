import { prisma } from "@/lib/prisma"
import { runCode } from "@/lib/piston"
import { syncBadges } from "@/lib/gamification"
import { Verdict } from "@prisma/client"
import type { TestCaseResult } from "@/types"

// A submission is re-queued on a transient judge failure (Piston unreachable,
// 5xx, network blip) up to this many total attempts before it is marked ERROR.
// This is what stops an infrastructure hiccup from being recorded as the
// user's code being wrong -- the old synchronous route caught the throw and
// stamped RUNTIME_ERROR, which was a real correctness bug under load.
export const MAX_ATTEMPTS = 3

// Outcome of judging one submission, returned to the worker for logging.
export type JudgeOutcome =
  | { status: "DONE"; verdict: Verdict }
  | { status: "REQUEUED"; attempts: number; error: string }
  | { status: "ERROR"; error: string }

// Run a single submission's code against every test case, short-circuiting on
// the first failing verdict, and persist the result. Pure judging logic,
// shared by the worker; contains no request/response concerns.
//
// Transient failures (a thrown error from runCode) are treated as retryable:
// the submission is put back on the queue with attempts incremented, unless it
// has already used up MAX_ATTEMPTS, in which case it becomes a terminal ERROR.
// A real judged verdict (WRONG_ANSWER, RUNTIME_ERROR from the user's program,
// etc.) is never retried -- only judge-infrastructure failures are.
export async function judgeSubmission(submissionId: string): Promise<JudgeOutcome> {
  const submission = await prisma.submission.findUnique({
    where: { id: submissionId },
    select: {
      id: true,
      userId: true,
      problemId: true,
      code: true,
      language: true,
      attempts: true,
    },
  })

  if (!submission) {
    return { status: "ERROR", error: `Submission ${submissionId} not found` }
  }

  const problem = await prisma.problem.findUnique({
    where: { id: submission.problemId },
    select: { slug: true, testCases: { orderBy: { order: "asc" } } },
  })

  if (!problem) {
    await prisma.submission.update({
      where: { id: submission.id },
      data: {
        status: "ERROR",
        verdict: "RUNTIME_ERROR",
        queueError: "Problem not found",
        judgedAt: new Date(),
      },
    })
    return { status: "ERROR", error: "Problem not found" }
  }

  const startedAt = Date.now()
  const testResults: TestCaseResult[] = []
  let verdict: Verdict = "ACCEPTED"

  try {
    for (const testCase of problem.testCases) {
      const result = await runCode(submission.language, submission.code, testCase.input)

      if (result.compile && result.compile.code !== 0) {
        verdict = "COMPILE_ERROR"
        testResults.push({
          input: testCase.input,
          expected: testCase.expected,
          actual: result.compile.stderr,
          passed: false,
          isSample: testCase.isSample,
        })
        break
      }

      if (result.run.signal === "SIGKILL") {
        verdict = "TIME_LIMIT_EXCEEDED"
        testResults.push({
          input: testCase.input,
          expected: testCase.expected,
          actual: "Time limit exceeded",
          passed: false,
          isSample: testCase.isSample,
        })
        break
      }

      if (result.run.code !== 0) {
        verdict = "RUNTIME_ERROR"
        testResults.push({
          input: testCase.input,
          expected: testCase.expected,
          actual: result.run.stderr || "Runtime error",
          passed: false,
          isSample: testCase.isSample,
        })
        break
      }

      const actual = result.run.stdout.trim()
      const expected = testCase.expected.trim()
      const passed = actual === expected

      testResults.push({
        input: testCase.input,
        expected: testCase.expected,
        actual,
        passed,
        isSample: testCase.isSample,
      })

      if (!passed) {
        verdict = "WRONG_ANSWER"
        break
      }
    }
  } catch (error) {
    // Judge infrastructure failed -- this is NOT a verdict about the code.
    // Re-queue (attempts already incremented at claim time) unless exhausted.
    const message = error instanceof Error ? error.message : String(error)
    if (submission.attempts >= MAX_ATTEMPTS) {
      await prisma.submission.update({
        where: { id: submission.id },
        data: {
          status: "ERROR",
          queueError: `Judge failed after ${submission.attempts} attempts: ${message}`,
          judgedAt: new Date(),
        },
      })
      return { status: "ERROR", error: message }
    }
    await prisma.submission.update({
      where: { id: submission.id },
      data: { status: "QUEUED", workerId: null, startedAt: null, queueError: message },
    })
    return { status: "REQUEUED", attempts: submission.attempts, error: message }
  }

  const runtimeMs = Date.now() - startedAt

  await prisma.submission.update({
    where: { id: submission.id },
    data: {
      status: "DONE",
      verdict,
      testResults,
      runtimeMs,
      judgedAt: new Date(),
      queueError: null,
    },
  })

  // Mirror the progress bookkeeping the old synchronous route did on every
  // submission (attempts, last-attempt, solved status/time, best verdict).
  await prisma.userProgress.upsert({
    where: { userId_problemId: { userId: submission.userId, problemId: submission.problemId } },
    update: {
      attempts: { increment: 1 },
      lastAttemptAt: new Date(),
      bestVerdict: verdict === "ACCEPTED" ? "ACCEPTED" : undefined,
      status: verdict === "ACCEPTED" ? "SOLVED" : "IN_PROGRESS",
      solvedAt: verdict === "ACCEPTED" ? new Date() : undefined,
    },
    create: {
      userId: submission.userId,
      problemId: submission.problemId,
      attempts: 1,
      lastAttemptAt: new Date(),
      bestVerdict: verdict === "ACCEPTED" ? "ACCEPTED" : undefined,
      status: verdict === "ACCEPTED" ? "SOLVED" : "IN_PROGRESS",
      solvedAt: verdict === "ACCEPTED" ? new Date() : undefined,
    },
  })

  // On an accepted run, persist any badges just unlocked. The worker is a
  // plain process (no Next request context), so unlike the old route it does
  // NOT call revalidatePath -- the client's router.refresh() after polling
  // sees DONE and refetches the dynamic /topics, /profile and problem pages.
  if (verdict === "ACCEPTED") {
    try {
      await syncBadges(submission.userId)
    } catch (error) {
      console.error("Badge sync failed:", error)
    }
  }

  return { status: "DONE", verdict }
}
