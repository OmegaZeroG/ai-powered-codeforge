import { prisma } from "@/lib/prisma"
import {
  scoreParticipant,
  rankParticipants,
  type ScoredProblem,
  type ScoredSubmission,
  type RankedParticipant,
} from "@/lib/contest-score"

// A single row rendered on the leaderboard.
export interface LeaderboardRow extends RankedParticipant {
  name: string
  isCurrentUser: boolean
}

// Per-problem column metadata, in contest order, so the UI can label each
// problem A/B/C… and show its title alongside the per-problem penalty breakdown.
export interface ProblemMeta {
  problemId: string
  label: string
  title: string
  slug: string
}

export interface LeaderboardData {
  rows: LeaderboardRow[]
  // The viewer's own row, if they participated (handy for a summary card).
  me: LeaderboardRow | null
  problemCount: number
  problemsMeta: ProblemMeta[]
}

// Build the full ranked leaderboard for a contest. Works both live (partial,
// updates as submissions arrive) and final (after end). A participant's scoring
// clock is capped at their finishedAt if they ended early — later submissions
// (which shouldn't exist, but defensively) are ignored past that instant.
export async function loadLeaderboard(
  contestId: string,
  currentUserId: string | null,
): Promise<LeaderboardData> {
  const contest = await prisma.contest.findUnique({
    where: { id: contestId },
    select: {
      startsAt: true,
      problems: {
        orderBy: { order: "asc" },
        select: {
          problemId: true,
          problem: {
            select: { difficulty: true, title: true, slug: true },
          },
        },
      },
    },
  })
  if (!contest) {
    return { rows: [], me: null, problemCount: 0, problemsMeta: [] }
  }

  const problems: ScoredProblem[] = contest.problems.map((p) => ({
    problemId: p.problemId,
    difficulty: p.problem.difficulty,
  }))

  // A/B/C… labels in contest order, carried through to the breakdown UI.
  const problemsMeta: ProblemMeta[] = contest.problems.map((p, i) => ({
    problemId: p.problemId,
    label: String.fromCharCode(65 + i),
    title: p.problem.title,
    slug: p.problem.slug,
  }))

  // Everyone who entered (so we can list zero-solve participants too), plus a
  // per-user finishedAt cap.
  const participants = await prisma.contestParticipant.findMany({
    where: { contestId },
    select: {
      userId: true,
      finishedAt: true,
      user: { select: { name: true, email: true } },
    },
  })

  // All contest submissions, oldest first. Revoked ones (moderation) are
  // excluded from ranking.
  const submissions = await prisma.submission.findMany({
    where: { contestId, revoked: false },
    orderBy: { createdAt: "asc" },
    select: {
      userId: true,
      problemId: true,
      verdict: true,
      createdAt: true,
    },
  })

  // Group submissions by user, capped at that user's finishedAt if set.
  const finishedByUser = new Map(
    participants.map((p) => [p.userId, p.finishedAt]),
  )
  const nameByUser = new Map(
    participants.map((p) => [
      p.userId,
      p.user.name?.trim() || p.user.email.split("@")[0] || "Anonymous",
    ]),
  )

  // Union of anyone with a participant row OR a submission (a submission without
  // an entry row shouldn't happen, but we don't want to drop a real solve).
  const userIds = new Set<string>([
    ...participants.map((p) => p.userId),
    ...submissions.map((s) => s.userId),
  ])

  const subsByUser = new Map<string, ScoredSubmission[]>()
  for (const s of submissions) {
    const cap = finishedByUser.get(s.userId)
    if (cap && s.createdAt > cap) continue // ignore anything after they ended
    const list = subsByUser.get(s.userId) ?? []
    list.push({
      problemId: s.problemId,
      verdict: s.verdict,
      createdAt: s.createdAt,
    })
    subsByUser.set(s.userId, list)
  }

  const scores = [...userIds].map((uid) =>
    scoreParticipant(uid, subsByUser.get(uid) ?? [], problems, contest.startsAt),
  )

  const ranked = rankParticipants(scores, problems)

  const rows: LeaderboardRow[] = ranked.map((r) => ({
    ...r,
    name: nameByUser.get(r.userId) ?? "Anonymous",
    isCurrentUser: r.userId === currentUserId,
  }))

  const me = rows.find((r) => r.isCurrentUser) ?? null
  return { rows, me, problemCount: problems.length, problemsMeta }
}
