"use server"

// Grant/revoke admin permissions on another account -- the one action that
// lets staff mint or demote other staff. Follows the same discipline as
// moderation.ts: re-check the exact permission server-side, validate with
// Zod, write the state change, then an audit row. MANAGE_ADMINS-gated and
// never self-serviceable (see the isSelf guard) so a viewer can't lock
// themselves out or quietly self-promote.
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { z } from "zod"
import { Permission } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { requirePermission, AuthorizationError } from "@/lib/authz"

export type ActionResult = { ok: true } | { ok: false; error: string }

const idSchema = z.string().trim().min(1).max(64)
const permissionValues = Object.values(Permission) as [Permission, ...Permission[]]
const permissionSchema = z.enum(permissionValues)

async function clientIp(): Promise<string | undefined> {
  try {
    const h = await headers()
    const xff = h.get("x-forwarded-for")
    if (xff) return xff.split(",")[0]!.trim()
    return h.get("x-real-ip") ?? undefined
  } catch {
    return undefined
  }
}

async function guard(fn: () => Promise<void>): Promise<ActionResult> {
  try {
    await fn()
    return { ok: true }
  } catch (err) {
    if (err instanceof AuthorizationError) return { ok: false, error: "Not authorized." }
    if (err instanceof z.ZodError) {
      return { ok: false, error: err.issues[0]?.message ?? "Invalid input." }
    }
    console.error("[permissions] action failed:", err)
    return { ok: false, error: "Something went wrong. Please try again." }
  }
}

export async function updatePermissions(formData: FormData): Promise<ActionResult> {
  return guard(async () => {
    const session = await requirePermission("MANAGE_ADMINS")
    const userId = idSchema.parse(formData.get("userId"))

    if (userId === session.user.id) {
      throw new AuthorizationError("You cannot change your own permissions.")
    }

    const next = formData
      .getAll("permissions")
      .map((v) => permissionSchema.parse(String(v)))

    const target = await prisma.user.findUnique({
      where: { id: userId },
      select: { permissions: true },
    })
    if (!target) {
      throw new z.ZodError([{ code: "custom", message: "User not found.", path: [] }])
    }

    const before = target.permissions
    const beforeSet = new Set(before)
    const afterSet = new Set(next)
    const unchanged =
      beforeSet.size === afterSet.size && [...beforeSet].every((p) => afterSet.has(p))
    if (unchanged) return // nothing to do, skip the write and the audit noise

    await prisma.user.update({
      where: { id: userId },
      data: { permissions: { set: next } },
    })

    const added = next.filter((p) => !beforeSet.has(p))
    const removed = before.filter((p) => !afterSet.has(p))

    await prisma.auditLog.create({
      data: {
        actorUserId: session.user.id,
        // The schema only has one action per direction; a save can add AND
        // remove at once, so the label reflects the larger side while the
        // full before/after/added/removed sets in metadata are the real record.
        action: added.length >= removed.length ? "GRANT_PERMISSIONS" : "REVOKE_PERMISSIONS",
        targetType: "user",
        targetId: userId,
        metadata: { before, after: next, added, removed },
        ipAddress: await clientIp(),
      },
    })

    revalidatePath("/admin/users")
    revalidatePath(`/admin/users/${userId}`)
  })
}
