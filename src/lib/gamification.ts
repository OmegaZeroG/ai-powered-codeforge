import { prisma } from "@/lib/prisma"
import { Difficulty } from "@prisma/client"

/* ---------------------------------------------------------------------------
   Gamification — rank, XP, badges, streak, solve calendar, daily/weekly tasks.

   Everything here is DERIVED from data we already store (submissions +
   user_progress + problems). Nothing new is persisted, so this ships without a
   schema migration: XP is a pure function of solved difficulty, streaks come
   from solve dates, badges/tasks are milestone predicates over the same rows.
   If a real ledger is added later, only `loadGamification` needs to change —
   the pure helpers below stay identical.
--------------------------------------------------------------------------- */

export const XP_BY_DIFFICULTY: Record<Difficulty, number> = {
  EASY: 50,
  MEDIUM: 100,
  HARD: 200,
}

// Tier bands by cumulative XP. Kept coarse so early solves visibly move the bar.
const TIERS: { name: string; floor: number }[] = [
  { name: "Iron", floor: 0 },
  { name: "Bronze", floor: 1000 },
  { name: "Silver", floor: 2500 },
  { name: "Gold", floor: 5000 },
  { name: "Platinum", floor: 9000 },
  { name: "Diamond", floor: 15000 },
  { name: "Master", floor: 24000 },
]

const ROMAN = ["I", "II", "III"]

export interface RankInfo {
  tier: string
  division: number // 1..3, higher = closer to the next tier
  romanDivision: string // "I" | "II" | "III"
  xp: number
  tierFloor: number
  tierCeil: number | null // null at the top tier
  nextTier: string | null
  xpIntoTier: number
  xpForTier: number | null // span of the current band, null at the top
  progress: number // 0..1 within the current band
  xpToNext: number | null
}

export function computeRank(xp: number): RankInfo {
  let index = 0
  for (let i = TIERS.length - 1; i >= 0; i--) {
    if (xp >= TIERS[i].floor) {
      index = i
      break
    }
  }
  const tier = TIERS[index]
  const next = TIERS[index + 1] ?? null
  const tierFloor = tier.floor
  const tierCeil = next ? next.floor : null
  const xpIntoTier = xp - tierFloor
  const xpForTier = tierCeil !== null ? tierCeil - tierFloor : null
  const progress = xpForTier ? Math.min(1, xpIntoTier / xpForTier) : 1
  const division = Math.min(3, Math.floor(progress * 3) + 1)

  return {
    tier: tier.name,
    division,
    romanDivision: ROMAN[division - 1],
    xp,
    tierFloor,
    tierCeil,
    nextTier: next?.name ?? null,
    xpIntoTier,
    xpForTier,
    progress,
    xpToNext: tierCeil !== null ? tierCeil - xp : null,
  }
}

/* ---------------------------------------------------------------------------
   Day keys — solve dates are bucketed to UTC calendar days so streak/calendar
   math is deterministic on the server and matches the UTC-based client render.
--------------------------------------------------------------------------- */

export function dayKey(date: Date): string {
  return date.toISOString().slice(0, 10) // YYYY-MM-DD (UTC)
}

/** Longest run of consecutive days ending today or yesterday (streak stays
 *  "alive" through today until midnight UTC). */
export function computeStreak(solvedDays: Set<string>, now: Date): number {
  const cursor = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  )
  // If nothing solved today, the streak may still be alive from yesterday.
  if (!solvedDays.has(dayKey(cursor))) {
    cursor.setUTCDate(cursor.getUTCDate() - 1)
    if (!solvedDays.has(dayKey(cursor))) return 0
  }
  let streak = 0
  while (solvedDays.has(dayKey(cursor))) {
    streak++
    cursor.setUTCDate(cursor.getUTCDate() - 1)
  }
  return streak
}

/** Longest consecutive run anywhere in the history (for the "best" figure). */
export function computeBestStreak(solvedDays: Set<string>): number {
  if (solvedDays.size === 0) return 0
  const keys = [...solvedDays].sort()
  let best = 1
  let run = 1
  for (let i = 1; i < keys.length; i++) {
    const prev = new Date(keys[i - 1] + "T00:00:00Z")
    prev.setUTCDate(prev.getUTCDate() + 1)
    if (dayKey(prev) === keys[i]) {
      run++
      best = Math.max(best, run)
    } else {
      run = 1
    }
  }
  return best
}

/* ---------------------------------------------------------------------------
   Badges — milestone predicates over the derived stats.
--------------------------------------------------------------------------- */

