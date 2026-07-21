import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { findValidVerificationToken } from "@/lib/email-verification"
import { rateLimit, ipFromRequest, tooManyRequests } from "@/lib/rate-limit"

const schema = z.object({
  token: z.string().min(1).max(256),
})

// POST /api/auth/verify-email — redeem a verification token from the emailed
// /verify link. Stamps User.emailVerified, consumes the token, and clears any
// other outstanding tokens for that user. Idempotent-ish: a second submit of a
// consumed token just reports invalid/expired.
export async function POST(request: Request) {
  // Throttle by IP: 20 attempts per 15 minutes. Tokens are 256-bit and
  // single-use, but rate-limiting removes any online guessing margin.
  const rl = rateLimit(`verify:${ipFromRequest(request)}`, 20, 15 * 60_000)
  if (!rl.ok) return tooManyRequests(rl)

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: "A verification token is required." },
      { status: 400 },
    )
  }

  const row = await findValidVerificationToken(parsed.data.token)
  if (!row) {
    return NextResponse.json(
      { error: "This verification link is invalid or has expired." },
      { status: 400 },
    )
  }

  // The Neon HTTP adapter doesn't support interactive $transaction(), so run
  // these as sequential single statements. Consume the token FIRST so a
  // double-submit can't re-run, then stamp the user, then clear leftovers.
  await prisma.verificationToken.update({
    where: { id: row.id },
    data: { usedAt: new Date() },
  })
  await prisma.user.update({
    where: { id: row.userId },
    data: { emailVerified: new Date() },
  })
  await prisma.verificationToken.deleteMany({
    where: { userId: row.userId, usedAt: null },
  })

  return NextResponse.json({ ok: true, message: "Your email has been verified." })
}
