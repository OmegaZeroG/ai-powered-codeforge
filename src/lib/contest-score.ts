// Contest scoring, ranking and XP — pure functions over submission rows, so
// they are unit-testable and shared by the leaderboard, the personal score card
// and any future export. Nothing here touches the DB.
//
// Model: ICPC-style.
//   - A problem is SOLVED if the participant has at least one ACCEPTED contest
//     submission for it.
//   - Ranking key: (solved DESC, penaltyTime ASC).
//   - penaltyTime = for each SOLVED problem, the minutes from contest start to
//     that problem's FIRST accepted submission, plus PENALTY_MINUTES for every
//     wrong (non-accepted) submission made on that problem BEFORE the accept.
//     Wrong submissions on problems that were never solved cost nothing.
import type { Difficulty } from "@prisma/client"
import { XP_BY_DIFFICULTY } from "@/lib/gamification"

// Minutes added to a solved problem's time for each earlier wrong submission.
export const PENALTY_MINUTES = 5

// Contest XP knobs (awarded ON TOP of the normal per-solve practice XP that a
// contest ACCEPTED already grants through the execute route).
export const CONTEST_PARTICIPATION_XP = 25 // just for entering + submitting
export const CONTEST_RANK_BONUS_XP = 150 // 1st place; decays with rank
export const CONTEST_PER_SOLVE_MULTIPLIER = 0.5 // × difficulty XP, per solve

// A single contest submission, minimally typed for scoring.
export interface ScoredSubmission {
  problemId: string
  verdict: string // "ACCEPTED" | "WRONG_ANSWER" | ...
  createdAt: Date
}

// The problems that make up the round (for difficulty-weighted XP and totals).
export interface ScoredProblem {
  problemId: string
  difficulty: Difficulty
}

export interface ProblemScore {
  problemId: string
  solved: boolean
  // Minutes from start to the accepted submission (null if unsolved).
  solveMinutes: number | null
  wrongBeforeSolve: number
  // Penalty contribution for THIS problem (0 if unsolved).
  penaltyMinutes: number
}

export interface ParticipantScore {
  userId: string
  solvedCount: number
  // Total penalty time in minutes — the ICPC tiebreaker (lower is better).
  penaltyTime: number
  perProblem: ProblemScore[]
  // Timestamp used for a final, stable tiebreak: the instant of the last
  // accepted solve (earlier is better). null if nothing solved.
  lastAcceptedAt: Date | null
}

// Score one participant from their contest submissions.
export function scoreParticipant(
  userId: string,
  submissions: ScoredSubmission[],
  problems: ScoredProblem[],
  startsAt: Date,
): ParticipantScore {
  const startMs = startsAt.getTime()
  const perProblem: ProblemScore[] = []
  let penaltyTime = 0
  let solvedCount = 0
  let lastAcceptedAt: Date | null = null

  for (const { problemId } of problems) {
    // This problem's submissions in chronological order.
    const subs = submissions
      .filter((s) => s.problemId === problemId)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())

    let wrongBeforeSolve = 0
    let solveMinutes: number | null = null
    let solved = false

    for (const s of subs) {
      if (s.verdict === "ACCEPTED") {
        solved = true
        solveMinutes = Math.max(
          0,
          Math.floor((s.createdAt.getTime() - startMs) / 60000),
        )
        if (!lastAcceptedAt || s.createdAt > lastAcceptedAt) {
          lastAcceptedAt = s.createdAt
        }
        break // stop counting at the first accept
      }
      wrongBeforeSolve++
    }

    const penalty = solved
      ? (solveMinutes as number) + wrongBeforeSolve * PENALTY_MINUTES
      : 0
    if (solved) {
      solvedCount++
      penaltyTime += penalty
    }

    perProblem.push({
      problemId,
      solved,
      solveMinutes,
      wrongBeforeSolve,
      penaltyMinutes: penalty,
    })
  }

  return { userId, solvedCount, penaltyTime, perProblem, lastAcceptedAt }
}

// The ICPC comparator: more solved first, then lower penalty time, then the
// earlier last-accept as a stable final tiebreak.
export function compareScores(a: ParticipantScore, b: ParticipantScore): number {
  if (a.solvedCount !== b.solvedCount) return b.solvedCount - a.solvedCount
  if (a.penaltyTime !== b.penaltyTime) return a.penaltyTime - b.penaltyTime
  const at = a.lastAcceptedAt?.getTime() ?? Infinity
  const bt = b.lastAcceptedAt?.getTime() ?? Infinity
  return at - bt
}

export interface RankedParticipant extends ParticipantScore {
  rank: number // 1-based; ties share a rank
  contestXp: number
}

// Rank a field of scored participants and compute each one's contest XP.
// Ties (identical solved + penalty) share a rank ("1224" style) and the same
// rank-bonus band.
export function rankParticipants(
  scores: ParticipantScore[],
  problems: ScoredProblem[],
): RankedParticipant[] {
  const diffById = new Map(problems.map((p) => [p.problemId, p.difficulty]))
  const sorted = [...scores].sort(compareScores)

  const ranked: RankedParticipant[] = []
  let lastRank = 0
  for (let i = 0; i < sorted.length; i++) {
    const s = sorted[i]
    const prev = i > 0 ? sorted[i - 1] : null
    // Standard competition ranking: equal scores share the position of the
    // first of the tie; the next distinct score jumps to i+1.
    const rank =
      prev && compareScores(prev, s) === 0 ? lastRank : i + 1
    lastRank = rank
    ranked.push({
      ...s,
      rank,
      contestXp: contestXpFor(s, rank, diffById),
    })
  }
  return ranked
}

// XP for one participant: participation (if they solved or submitted at all) +
// a rank-scaled bonus + a difficulty-weighted per-solve bonus.
export function contestXpFor(
  score: ParticipantScore,
  rank: number,
  diffById: Map<string, Difficulty>,
): number {
  const participated = score.perProblem.some(
    (p) => p.solved || p.wrongBeforeSolve > 0,
  )
  if (!participated) return 0

  let xp = CONTEST_PARTICIPATION_XP

  // Rank bonus decays: 1st gets full, then halves each rank down to a floor.
  // rank 1 -> 150, 2 -> 75, 3 -> 50, 4 -> 37, ... never below 10.
  const decayed = Math.round(CONTEST_RANK_BONUS_XP / rank)
  xp += Math.max(10, decayed)

  // Per-solve, scaled by that problem's difficulty.
  for (const p of score.perProblem) {
    if (!p.solved) continue
    const diff = diffById.get(p.problemId)
    if (!diff) continue
    xp += Math.round(XP_BY_DIFFICULTY[diff] * CONTEST_PER_SOLVE_MULTIPLIER)
  }

  return xp
}

// Human helper: "1h 23m" from a minute count (for the score card / board).
export function formatPenaltyTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}