export type BadgeKey =
  | "first-solve"
  | "ten-solved"
  | "accurate"
  | "topic-master"
  | "week-streak"
  | "speed"

export interface Badge {
  key: BadgeKey
  label: string
  description: string
  earned: boolean
  earnedAt: Date | null // when it was first unlocked (persisted), else null
}

interface BadgeInput {
  solvedCount: number
  recentAccuracy: number | null
  recentSampleSize: number
  anyTopicComplete: boolean
  streak: number
  fastSolve: boolean // any accepted submission under 100ms
}

// Static metadata + the live unlock predicate for each badge, in display order.
const BADGE_DEFS: {
  key: BadgeKey
  label: string
  description: string
  predicate: (i: BadgeInput) => boolean
}[] = [
  {
    key: "first-solve",
    label: "First Solve",
    description: "Solve your first problem.",
    predicate: (i) => i.solvedCount >= 1,
  },
  {
    key: "speed",
    label: "Speed",
    description: "Land an accepted run under 100ms.",
    predicate: (i) => i.fastSolve,
  },
  {
    key: "accurate",
    label: "Accurate",
    description: "Hit 80%+ accuracy over your last submissions.",
    predicate: (i) =>
      i.recentAccuracy !== null &&
      i.recentSampleSize >= 5 &&
      i.recentAccuracy >= 0.8,
  },
  {
    key: "ten-solved",
    label: "10 Solved",
    description: "Solve ten problems.",
    predicate: (i) => i.solvedCount >= 10,
  },
  {
    key: "topic-master",
    label: "Topic Master",
    description: "Fully clear a topic.",
    predicate: (i) => i.anyTopicComplete,
  },
  {
    key: "week-streak",
    label: "Streak 7",
    description: "Solve on seven consecutive days.",
    predicate: (i) => i.streak >= 7,
  },
]

/** The set of badge keys whose unlock condition is currently met. */
export function currentlyEarnedBadgeKeys(input: BadgeInput): BadgeKey[] {
  return BADGE_DEFS.filter((b) => b.predicate(input)).map((b) => b.key)
}

/** Resolve the display list. A badge shows as earned if it is unlocked NOW or
 *  was unlocked before (persisted in `earnedAtByKey`) — badges never un-earn. */
export function computeBadges(
  input: BadgeInput,
  earnedAtByKey: Map<BadgeKey, Date> = new Map()
): Badge[] {
  return BADGE_DEFS.map((b) => {
    const persistedAt = earnedAtByKey.get(b.key) ?? null
    const earned = persistedAt !== null || b.predicate(input)
    return {
      key: b.key,
      label: b.label,
      description: b.description,
      earned,
      earnedAt: persistedAt,
    }
  })
}

/* ---------------------------------------------------------------------------
   Tasks — daily/weekly objectives whose "done" state reflects real activity.
   Each task has a stable key and belongs to a period (a UTC day for dailies, an
   ISO week for weeklies). Once done, a task can be CLAIMED to bank its XP into
   the user's total; the claim is stored per (task, period) so it can be earned
   again next period. `claimed` reflects a persisted TaskClaim row.
--------------------------------------------------------------------------- */

export type TaskPeriod = "daily" | "weekly"

export interface Task {
  key: string
  period: TaskPeriod
  periodKey: string // day key or week key this instance belongs to
  label: string
  xp: number
  done: boolean
  claimed: boolean
}

interface TaskInput {
  solvedToday: number
  mediumPlusToday: number
  submissionsToday: number
  solvedThisWeek: number
  hardThisWeek: number
  activeDaysThisWeek: number
}

/** Derive the daily/weekly counters that drive task done-state, from raw solve
 *  and submission rows. Extracted so the loader and the claim action agree
 *  exactly on whether a task is done (the action must re-verify, never trust
 *  the client). Week starts Monday (UTC). */
export function computeTaskWindows(
  solves: { difficulty: Difficulty; solvedAt: Date | null }[],
  submissions: { createdAt: Date }[],
  solvedDaySet: Set<string>,
  now: Date
): TaskInput {
  const todayKey = dayKey(now)
  const weekStart = startOfUtcWeek(now)
  const solvedToday = solves.filter(
    (r) => r.solvedAt && dayKey(r.solvedAt) === todayKey
  )
  const solvedThisWeek = solves.filter(
    (r) => r.solvedAt && r.solvedAt >= weekStart
  )
  const submissionsToday = submissions.filter(
    (s) => dayKey(s.createdAt) === todayKey
  ).length
  const activeDaysThisWeek = new Set(
    [...solvedDaySet].filter((k) => k >= dayKey(weekStart))
  ).size

  return {
    solvedToday: solvedToday.length,
    mediumPlusToday: solvedToday.filter((r) => r.difficulty !== "EASY").length,
    submissionsToday,
    solvedThisWeek: solvedThisWeek.length,
    hardThisWeek: solvedThisWeek.filter((r) => r.difficulty === "HARD").length,
    activeDaysThisWeek,
  }
}

