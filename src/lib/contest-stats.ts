import { prisma } from "@/lib/prisma"
import { loadLeaderboard } from "@/lib/contest-leaderboard"
import type { Difficulty } from "@/types"

// A finished contest the user took part in, with the rank they ended on.
export interface ContestHistoryEntry {
  contestId: string
  slug: string
  title: string
  difficulty: Difficulty
  endsAt: Date
  rank: number
  totalPlayers: number
  solvedCount: number
  penaltyTime: number
  contestXp: number
}

export interface ContestStats {
  participated: number // number of FINISHED contests they entered
  bestRank: number | null
  avgRank: number | null // rounded to 1 decimal
  recentRank: number | null // rank in the most recently finished contest
  recent: ContestHistoryEntry | null
}

// Build a user's full contest ranking history (finished contests they scored
// in), newest first. Shared by both the aggregate stats and the history page.
export async function loadContestHistory(
  userId: string,
): Promise<ContestHistoryEntry[]> {
  if (!userId) return []

  // Contests the user entered that have already ended, newest first.
  const entries = await prisma.contestParticipant.findMany({
    where: {
      userId,
      contest: { endsAt: { lt: new Date() } },
    },
    orderBy: { contest: { endsAt: "desc" } },
    select: {
      contest: {
        select: {
          id: true,
          slug: true,
          title: true,
          endsAt: true,
          difficulty: true,
        },
      },
    },
  })

  const history: ContestHistoryEntry[] = []
  for (const e of entries) {
    const board = await loadLeaderboard(e.contest.id, userId)
    if (!board.me) continue // no scored row (never submitted) — skip
    history.push({
      contestId: e.contest.id,
      slug: e.contest.slug,
      title: e.contest.title,
      difficulty: e.contest.difficulty,
      endsAt: e.contest.endsAt,
      rank: board.me.rank,
      totalPlayers: board.rows.length,
      solvedCount: board.me.solvedCount,
      penaltyTime: board.me.penaltyTime,
      contestXp: board.me.contestXp,
    })
  }
  return history
}

// Aggregate a user's contest ranking history. Only FINISHED contests (endsAt in
// the past) count toward ranking stats — a live contest's standings aren't final.
// Rank per contest is resolved through the shared leaderboard loader so the
// numbers match exactly what the results page shows.
export async function loadContestStats(userId: string): Promise<ContestStats> {
  const empty: ContestStats = {
    participated: 0,
    bestRank: null,
    avgRank: null,
    recentRank: null,
    recent: null,
  }
  if (!userId) return empty

  const history = await loadContestHistory(userId)
  if (history.length === 0) return empty

  const ranks = history.map((h) => h.rank)
  const bestRank = Math.min(...ranks)
  const avgRank =
    Math.round((ranks.reduce((a, b) => a + b, 0) / ranks.length) * 10) / 10
  // history is already newest-first.
  const recent = history[0]

  return {
    participated: history.length,
    bestRank,
    avgRank,
    recentRank: recent.rank,
    recent,
  }
}
