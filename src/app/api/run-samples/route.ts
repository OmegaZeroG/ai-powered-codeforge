import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { isBanActive } from "@/lib/ban"
import { evaluateTestCase } from "@/lib/judge-run"
import { rateLimit, tooManyRequests } from "@/lib/rate-limit"
import type { Language, SubmitResponse, TestCaseResult } from "@/types"

// The Run button on a problem page: execute the code against the problem's
// SAMPLE (visible) test cases only and return the results straight away.
//
// How it differs from Submit (POST /api/execute):
//   - samples only; hidden test cases are never touched or revealed
//   - synchronous (a few Piston calls) -- no queue, no worker needed
//   - creates NO submission and changes NO progress, XP, streak or tasks, so
//     practising with Run is free and can't affect a contest or a rank
//   - every sample is run (no short-circuit) so you see each one's result
// Verdicts come from the same evaluateTestCase() the judge worker uses, so Run
// and Submit can never disagree about what a pass is.
const SUPPORTED: Language[] = ["javascript", "python", "cpp", "java"]
const MAX_CODE_CHARS = 64_000
const RUNS_PER_MINUTE = 20

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const rl = await rateLimit(
    `run-samples:${session.user.id}`,
    RUNS_PER_MINUTE,
    60_000
  )
  if (!rl.ok) return tooManyRequests(rl)

  const me = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { banned: true, bannedUntil: true },
  })
  if (isBanActive(me)) {
    return NextResponse.json(
      { error: "Your account is suspended. You cannot run solutions." },
      { status: 403 }
    )
  }

  let body: { problemId?: string; code?: string; language?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { problemId, code, language } = body
  if (!problemId || !code?.trim() || !language) {
    return NextResponse.json(
      { error: "problemId, code, and language are required" },
      { status: 400 }
    )
  }
  if (code.length > MAX_CODE_CHARS) {
    return NextResponse.json(
      { error: `Code is too long (max ${MAX_CODE_CHARS} characters)` },
      { status: 413 }
    )
  }
  if (!SUPPORTED.includes(language as Language)) {
    return NextResponse.json(
      { error: "Unsupported or missing language" },
      { status: 400 }
    )
  }

  const samples = await prisma.testCase.findMany({
    where: { problemId, isSample: true },
    orderBy: { order: "asc" },
    select: { input: true, expected: true, isSample: true },
  })
  if (samples.length === 0) {
    return NextResponse.json(
      { error: "This problem has no sample test cases to run." },
      { status: 404 }
    )
  }

  const startedAt = Date.now()
  const testResults: TestCaseResult[] = []
  let verdict: SubmitResponse["verdict"] = "ACCEPTED"

  try {
    for (const sample of samples) {
      const { verdict: caseVerdict, result } = await evaluateTestCase(
        language,
        code,
        sample
      )
      testResults.push(result)
      // A compile error would repeat identically on every sample, so stop
      // there. Anything else keeps going so each sample shows its own result;
      // the overall verdict is the first failure.
      if (caseVerdict !== "ACCEPTED" && verdict === "ACCEPTED") {
        verdict = caseVerdict
      }
      if (caseVerdict === "COMPILE_ERROR") break
    }
  } catch (err) {
    // Judge host unreachable etc. -- not a verdict about the user's code.
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Execution service unavailable",
      },
      { status: 502 }
    )
  }

  const response: SubmitResponse = {
    status: "DONE",
    verdict,
    testResults,
    runtimeMs: Date.now() - startedAt,
  }
  return NextResponse.json(response)
}
