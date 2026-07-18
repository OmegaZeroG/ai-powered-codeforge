import Link from "next/link"
import { notFound } from "next/navigation"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import { CheckCircle2, Sparkles, Lightbulb, BookOpen } from "lucide-react"
import { computeSkillFromData, DIFFICULTY_WEIGHT } from "@/lib/adaptive"
import { ProductNav } from "@/components/ProductNav"
import type { Difficulty } from "@/types"

/* Warm-ember difficulty pill, matching the design's traffic colors. */
const DIFF_COLOR: Record<Difficulty, string> = {
  EASY: "var(--easy)",
  MEDIUM: "var(--medium)",
  HARD: "var(--hard)",
}
function DifficultyBadge({ difficulty }: { difficulty: Difficulty }) {
  const color = DIFF_COLOR[difficulty]
  return (
    <span
      className="shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em]"
      style={{
        color,
        borderColor: `color-mix(in oklab, ${color} 45%, transparent)`,
      }}
    >
      {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
    </span>
  )
}

function SuggestionCard({
  icon,
  eyebrow,
  title,
  body,
  tall,
}: {
  icon: React.ReactNode
  eyebrow: string
  title: string
  body: string
  tall?: boolean
}) {
  return (
    <section
      className={`rounded-2xl border border-dashed border-border/70 bg-card/40 p-6 backdrop-blur-sm transition-colors hover:border-primary/40 ${
        tall ? "min-h-[220px]" : "min-h-[180px]"
      }`}
    >
      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {icon}
        <span>{eyebrow}</span>
      </div>
      <h3 className="mt-3 text-lg text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {body}
      </p>
    </section>
  )
}

export default async function TopicPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const session = await auth()
  const userId = session?.user?.id

  // Topic + (if logged in) the user's solved history and recent verdicts all
  // fetched in parallel. Skill is computed in memory from the solved rows, so
  // there's no separate computeUserSkill round trip. `progress` here spans ALL
  // topics (not just this one) because skill is a global measure; the per-
  // problem status map just filters to the ids on this page.
  const [topic, progress, recentSubmissions] = await Promise.all([
    prisma.topic.findUnique({
      where: { slug },
      include: {
        problems: {
          orderBy: { order: "asc" },
          select: { id: true, title: true, slug: true, difficulty: true },
        },
      },
    }),
    userId
      ? prisma.userProgress.findMany({
          where: { userId, status: "SOLVED" },
          select: { problemId: true, problem: { select: { difficulty: true } } },
        })
      : Promise.resolve([]),
    userId
      ? prisma.submission.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
          take: 10,
          select: { verdict: true },
        })
      : Promise.resolve([]),
  ])

  if (!topic) {
    notFound()
  }

  const solvedProblemIds = new Set(progress.map((p) => p.problemId))
  const statusByProblemId = new Map<string, string>()
  for (const id of solvedProblemIds) statusByProblemId.set(id, "SOLVED")

  const targetScore = userId
    ? computeSkillFromData(
        progress.map((p) => p.problem.difficulty),
        recentSubmissions.map((s) => s.verdict)
      ).score
    : null

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
    <div className="forge relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-ember-radial opacity-40" />

      <div className="relative z-10">
        <ProductNav />
        <main className="mx-auto max-w-3xl px-6 py-10">
          <Link
            href="/topics"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← All topics
          </Link>
          <h1 className="mb-1 mt-3 font-display text-4xl text-foreground">
            {topic.name}
          </h1>
          {topic.description && (
            <p className="mb-8 text-sm text-muted-foreground">
              {topic.description}
            </p>
          )}

          <section className="flex flex-col gap-3">
            {orderedProblems.map((problem) => {
              const status = statusByProblemId.get(problem.id) ?? "NOT_STARTED"
              const isBestMatch = problem.id === bestMatchId
              return (
                <Link
                  key={problem.id}
                  href={`/problems/${problem.slug}`}
                  className={`group flex items-center justify-between gap-4 rounded-xl border bg-card/50 px-5 py-4 backdrop-blur-sm transition-all hover:bg-card/80 ${
                    isBestMatch
                      ? "border-primary/60 shadow-[0_0_30px_-12px_oklch(0.72_0.19_40/0.7)]"
                      : "border-border/70 hover:border-primary/40"
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    {status === "SOLVED" ? (
                      <CheckCircle2 size={16} className="shrink-0 text-easy" />
                    ) : isBestMatch ? (
                      <Sparkles size={16} className="shrink-0 text-primary" />
                    ) : (
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" />
                    )}
                    <span className="truncate text-sm text-foreground sm:text-base">
                      {problem.title}
                    </span>
                  </div>
                  <DifficultyBadge difficulty={problem.difficulty} />
                </Link>
              )
            })}
            {topic.problems.length === 0 && (
              <p className="text-sm text-muted-foreground/60">
                No problems in this topic yet.
              </p>
            )}
          </section>

          {/* Algorithms / Useful tips / Notes — a scratchpad for the topic. */}
          <section className="mt-12 grid gap-4 md:grid-cols-2">
            <SuggestionCard
              icon={<Sparkles className="h-3.5 w-3.5 text-primary" />}
              eyebrow="Algorithms"
              title="Common patterns for this topic"
              body="Hashing, two-pointer, prefix-sum, and sliding-window notes live here. Drop patterns, pseudocode, and complexity tables as you learn them."
            />
            <SuggestionCard
              icon={<Lightbulb className="h-3.5 w-3.5 text-primary" />}
              eyebrow="Useful tips"
              title="Gotchas & mental models"
              body="Edge cases, invariants, and heuristics that trip you up — capture them here so they stick."
            />
            <div className="md:col-span-2">
              <SuggestionCard
                icon={<BookOpen className="h-3.5 w-3.5 text-primary" />}
                eyebrow="Notes"
                title="Your scratchpad"
                body="A blank canvas for anything else — links, derivations, cheatsheets, or references."
                tall
              />
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
