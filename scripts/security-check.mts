// Security hardening check — a scripted proof, not a claim, that a handful of
// security-relevant properties actually hold in this codebase. Built for
// showing an interviewer real pass/fail output instead of just describing the
// design.
//
// Run against a fully running dev stack:
//
//   npm run security-check
//
// Required env (put a `.env.security-check` next to `.env`, or export inline):
//   BASE_URL        default http://localhost:3000
//   TEST_EMAIL / TEST_PASSWORD
//       A verified, password-based account with NO 2FA enabled. Used for the
//       rate-limit and cookie-flag checks.
//
// Optional (enables the 2FA-bypass-resistance section — skipped otherwise):
//   TWOFA_EMAIL / TWOFA_PASSWORD
//       An account with TOTP 2FA enabled.
//   TWOFA_BACKUP_CODE
//       ONE unused backup code for that account, copied from the Security
//       Card UI right before running (grab a fresh one via "New codes" if
//       you've used your last one — this test consumes exactly one).
//
// dotenv must load before anything pulls in @/lib/prisma (reads DATABASE_URL
// at import time), same convention as scripts/judge-worker.mts.
import "dotenv/config"
import { prisma } from "@/lib/prisma"

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000"
const TEST_EMAIL = process.env.TEST_EMAIL
const TEST_PASSWORD = process.env.TEST_PASSWORD
const TWOFA_EMAIL = process.env.TWOFA_EMAIL
const TWOFA_PASSWORD = process.env.TWOFA_PASSWORD
const TWOFA_BACKUP_CODE = process.env.TWOFA_BACKUP_CODE

type Result = { name: string; status: "PASS" | "FAIL" | "SKIP" | "INFO"; detail: string }
const results: Result[] = []

function record(name: string, status: Result["status"], detail: string) {
  results.push({ name, status, detail })
  const tag = { PASS: "✓ PASS", FAIL: "✗ FAIL", SKIP: "– SKIP", INFO: "i INFO" }[status]
  console.log(`  ${tag}  ${name} — ${detail}`)
}

// --- cookie jar (same minimal pattern as load-test-judge.mjs) ---
const jar = new Map<string, string>()
function absorbSetCookie(res: Response) {
  const cookies =
    typeof (res.headers as any).getSetCookie === "function"
      ? (res.headers as any).getSetCookie()
      : res.headers.get("set-cookie")
        ? [res.headers.get("set-cookie") as string]
        : []
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
function rawSetCookieHeaders(res: Response): string[] {
  return typeof (res.headers as any).getSetCookie === "function"
    ? (res.headers as any).getSetCookie()
    : res.headers.get("set-cookie")
      ? [res.headers.get("set-cookie") as string]
      : []
}

async function loginCredentials(email: string, password: string, otp = "", otpMethod = "") {
  const csrfRes = await fetch(`${BASE_URL}/api/auth/csrf`)
  absorbSetCookie(csrfRes)
  const { csrfToken } = await csrfRes.json()
  const body = new URLSearchParams({
    csrfToken,
    email,
    password,
    otp,
    otpMethod,
    callbackUrl: BASE_URL,
    json: "true",
  })
  const res = await fetch(`${BASE_URL}/api/auth/callback/credentials`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Cookie: cookieHeader() },
    body,
    redirect: "manual",
  })
  absorbSetCookie(res)
  return res
}

// --- 1. Rate limiting: /api/auth/login-status is capped at 10/15min per IP ---
async function checkRateLimiting() {
  console.log("\n[1] Rate limiting (login-status, limit 10/15min)")
  if (!TEST_EMAIL) {
    record("rate-limit", "SKIP", "TEST_EMAIL not set")
    return
  }
  let sawTooManyRequests = false
  let lastStatus = 0
  for (let i = 1; i <= 12; i++) {
    const res = await fetch(`${BASE_URL}/api/auth/login-status`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: TEST_EMAIL, password: "definitely-wrong-password" }),
    })
    lastStatus = res.status
    if (res.status === 429) {
      sawTooManyRequests = true
      const retryAfter = res.headers.get("retry-after")
      record(
        "rate-limit-triggers",
        "PASS",
        `got 429 on request #${i} with Retry-After: ${retryAfter ?? "(missing)"}`
      )
      break
    }
  }
  if (!sawTooManyRequests) {
    record(
      "rate-limit-triggers",
      "FAIL",
      `sent 12 requests, never saw 429 (last status ${lastStatus}) — limiter may not be wired up`
    )
  }
}

