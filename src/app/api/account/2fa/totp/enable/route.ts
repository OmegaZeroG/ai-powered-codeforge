import { NextResponse } from "next/server"
import { z } from "zod"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { rateLimit, ipFromRequest, tooManyRequests } from "@/lib/rate-limit"
import { verifyTotp, generateBackupCodes, storeBackupCodes } from "@/lib/totp"
import { reconcile2fa } from "@/lib/two-factor-state"

// POST /api/account/2fa/totp/enable — finish authenticator enrollment.
//
// The user submits the first 6-digit code from their app. We verify it against
// the pending secret written in /setup; only on success do we flip 2FA on
// (method "totp") and mint a fresh batch of one-time backup codes. The backup
// codes are returned in plaintext ONCE here — the client must show them and tell
// the user to save them, because only their hashes are stored.
const schema = z.object({ code: z.string().min(6).max(8) })

export async function POST(request: Request) {
  const rl = rateLimit(`2fa-totp-enable:${ipFromRequest(request)}`, 10, 15 * 60_000)
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
    return NextResponse.json({ error: "Enter the 6-digit code." }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { twoFactorSecret: true, emailVerified: true, password: true },
  })
  if (!user || !user.password) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  if (!user.twoFactorSecret) {
    return NextResponse.json(
      { error: "Start setup again — no pending secret found." },
      { status: 400 },
    )
  }

  if (!(await verifyTotp(user.twoFactorSecret, parsed.data.code))) {
    return NextResponse.json(
      { error: "That code is incorrect. Check your authenticator and try again." },
      { status: 400 },
    )
  }

  // Verified: enroll TOTP and issue backup codes (returned once). Prefer TOTP
  // as the primary method now that it's on; reconcile keeps the flags coherent
  // without disturbing an already-enrolled email method.
  const backupCodes = generateBackupCodes()
  await storeBackupCodes(session.user.id, backupCodes)
  await prisma.user.update({
    where: { id: session.user.id },
    data: { twoFactorTotpEnabled: true },
  })
  await reconcile2fa(session.user.id, "totp")

  return NextResponse.json({ ok: true, backupCodes })
}