/** ISO week key, e.g. "2026-W29" (UTC, weeks start Monday). Stable within a week. */
export function weekKey(now: Date): string {
  const d = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  )
  // Shift to Thursday of this week to get the ISO week-numbering year right.
  const day = (d.getUTCDay() + 6) % 7 // 0 = Monday
  d.setUTCDate(d.getUTCDate() - day + 3)
  const isoYear = d.getUTCFullYear()
  const firstThursday = new Date(Date.UTC(isoYear, 0, 4))
  const firstDay = (firstThursday.getUTCDay() + 6) % 7
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDay + 3)
  const week =
    1 + Math.round((d.getTime() - firstThursday.getTime()) / (7 * 86400000))
  return `${isoYear}-W${String(week).padStart(2, "0")}`
}

// XP a claimed task banks. Single source of truth so the server can re-derive
// the payout when validating a claim (never trust an XP value from the client).
export const TASK_XP: Record<string, number> = {
  "daily-solve-1": 50,
  "daily-medium-plus": 100,
  "daily-submit-3": 30,
  "weekly-solve-5": 250,
  "weekly-clear-hard": 200,
  "weekly-active-3": 150,
}

export function computeTasks(
  input: TaskInput,
  now: Date,
  claimed: Set<string> = new Set() // set of `${taskKey}:${periodKey}`
): {
  daily: Task[]
  weekly: Task[]
} {
  const dayKeyNow = dayKey(now)
  const wk = weekKey(now)
  const mk = (key: string, periodKey: string) =>
    claimed.has(`${key}:${periodKey}`)

  const daily: Task[] = [
    {
      key: "daily-solve-1",
      period: "daily",
      periodKey: dayKeyNow,
      label: "Solve 1 problem",
      xp: TASK_XP["daily-solve-1"],
      done: input.solvedToday >= 1,
      claimed: mk("daily-solve-1", dayKeyNow),
    },
    {
      key: "daily-medium-plus",
      period: "daily",
      periodKey: dayKeyNow,
      label: "Solve a Medium or Hard",
      xp: TASK_XP["daily-medium-plus"],
      done: input.mediumPlusToday >= 1,
      claimed: mk("daily-medium-plus", dayKeyNow),
    },
    {
      key: "daily-submit-3",
      period: "daily",
      periodKey: dayKeyNow,
      label: "Make 3 submissions",
      xp: TASK_XP["daily-submit-3"],
      done: input.submissionsToday >= 3,
      claimed: mk("daily-submit-3", dayKeyNow),
    },
  ]

  const weekly: Task[] = [
    {
      key: "weekly-solve-5",
      period: "weekly",
      periodKey: wk,
      label: "Solve 5 problems",
      xp: TASK_XP["weekly-solve-5"],
      done: input.solvedThisWeek >= 5,
      claimed: mk("weekly-solve-5", wk),
    },
    {
      key: "weekly-clear-hard",
      period: "weekly",
      periodKey: wk,
      label: "Clear a Hard",
      xp: TASK_XP["weekly-clear-hard"],
      done: input.hardThisWeek >= 1,
      claimed: mk("weekly-clear-hard", wk),
    },
    {
      key: "weekly-active-3",
      period: "weekly",
      periodKey: wk,
      label: "Practice 3 days",
      xp: TASK_XP["weekly-active-3"],
      done: input.activeDaysThisWeek >= 3,
      claimed: mk("weekly-active-3", wk),
    },
  ]

  return { daily, weekly }
}

/* ---------------------------------------------------------------------------
   Loader — one place that touches the DB, deriving the full gamification view
   for a user. All reads fire in parallel.
--------------------------------------------------------------------------- */

export interface RecentSolve {
  title: string
  slug: string
  topic: string
  difficulty: Difficulty
  solvedAt: Date | null
}

export interface GamificationView {
  xp: number // total: solve XP + claimed-task XP
  solveXp: number // XP earned from solved problems
  claimedXp: number // XP banked from claimed tasks
  rank: RankInfo
  streak: number
  bestStreak: number
  solvedDays: string[] // ISO UTC day keys, for the calendar
  badges: Badge[]
  tasks: { daily: Task[]; weekly: Task[] }
  recentSolves: RecentSolve[]
  byDifficulty: Record<Difficulty, { solved: number; total: number }>
  stats: {
    solvedCount: number
    totalProblems: number
    submissionCount: number
    recentAccuracy: number | null // acceptance over the last N submissions
    recentSampleSize: number
  }
}

