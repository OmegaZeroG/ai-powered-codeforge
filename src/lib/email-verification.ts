import { createHash, randomBytes } from "crypto"
import { prisma } from "@/lib/prisma"
import { sendEmail } from "@/lib/email"

// How long a verification link stays valid. Longer than a password reset —
// people open "confirm your email" mails casually, sometimes hours later.
const TOKEN_TTL_MS = 1000 * 60 * 60 * 24 // 24 hours

// Hash a raw token for storage/lookup. We only ever persist this hash, so the
// DB never contains a usable token. SHA-256 is fine here (tokens are 32 random
// bytes of high entropy, not low-entropy passwords). Same scheme as the reset
// flow (src/lib/password-reset.ts).
export function hashToken(raw: string): string {
  return createHash("sha256").update(raw).digest("hex")
}

function appBaseUrl(): string {
  return (
    process.env.NEXTAUTH_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "")
}

/**
 * Create a fresh single-use verification token for the user and email them the
 * confirmation link. Invalidates any prior outstanding tokens first so only the
 * newest link works. Used on signup and by the "resend verification" endpoint.
 */
export async function createAndSendVerificationToken(
  userId: string,
  email: string,
) {
  await prisma.verificationToken.deleteMany({ where: { userId, usedAt: null } })

  const raw = randomBytes(32).toString("hex")
  const tokenHash = hashToken(raw)
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS)

  await prisma.verificationToken.create({
    data: { userId, tokenHash, expiresAt },
  })

  const link = `${appBaseUrl()}/verify?token=${raw}`

  await sendEmail({
    to: email,
    subject: "Confirm your CodeForge email",
    text:
      `Welcome to CodeForge!\n\n` +
      `Confirm your email to activate your account (valid for 24 hours):\n${link}\n\n` +
      `If you didn't create this account, you can safely ignore this email.`,
    html: verifyEmailHtml(link),
  })
}

/**
 * Validate a raw token from a verification link. Returns the token row (with
 * userId) if it exists, is unused, and hasn't expired; otherwise null.
 */
export async function findValidVerificationToken(rawToken: string) {
  if (!rawToken) return null
  const tokenHash = hashToken(rawToken)
  const row = await prisma.verificationToken.findUnique({ where: { tokenHash } })
  if (!row) return null
  if (row.usedAt) return null
  if (row.expiresAt.getTime() < Date.now()) return null
  return row
}

function verifyEmailHtml(link: string): string {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#111">
    <h2 style="margin:0 0 8px">Confirm your email</h2>
    <p style="color:#555;margin:0 0 20px">
      Welcome to CodeForge! Confirm your email address to activate your account.
      This link is valid for 24 hours.
    </p>
    <a href="${link}"
       style="display:inline-block;background:#ea580c;color:#fff;text-decoration:none;
              padding:12px 20px;border-radius:9999px;font-weight:600">
      Confirm email
    </a>
    <p style="color:#888;font-size:13px;margin:24px 0 0">
      If you didn't create a CodeForge account, you can safely ignore this email.
    </p>
  </div>`
}
