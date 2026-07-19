"use server"

// Contest participant actions (player-facing, not admin). Every action
// re-authenticates from the session and re-validates against the DB — nothing
// from the client is trusted. Mirrors the discipline in profile/actions.ts.
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { contestStatus } from "@/lib/contest"

export type ActionResult =
  | { ok: true; finishedAt: string }
  | { ok: false; error: string }

// Record that the current user ended the contest early. This locks their
// scoring clock at "now": their penalty time is measured to this instant rather
// than the full contest end. Idempotent-ish — if they already finished, we keep
// the first finishedAt (you can't un-end to buy more time).
export async function endContest(contestId: string): Promise<ActionResult> {
  const session = await auth()
  if (!session?.user?.id) {
    return { ok: false, error: "You must be signed in." }
  }
  const userId = session.user.id

  const contest = await prisma.contest.findUnique({
    where: { id: contestId },
    select: { id: true, slug: true, startsAt: true, endsAt: true },
  })
  if (!contest) {
    return { ok: false, error: "Contest not found." }
  }

  const status = contestStatus(contest)
  if (status === "upcoming") {
    return { ok: false, error: "This contest hasn't started yet." }
  }

  // If they already have a finished entry, keep it (no clock reset).
  const existing = await prisma.contestParticipant.findUnique({
    where: { contestId_userId: { contestId, userId } },
    select: { id: true, finishedAt: true },
  })
  if (existing?.finishedAt) {
    return { ok: true, finishedAt: existing.finishedAt.toISOString() }
  }

  // For a still-live contest, stamp "now". For an already-ended contest we let
  // them "finish" too (so the score card shows), stamping the contest end so it
  // can't grant extra time.
  const now = new Date()
  const finishedAt = status === "live" ? now : contest.endsAt

  // Sequential find-then-write, never upsert: the Neon HTTP adapter rejects the
  // implicit transaction an upsert would open ("Transactions are not supported
  // in HTTP mode").
  if (existing) {
    await prisma.contestParticipant.update({
      where: { id: existing.id },
      data: { finishedAt },
    })
  } else {
    await prisma.contestParticipant.create({
      data: { contestId, userId, finishedAt },
    })
  }

  revalidatePath(`/contests/${contest.slug}`)
  return {
    ok: true,
    finishedAt: finishedAt.toISOString(),
  }
}

// Lightweight "I'm here" entry marker, called when the arena mounts. Ensures a
// participant row exists (finishedAt NULL) so the leaderboard can show players
// who entered even before their first submission. Safe to call repeatedly.
export async function enterContest(contestId: string): Promise<ActionResult> {
  const session = await auth()
  if (!session?.user?.id) {
    return { ok: false, error: "You must be signed in." }
  }
  const userId = session.user.id

  const contest = await prisma.contest.findUnique({
    where: { id: contestId },
    select: { id: true, startsAt: true, endsAt: true },
  })
  if (!contest) {
    return { ok: false, error: "Contest not found." }
  }
  if (contestStatus(contest) !== "live") {
    return { ok: false, error: "This contest is not live." }
  }

  // Sequential find-then-create, never upsert: the Neon HTTP adapter rejects the
  // implicit transaction an upsert would open ("Transactions are not supported
  // in HTTP mode").
  const existing = await prisma.contestParticipant.findUnique({
    where: { contestId_userId: { contestId, userId } },
    select: { finishedAt: true },
  })
  if (!existing) {
    await prisma.contestParticipant.create({ data: { contestId, userId } })
    return { ok: true, finishedAt: "" }
  }

  return {
    ok: true,
    finishedAt: existing.finishedAt ? existing.finishedAt.toISOString() : "",
  }
}
