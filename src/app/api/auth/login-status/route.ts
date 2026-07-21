import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { prisma } from "@/lib/prisma"
import { rateLimit, ipFromRequest, tooManyRequests } from "@/lib/rate-limit"

const schema = z.object({
  email: z.string().email().max(320),
  password: z.string().min(1).max(200),
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

  // Password correct and verified: authorize() would have succeeded, so the
  // original error was something transient. Report generic.
  return NextResponse.json({ reason: "ok" })
}
