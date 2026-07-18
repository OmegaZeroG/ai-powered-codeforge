import { NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { createAndSendResetToken } from "@/lib/password-reset"
import { rateLimit, ipFromRequest, tooManyRequests } from "@/lib/rate-limit"

const schema = z.object({
  email: z.string().email().max(320),
})

export async function POST(request: Request) {
  // Throttle by IP: 5 reset requests per 15 minutes. Blunts email-bombing a
  // victim's inbox and slows enumeration probing.
  const rl = rateLimit(`forgot:${ipFromRequest(request)}`, 5, 15 * 60_000)
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

  // Look the user up, but ALWAYS respond the same way regardless of whether the
  // account exists or has a password. This prevents attackers from using this
  // endpoint to discover which emails are registered (account enumeration).
  const user = await prisma.user.findUnique({ where: { email } })
  if (user && user.password) {
    try {
      await createAndSendResetToken(user.id, email)
    } catch (err) {
      // Log server-side, but don't leak failure to the client.
      console.error("[forgot-password] failed to send reset:", err)
    }
  }

  return NextResponse.json({
    ok: true,
    message: "If an account exists for that email, a reset link has been sent.",
  })
}
