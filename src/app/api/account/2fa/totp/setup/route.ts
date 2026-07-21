import { NextResponse } from "next/server"
import QRCode from "qrcode"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { rateLimit, ipFromRequest, tooManyRequests } from "@/lib/rate-limit"
import { generateTotpSecret, buildOtpAuthUrl } from "@/lib/totp"

// POST /api/account/2fa/totp/setup — begin authenticator-app enrollment.
//
// We mint a fresh base32 secret and stash it in User.twoFactorSecret WITHOUT
// enabling 2FA (twoFactorEnabled stays false). The secret is inert until the
// user proves possession of their authenticator in the /enable step, so writing
// it early is safe and lets enable re-read it. Returns the otpauth URL, a QR
// data-URL to scan, and the raw secret for manual entry.
//
// Guards: signed in, password account, verified email.
export async function POST(request: Request) {
  const rl = rateLimit(`2fa-totp-setup:${ipFromRequest(request)}`, 15, 15 * 60_000)
  if (!rl.ok) return tooManyRequests(rl)

  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, password: true, emailVerified: true },
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

  const secret = generateTotpSecret()
  const otpauthUrl = buildOtpAuthUrl(user.email, secret)

  // Persist the pending secret (not yet enabled). Overwrites any prior pending
  // secret so restarting setup is clean.
  await prisma.user.update({
    where: { id: session.user.id },
    data: { twoFactorSecret: secret },
  })

  let qrDataUrl: string
  try {
    qrDataUrl = await QRCode.toDataURL(otpauthUrl, { margin: 1, width: 220 })
  } catch {
    // QR generation shouldn't fail, but if it does the manual key still works.
    qrDataUrl = ""
  }

  return NextResponse.json({ ok: true, secret, otpauthUrl, qrDataUrl })
}
