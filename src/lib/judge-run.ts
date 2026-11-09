import { runCode } from "@/lib/piston"
import type { TestCaseResult, Verdict } from "@/types"

// Judging of ONE test case, shared by the queue worker (judge.ts, which runs
// every test case on Submit) and the sample-only Run endpoint. Keeping this in
// one place guarantees Run and Submit can never disagree about what counts as
// a pass. No database access here on purpose, so it is trivially testable.

export type JudgedVerdict = Exclude<Verdict, "PENDING">

export interface TestCaseInput {
  input: string
  expected: string
  isSample: boolean
}

export async function evaluateTestCase(
  language: string,
  code: string,
  testCase: TestCaseInput
): Promise<{ verdict: JudgedVerdict; result: TestCaseResult }> {
  const base = {
    input: testCase.input,
    expected: testCase.expected,
    isSample: testCase.isSample,
  }

  // May throw if the judge host is unreachable -- callers decide whether that
  // is retryable (worker) or a 502 (Run endpoint). It is never a verdict.
  const run = await runCode(language, code, testCase.input)

  if (run.compile && run.compile.code !== 0) {
    return {
      verdict: "COMPILE_ERROR",
      result: { ...base, actual: run.compile.stderr, passed: false },
    }
  }

  if (run.run.signal === "SIGKILL") {
    return {
      verdict: "TIME_LIMIT_EXCEEDED",
      result: { ...base, actual: "Time limit exceeded", passed: false },
    }
  }

  if (run.run.code !== 0) {
    return {
      verdict: "RUNTIME_ERROR",
      result: { ...base, actual: run.run.stderr || "Runtime error", passed: false },
    }
  }

  const actual = run.run.stdout.trim()
  const passed = actual === testCase.expected.trim()
  return {
    verdict: passed ? "ACCEPTED" : "WRONG_ANSWER",
    result: { ...base, actual, passed },
  }
}
