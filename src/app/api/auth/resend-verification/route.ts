import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { createAndSendVerificationToken } from "@/lib/email-verification"
import { rateLimit, ipFromRequest, tooManyRequests } from "@/lib/rate-limit"

const schema = z.object({
  email: z.string().email().max(320),
})

// POST /api/auth/resend-verification — re-send the confirmation email for an
// unverified credentials account. Always responds the same way regardless of
// whether the account exists / is already verified, to avoid leaking which
// emails are registered (account enumeration), mirroring forgot-password.
export async function POST(request: Request) {
  const rl = rateLimit(`resend-verify:${ipFromRequest(request)}`, 5, 15 * 60_000)
  if (!rl.ok) return tooManyRequests(rl)

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 })
  }

  const email = parsed.data.email.toLowerCase()

  // Only re-send for a real, password-based, still-unverified account. OAuth
  // users have no password and are already verified; verified users don't need
  // it. In every case we return the same generic response below.
  const user = await prisma.user.findUnique({ where: { email } })
  if (user && user.password && !user.emailVerified) {
    try {
      await createAndSendVerificationToken(user.id, email)
    } catch (err) {
      console.error("[resend-verification] failed to send:", err)
    }
  }

  return NextResponse.json({
    ok: true,
    message:
      "If that account exists and needs verification, a new link has been sent.",
  })
}
