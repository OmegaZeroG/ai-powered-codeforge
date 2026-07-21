import { NextResponse } from "next/server"
import { z } from "zod"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { rateLimit, ipFromRequest, tooManyRequests } from "@/lib/rate-limit"
import { verifyTotp, generateBackupCodes, storeBackupCodes } from "@/lib/totp"

// POST /api/account/2fa/totp/backup-codes — regenerate the one-time backup
// codes for a user who already has TOTP 2FA on (e.g. they used some up, or want
// a fresh sheet). Requires a valid live TOTP code to authorize. Returns the new
// plaintext set ONCE; the old codes are invalidated (storeBackupCodes deletes
// them first).
const schema = z.object({ code: z.string().min(6).max(6) })

export async function POST(request: Request) {
  const rl = rateLimit(`2fa-backup:${ipFromRequest(request)}`, 10, 15 * 60_000)
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
    select: { twoFactorSecret: true, twoFactorTotpEnabled: true },
  })
  if (!user || !user.twoFactorTotpEnabled) {
    return NextResponse.json(
      { error: "Authenticator 2FA isn't enabled." },
      { status: 400 },
    )
  }
  if (
    !user.twoFactorSecret ||
    !(await verifyTotp(user.twoFactorSecret, parsed.data.code))
  ) {
    return NextResponse.json({ error: "That code is incorrect." }, { status: 400 })
  }

  const backupCodes = generateBackupCodes()
  await storeBackupCodes(session.user.id, backupCodes)

  return NextResponse.json({ ok: true, backupCodes })
}
