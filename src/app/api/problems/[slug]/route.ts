import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  const problem = await prisma.problem.findUnique({
    where: { slug },
    include: {
      topic: { select: { id: true, name: true, slug: true } },
      testCases: {
        where: { isSample: true },
        orderBy: { order: "asc" },
        select: { input: true, expected: true, isSample: true },
      },
    },
  })

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 })
  }

  return NextResponse.json({
    id: problem.id,
    title: problem.title,
    slug: problem.slug,
    statement: problem.statement,
    constraints: problem.constraints,
    difficulty: problem.difficulty,
    starterCode: problem.starterCode,
    copyProtected: problem.copyProtected,
    topic: problem.topic,
    sampleTestCases: problem.testCases,
  })
}
