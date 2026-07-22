// Judge-queue load test — fires a burst of concurrent submissions at
// POST /api/execute, polls GET /api/submissions/[id] until each one reaches a
// terminal status, and reports throughput/latency numbers. Built to answer,
// with real numbers instead of estimates, the question "how many contestants
// submitting at once can this system handle?"
//
// Run against a fully running stack (next dev + npm run judge + Piston up):
//
//   node scripts/load-test-judge.mjs
//
// Config via env vars (all optional except TEST_EMAIL/TEST_PASSWORD/PROBLEM_ID):
//   BASE_URL        default http://localhost:3000
//   TEST_EMAIL      a verified, non-2FA test account's email  (required)
//   TEST_PASSWORD   that account's password                   (required)
//   PROBLEM_ID      a real Problem.id to submit against        (required)
//   LANGUAGE        default "python"
//   CODE            source to submit; default is a trivial program that
//                    compiles/runs but will likely score WRONG_ANSWER — that's
//                    fine, this measures throughput, not correctness
//   LEVELS          comma-separated concurrency levels, default "100"
//                    e.g. LEVELS=100,300,600,1000 to show the degradation curve
//   COOLDOWN_MS     pause between levels so one burst's tail doesn't bleed
//                    into the next, default 5000
//   POLL_MS         submission poll interval, default 400
//   POLL_TIMEOUT_MS per-submission give-up timeout, default 300000 (5 min)
//
// Output: a table per level plus a combined summary, and a JSON report at
// scripts/out/load-test-<timestamp>.json for pasting into an interview doc.

import { writeFile, mkdir } from "node:fs/promises"
import { fileURLToPath } from "node:url"
import path from "node:path"

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000"
const TEST_EMAIL = process.env.TEST_EMAIL
const TEST_PASSWORD = process.env.TEST_PASSWORD
const PROBLEM_ID = process.env.PROBLEM_ID
const LANGUAGE = process.env.LANGUAGE ?? "python"
const CODE = process.env.CODE ?? 'print("load-test")\n'
const LEVELS = (process.env.LEVELS ?? "100")
  .split(",")
  .map((s) => Number(s.trim()))
  .filter((n) => Number.isFinite(n) && n > 0)
const COOLDOWN_MS = Number(process.env.COOLDOWN_MS ?? "5000")
const POLL_MS = Number(process.env.POLL_MS ?? "400")
const POLL_TIMEOUT_MS = Number(process.env.POLL_TIMEOUT_MS ?? String(5 * 60_000))

if (!TEST_EMAIL || !TEST_PASSWORD || !PROBLEM_ID) {
  console.error(
    "Missing required env vars. Set TEST_EMAIL, TEST_PASSWORD, PROBLEM_ID.\n" +
      "Example:\n" +
      '  TEST_EMAIL="loadtest@example.com" TEST_PASSWORD="..." PROBLEM_ID="clx..." LEVELS=100,300,600,1000 node scripts/load-test-judge.mjs'
  )
  process.exit(1)
}

// --- tiny cookie jar: Auth.js needs the csrf cookie echoed back, and the
// session cookie carried on every authenticated request afterward. ---
const jar = new Map()

function absorbSetCookie(res) {
  const cookies =
    typeof res.headers.getSetCookie === "function"
      ? res.headers.getSetCookie()
      : (res.headers.get("set-cookie") ? [res.headers.get("set-cookie")] : [])
  for (const c of cookies) {
    const [pair] = c.split(";")
    const eq = pair.indexOf("=")
    if (eq === -1) continue
    jar.set(pair.slice(0, eq).trim(), pair.slice(eq + 1).trim())
  }
}

function cookieHeader() {
  return [...jar.entries()].map(([k, v]) => `${k}=${v}`).join("; ")
}

