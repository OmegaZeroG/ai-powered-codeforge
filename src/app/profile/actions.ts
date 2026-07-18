"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import {
  TASK_XP,
  computeTaskWindows,
  computeTasks,
} from "@/lib/gamification"

/* ---------------------------------------------------------------------------
   Profile & gamification server actions.
   Every action re-authenticates and re-validates against the database — inputs
   from the client (task keys, XP, field values) are never trusted. Successful
   writes revalidate the pages that render the affected data.
--------------------------------------------------------------------------- */

export type ActionResult =
  | { ok: true }
  | { ok: false; error: string }

/* ------------------------------------------------------------ profile ---- */

// Light, dependency-free validators. Empty string clears a field (stored null).
function clean(value: FormDataEntryValue | null, max: number): string | null {
  if (typeof value !== "string") return null
  const trimmed = value.trim()
  if (trimmed.length === 0) return null
  return trimmed.slice(0, max)
}

function isValidUrl(value: string): boolean {
  try {
    const u = new URL(value)
    return u.protocol === "http:" || u.protocol === "https:"
  } catch {
    return false
  }
}

export async function updateProfile(formData: FormData): Promise<ActionResult> {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return { ok: false, error: "You must be signed in." }

  const name = clean(formData.get("name"), 60)
  const bio = clean(formData.get("bio"), 280)
  const location = clean(formData.get("location"), 80)
  const image = clean(formData.get("image"), 500)
  const website = clean(formData.get("website"), 200)

  // GitHub: accept a bare handle or a full URL; store the bare handle.
  let githubHandle = clean(formData.get("githubHandle"), 39)
  if (githubHandle) {
    const m = githubHandle.match(/github\.com\/([A-Za-z0-9-]+)/)
    if (m) githubHandle = m[1]
    githubHandle = githubHandle.replace(/^@/, "")
    if (!/^[A-Za-z0-9-]{1,39}$/.test(githubHandle)) {
      return { ok: false, error: "That GitHub handle looks invalid." }
    }
  }

  if (image && !isValidUrl(image)) {
    return { ok: false, error: "Avatar must be a valid http(s) URL." }
  }
  if (website && !isValidUrl(website)) {
    return { ok: false, error: "Website must be a valid http(s) URL." }
  }

  await prisma.user.update({
    where: { id: userId },
    data: { name, bio, location, image, website, githubHandle },
  })

  revalidatePath("/profile")
  return { ok: true }
}

/* --------------------------------------------------------------- claim ---- */

export async function claimTask(taskKey: string): Promise<ActionResult> {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) return { ok: false, error: "You must be signed in." }

  const xp = TASK_XP[taskKey]
  if (xp === undefined) return { ok: false, error: "Unknown task." }

  const now = new Date()

  // Re-derive the live task state from the DB and confirm this exact task is
  // done and belongs to the current period before writing the claim.
  const [solves, submissions] = await Promise.all([
    prisma.userProgress.findMany({
      where: { userId, status: "SOLVED" },
      select: { solvedAt: true, problem: { select: { difficulty: true } } },
    }),
    prisma.submission.findMany({
      where: { userId },
      select: { verdict: true, createdAt: true },
    }),
  ])

  const solvedDaySet = new Set<string>()
  for (const r of solves) {
    if (r.solvedAt) solvedDaySet.add(r.solvedAt.toISOString().slice(0, 10))
  }
  for (const s of submissions) {
    if (s.verdict === "ACCEPTED")
      solvedDaySet.add(s.createdAt.toISOString().slice(0, 10))
  }

  const windows = computeTaskWindows(
    solves.map((r) => ({
      difficulty: r.problem.difficulty,
      solvedAt: r.solvedAt,
    })),
    submissions.map((s) => ({ createdAt: s.createdAt })),
    solvedDaySet,
    now
  )
  const { daily, weekly } = computeTasks(windows, now)
  const task = [...daily, ...weekly].find((t) => t.key === taskKey)

  if (!task) return { ok: false, error: "Unknown task." }
  if (!task.done) {
    return { ok: false, error: "That task isn't complete yet." }
  }

  // Upsert-as-claim: the unique (userId, taskKey, periodKey) index makes a
  // double-claim a no-op rather than double XP.
  try {
    await prisma.taskClaim.create({
      data: { userId, taskKey, periodKey: task.periodKey, xp: task.xp },
    })
  } catch {
    // Unique violation → already claimed this period. Treat as success (idempotent).
    return { ok: true }
  }

  revalidatePath("/profile")
  revalidatePath("/topics")
  return { ok: true }
}