/** Monday 00:00:00 UTC of the week containing `now`. */
function startOfUtcWeek(now: Date): Date {
  const d = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  )
  const day = (d.getUTCDay() + 6) % 7 // 0 = Monday
  d.setUTCDate(d.getUTCDate() - day)
  return d
}

// How many recent submissions the accuracy figure is computed over.
const RECENT_WINDOW = 20

/** Load the full gamification view for a user. This is the ONLY function here
 *  that touches the DB; every helper above is pure. All reads fire in parallel. */
export async function loadGamification(userId: string): Promise<GamificationView> {
  const now = new Date()

  const [progressRows, submissions, totalProblems, claims, earnedBadges] =
    await Promise.all([
      prisma.userProgress.findMany({
        where: { userId, status: "SOLVED" },
        select: {
          solvedAt: true,
          problem: {
            select: {
              title: true,
              slug: true,
              difficulty: true,
              topic: { select: { name: true } },
            },
          },
        },
      }),
      prisma.submission.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" },
        select: { verdict: true, runtimeMs: true, createdAt: true },
      }),
      prisma.problem.count(),
      prisma.taskClaim.findMany({
        where: { userId },
        select: { taskKey: true, periodKey: true, xp: true },
      }),
      prisma.userBadge.findMany({
        where: { userId },
        select: { badgeKey: true, earnedAt: true },
      }),
    ])

  // --- Solves -------------------------------------------------------------
  const solves = progressRows.map((r) => ({
    title: r.problem.title,
    slug: r.problem.slug,
    topic: r.problem.topic.name,
    difficulty: r.problem.difficulty,
    solvedAt: r.solvedAt,
  }))

  const solvedCount = solves.length
  const solveXp = solves.reduce(
    (sum, s) => sum + XP_BY_DIFFICULTY[s.difficulty],
    0
  )

  const byDifficulty: Record<Difficulty, { solved: number; total: number }> = {
    EASY: { solved: 0, total: 0 },
    MEDIUM: { solved: 0, total: 0 },
    HARD: { solved: 0, total: 0 },
  }
  for (const s of solves) byDifficulty[s.difficulty].solved++

  // Total problems per difficulty (for the "solved by difficulty" bars).
  const diffTotals = await prisma.problem.groupBy({
    by: ["difficulty"],
    _count: { _all: true },
  })
  for (const g of diffTotals) byDifficulty[g.difficulty].total = g._count._all

  // --- Streak / calendar --------------------------------------------------
  const solvedDaySet = new Set(
    solves.filter((s) => s.solvedAt).map((s) => dayKey(s.solvedAt as Date))
  )
  const streak = computeStreak(solvedDaySet, now)
  const bestStreak = computeBestStreak(solvedDaySet)

  // --- Recent accuracy ----------------------------------------------------
  const recent = submissions.slice(0, RECENT_WINDOW)
  const recentSampleSize = recent.length
  const recentAccuracy =
    recentSampleSize === 0
      ? null
      : recent.filter((s) => s.verdict === "ACCEPTED").length / recentSampleSize
  const fastSolve = submissions.some(
    (s) => s.verdict === "ACCEPTED" && s.runtimeMs !== null && s.runtimeMs < 100
  )
  const topicComplete = isAnyTopicComplete(byDifficulty)

  // --- Claimed-task XP ----------------------------------------------------
  const claimedXp = claims.reduce((sum, c) => sum + c.xp, 0)
  const claimedSet = new Set(claims.map((c) => `${c.taskKey}:${c.periodKey}`))

  const xp = solveXp + claimedXp
  const rank = computeRank(xp)

  // --- Badges -------------------------------------------------------------
  const badgeInput: BadgeInput = {
    solvedCount,
    recentAccuracy,
    recentSampleSize,
    anyTopicComplete: topicComplete,
    streak,
    fastSolve,
  }
  const earnedAtByKey = new Map<BadgeKey, Date>(
    earnedBadges.map((b) => [b.badgeKey as BadgeKey, b.earnedAt])
  )
  const badges = computeBadges(badgeInput, earnedAtByKey)

  // --- Tasks --------------------------------------------------------------
  const taskWindows = computeTaskWindows(
    solves.map((s) => ({ difficulty: s.difficulty, solvedAt: s.solvedAt })),
    submissions.map((s) => ({ createdAt: s.createdAt })),
    solvedDaySet,
    now
  )
  const tasks = computeTasks(taskWindows, now, claimedSet)

  // --- Recent solves (most recent first) ----------------------------------
  const recentSolves: RecentSolve[] = [...solves]
    .sort((a, b) => (b.solvedAt?.getTime() ?? 0) - (a.solvedAt?.getTime() ?? 0))
    .slice(0, 6)

  return {
    xp,
    solveXp,
    claimedXp,
    rank,
    streak,
    bestStreak,
    solvedDays: [...solvedDaySet],
    badges,
    tasks,
    recentSolves,
    byDifficulty,
    stats: {
      solvedCount,
      totalProblems,
      submissionCount: submissions.length,
      recentAccuracy,
      recentSampleSize,
    },
  }
}

