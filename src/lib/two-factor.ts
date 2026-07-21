import { createHash, randomInt } from "crypto"
import { prisma } from "@/lib/prisma"
import { sendEmail } from "@/lib/email"

// --- Email-based two-factor (2FA) login codes ---
//
// When a user has email 2FA enabled, a correct password is only step one: we
// issue a short-lived 6-digit code to their (already verified) email and require
// it to finish signing in. This module owns issuing and verifying those codes.
//
// Storage model (LoginOtp): we persist only the SHA-256 *hash* of the code, an
// expiry, and an attempt counter. A 6-digit code is low entropy (1e6 space), so
// the real protection is the short TTL + attempt cap + endpoint rate-limiting —
// never the hash alone. The raw code lives only in the email.

const OTP_TTL_MS = 1000 * 60 * 10 // 10 minutes
const MAX_ATTEMPTS = 5 // wrong guesses before a code is burned

// SHA-256 hash for storage/lookup. Same scheme as the token helpers; adequate
// here because guessing is bounded by MAX_ATTEMPTS + expiry, not hash strength.
function hashCode(raw: string): string {
  return createHash("sha256").update(raw).digest("hex")
}

// A uniformly-random 6-digit code, zero-padded (e.g. "004217"). randomInt is
// crypto-grade, avoiding the modulo bias of Math.random-based schemes.
function generateCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0")
}

/**
 * Issue a fresh login OTP for the user and email it. Invalidates any prior
 * outstanding codes first, so only the newest one works. Safe to call more than
 * once (e.g. the login UI re-triggers it) — each call rotates the code.
 *
 * Returns silently; callers should not leak whether a user exists.
 */
export async function issueLoginOtp(
  userId: string,
  email: string,
): Promise<void> {
  // deleteMany on a delete path is tolerated by the Neon HTTP adapter (same as
  // the password-reset / verification flows).
  await prisma.loginOtp.deleteMany({ where: { userId, usedAt: null } })

  const code = generateCode()
  const codeHash = hashCode(code)
  const expiresAt = new Date(Date.now() + OTP_TTL_MS)

  await prisma.loginOtp.create({
    data: { userId, codeHash, expiresAt },
  })

  await sendEmail({
    to: email,
    subject: "Your CodeForge login code",
    text:
      `Your CodeForge login verification code is: ${code}\n\n` +
      `It expires in 10 minutes. If you didn't try to log in, someone may have ` +
      `your password — change it as soon as you can.`,
    html: otpEmailHtml(code),
  })
}

/**
 * Verify a submitted login OTP for a user. Returns true only if a matching,
 * unused, unexpired code exists and is within the attempt budget. On a wrong
 * guess the attempt counter is bumped (and the code burned once it hits the
 * cap); on success the code is consumed. Every path is a single-record write,
 * so it stays within the Neon HTTP adapter's no-transaction limits.
 */
export async function verifyLoginOtp(
  userId: string,
  submitted: string,
): Promise<boolean> {
  const code = (submitted ?? "").trim()
  if (!/^\d{6}$/.test(code)) return false

  // Newest outstanding code for this user.
  const row = await prisma.loginOtp.findFirst({
    where: { userId, usedAt: null },
    orderBy: { createdAt: "desc" },
  })
  if (!row) return false

  if (row.expiresAt.getTime() < Date.now()) return false
  if (row.attempts >= MAX_ATTEMPTS) return false

  if (hashCode(code) !== row.codeHash) {
    // Wrong guess: burn one attempt. Once the cap is reached the code is dead
    // (the guard above rejects further tries) and the user must request a new one.
    await prisma.loginOtp.update({
      where: { id: row.id },
      data: { attempts: { increment: 1 } },
    })
    return false
  }

  // Correct: consume it so it can't be replayed.
  await prisma.loginOtp.update({
    where: { id: row.id },
    data: { usedAt: new Date() },
  })
  return true
}

function otpEmailHtml(code: string): string {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#111">
    <h2 style="margin:0 0 8px">Your login code</h2>
    <p style="color:#555;margin:0 0 20px">
      Use this code to finish signing in to CodeForge. It expires in 10 minutes.
    </p>
    <div style="font-size:32px;font-weight:700;letter-spacing:8px;background:#f5f5f5;
                border-radius:12px;padding:16px 0;text-align:center;color:#111">
      ${code}
    </div>
    <p style="color:#888;font-size:13px;margin:24px 0 0">
      If you didn't try to log in, someone may have your password — change it as
      soon as you can.
    </p>
  </div>`
}
