import { prisma } from "@/lib/prisma"
import { Difficulty } from "@prisma/client"

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

// Skill score is derived on the fly from solve history + recent accuracy,
// rather than a stored rating, so it stays in sync with UserProgress/Submission
// without needing a migration or an update-on-submit hook.
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

  const solvedCount = solved.length
  const baseScore =
    solvedCount === 0
      ? 1
      : solved.reduce(
          (sum, s) => sum + DIFFICULTY_WEIGHT[s.problem.difficulty],
          0
        ) / solvedCount

  const recentAccuracy =
    recentSubmissions.length === 0
      ? null
      : recentSubmissions.filter((s) => s.verdict === "ACCEPTED").length /
        recentSubmissions.length

  let score = baseScore
  if (recentAccuracy !== null && recentSubmissions.length >= 3) {
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

export async function getRecommendedProblem(
  userId: string
): Promise<{ skill: UserSkill; problem: RecommendedProblem | null }> {
  const skill = await computeUserSkill(userId)

  const solved = await prisma.userProgress.findMany({
    where: { userId, status: "SOLVED" },
    select: { problemId: true },
  })
  const solvedIds = solved.map((p) => p.problemId)

  const candidates = await prisma.problem.findMany({
    where: { id: { notIn: solvedIds } },
    orderBy: [{ topic: { order: "asc" } }, { order: "asc" }],
    select: {
      id: true,
      title: true,
      slug: true,
      difficulty: true,
      topic: { select: { name: true, slug: true } },
    },
  })

  if (candidates.length === 0) {
    return { skill, problem: null }
  }

  const matching = candidates.find((c) => c.difficulty === skill.targetDifficulty)
  const closest = [...candidates].sort(
    (a, b) =>
      Math.abs(DIFFICULTY_WEIGHT[a.difficulty] - skill.score) -
      Math.abs(DIFFICULTY_WEIGHT[b.difficulty] - skill.score)
  )[0]

  return { skill, problem: matching ?? closest }
}
