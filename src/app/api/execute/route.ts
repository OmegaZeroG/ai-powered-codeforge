import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { runCode } from "@/lib/piston"
import { detectCanary } from "@/lib/anticheat"
import { Verdict } from "@prisma/client"

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { problemId, code, language } = await request.json()

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

  return NextResponse.json({
    submissionId: submission.id,
    verdict,
    testResults,
    runtimeMs,
  })
}
