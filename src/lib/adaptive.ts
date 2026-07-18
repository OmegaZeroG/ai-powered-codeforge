import { prisma } from "@/lib/prisma"
import { Difficulty, Verdict } from "@prisma/client"

export const DIFFICULTY_WEIGHT: Record<Difficulty, number> = {
  EASY: 1,
  MEDIUM: 2,
  HARD: 3,
}

function weightToDifficulty(score: number): Difficulty {
  if (score < 1.67) return "EASY"
  if (score < 2.34) return "MEDIUM"
  return "HARD"
}

export interface UserSkill {
  score: number
  targetDifficulty: Difficulty
  recentAccuracy: number | null
  solvedCount: number
}

// Pure skill computation from already-fetched data. Keeping this DB-free lets
// pages fetch the underlying rows once (in parallel with their other queries)
// and derive skill in memory, instead of each helper opening its own round trip.
export function computeSkillFromData(
  solvedDifficulties: Difficulty[],
  recentVerdicts: Verdict[]
): UserSkill {
  const solvedCount = solvedDifficulties.length
  const baseScore =
    solvedCount === 0
      ? 1
      : solvedDifficulties.reduce((sum, d) => sum + DIFFICULTY_WEIGHT[d], 0) /
        solvedCount

  const recentAccuracy =
    recentVerdicts.length === 0
      ? null
      : recentVerdicts.filter((v) => v === "ACCEPTED").length /
        recentVerdicts.length

  let score = baseScore
  if (recentAccuracy !== null && recentVerdicts.length >= 3) {
    if (recentAccuracy >= 0.7) score += 0.5
    else if (recentAccuracy <= 0.3) score -= 0.5
  }
  score = Math.min(3, Math.max(1, score))

  return {
    score,
    targetDifficulty: weightToDifficulty(score),
    recentAccuracy,
    solvedCount,
  }
}

export interface RecommendedProblem {
  id: string
  title: string
  slug: string
  difficulty: Difficulty
  topic: { name: string; slug: string }
}

// Pure recommendation pick from a pre-built candidate list (unsolved problems,
// already in topic/order sequence) + the computed skill.
export function pickRecommended(
  candidates: RecommendedProblem[],
  skill: UserSkill
): RecommendedProblem | null {
  if (candidates.length === 0) return null

  const matching = candidates.find((c) => c.difficulty === skill.targetDifficulty)
  const closest = [...candidates].sort(
    (a, b) =>
      Math.abs(DIFFICULTY_WEIGHT[a.difficulty] - skill.score) -
      Math.abs(DIFFICULTY_WEIGHT[b.difficulty] - skill.score)
  )[0]

  return matching ?? closest
}

// Skill score is derived on the fly from solve history + recent accuracy,
// rather than a stored rating, so it stays in sync with UserProgress/Submission
// without needing a migration or an update-on-submit hook.
//
// Self-fetching wrapper kept for any caller that just wants the skill; the
// topics pages fetch their own data and call computeSkillFromData directly to
// avoid duplicate round trips.
export async function computeUserSkill(userId: string): Promise<UserSkill> {
  const [solved, recentSubmissions] = await Promise.all([
    prisma.userProgress.findMany({
      where: { userId, status: "SOLVED" },
      select: { problem: { select: { difficulty: true } } },
    }),
    prisma.submission.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 10,
      select: { verdict: true },
    }),
  ])

  return computeSkillFromData(
    solved.map((s) => s.problem.difficulty),
    recentSubmissions.map((s) => s.verdict)
  )
}
