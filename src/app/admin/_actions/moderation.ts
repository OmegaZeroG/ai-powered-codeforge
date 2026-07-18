"use server"

// Audited, reversible moderation actions.
//
// Every action here follows the same discipline:
//   1. re-derive the session and assert the exact permission (never trust the
//      route gate) — fail closed via requirePermission;
//   2. validate all inputs with Zod (no raw strings reach Prisma);
//   3. perform the soft state change (flags, never deletes);
//   4. write an AuditLog row describing who did what to whom and why.
//
// Because the Neon HTTP adapter has no interactive transactions, the state
// change and its audit row are written as two sequential awaits. The state
// change goes first: if the audit insert somehow fails, we'd rather have an
// unlogged-but-correct moderation than a logged action that didn't take.
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { z } from "zod"
import type { AuditAction } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { resolveBannedUntil } from "@/lib/ban"
import { requirePermission, AuthorizationError } from "@/lib/authz"

export type ActionResult = { ok: true } | { ok: false; error: string }

// A moderation reason: required, trimmed, bounded. Kept short enough to fit a
// UI field but long enough to be meaningful.
const reasonSchema = z
  .string()
  .trim()
  .min(3, "Give a brief reason (at least 3 characters).")
  .max(500, "Reason is too long (max 500 characters).")

const idSchema = z.string().trim().min(1).max(64)

// Ban-duration choice: one of the presets or "custom" (paired with customUntil).
const durationSchema = z.enum(["1d", "7d", "30d", "perm", "custom"])

// Best-effort client IP for the audit trail. Never throws.
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

async function writeAudit(input: {
  actorUserId: string
  action: AuditAction
  targetType: "user" | "submission"
  targetId: string
  reason?: string
  metadata?: Record<string, unknown>
}) {
  await prisma.auditLog.create({
    data: {
      actorUserId: input.actorUserId,
      action: input.action,
      targetType: input.targetType,
      targetId: input.targetId,
      reason: input.reason,
      metadata: input.metadata as object | undefined,
      ipAddress: await clientIp(),
    },
  })
}

// Wraps an action body so AuthorizationError and Zod errors become structured
// results instead of 500s, while unexpected errors still surface.
async function guard(fn: () => Promise<void>): Promise<ActionResult> {
  try {
    await fn()
    return { ok: true }
  } catch (err) {
    if (err instanceof AuthorizationError) return { ok: false, error: "Not authorized." }
    if (err instanceof z.ZodError) {
      return { ok: false, error: err.issues[0]?.message ?? "Invalid input." }
    }
    console.error("[moderation] action failed:", err)
    return { ok: false, error: "Something went wrong. Please try again." }
  }
}

// ---------------------------------------------------------------------------
// Ban / unban
// ---------------------------------------------------------------------------

export async function banUser(formData: FormData): Promise<ActionResult> {
  return guard(async () => {
    const session = await requirePermission("BAN_USER")
    const userId = idSchema.parse(formData.get("userId"))
    const reason = reasonSchema.parse(formData.get("reason"))
    // Duration: a preset key ("1d"/"7d"/"30d"/"perm") or "custom" + an ISO date.
    const duration = durationSchema.parse(formData.get("duration") ?? "perm")
    const customUntil = formData.get("customUntil")
      ? String(formData.get("customUntil"))
      : null

    // Guardrail: never ban yourself (locks you out of your own panel).
    if (userId === session.user.id) {
      throw new AuthorizationError("You cannot ban your own account.")
    }
    // Guardrail: never ban another staff member from here — permission changes
    // go through MANAGE_ADMINS, not the ban button.
    const target = await prisma.user.findUnique({
      where: { id: userId },
      select: { permissions: true, banned: true },
    })
    if (!target) throw new z.ZodError([{ code: "custom", message: "User not found.", path: [] }])
    if (target.permissions.length > 0) {
      throw new AuthorizationError("Cannot ban a staff account.")
    }

    // Resolve the duration to a concrete end date (null = permanent). Throws a
    // plain Error on a bad custom date, which guard() surfaces as its message.
    const { until } = resolveBannedUntil(duration, customUntil)

    await prisma.user.update({
      where: { id: userId },
      data: {
        banned: true,
        bannedAt: new Date(),
        bannedUntil: until,
        bannedReason: reason,
      },
    })
    await writeAudit({
      actorUserId: session.user.id,
      action: "BAN_USER",
      targetType: "user",
      targetId: userId,
      reason,
      metadata: {
        bannedUntil: until ? until.toISOString() : null,
        permanent: until === null,
      },
    })
    revalidatePath("/admin/users")
    revalidatePath(`/admin/users/${userId}`)
  })
}

