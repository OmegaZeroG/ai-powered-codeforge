"use server"

// Contest management actions (admin). Same discipline as moderation.ts:
//   1. re-derive the session and assert MANAGE_CONTESTS (fail closed);
//   2. validate inputs with Zod;
//   3. perform the change;
//   4. write an AuditLog row.
//
// createContest is deliberately low-effort for the admin: they choose only a
// difficulty. The server does the rest — picks 3 random problems of that
// difficulty, computes the next free Sunday 22:00 slot, and sets a 1-hour
// window. This keeps contest creation a one-click weekly ritual.
import { revalidatePath } from "next/cache"
import { headers } from "next/headers"
import { z } from "zod"
import type { AuditAction } from "@prisma/client"
import { prisma } from "@/lib/prisma"
import { requirePermission, AuthorizationError } from "@/lib/authz"
import {
  CONTEST_DURATION_MS,
  CONTEST_PROBLEM_COUNT,
  nextContestSlot,
  contestSlug,
  contestTitleForDifficulty,
} from "@/lib/contest"

export type ActionResult = { ok: true } | { ok: false; error: string }

const idSchema = z.string().trim().min(1).max(64)
const difficultySchema = z.enum(["EASY", "MEDIUM", "HARD"])

// Optional override for when the contest starts. The admin form sends a
// datetime-local string ("2026-07-20T22:00", no timezone) which we interpret in
// the server's local timezone -- matching how contest.ts computes slots and how
// the app renders times. Empty/absent means "use the default next-Sunday slot".
const startsAtSchema = z
  .string()
  .trim()
  .min(1)
  // The current form always sends an absolute instant ("...Z" or "+05:30").
  // A timezone-less wall-clock means the browser is running an outdated form
  // bundle -- reject it loudly rather than store a shifted time.
  .refine((v) => /(?:Z|[+-]\d{2}:?\d{2})$/.test(v), {
    message:
      "Outdated page detected — hard-refresh this page (Ctrl+Shift+R) and try again.",
  })
  .refine((v) => !Number.isNaN(new Date(v).getTime()), {
    message: "Enter a valid start date and time.",
  })
  .transform((v) => new Date(v))
  .refine((d) => d.getTime() > Date.now(), {
    message: "Contest start must be in the future.",
  })
  .optional()

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
  targetId: string
  reason?: string
  metadata?: Record<string, unknown>
}) {
  await prisma.auditLog.create({
    data: {
      actorUserId: input.actorUserId,
      action: input.action,
      targetType: "contest",
      targetId: input.targetId,
      reason: input.reason,
      metadata: input.metadata as object | undefined,
      ipAddress: await clientIp(),
    },
  })
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
    if (err instanceof ContestError) return { ok: false, error: err.message }
    console.error("[contests] action failed:", err)
    return { ok: false, error: "Something went wrong. Please try again." }
  }
}

// A user-facing, expected failure (e.g. not enough problems) — surfaced as the
// action's error message rather than a generic 500.
class ContestError extends Error {}

// Fisher-Yates pick of `count` distinct ids.
function pickRandom<T>(items: T[], count: number): T[] {
  const a = [...items]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j]!, a[i]!]
  }
  return a.slice(0, count)
}

export async function createContest(formData: FormData): Promise<ActionResult> {
  return guard(async () => {
    const session = await requirePermission("MANAGE_CONTESTS")
    const difficulty = difficultySchema.parse(formData.get("difficulty"))

    // Pool of candidate problems at this difficulty.
    const pool = await prisma.problem.findMany({
      where: { difficulty },
      select: { id: true },
    })
    if (pool.length < CONTEST_PROBLEM_COUNT) {
      throw new ContestError(
        `Need at least ${CONTEST_PROBLEM_COUNT} ${difficulty.toLowerCase()} problems to build a contest (have ${pool.length}).`
      )
    }

    // Admin may override the start; otherwise default to the next Sunday slot.
    // The client sends `startsAt` as an absolute ISO instant plus the admin's
    // IANA timezone, so the stored instant is unambiguous and the date label is
    // built in the admin's zone (not the server's).
    const startsAtRaw = formData.get("startsAt")
    const override =
      typeof startsAtRaw === "string" && startsAtRaw.trim().length > 0
        ? startsAtSchema.parse(startsAtRaw)
        : undefined
    const tzRaw = formData.get("timeZone")
    const timeZone =
      typeof tzRaw === "string" && tzRaw.trim().length > 0
        ? tzRaw.trim()
        : undefined
    const slot = override ?? nextContestSlot()
    const endsAt = new Date(slot.getTime() + CONTEST_DURATION_MS)
    const slug = contestSlug(difficulty, slot, timeZone)

    // One contest per (difficulty, start time). If the slug already exists,
    // that slot is taken — tell the admin rather than silently duplicating.
    const existing = await prisma.contest.findUnique({ where: { slug } })
    if (existing) {
      throw new ContestError(
        "A contest of that difficulty is already scheduled at that start time."
      )
    }

    const chosen = pickRandom(pool, CONTEST_PROBLEM_COUNT)

    // The Neon HTTP adapter does not support transactions, so we cannot use a
    // nested `problems: { create: [...] }` write (Prisma runs nested writes in
    // an implicit transaction). Instead we create the contest first, then add
    // each ContestProblem row with sequential auto-committing statements. If a
    // problem insert fails midway the contest is left with fewer than 3 rows;
    // the admin can cancel and reschedule (cancel cascades the partial rows).
    const contest = await prisma.contest.create({
      data: {
        title: contestTitleForDifficulty(difficulty, slot, timeZone),
        slug,
        difficulty,
        startsAt: slot,
        endsAt,
        createdByUserId: session.user.id,
      },
      select: { id: true, title: true },
    })

    for (let i = 0; i < chosen.length; i++) {
      await prisma.contestProblem.create({
        data: {
          contestId: contest.id,
          problemId: chosen[i].id,
          order: i + 1,
        },
      })
    }

    await writeAudit({
      actorUserId: session.user.id,
      action: "CREATE_CONTEST",
      targetId: contest.id,
      metadata: {
        difficulty,
        startsAt: slot.toISOString(),
        endsAt: endsAt.toISOString(),
        problemIds: chosen.map((p) => p.id),
      },
    })

    revalidatePath("/admin/contests")
    revalidatePath("/contests")
  })
}

export async function cancelContest(formData: FormData): Promise<ActionResult> {
  return guard(async () => {
    const session = await requirePermission("MANAGE_CONTESTS")
    const contestId = idSchema.parse(formData.get("contestId"))

    const contest = await prisma.contest.findUnique({
      where: { id: contestId },
      select: { id: true, endsAt: true },
    })
    if (!contest) {
      throw new ContestError("Contest not found.")
    }
    // Don't allow cancelling a contest that has already finished — it's history.
    if (contest.endsAt.getTime() <= Date.now()) {
      throw new ContestError("That contest has already ended.")
    }

    // Hard delete is fine here: a not-yet-finished contest has no results to
    // preserve. ContestProblem rows cascade.
    await prisma.contest.delete({ where: { id: contestId } })

    await writeAudit({
      actorUserId: session.user.id,
      action: "CANCEL_CONTEST",
      targetId: contestId,
    })

    revalidatePath("/admin/contests")
    revalidatePath("/contests")
  })
}
