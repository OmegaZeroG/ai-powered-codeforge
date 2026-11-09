import { describe, it, expect, vi, beforeEach } from "vitest"

// A plain function (not a vi.fn spy) stands in for the Piston client. Vitest
// tracks every promise a spy returns, so a deliberately rejecting spy gets
// reported as an unhandled rejection even when the code under test handles it.
type PistonResult = Awaited<ReturnType<typeof import("@/lib/piston").runCode>>
let impl: () => Promise<PistonResult>

vi.mock("@/lib/piston", () => ({ runCode: () => impl() }))

import { evaluateTestCase } from "./judge-run"

const tc = { input: "1 2", expected: "3\n", isSample: true }

const ok = (stdout: string): PistonResult => ({
  run: { stdout, stderr: "", code: 0, signal: null },
})
const returns = (value: PistonResult) => {
  impl = async () => value
}

describe("evaluateTestCase", () => {
  beforeEach(() => returns(ok("")))

  it("accepts when trimmed output matches expected", async () => {
    returns(ok("3\n\n"))
    const { verdict, result } = await evaluateTestCase("python", "x", tc)
    expect(verdict).toBe("ACCEPTED")
    expect(result).toMatchObject({ passed: true, actual: "3", isSample: true })
  })

  it("flags wrong answer and keeps the actual output", async () => {
    returns(ok("4"))
    const { verdict, result } = await evaluateTestCase("python", "x", tc)
    expect(verdict).toBe("WRONG_ANSWER")
    expect(result).toMatchObject({ passed: false, actual: "4", expected: "3\n" })
  })

  it("reports a compile error with the compiler output", async () => {
    returns({
      compile: { stdout: "", stderr: "syntax error", code: 1 },
      run: { stdout: "", stderr: "", code: 0, signal: null },
    })
    const { verdict, result } = await evaluateTestCase("cpp", "x", tc)
    expect(verdict).toBe("COMPILE_ERROR")
    expect(result.actual).toBe("syntax error")
  })

  it("reports time limit exceeded when the sandbox kills the process", async () => {
    returns({ run: { stdout: "", stderr: "", code: 0, signal: "SIGKILL" } })
    const { verdict } = await evaluateTestCase("python", "x", tc)
    expect(verdict).toBe("TIME_LIMIT_EXCEEDED")
  })

  it("reports a runtime error with stderr, or a fallback message", async () => {
    returns({ run: { stdout: "", stderr: "Traceback...", code: 1, signal: null } })
    expect((await evaluateTestCase("python", "x", tc)).result.actual).toBe(
      "Traceback..."
    )

    returns({ run: { stdout: "", stderr: "", code: 1, signal: null } })
    const second = await evaluateTestCase("python", "x", tc)
    expect(second.verdict).toBe("RUNTIME_ERROR")
    expect(second.result.actual).toBe("Runtime error")
  })

  it("lets infrastructure errors propagate instead of producing a verdict", async () => {
    impl = async () => {
      throw new Error("Piston unreachable")
    }
    await expect(evaluateTestCase("python", "x", tc)).rejects.toThrow(
      "Piston unreachable"
    )
  })
})
