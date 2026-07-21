import { NextResponse } from "next/server"
import { z } from "zod"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { rateLimit, ipFromRequest, tooManyRequests } from "@/lib/rate-limit"
import { verifyTotp, verifyAndConsumeBackupCode } from "@/lib/totp"
import { reconcile2fa } from "@/lib/two-factor-state"

// POST /api/account/2fa/totp/disable — un-enroll the authenticator method.
//
// Disabling a security control should itself require the control: we demand a
// valid live TOTP code (or a one-time backup code) so a walk-up attacker on an
// unlocked session can't silently strip it. On success we clear the TOTP
// enrollment + secret and delete the backup codes, then reconcile — which leaves
// email 2FA in place if it's also enrolled, or turns 2FA fully off otherwise.
const schema = z.object({ code: z.string().min(6).max(9) })

export async function POST(request: Request) {
  const rl = rateLimit(`2fa-totp-disable:${ipFromRequest(request)}`, 10, 15 * 60_000)
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
    return NextResponse.json(
      { error: "Enter a code to confirm." },
      { status: 400 },
    )
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { twoFactorSecret: true, twoFactorTotpEnabled: true },
  })
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!user.twoFactorTotpEnabled) {
    return NextResponse.json(
      { error: "Authenticator 2FA isn't enabled." },
      { status: 400 },
    )
  }

  const totpOk =
    !!user.twoFactorSecret &&
    (await verifyTotp(user.twoFactorSecret, parsed.data.code))
  const backupOk = totpOk
    ? false
    : await verifyAndConsumeBackupCode(session.user.id, parsed.data.code)
  if (!totpOk && !backupOk) {
    return NextResponse.json(
      { error: "That code is incorrect." },
      { status: 400 },
    )
  }

  // Un-enroll TOTP only: drop backup codes + the secret flag, then reconcile so
  // email 2FA survives if it's also on (or 2FA turns fully off if it isn't).
  await prisma.twoFactorBackupCode.deleteMany({ where: { userId: session.user.id } })
  await prisma.user.update({
    where: { id: session.user.id },
    data: { twoFactorTotpEnabled: false },
  })
  const state = await reconcile2fa(session.user.id)

  return NextResponse.json({
    ok: true,
    twoFactorEnabled: state.enabled,
    primary: state.primary,
  })
}