/** A topic counts as "complete" only against the difficulties that have
 *  problems; here we approximate with the per-difficulty solved==total check
 *  across all difficulties that have at least one problem. */
function isAnyTopicComplete(
  byDifficulty: Record<Difficulty, { solved: number; total: number }>
): boolean {
  const diffs = Object.values(byDifficulty).filter((d) => d.total > 0)
  return diffs.length > 0 && diffs.every((d) => d.solved >= d.total)
}

/** Recompute currently-earned badges for a user and persist any newly unlocked
 *  ones (idempotent via the unique [userId, badgeKey] constraint). Returns the
 *  keys that were newly awarded this call, for the caller to surface. Best-effort:
 *  called from the judge flow after an accepted run. */
export async function syncBadges(userId: string): Promise<BadgeKey[]> {
  const now = new Date()

  const [progressRows, submissions] = await Promise.all([
    prisma.userProgress.findMany({
      where: { userId, status: "SOLVED" },
      select: { solvedAt: true, problem: { select: { difficulty: true } } },
    }),
    prisma.submission.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      select: { verdict: true, runtimeMs: true },
    }),
  ])

  const solvedCount = progressRows.length
  const byDifficulty: Record<Difficulty, { solved: number; total: number }> = {
    EASY: { solved: 0, total: 0 },
    MEDIUM: { solved: 0, total: 0 },
    HARD: { solved: 0, total: 0 },
  }
  for (const r of progressRows) byDifficulty[r.problem.difficulty].solved++
  const diffTotals = await prisma.problem.groupBy({
    by: ["difficulty"],
    _count: { _all: true },
  })
  for (const g of diffTotals) byDifficulty[g.difficulty].total = g._count._all

  const solvedDaySet = new Set(
    progressRows
      .filter((r) => r.solvedAt)
      .map((r) => dayKey(r.solvedAt as Date))
  )
  const streak = computeStreak(solvedDaySet, now)

  const recent = submissions.slice(0, RECENT_WINDOW)
  const recentSampleSize = recent.length
  const recentAccuracy =
    recentSampleSize === 0
      ? null
      : recent.filter((s) => s.verdict === "ACCEPTED").length / recentSampleSize
  const fastSolve = submissions.some(
    (s) => s.verdict === "ACCEPTED" && s.runtimeMs !== null && s.runtimeMs < 100
  )

  const earnedNow = currentlyEarnedBadgeKeys({
    solvedCount,
    recentAccuracy,
    recentSampleSize,
    anyTopicComplete: isAnyTopicComplete(byDifficulty),
    streak,
    fastSolve,
  })
  if (earnedNow.length === 0) return []

  const existing = await prisma.userBadge.findMany({
    where: { userId, badgeKey: { in: earnedNow } },
    select: { badgeKey: true },
  })
  const have = new Set(existing.map((b) => b.badgeKey))
  const fresh = earnedNow.filter((k) => !have.has(k))
  if (fresh.length === 0) return []

  // Insert per-badge with raw INSERT ... ON CONFLICT DO NOTHING rather than
  // prisma.createMany: Prisma 7's client engine wraps createMany in an internal
  // transaction, which the Neon HTTP adapter rejects ("Transactions are not
  // supported in HTTP mode"). `fresh` is at most a handful of badges, so a few
  // single-statement inserts are cheap. ids are generated app-side (crypto.randomUUID).
  for (const badgeKey of fresh) {
    await prisma.$executeRaw`
      INSERT INTO "user_badges" ("id", "userId", "badgeKey", "earnedAt")
      VALUES (${crypto.randomUUID()}, ${userId}, ${badgeKey}, NOW())
      ON CONFLICT ("userId", "badgeKey") DO NOTHING
    `
  }
  return fresh
}
