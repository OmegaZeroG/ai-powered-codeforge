import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { findValidResetToken } from "@/lib/password-reset"
import { rateLimit, ipFromRequest, tooManyRequests } from "@/lib/rate-limit"

const schema = z.object({
  token: z.string().min(1).max(256),
  password: z.string().min(8).max(200),
})

export async function POST(request: Request) {
  // Throttle by IP: 10 attempts per 15 minutes. Tokens are 256-bit and
  // single-use, but rate-limiting removes any online guessing margin.
  const rl = rateLimit(`reset:${ipFromRequest(request)}`, 10, 15 * 60_000)
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
      { error: "Password must be at least 8 characters." },
      { status: 400 },
    )
  }

  const { token, password } = parsed.data

  const row = await findValidResetToken(token)
  if (!row) {
    return NextResponse.json(
      { error: "This reset link is invalid or has expired." },
      { status: 400 },
    )
  }

  const hashed = await bcrypt.hash(password, 10)

  // The Neon HTTP adapter doesn't support interactive $transaction(), so run
  // these as sequential single statements. Order matters: consume the token
  // FIRST so a double-submit can't reset twice, then update the password, then
  // clear any other outstanding tokens for this user.
  await prisma.passwordResetToken.update({
    where: { id: row.id },
    data: { usedAt: new Date() },
  })
  await prisma.user.update({
    where: { id: row.userId },
    data: { password: hashed },
  })
  await prisma.passwordResetToken.deleteMany({
    where: { userId: row.userId, usedAt: null },
  })

  return NextResponse.json({ ok: true })
}
