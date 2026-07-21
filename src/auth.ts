import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import type { Permission } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { verifyLoginOtp } from "@/lib/two-factor"
import { verifyTotp, verifyAndConsumeBackupCode } from "@/lib/totp"

// How long a token's cached permissions/ban state is trusted before we re-read
// it from the database. Keeps a freshly banned user (or a just-revoked admin)
// from lingering with stale privileges, without a DB hit on literally every
// request. 60s is a good balance for moderation actions.
const RBAC_TTL_MS = 60_000

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        // Optional second factor. Empty on the first sign-in attempt; the UI
        // re-submits with the emailed/app code when 2FA is required (see below).
        otp: { label: "Code", type: "text" },
        // Which enrolled method the code answers ("email" | "totp"). Set when
        // the user picks "Try another way"; defaults to the account's primary.
        otpMethod: { label: "Method", type: "text" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined
        const password = credentials?.password as string | undefined
        const otp = (credentials?.otp as string | undefined)?.trim() || ""
        const otpMethod = credentials?.otpMethod as string | undefined

        if (!email || !password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user || !user.password) {
          return null
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword) {
          return null
        }

        // Email-verification gate: credentials accounts must confirm their
        // email before they can sign in. OAuth accounts are created with
        // emailVerified set (see the signIn callback) so they never hit this.
        // Returning null blocks the login; the UI calls /api/auth/login-status
        // to learn the reason and offer a "resend verification" action.
        if (!user.emailVerified) {
          return null
        }

        // Two-factor gate. A correct password is not enough once 2FA is on; the
        // user must also pass their second factor. On the first attempt `otp` is
        // empty — we return null (login blocked). The UI then calls
        // /api/auth/login-status, learns which method to challenge and the full
        // enrolled set (for "Try another way"), flips to code entry, and
        // re-submits credentials WITH the code and the chosen `otpMethod`.
        //
        // Methods are enrolled independently (email and/or totp). We verify
        // against the method the UI says it's answering; if that's missing or not
        // enrolled we fall back to the account's primary. OAuth logins never
        // reach authorize(), so provider MFA is unaffected.
        if (user.twoFactorEnabled) {
          if (!otp) {
            return null
          }

          // Resolve which method this code should be checked against.
          const enrolled: ("email" | "totp")[] = []
          if (user.twoFactorEmailEnabled) enrolled.push("email")
          if (user.twoFactorTotpEnabled) enrolled.push("totp")
          if (enrolled.length === 0) {
            // Flag says on but nothing enrolled — fail closed.
            return null
          }

          const requested =
            otpMethod === "email" || otpMethod === "totp" ? otpMethod : null
          const challenge =
            requested && enrolled.includes(requested)
              ? requested
              : ((user.twoFactorMethod as "email" | "totp" | null) ??
                enrolled[0])

          if (challenge === "email") {
            const otpOk = await verifyLoginOtp(user.id, otp)
            if (!otpOk) {
              return null
            }
          } else if (challenge === "totp") {
            // Accept either a live authenticator code OR a one-time backup code
            // (for a user who lost their device). Backup codes are 8 chars with
            // an optional dash; try TOTP first, fall back to consuming a backup.
            const totpOk =
              !!user.twoFactorSecret &&
              (await verifyTotp(user.twoFactorSecret, otp))
            const backupOk = totpOk
              ? false
              : await verifyAndConsumeBackupCode(user.id, otp)
            if (!totpOk && !backupOk) {
              return null
            }
          } else {
            return null
          }
        }

        // Banned users MAY sign in now — the ban is enforced as a profile-only
        // lockdown (see proxy.ts + src/lib/ban.ts), not a login block, so the
        // user can read their suspension notice and countdown.
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        }
      },
    }),
  ],
  callbacks: {
    // We run on the JWT strategy with no database adapter, so OAuth logins do
    // NOT auto-create a User row. This callback does it manually: find-or-create
    // the User by email so OAuth and email/password users share one row. If an
    // OAuth email matches an existing password account, they are linked (same row).
    signIn: async ({ user, account, profile }) => {
      // Credentials logins already resolved a real User in authorize() — pass through.
      if (account?.provider === "credentials") {
        return true
      }

      const email = user.email
      if (!email) {
        return false
      }

      const existing = await prisma.user.findUnique({ where: { email } })

      if (!existing) {
        await prisma.user.create({
          data: {
            email,
            name: user.name ?? (profile?.name as string | undefined) ?? null,
            image: user.image ?? null,
            emailVerified: new Date(),
          },
        })
      } else {
        // Banned users may still sign in (ban = profile-only lockdown, enforced
        // downstream), so no ban check here.
        if (!existing.image && user.image) {
          // Backfill an avatar for a previously password-only account.
          await prisma.user.update({
            where: { email },
            data: { image: user.image },
          })
        }
      }

      return true
    },
    jwt: async ({ token, user, account }) => {
      // --- Resolve our cuid onto the token on sign-in ---
      // On the credentials path, `user.id` is already our cuid.
      if (account?.provider === "credentials" && user) {
        token.id = user.id
      } else if (user?.email) {
        // On an OAuth sign-in, `user.id` is the provider's id, not our cuid —
        // resolve the real User row by email and store our id on the token.
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        })
        if (dbUser) {
          token.id = dbUser.id
        }
      }

      // --- Load / refresh RBAC + ban state ---
      // Refresh on sign-in (user present) or whenever the cached copy is stale,
      // so moderation actions and permission grants take effect within RBAC_TTL_MS
      // rather than requiring the user to log out and back in.
      const stale =
        typeof token.rbacRefreshedAt !== "number" ||
        Date.now() - token.rbacRefreshedAt > RBAC_TTL_MS
      if (token.id && (user || stale)) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: { permissions: true, banned: true, bannedUntil: true },
        })
        token.permissions = dbUser?.permissions ?? []
        token.banned = dbUser?.banned ?? false
        token.bannedUntil = dbUser?.bannedUntil
          ? dbUser.bannedUntil.toISOString()
          : null
        token.rbacRefreshedAt = Date.now()
      }

      return token
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string
        session.user.permissions = (token.permissions as Permission[]) ?? []
        session.user.banned = (token.banned as boolean) ?? false
        session.user.bannedUntil = (token.bannedUntil as string | null) ?? null
      }
      return session
    },
  },
})
