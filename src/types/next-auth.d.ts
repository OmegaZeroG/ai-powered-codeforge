import { DefaultSession } from "next-auth"
import type { Permission } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      // Granular admin capabilities; empty for normal users.
      permissions: Permission[]
      // True if the account is banned. Banned users may still sign in; the ban
      // is enforced as a profile-only lockdown (see src/lib/ban.ts).
      banned: boolean
      // ISO timestamp when a timed ban lifts; null = permanent (while banned)
      // or not banned. Enforcement uses isBanActive() over this, not the flag
      // alone, so expired timed bans read as inactive without a background job.
      bannedUntil: string | null
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    permissions?: Permission[]
    banned?: boolean
    bannedUntil?: string | null
    // Epoch ms of the last DB refresh of permissions/banned, for TTL caching.
    rbacRefreshedAt?: number
  }
}
