import { notFound } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Editor } from "@/components/Editor"
import { Toolbar } from "@/components/Toolbar"
import { OutputPanel } from "@/components/OutputPanel"
import { ProblemLoader } from "@/components/ProblemLoader"
import { ProtectedStatement } from "@/components/ProtectedStatement"
import { ProblemDetail, Language } from "@/types"

const DIFFICULTY_COLOR: Record<string, string> = {
  EASY: "text-[#34D399]",
  MEDIUM: "text-[#FBBF24]",
  HARD: "text-[#F87171]",
}

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
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
    notFound()
  }

  const problemDetail: ProblemDetail = {
    id: problem.id,
    title: problem.title,
    slug: problem.slug,
    statement: problem.statement,
    constraints: problem.constraints,
    difficulty: problem.difficulty,
    starterCode: problem.starterCode as Partial<Record<Language, string>> | null,
    copyProtected: problem.copyProtected,
    topic: problem.topic,
    sampleTestCases: problem.testCases,
  }

  return (
    <div className="h-screen w-screen bg-[#0A0A0F] flex flex-col overflow-hidden">
      <ProblemLoader problem={problemDetail} />
      <Toolbar />

      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Statement panel */}
        <div className="w-[420px] shrink-0 border-r border-[#2A2A38] overflow-auto px-6 py-6 min-h-0">
          <Link
            href={`/topics/${problemDetail.topic.slug}`}
            className="text-[#8888A8] text-sm hover:text-white transition-colors"
          >
            ← {problemDetail.topic.name}
          </Link>

          <ProtectedStatement
            problemId={problemDetail.id}
            copyProtected={problemDetail.copyProtected}
          >
            <div className="flex items-center gap-3 mt-2 mb-4">
              <h1 className="text-white text-xl font-semibold">
                {problemDetail.title}
              </h1>
              <span
                className={`text-xs font-medium ${DIFFICULTY_COLOR[problemDetail.difficulty]}`}
              >
                {problemDetail.difficulty}
              </span>
            </div>

            <p className="text-[#D0D0E0] text-sm whitespace-pre-wrap leading-relaxed">
              {problemDetail.statement}
            </p>

            {problemDetail.constraints && (
              <div className="mt-6">
                <h2 className="text-[#8888A8] text-xs font-medium uppercase tracking-wider mb-2">
                  Constraints
                </h2>
                <p className="text-[#8888A8] text-sm whitespace-pre-wrap font-mono">
                  {problemDetail.constraints}
                </p>
              </div>
            )}

            {problemDetail.sampleTestCases.length > 0 && (
              <div className="mt-6">
                <h2 className="text-[#8888A8] text-xs font-medium uppercase tracking-wider mb-2">
                  Examples
                </h2>
                <div className="flex flex-col gap-3">
                  {problemDetail.sampleTestCases.map((tc, i) => (
                    <div
                      key={i}
                      className="border border-[#2A2A38] rounded-md p-3 text-xs font-mono"
                    >
                      <p className="text-[#55556A] mb-1">Input</p>
                      <pre className="text-[#F0F0FF] whitespace-pre-wrap mb-2">
                        {tc.input}
                      </pre>
                      <p className="text-[#55556A] mb-1">Output</p>
                      <pre className="text-[#34D399] whitespace-pre-wrap">
                        {tc.expected}
                      </pre>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ProtectedStatement>
        </div>

        {/* Editor + output */}
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
          <div className="flex-1 overflow-hidden min-h-0">
            <Editor />
          </div>
          <div className="h-56">
            <OutputPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
