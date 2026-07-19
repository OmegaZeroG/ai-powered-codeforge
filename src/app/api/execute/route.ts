import { NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { runCode } from "@/lib/piston"
import { detectCanary } from "@/lib/anticheat"
import { syncBadges } from "@/lib/gamification"
import { isBanActive } from "@/lib/ban"
import { Verdict } from "@prisma/client"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // A banned user is locked out of solving. Re-read the ban state from the DB
  // rather than trusting the (up-to-60s-stale) JWT, so a just-issued ban blocks
  // the very next submission. isBanActive() also makes an expired timed ban a
  // no-op here without any flag flipping.
  const me = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { banned: true, bannedUntil: true },
  })
  if (isBanActive(me)) {
    return NextResponse.json(
      { error: "Your account is suspended. You cannot submit solutions." },
      { status: 403 }
    )
  }

  const { problemId, code, language, contestId } = await request.json()

  if (!problemId || !code || !language) {
    return NextResponse.json(
      { error: "problemId, code, and language are required" },
      { status: 400 }
    )
  }

  const problem = await prisma.problem.findUnique({
    where: { id: problemId },
    include: { testCases: { orderBy: { order: "asc" } } },
  })

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 })
  }

  // Contest submissions are tagged with contestId. Validate the round is live
  // and that this problem is actually part of it, so a stale/forged contestId
  // can't attribute an out-of-window or unrelated solve to a contest. A missing
  // contestId is a normal practice submission and skips all of this.
  if (contestId) {
    const contest = await prisma.contest.findUnique({
      where: { id: contestId },
      select: { id: true, startsAt: true, endsAt: true },
    })
    if (!contest) {
      return NextResponse.json({ error: "Contest not found" }, { status: 404 })
    }
    const now = Date.now()
    if (now < contest.startsAt.getTime() || now >= contest.endsAt.getTime()) {
      return NextResponse.json(
        { error: "This contest is not currently accepting submissions." },
        { status: 403 }
      )
    }
    const inContest = await prisma.contestProblem.findUnique({
      where: { contestId_problemId: { contestId, problemId } },
      select: { problemId: true },
    })
    if (!inContest) {
      return NextResponse.json(
        { error: "This problem is not part of the contest." },
        { status: 400 }
      )
    }
  }

  const startedAt = Date.now()
  const testResults: {
    input: string
    expected: string
    actual: string
    passed: boolean
    isSample: boolean
  }[] = []

  let verdict: Verdict = "ACCEPTED"

  try {
    for (const testCase of problem.testCases) {
      const result = await runCode(language, code, testCase.input)

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
    console.error("Judge execution failed:", error)
    verdict = "RUNTIME_ERROR"
  }

  const runtimeMs = Date.now() - startedAt
  const suspectedAiPasted = detectCanary(code, problemId)

  const submission = await prisma.submission.create({
    data: {
      userId: session.user.id,
      problemId,
      code,
      language,
      verdict,
      testResults,
      runtimeMs,
      suspectedAiPasted,
      contestId: contestId ?? null,
    },
  })

  await prisma.userProgress.upsert({
    where: { userId_problemId: { userId: session.user.id, problemId } },
    update: {
      attempts: { increment: 1 },
      lastAttemptAt: new Date(),
      bestVerdict: verdict === "ACCEPTED" ? "ACCEPTED" : undefined,
      status: verdict === "ACCEPTED" ? "SOLVED" : "IN_PROGRESS",
      solvedAt: verdict === "ACCEPTED" ? new Date() : undefined,
    },
    create: {
      userId: session.user.id,
      problemId,
      attempts: 1,
      lastAttemptAt: new Date(),
      bestVerdict: verdict === "ACCEPTED" ? "ACCEPTED" : undefined,
      status: verdict === "ACCEPTED" ? "SOLVED" : "IN_PROGRESS",
      solvedAt: verdict === "ACCEPTED" ? new Date() : undefined,
    },
  })


  // On an accepted run, persist any badges the user just unlocked.
  let awardedBadges: string[] = []
  if (verdict === "ACCEPTED") {
    try {
      awardedBadges = await syncBadges(session.user.id)
    } catch (error) {
      console.error("Badge sync failed:", error)
    }

    // The solve changes SOLVED status, streak, XP and task state -- drop the
    // cached RSC payloads for the pages that render them so a client
    // router.refresh() (or next navigation) shows fresh data without a reload.
    revalidatePath("/topics")
    revalidatePath("/profile")
    revalidatePath(`/problems/${problem.slug}`)
  }

  return NextResponse.json({
    verdict,
    testResults: testResults.filter((t) => t.isSample),
    runtimeMs,
    submissionId: submission.id,
    awardedBadges,
  })
}