async function login() {
  // Step 1: get a CSRF token (double-submit cookie pattern).
  const csrfRes = await fetch(`${BASE_URL}/api/auth/csrf`)
  absorbSetCookie(csrfRes)
  const { csrfToken } = await csrfRes.json()

  // Step 2: complete the credentials callback. On success this sets the
  // session cookie; on failure it 302s to /login?error=CredentialsSignin with
  // no useful body, so we only trust the presence of a session cookie after.
  const body = new URLSearchParams({
    csrfToken,
    email: TEST_EMAIL,
    password: TEST_PASSWORD,
    otp: "",
    otpMethod: "",
    callbackUrl: BASE_URL,
    json: "true",
  })
  const res = await fetch(`${BASE_URL}/api/auth/callback/credentials`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Cookie: cookieHeader(),
    },
    body,
    redirect: "manual",
  })
  absorbSetCookie(res)

  const hasSession = [...jar.keys()].some((k) => k.includes("session-token"))
  if (!hasSession) {
    throw new Error(
      "Login did not produce a session cookie. Check TEST_EMAIL/TEST_PASSWORD, " +
        "confirm the account has a verified email and NO 2FA enabled (this " +
        "script doesn't handle OTP challenges), and that BASE_URL is reachable."
    )
  }
}

async function submitOne() {
  const res = await fetch(`${BASE_URL}/api/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Cookie: cookieHeader() },
    body: JSON.stringify({ problemId: PROBLEM_ID, code: CODE, language: LANGUAGE }),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => "")
    throw new Error(`/api/execute ${res.status}: ${text.slice(0, 200)}`)
  }
  const data = await res.json()
  return { submissionId: data.submissionId, sentAt: Date.now() }
}

async function pollUntilDone(submissionId, sentAt) {
  const deadline = Date.now() + POLL_TIMEOUT_MS
  let consecutiveNetworkErrors = 0
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${BASE_URL}/api/submissions/${submissionId}`, {
        headers: { Cookie: cookieHeader() },
      })
      consecutiveNetworkErrors = 0
      if (res.ok) {
        const data = await res.json()
        if (data.status === "DONE" || data.status === "ERROR") {
          return {
            submissionId,
            status: data.status,
            verdict: data.verdict ?? null,
            latencyMs: Date.now() - sentAt,
          }
        }
      }
    } catch (err) {
      // A large concurrent burst against localhost can transiently exhaust
      // connections (client-side socket limits, not a judging problem). Treat
      // a dropped connection as "try again shortly" rather than aborting the
      // whole level — only give up on this submission if it fails many times
      // in a row.
      consecutiveNetworkErrors++
      if (consecutiveNetworkErrors >= 20) {
        return {
          submissionId,
          status: "NETWORK_ERROR",
          verdict: null,
          latencyMs: Date.now() - sentAt,
          note: err.message,
        }
      }
    }
    await new Promise((r) => setTimeout(r, POLL_MS))
  }
  return { submissionId, status: "TIMEOUT", verdict: null, latencyMs: Date.now() - sentAt }
}

function describeFailure(reason) {
  const base = reason?.message ?? String(reason)
  const cause = reason?.cause
  if (!cause) return base
  const causeDetail = cause.code ?? cause.message ?? String(cause)
  return `${base} (cause: ${causeDetail})`
}

function percentile(sorted, p) {
  if (sorted.length === 0) return 0
  const idx = Math.min(sorted.length - 1, Math.floor((p / 100) * sorted.length))
  return sorted[idx]
}

function fmtMs(ms) {
  return ms >= 1000 ? `${(ms / 1000).toFixed(2)}s` : `${Math.round(ms)}ms`
}