// --- 2. DB hashing: password / backup codes / login OTP / tokens are hashed,
// never stored raw. TOTP secret is intentionally the one exception (must be
// recoverable server-side to verify codes) — reported as INFO, not a failure.
async function checkDbHashing() {
  console.log("\n[2] Secrets are hashed at rest, not plaintext")
  if (!TEST_EMAIL) {
    record("db-hashing", "SKIP", "TEST_EMAIL not set")
    return
  }
  const user = await prisma.user.findUnique({
    where: { email: TEST_EMAIL },
    select: { id: true, password: true, twoFactorSecret: true },
  })
  if (!user) {
    record("db-hashing", "SKIP", `no user found for ${TEST_EMAIL}`)
    return
  }

  if (user.password) {
    const looksBcrypt = /^\$2[aby]\$/.test(user.password)
    record(
      "password-hash",
      looksBcrypt ? "PASS" : "FAIL",
      looksBcrypt
        ? "User.password is a bcrypt hash ($2a/$2b/$2y prefix)"
        : `User.password does not look like a bcrypt hash: "${user.password.slice(0, 10)}..."`
    )
  } else {
    record("password-hash", "SKIP", "account has no password (OAuth-only)")
  }

  if (user.twoFactorSecret) {
    record(
      "totp-secret-storage",
      "INFO",
      "User.twoFactorSecret is stored as plaintext base32 by design — TOTP " +
        "requires the server to recompute codes from the shared secret each " +
        "login, so it can't be one-way hashed like a password"
    )
  }

  // Backup codes and login OTPs are far more likely to exist on the TOTP test
  // account (TWOFA_EMAIL) than the plain one (TEST_EMAIL), since that's the
  // account actually enrolled in 2FA. Check whichever account has the data —
  // this is what actually happened when TEST_EMAIL and TWOFA_EMAIL differ.
  const twoFaUser = TWOFA_EMAIL
    ? await prisma.user.findUnique({ where: { email: TWOFA_EMAIL }, select: { id: true } })
    : null
  const backupCodeCandidateIds = [user.id, twoFaUser?.id].filter((id): id is string => !!id)

  const backupCode = await prisma.twoFactorBackupCode.findFirst({
    where: { userId: { in: backupCodeCandidateIds } },
    select: { codeHash: true },
  })
  if (backupCode) {
    const looksSha256 = /^[a-f0-9]{64}$/.test(backupCode.codeHash)
    record(
      "backup-code-hash",
      looksSha256 ? "PASS" : "FAIL",
      looksSha256
        ? "TwoFactorBackupCode.codeHash is a 64-char sha256 hex digest"
        : "codeHash does not look like sha256"
    )
  } else {
    record(
      "backup-code-hash",
      "SKIP",
      "no backup codes exist for TEST_EMAIL or TWOFA_EMAIL — enroll TOTP on one of them first"
    )
  }

  const otp = await prisma.loginOtp.findFirst({
    where: { userId: { in: backupCodeCandidateIds } },
    orderBy: { createdAt: "desc" },
    select: { codeHash: true },
  })
  if (otp) {
    const looksSha256 = /^[a-f0-9]{64}$/.test(otp.codeHash)
    record(
      "login-otp-hash",
      looksSha256 ? "PASS" : "FAIL",
      looksSha256
        ? "LoginOtp.codeHash is a 64-char sha256 hex digest"
        : "codeHash does not look like sha256"
    )
  } else {
    record(
      "login-otp-hash",
      "SKIP",
      "no login OTP rows for TEST_EMAIL or TWOFA_EMAIL yet — an email-2FA " +
        "login attempt (not TOTP) is what creates these"
    )
  }
}

