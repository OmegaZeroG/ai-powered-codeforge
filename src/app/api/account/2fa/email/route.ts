import { NextResponse } from "next/server"
import { z } from "zod"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { rateLimit, ipFromRequest, tooManyRequests } from "@/lib/rate-limit"
import { reconcile2fa } from "@/lib/two-factor-state"

// POST /api/account/2fa/email — turn email-based two-factor on or off for the
// signed-in account. Email 2FA needs no setup ceremony (the address is already
// verified), so enabling just flips its enrollment flag; the next login will
// offer a mailed code. This is independent of the authenticator method — both
// can be enrolled at once — so we only touch the email flag and let reconcile2fa
// recompute the master flag and the primary method.
//
// Guard rails: must be signed in, must be a credentials account (OAuth users use
// their provider's MFA), and the email must be verified.
const schema = z.object({ enable: z.boolean() })

export async function POST(request: Request) {
  const rl = rateLimit(`2fa-email:${ipFromRequest(request)}`, 20, 15 * 60_000)
  if (!rl.ok) return tooManyRequests(rl)

  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { password: true, emailVerified: true },
  })
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!user.password) {
    return NextResponse.json(
      { error: "Two-factor is only available for password accounts." },
      { status: 400 },
    )
  }
  if (!user.emailVerified) {
    return NextResponse.json(
      { error: "Confirm your email before enabling two-factor." },
      { status: 400 },
    )
  }

  // Flip only the email enrollment flag; when enabling, prefer it as primary.
  await prisma.user.update({
    where: { id: session.user.id },
    data: { twoFactorEmailEnabled: parsed.data.enable },
  })
  const state = await reconcile2fa(
    session.user.id,
    parsed.data.enable ? "email" : undefined,
  )

  return NextResponse.json({
    ok: true,
    twoFactorEnabled: state.enabled,
    emailEnabled: parsed.data.enable,
    primary: state.primary,
  })
}