async function runLevel(concurrency) {
  console.log(`\n=== Level: ${concurrency} concurrent submissions ===`)
  const burstStart = Date.now()

  const submitResults = await Promise.allSettled(
    Array.from({ length: concurrency }, () => submitOne())
  )

  const submitFailures = submitResults.filter((r) => r.status === "rejected")
  const accepted = submitResults
    .filter((r) => r.status === "fulfilled")
    .map((r) => r.value)

  console.log(
    `  Enqueued ${accepted.length}/${concurrency} (${submitFailures.length} failed to enqueue)`
  )

  if (submitFailures.length > 0) {
    const reasonCounts = new Map()
    for (const f of submitFailures) {
      const msg = describeFailure(f.reason)
      reasonCounts.set(msg, (reasonCounts.get(msg) ?? 0) + 1)
    }
    console.log(`  Enqueue failure reasons:`)
    for (const [msg, count] of [...reasonCounts.entries()].sort((a, b) => b[1] - a[1])) {
      console.log(`    ${count}x  ${msg}`)
    }
  }

  const settled = await Promise.all(
    accepted.map((s) => pollUntilDone(s.submissionId, s.sentAt))
  )

  const burstWallMs = Date.now() - burstStart
  const latencies = settled
    .filter((s) => s.status === "DONE" || s.status === "ERROR")
    .map((s) => s.latencyMs)
    .sort((a, b) => a - b)
  const timeouts = settled.filter((s) => s.status === "TIMEOUT").length
  const errors = settled.filter((s) => s.status === "ERROR").length
  const networkErrors = settled.filter((s) => s.status === "NETWORK_ERROR").length
  const verdictCounts = settled.reduce((acc, s) => {
    const key = s.verdict ?? s.status
    acc[key] = (acc[key] ?? 0) + 1
    return acc
  }, /** @type {Record<string, number>} */ ({}))

  const throughputPerMin =
    latencies.length > 0 ? (latencies.length / (burstWallMs / 1000)) * 60 : 0

  const enqueueFailureReasons = {}
  for (const f of submitFailures) {
    const msg = describeFailure(f.reason)
    enqueueFailureReasons[msg] = (enqueueFailureReasons[msg] ?? 0) + 1
  }

  const summary = {
    concurrency,
    enqueued: accepted.length,
    enqueueFailures: submitFailures.length,
    enqueueFailureReasons,
    completed: latencies.length,
    timeouts,
    judgeErrors: errors,
    networkErrors,
    wallTimeMs: burstWallMs,
    throughputPerMin: Number(throughputPerMin.toFixed(1)),
    latencyMs: {
      min: latencies[0] ?? 0,
      median: percentile(latencies, 50),
      p95: percentile(latencies, 95),
      max: latencies[latencies.length - 1] ?? 0,
    },
    verdictCounts,
  }

  console.log(
    `  Drained ${summary.completed}/${accepted.length} in ${fmtMs(burstWallMs)} ` +
      `(~${summary.throughputPerMin}/min) | timeouts: ${timeouts}, judge errors: ${errors}, ` +
      `network errors: ${networkErrors}`
  )
  console.log(
    `  Latency  min ${fmtMs(summary.latencyMs.min)}  median ${fmtMs(summary.latencyMs.median)}  ` +
      `p95 ${fmtMs(summary.latencyMs.p95)}  max ${fmtMs(summary.latencyMs.max)}`
  )
  console.log(`  Verdicts: ${JSON.stringify(verdictCounts)}`)

  return summary
}

async function main() {
  console.log(`Judge queue load test — ${BASE_URL}`)
  console.log(`Levels: ${LEVELS.join(", ")}`)

  await login()
  console.log("Logged in as", TEST_EMAIL)

  const results = []
  for (let i = 0; i < LEVELS.length; i++) {
    const level = LEVELS[i]
    const summary = await runLevel(level)
    results.push(summary)
    if (i < LEVELS.length - 1) {
      console.log(`  Cooling down ${COOLDOWN_MS}ms before next level...`)
      await new Promise((r) => setTimeout(r, COOLDOWN_MS))
    }
  }

  console.log("\n=== Summary across levels ===")
  console.table(
    results.map((r) => ({
      concurrency: r.concurrency,
      enqueued: r.enqueued,
      completed: r.completed,
      timeouts: r.timeouts,
      networkErrors: r.networkErrors,
      "throughput/min": r.throughputPerMin,
      "median latency": fmtMs(r.latencyMs.median),
      "p95 latency": fmtMs(r.latencyMs.p95),
    }))
  )

  const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "out")
  await mkdir(outDir, { recursive: true })
  const outFile = path.join(outDir, `load-test-${Date.now()}.json`)
  await writeFile(outFile, JSON.stringify({ baseUrl: BASE_URL, problemId: PROBLEM_ID, results }, null, 2))
  console.log(`\nFull report written to ${outFile}`)
}

main().catch((err) => {
  console.error("Load test failed:", err.message)
  process.exit(1)
})