// --- 3. 2FA cannot be bypassed with a wrong code, and a backup code can't be
// reused once consumed. Requires a dedicated 2FA-enabled test account. ---
async function checkTwoFactorBypassResistance() {
  console.log("\n[3] 2FA bypass resistance")
  if (!TWOFA_EMAIL || !TWOFA_PASSWORD) {
    record("2fa-bypass", "SKIP", "TWOFA_EMAIL/TWOFA_PASSWORD not set")
    return
  }

  // 3a. Wrong code, repeatedly — must never succeed.
  let wrongCodeEverSucceeded = false
  for (const badCode of ["000000", "111111", "999999"]) {
    jar.clear()
    const res = await loginCredentials(TWOFA_EMAIL, TWOFA_PASSWORD, badCode, "totp")
    const gotSession = [...jar.keys()].some((k) => k.includes("session-token"))
    if (gotSession) wrongCodeEverSucceeded = true
  }
  record(
    "2fa-wrong-code-rejected",
    wrongCodeEverSucceeded ? "FAIL" : "PASS",
    wrongCodeEverSucceeded
      ? "a fabricated code produced a session — 2FA is bypassable!"
      : "three fabricated codes were all rejected, no session issued"
  )

  // 3b. Backup code single-use: first use should authenticate, immediate
  // reuse of the exact same code should not.
  if (!TWOFA_BACKUP_CODE) {
    record("2fa-backup-code-single-use", "SKIP", "TWOFA_BACKUP_CODE not set")
    return
  }
  jar.clear()
  await loginCredentials(TWOFA_EMAIL, TWOFA_PASSWORD, TWOFA_BACKUP_CODE, "totp")
  const firstUseSucceeded = [...jar.keys()].some((k) => k.includes("session-token"))

  jar.clear()
  await loginCredentials(TWOFA_EMAIL, TWOFA_PASSWORD, TWOFA_BACKUP_CODE, "totp")
  const secondUseSucceeded = [...jar.keys()].some((k) => k.includes("session-token"))

  if (!firstUseSucceeded) {
    record(
      "2fa-backup-code-single-use",
      "FAIL",
      "the supplied backup code didn't even work once — check it's fresh/unused"
    )
  } else if (secondUseSucceeded) {
    record(
      "2fa-backup-code-single-use",
      "FAIL",
      "the same backup code authenticated twice — codes are not being consumed"
    )
  } else {
    record(
      "2fa-backup-code-single-use",
      "PASS",
      "backup code worked once, then was rejected on immediate reuse"
    )
  }
}

// --- 4. Session cookie carries HttpOnly + SameSite=Lax ---
async function checkSessionCookieFlags() {
  console.log("\n[4] Session cookie flags")
  if (!TEST_EMAIL || !TEST_PASSWORD) {
    record("cookie-flags", "SKIP", "TEST_EMAIL/TEST_PASSWORD not set")
    return
  }
  jar.clear()
  const csrfRes = await fetch(`${BASE_URL}/api/auth/csrf`)
  absorbSetCookie(csrfRes)
  const { csrfToken } = await csrfRes.json()
  const res = await fetch(`${BASE_URL}/api/auth/callback/credentials`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", Cookie: cookieHeader() },
    body: new URLSearchParams({
      csrfToken,
      email: TEST_EMAIL,
      password: TEST_PASSWORD,
      otp: "",
      otpMethod: "",
      callbackUrl: BASE_URL,
      json: "true",
    }),
    redirect: "manual",
  })
  const setCookies = rawSetCookieHeaders(res)
  const sessionCookie = setCookies.find((c) => c.includes("session-token"))
  if (!sessionCookie) {
    record("cookie-flags", "FAIL", "no session cookie was set — is TEST_PASSWORD correct?")
    return
  }
  const httpOnly = /HttpOnly/i.test(sessionCookie)
  const sameSiteLax = /SameSite=Lax/i.test(sessionCookie)
  const isHttps = BASE_URL.startsWith("https://")
  const secure = /Secure/i.test(sessionCookie)

  record(
    "cookie-httponly",
    httpOnly ? "PASS" : "FAIL",
    httpOnly ? "session cookie has HttpOnly" : "session cookie is missing HttpOnly"
  )
  record(
    "cookie-samesite",
    sameSiteLax ? "PASS" : "FAIL",
    sameSiteLax ? "session cookie has SameSite=Lax" : "session cookie is missing SameSite=Lax"
  )
  if (isHttps) {
    record(
      "cookie-secure",
      secure ? "PASS" : "FAIL",
      secure ? "session cookie has Secure over https" : "missing Secure flag on an https deployment"
    )
  } else {
    record(
      "cookie-secure",
      "INFO",
      "BASE_URL is http (local dev) — Auth.js only sets Secure over https, this is expected here"
    )
  }
}

async function main() {
  console.log(`Security hardening check — ${BASE_URL}`)
  await checkRateLimiting()
  await checkDbHashing()
  await checkTwoFactorBypassResistance()
  await checkSessionCookieFlags()

  console.log("\n=== Summary ===")
  console.table(results.map((r) => ({ check: r.name, status: r.status, detail: r.detail })))

  const fails = results.filter((r) => r.status === "FAIL")
  if (fails.length > 0) {
    console.error(`\n${fails.length} check(s) FAILED.`)
    process.exit(1)
  } else {
    console.log("\nAll runnable checks passed.")
  }
}

main()
  .catch((err) => {
    console.error("Security check crashed:", err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
