import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { getRecommendedProblem } from "@/lib/adaptive"
import { Sparkles } from "lucide-react"

const DIFFICULTY_COLOR: Record<string, string> = {
  EASY: "text-[#34D399]",
  MEDIUM: "text-[#FBBF24]",
  HARD: "text-[#F87171]",
}

export default async function TopicsPage() {
  const session = await auth()

  const topics = await prisma.topic.findMany({
    orderBy: { order: "asc" },
    include: {
      problems: {
        orderBy: { order: "asc" },
        select: { id: true, difficulty: true },
      },
    },
  })

  const solvedByProblemId = new Set<string>()
  let recommendation: Awaited<ReturnType<typeof getRecommendedProblem>> | null = null

  if (session?.user?.id) {
    const [progress, rec] = await Promise.all([
      prisma.userProgress.findMany({
        where: { userId: session.user.id, status: "SOLVED" },
        select: { problemId: true },
      }),
      getRecommendedProblem(session.user.id),
    ])
    for (const p of progress) {
      solvedByProblemId.add(p.problemId)
    }
    recommendation = rec
  }

  return (
    <div className="min-h-screen bg-[#0A0A0F] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-2xl font-semibold mb-1">Topics</h1>
        <p className="text-[#8888A8] text-sm mb-8">
          Work through each topic in order to build a structured foundation.
        </p>

        {recommendation?.problem && (
          <Link
            href={`/problems/${recommendation.problem.slug}`}
            className="block border border-[#7C6AF7]/50 rounded-lg p-4 bg-[#161226] hover:border-[#7C6AF7] transition-colors mb-6"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-[#7C6AF7]" />
              <span className="text-[#7C6AF7] text-xs font-medium uppercase tracking-wider">
                Recommended for you
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-white font-medium">
                  {recommendation.problem.title}
                </h2>
                <p className="text-[#8888A8] text-xs mt-0.5">
                  {recommendation.problem.topic.name}
                </p>
              </div>
              <span
                className={`text-xs font-medium ${DIFFICULTY_COLOR[recommendation.problem.difficulty]}`}
              >
                {recommendation.problem.difficulty}
              </span>
            </div>
          </Link>
        )}

        <div className="flex flex-col gap-3">
          {topics.map((topic) => {
            const solvedCount = topic.problems.filter((p) =>
              solvedByProblemId.has(p.id)
            ).length
            return (
              <Link
                key={topic.id}
                href={`/topics/${topic.slug}`}
                className="block border border-[#2A2A38] rounded-lg p-4 bg-[#111118] hover:border-[#7C6AF7] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-white font-medium">{topic.name}</h2>
                  <span className="text-[#8888A8] text-xs">
                    {solvedCount}/{topic.problems.length} solved
                  </span>
                </div>
                {topic.description && (
                  <p className="text-[#8888A8] text-sm mt-1">
                    {topic.description}
                  </p>
                )}
              </Link>
            )
          })}
          {topics.length === 0 && (
            <p className="text-[#55556A] text-sm">
              No topics yet — check back soon.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
