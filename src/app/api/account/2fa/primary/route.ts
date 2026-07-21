import { NextResponse } from "next/server"
import { z } from "zod"
import { auth } from "@/auth"
import { rateLimit, ipFromRequest, tooManyRequests } from "@/lib/rate-limit"
import { reconcile2fa } from "@/lib/two-factor-state"

// POST /api/account/2fa/primary — choose which enrolled method is challenged
// first at login. No code required: this only reorders the user's own factors,
// it doesn't weaken security (both methods stay enrolled, and "Try another way"
// still reaches the other at login). reconcile2fa honors the preference only if
// the named method is actually enrolled, so a stale/invalid pick is ignored.
const schema = z.object({ method: z.enum(["email", "totp"]) })

export async function POST(request: Request) {
  const rl = rateLimit(`2fa-primary:${ipFromRequest(request)}`, 30, 15 * 60_000)
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

  const state = await reconcile2fa(session.user.id, parsed.data.method)
  if (state.primary !== parsed.data.method) {
    return NextResponse.json(
      { error: "That method isn't enrolled." },
      { status: 400 },
    )
  }

  return NextResponse.json({ ok: true, primary: state.primary })
}
