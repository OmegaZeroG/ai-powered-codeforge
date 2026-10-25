import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { runCode } from "@/lib/piston"
import { rateLimit, tooManyRequests } from "@/lib/rate-limit"
import type { Language } from "@/types"

// Scratchpad run: execute code ONCE against user-supplied stdin and return the
// raw stdout/stderr/exit. Unlike /api/execute this has no problem, no test
// cases, no queue, no persistence -- it's a playground for the /editor page.
// Kept synchronous (a single Piston call) because there's nothing to fan out.
const SUPPORTED: Language[] = ["javascript", "python", "cpp", "java"]

// Abuse guards: every run costs real CPU on the (small) Piston host, and this
// route is open to any logged-in user.
const MAX_CODE_CHARS = 64_000
const MAX_STDIN_CHARS = 64_000
const RUNS_PER_MINUTE = 20

export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Throttle per user: 20 scratchpad runs per minute.
  const rl = await rateLimit(`run:${session.user.id}`, RUNS_PER_MINUTE, 60_000)
  if (!rl.ok) return tooManyRequests(rl)

  let body: { code?: string; language?: string; stdin?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const { code, language, stdin } = body
  if (!code?.trim()) {
    return NextResponse.json({ error: "Code is required" }, { status: 400 })
  }
  if (code.length > MAX_CODE_CHARS) {
    return NextResponse.json(
      { error: `Code is too long (max ${MAX_CODE_CHARS} characters)` },
      { status: 413 }
    )
  }
  if (typeof stdin === "string" && stdin.length > MAX_STDIN_CHARS) {
    return NextResponse.json(
      { error: `Input is too long (max ${MAX_STDIN_CHARS} characters)` },
      { status: 413 }
    )
  }
  if (!language || !SUPPORTED.includes(language as Language)) {
    return NextResponse.json(
      { error: "Unsupported or missing language" },
      { status: 400 }
    )
  }

  const startedAt = Date.now()
  try {
    const result = await runCode(language, code, stdin ?? "")
    const runtimeMs = Date.now() - startedAt

    // A non-zero compile step means it never ran -- surface that as the output.
    const compileFailed = result.compile && result.compile.code !== 0

    return NextResponse.json({
      stdout: result.run.stdout ?? "",
      stderr: compileFailed
        ? result.compile!.stderr || result.run.stderr || ""
        : result.run.stderr ?? "",
      exitCode: result.run.code,
      signal: result.run.signal,
      timedOut: result.run.signal === "SIGKILL",
      compileFailed: Boolean(compileFailed),
      runtimeMs,
    })
  } catch (err) {
    // Piston unreachable / 5xx etc. -- an infrastructure failure, not the
    // user's code being wrong.
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : "Execution service unavailable",
      },
      { status: 502 }
    )
  }
}
