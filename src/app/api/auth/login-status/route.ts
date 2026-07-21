import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { rateLimit, ipFromRequest, tooManyRequests } from "@/lib/rate-limit"
import { issueLoginOtp } from "@/lib/two-factor"

const schema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(1).max(200),
  // Present only on a code-entry attempt. Lets us tell "hasn't entered a code
  // yet" (→ issue one) from "entered a wrong code" (→ don't re-issue).
  otp: z.string().max(12).optional(),
  // Which enrolled method the user wants to answer. Set when they pick "Try
  // another way"; defaults to the account's primary method. Only honored if the
  // named method is actually enrolled.
  method: z.enum(["email", "totp"]).optional(),
})

// POST /api/auth/login-status — called by the login UI ONLY after next-auth
// returned a generic sign-in error, to explain *why*. next-auth v5 collapses
// all authorize() failures into one opaque "CredentialsSignin" error, so we
// can't tell "wrong password" from "email not verified" client-side. This
// endpoint re-checks the password (so it can't be used for enumeration without
// valid creds) and reports whether the blocker is an unverified email.
//
// It does NOT sign anyone in — it only returns a reason string.
export async function POST(request: Request) {
  const rl = rateLimit(`login-status:${ipFromRequest(request)}`, 10, 15 * 60_000)
  if (!rl.ok) return tooManyRequests(rl)

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ reason: "invalid" }, { status: 400 })
  }

  const parsed = schema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ reason: "invalid" }, { status: 400 })
  }

  const email = parsed.data.email.toLowerCase()
  const user = await prisma.user.findUnique({ where: { email } })

  // No account or no password (OAuth-only) → generic bad credentials.
  if (!user || !user.password) {
    return NextResponse.json({ reason: "bad_credentials" })
  }

  const ok = await bcrypt.compare(parsed.data.password, user.password)
  if (!ok) {
    return NextResponse.json({ reason: "bad_credentials" })
  }

  // Password is correct — so the only thing that blocked authorize() is the
  // verification gate.
  if (!user.emailVerified) {
    return NextResponse.json({ reason: "email_unverified" })
  }

  // Password correct + verified, but 2FA is on: report which method to challenge
  // and the full list of enrolled methods (so the UI can offer "Try another
  // way"). The challenged method is the one the user asked for if they picked
  // one and it's enrolled, else the account's primary.
  if (user.twoFactorEnabled) {
    const methods: ("email" | "totp")[] = []
    if (user.twoFactorEmailEnabled) methods.push("email")
    if (user.twoFactorTotpEnabled) methods.push("totp")

    // Defensive: flags say 2FA is on but nothing is enrolled → treat as no 2FA.
    if (methods.length === 0) {
      return NextResponse.json({ reason: "ok" })
    }

    const requested = parsed.data.method
    const challenge =
      requested && methods.includes(requested)
        ? requested
        : ((user.twoFactorMethod as "email" | "totp" | null) ?? methods[0])

    if (challenge === "email") {
      // Email method: issue + email a fresh code when the user hasn't submitted
      // one yet for THIS challenge. We re-issue when there's no otp in the body
      // (first pass, or a fresh "Try another way" switch to email); a wrong-code
      // retry carries the otp so we don't rotate what they're typing.
      if (parsed.data.otp === undefined) {
        try {
          await issueLoginOtp(user.id, user.email)
        } catch (err) {
          console.error("[login-status] failed to issue login OTP:", err)
        }
      }
    }

    return NextResponse.json({
      reason: "otp_required",
      method: challenge,
      methods,
    })
  }

  // Password correct and verified: authorize() would have succeeded, so the
  // original error was something transient. Report generic.
  return NextResponse.json({ reason: "ok" })
}
