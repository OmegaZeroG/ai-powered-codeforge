import { createHash, randomBytes } from "crypto"
import { prisma } from "@/lib/prisma"
import { sendEmail } from "@/lib/email"

// How long a reset link stays valid.
const TOKEN_TTL_MS = 1000 * 60 * 30 // 30 minutes

// Hash a raw token for storage/lookup. We only ever persist this hash, so the
// DB never contains a usable token. SHA-256 is fine here (tokens are 32 random
// bytes of high entropy, not low-entropy passwords).
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
 * Create a fresh single-use reset token for the user and email them the link.
 * Invalidates any prior outstanding tokens for that user first.
 */
export async function createAndSendResetToken(userId: string, email: string) {
  // Invalidate previous tokens so only the newest link works.
  await prisma.passwordResetToken.deleteMany({ where: { userId, usedAt: null } })

  const raw = randomBytes(32).toString("hex")
  const tokenHash = hashToken(raw)
  const expiresAt = new Date(Date.now() + TOKEN_TTL_MS)

  await prisma.passwordResetToken.create({
    data: { userId, tokenHash, expiresAt },
  })

  const link = `${appBaseUrl()}/reset-password?token=${raw}`

  await sendEmail({
    to: email,
    subject: "Reset your CodeForge password",
    text:
      `Someone requested a password reset for your CodeForge account.\n\n` +
      `Reset it here (valid for 30 minutes):\n${link}\n\n` +
      `If this wasn't you, you can safely ignore this email.`,
    html: resetEmailHtml(link),
  })
}

/**
 * Validate a raw token from a reset link. Returns the token row (with userId)
 * if it exists, is unused, and hasn't expired; otherwise null.
 */
export async function findValidResetToken(rawToken: string) {
  if (!rawToken) return null
  const tokenHash = hashToken(rawToken)
  const row = await prisma.passwordResetToken.findUnique({ where: { tokenHash } })
  if (!row) return null
  if (row.usedAt) return null
  if (row.expiresAt.getTime() < Date.now()) return null
  return row
}

function resetEmailHtml(link: string): string {
  return `
  <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:480px;margin:0 auto;padding:24px;color:#111">
    <h2 style="margin:0 0 8px">Reset your password</h2>
    <p style="color:#555;margin:0 0 20px">
      Someone requested a password reset for your CodeForge account.
      This link is valid for 30 minutes.
    </p>
    <a href="${link}"
       style="display:inline-block;background:#ea580c;color:#fff;text-decoration:none;
              padding:12px 20px;border-radius:9999px;font-weight:600">
      Reset password
    </a>
    <p style="color:#888;font-size:13px;margin:24px 0 0">
      If you didn't request this, you can safely ignore this email. Your password
      won't change until you open the link above and choose a new one.
    </p>
  </div>`
}
