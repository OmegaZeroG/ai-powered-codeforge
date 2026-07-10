import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()

  const topics = await prisma.topic.findMany({
    orderBy: { order: "asc" },
    include: {
      problems: {
        orderBy: { order: "asc" },
        select: {
          id: true,
          title: true,
          slug: true,
          difficulty: true,
          order: true,
        },
      },
    },
  })

  const statusByProblemId = new Map<string, string>()
  if (session?.user?.id) {
    const progress = await prisma.userProgress.findMany({
      where: { userId: session.user.id },
      select: { problemId: true, status: true },
    })
    for (const p of progress) {
      statusByProblemId.set(p.problemId, p.status)
    }
  }

  const result = topics.map((topic) => ({
    id: topic.id,
    name: topic.name,
    slug: topic.slug,
    description: topic.description,
    order: topic.order,
    problems: topic.problems.map((problem) => ({
      id: problem.id,
      title: problem.title,
      slug: problem.slug,
      difficulty: problem.difficulty,
      order: problem.order,
      status: statusByProblemId.get(problem.id) ?? "NOT_STARTED",
    })),
  }))

  return NextResponse.json({ topics: result })
}
