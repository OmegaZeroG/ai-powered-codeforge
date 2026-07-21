import { prisma } from "@/lib/prisma"

// --- Reconciling multi-method 2FA state ---
//
// A user can enroll email 2FA and authenticator (TOTP) 2FA independently. Three
// derived invariants must always hold on the User row:
//   • twoFactorEnabled === (email enrolled OR totp enrolled)
//   • twoFactorMethod (the PRIMARY, challenged first at login) always points at
//     an actually-enrolled method — never at one that's been turned off
//   • twoFactorSecret is only meaningful while totp is enrolled
//
// Rather than have every route re-derive these, each route flips its own
// enrollment boolean then calls reconcile2fa(), which reads the row back and
// writes a consistent snapshot. `preferPrimary` lets a caller nominate the
// method that should be primary (e.g. the one just enabled, or a user's explicit
// choice); it's honored only if that method is actually enrolled.

export type TwoFactorMethod = "email" | "totp"

export async function reconcile2fa(
  userId: string,
  preferPrimary?: TwoFactorMethod,
): Promise<{ enabled: boolean; primary: TwoFactorMethod | null }> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      twoFactorEmailEnabled: true,
      twoFactorTotpEnabled: true,
      twoFactorMethod: true,
    },
  })
  if (!user) return { enabled: false, primary: null }

  const emailOn = user.twoFactorEmailEnabled
  const totpOn = user.twoFactorTotpEnabled
  const enabled = emailOn || totpOn

  // Pick the primary: honor the caller's preference when that method is on,
  // otherwise keep the existing primary if it's still enrolled, otherwise fall
  // back to whatever is enrolled (totp first — it's the stronger factor).
  let primary: TwoFactorMethod | null = null
  if (enabled) {
    const existing = user.twoFactorMethod as TwoFactorMethod | null
    if (preferPrimary && isEnrolled(preferPrimary, emailOn, totpOn)) {
      primary = preferPrimary
    } else if (existing && isEnrolled(existing, emailOn, totpOn)) {
      primary = existing
    } else if (totpOn) {
      primary = "totp"
    } else if (emailOn) {
      primary = "email"
    }
  }

  await prisma.user.update({
    where: { id: userId },
    data: {
      twoFactorEnabled: enabled,
      twoFactorMethod: primary,
      // Drop the shared secret once TOTP is no longer enrolled.
      ...(totpOn ? {} : { twoFactorSecret: null }),
    },
  })

  return { enabled, primary }
}

function isEnrolled(
  method: TwoFactorMethod,
  emailOn: boolean,
  totpOn: boolean,
): boolean {
  return method === "email" ? emailOn : totpOn
}