export async function unbanUser(formData: FormData): Promise<ActionResult> {
  return guard(async () => {
    const session = await requirePermission("BAN_USER")
    const userId = idSchema.parse(formData.get("userId"))
    const reason = reasonSchema.parse(formData.get("reason"))

    await prisma.user.update({
      where: { id: userId },
      data: {
        banned: false,
        bannedAt: null,
        bannedUntil: null,
        bannedReason: null,
      },
    })
    await writeAudit({
      actorUserId: session.user.id,
      action: "UNBAN_USER",
      targetType: "user",
      targetId: userId,
      reason,
    })
    revalidatePath("/admin/users")
    revalidatePath(`/admin/users/${userId}`)
  })
}

// ---------------------------------------------------------------------------
// Revoke / restore submission
// ---------------------------------------------------------------------------

export async function revokeSubmission(formData: FormData): Promise<ActionResult> {
  return guard(async () => {
    const session = await requirePermission("REVOKE_SUBMISSION")
    const submissionId = idSchema.parse(formData.get("submissionId"))
    const reason = reasonSchema.parse(formData.get("reason"))

    const sub = await prisma.submission.update({
      where: { id: submissionId },
      data: { revoked: true, revokedAt: new Date(), revokedReason: reason },
      select: { userId: true },
    })
    await writeAudit({
      actorUserId: session.user.id,
      action: "REVOKE_SUBMISSION",
      targetType: "submission",
      targetId: submissionId,
      reason,
      metadata: { userId: sub.userId },
    })
    revalidatePath("/admin/anti-cheat")
    revalidatePath(`/admin/users/${sub.userId}`)
  })
}

export async function restoreSubmission(formData: FormData): Promise<ActionResult> {
  return guard(async () => {
    const session = await requirePermission("REVOKE_SUBMISSION")
    const submissionId = idSchema.parse(formData.get("submissionId"))
    const reason = reasonSchema.parse(formData.get("reason"))

    const sub = await prisma.submission.update({
      where: { id: submissionId },
      data: { revoked: false, revokedAt: null, revokedReason: null },
      select: { userId: true },
    })
    await writeAudit({
      actorUserId: session.user.id,
      action: "RESTORE_SUBMISSION",
      targetType: "submission",
      targetId: submissionId,
      reason,
      metadata: { userId: sub.userId },
    })
    revalidatePath("/admin/anti-cheat")
    revalidatePath(`/admin/users/${sub.userId}`)
  })
}

// ---------------------------------------------------------------------------
// Warn user
// ---------------------------------------------------------------------------

export async function warnUser(formData: FormData): Promise<ActionResult> {
  return guard(async () => {
    const session = await requirePermission("WARN_USER")
    const userId = idSchema.parse(formData.get("userId"))
    const reason = reasonSchema.parse(formData.get("reason"))

    await prisma.warning.create({
      data: { userId, issuedByUserId: session.user.id, reason },
    })
    await writeAudit({
      actorUserId: session.user.id,
      action: "WARN_USER",
      targetType: "user",
      targetId: userId,
      reason,
    })
    revalidatePath(`/admin/users/${userId}`)
  })
}
