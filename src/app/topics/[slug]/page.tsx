import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { CheckCircle2, Sparkles } from "lucide-react"
import { computeUserSkill, DIFFICULTY_WEIGHT } from "@/lib/adaptive"

const DIFFICULTY_COLOR: Record<string, string> = {
  EASY: "text-[#34D399]",
  MEDIUM: "text-[#FBBF24]",
  HARD: "text-[#F87171]",
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const session = await auth()

  const topic = await prisma.topic.findUnique({
    where: { slug },
    include: {
      problems: {
        orderBy: { order: "asc" },
        select: { id: true, title: true, slug: true, difficulty: true },
      },
    },
  })

  if (!topic) {
    notFound()
  }

  const statusByProblemId = new Map<string, string>()
  let targetScore: number | null = null

  if (session?.user?.id) {
    const [progress, skill] = await Promise.all([
      prisma.userProgress.findMany({
        where: {
          userId: session.user.id,
          problemId: { in: topic.problems.map((p) => p.id) },
        },
        select: { problemId: true, status: true },
      }),
      computeUserSkill(session.user.id),
    ])
    for (const p of progress) {
      statusByProblemId.set(p.problemId, p.status)
    }
    targetScore = skill.score
  }

  // Unsolved problems closest to the user's current skill level float to the
  // top; solved problems sink to the bottom since there's nothing left to do.
  const orderedProblems = [...topic.problems]
    .map((problem, originalIndex) => ({ problem, originalIndex }))
    .sort((a, b) => {
      const aSolved = statusByProblemId.get(a.problem.id) === "SOLVED"
      const bSolved = statusByProblemId.get(b.problem.id) === "SOLVED"
      if (aSolved !== bSolved) return aSolved ? 1 : -1

      if (targetScore !== null && !aSolved && !bSolved) {
        const aDist = Math.abs(DIFFICULTY_WEIGHT[a.problem.difficulty] - targetScore)
        const bDist = Math.abs(DIFFICULTY_WEIGHT[b.problem.difficulty] - targetScore)
        if (aDist !== bDist) return aDist - bDist
      }

      return a.originalIndex - b.originalIndex
    })
    .map((entry) => entry.problem)

  const bestMatchId =
    targetScore !== null
      ? orderedProblems.find((p) => statusByProblemId.get(p.id) !== "SOLVED")?.id
      : undefined

  return (
    <div className="min-h-screen bg-[#0A0A0F] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/topics"
          className="text-[#8888A8] text-sm hover:text-white transition-colors"
        >
          ← All topics
        </Link>
        <h1 className="text-white text-2xl font-semibold mt-2 mb-1">
          {topic.name}
        </h1>
        {topic.description && (
          <p className="text-[#8888A8] text-sm mb-8">{topic.description}</p>
        )}

        <div className="flex flex-col gap-2">
          {orderedProblems.map((problem) => {
            const status = statusByProblemId.get(problem.id) ?? "NOT_STARTED"
            const isBestMatch = problem.id === bestMatchId
            return (
              <Link
                key={problem.id}
                href={`/problems/${problem.slug}`}
                className={`flex items-center justify-between border rounded-lg px-4 py-3 bg-[#111118] hover:border-[#7C6AF7] transition-colors ${
                  isBestMatch ? "border-[#7C6AF7]/50" : "border-[#2A2A38]"
                }`}
              >
                <div className="flex items-center gap-3">
                  {status === "SOLVED" ? (
                    <CheckCircle2 size={16} className="text-[#34D399]" />
                  ) : isBestMatch ? (
                    <Sparkles size={14} className="text-[#7C6AF7]" />
                  ) : (
                    <span className="w-4" />
                  )}
                  <span className="text-white text-sm">{problem.title}</span>
                </div>
                <span
                  className={`text-xs font-medium ${DIFFICULTY_COLOR[problem.difficulty]}`}
                >
                  {problem.difficulty}
                </span>
              </Link>
            )
          })}
          {topic.problems.length === 0 && (
            <p className="text-[#55556A] text-sm">
              No problems in this topic yet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
