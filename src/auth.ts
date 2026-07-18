import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"

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
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined
        const password = credentials?.password as string | undefined

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
      } else if (!existing.image && user.image) {
        // Backfill an avatar for a previously password-only account.
        await prisma.user.update({
          where: { email },
          data: { image: user.image },
        })
      }

      return true
    },
    jwt: async ({ token, user, account }) => {
      // On the credentials path, `user.id` is already our cuid.
      if (account?.provider === "credentials" && user) {
        token.id = user.id
        return token
      }

      // On an OAuth sign-in, `user.id` is the provider's id, not our cuid —
      // resolve the real User row by email and store our id on the token.
      if (user?.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email },
        })
        if (dbUser) {
          token.id = dbUser.id
        }
      }

      return token
    },
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
