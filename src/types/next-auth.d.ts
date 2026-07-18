import { DefaultSession } from "next-auth"
import type { Permission } from "@prisma/client"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      // Granular admin capabilities; empty for normal users.
      permissions: Permission[]
      // True if the account is banned (should be denied at sign-in, but exposed
      // for defense-in-depth checks in server code).
      banned: boolean
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    permissions?: Permission[]
    banned?: boolean
    // Epoch ms of the last DB refresh of permissions/banned, for TTL caching.
    rbacRefreshedAt?: number
  }
}
