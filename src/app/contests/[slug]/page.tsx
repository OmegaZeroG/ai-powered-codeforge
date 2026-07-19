import { notFound, redirect } from "next/navigation"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { contestStatus } from "@/lib/contest"
import { ContestArena, type ArenaProblem } from "@/components/contests/ContestArena"
import { ContestCountdown } from "@/components/contests/ContestCountdown"
import { LocalTime } from "@/components/contests/LocalTime"
import { ContestResultView } from "@/components/contests/ContestResultView"
import { loadLeaderboard } from "@/lib/contest-leaderboard"
import { ProductNav } from "@/components/ProductNav"
import { Lock } from "lucide-react"
import type { Language } from "@/types"

export const dynamic = "force-dynamic"

export default async function ContestArenaPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const session = await auth()
  if (!session?.user?.id) {
    redirect(`/login?next=/contests/${slug}`)
  }

  const contest = await prisma.contest.findUnique({
    where: { slug },
    include: {
      problems: {
        orderBy: { order: "asc" },
        include: {
          problem: {
            include: {
              testCases: {
                where: { isSample: true },
                orderBy: { order: "asc" },
                select: { input: true, expected: true, isSample: true },
              },
            },
          },
        },
      },
    },
  })

  if (!contest) {
    notFound()
  }

  const status = contestStatus(contest)

  // ---- Upcoming: gate the problems, show a countdown to the start ----
  if (status === "upcoming") {
    return (
      <GateShell>
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
          <Lock size={22} />
        </div>
        <h1 className="mt-4 font-display text-2xl tracking-tight text-foreground">
          {contest.title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          This round hasn&apos;t started yet. Problems unlock when the timer hits
          zero.
        </p>
        <div className="mt-6 inline-flex flex-col items-center gap-1">
          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
            Starts in
          </span>
          <ContestCountdown
            target={contest.startsAt}
            className="font-mono text-xl text-foreground"
          />
          <span className="mt-1 text-xs text-muted-foreground/70">
            <LocalTime value={contest.startsAt.toISOString()} />
          </span>
        </div>
      </GateShell>
    )
  }

  // ---- Live: the actual arena ----
  const arenaProblems: ArenaProblem[] = contest.problems.map((cp) => ({
    id: cp.problem.id,
    slug: cp.problem.slug,
    title: cp.problem.title,
    statement: cp.problem.statement,
    constraints: cp.problem.constraints,
    difficulty: cp.problem.difficulty,
    starterCode: cp.problem.starterCode as
      | Partial<Record<Language, string>>
      | null,
    sampleTestCases: cp.problem.testCases,
  }))

  if (status === "live") {
    // If this user already ended their round early, show the results view (score
    // card + live-updating standings) instead of the arena — they can't submit
    // anymore, but they can watch the board until the contest closes.
    const myEntry = await prisma.contestParticipant.findUnique({
      where: { contestId_userId: { contestId: contest.id, userId: session.user.id } },
      select: { finishedAt: true },
    })

    if (myEntry?.finishedAt) {
      const board = await loadLeaderboard(contest.id, session.user.id)
      return (
        <GateShell wide>
          <ContestResultView
            title={contest.title}
            difficulty={contest.difficulty}
            startsAt={contest.startsAt.toISOString()}
            board={board}
            live
            finishedEarly
          />
        </GateShell>
      )
    }

    // Which of these the user has solved *inside this contest* — used to pre-mark
    // the tabs. This must be scoped to contest submissions, NOT overall practice
    // progress: a problem the user solved earlier in the problem set is still
    // unsolved *for the round* until they submit it here (tagged with contestId).
    const solvedRows = await prisma.submission.findMany({
      where: {
        userId: session.user.id,
        contestId: contest.id,
        verdict: "ACCEPTED",
        problemId: { in: arenaProblems.map((p) => p.id) },
      },
      select: { problemId: true },
      distinct: ["problemId"],
    })
    const initialSolvedIds = solvedRows.map((r) => r.problemId)

    return (
      <ContestArena
        contest={{
          id: contest.id,
          title: contest.title,
          difficulty: contest.difficulty,
          startsAt: contest.startsAt.toISOString(),
          endsAt: contest.endsAt.toISOString(),
        }}
        problems={arenaProblems}
        initialSolvedIds={initialSolvedIds}
      />
    )
  }

  // ---- Past: final results — score card + final standings ----
  const board = await loadLeaderboard(contest.id, session.user.id)

  return (
    <GateShell wide>
      <ContestResultView
        title={contest.title}
        difficulty={contest.difficulty}
        startsAt={contest.startsAt.toISOString()}
        board={board}
        live={false}
        finishedEarly={false}
      />
    </GateShell>
  )
}

// Shared centered shell for the non-arena (upcoming / past) states, themed with
// the public `.forge` tokens to match the contests list.
function GateShell({
  children,
  wide = false,
}: {
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <div className="forge relative min-h-screen overflow-hidden">
      <div className="relative z-10">
        <ProductNav />
        <main className="mx-auto max-w-4xl px-6 py-16">
          <div
            className={`mx-auto rounded-2xl border border-border/70 bg-card/60 p-8 text-center backdrop-blur-sm ${
              wide ? "max-w-2xl" : "max-w-lg"
            }`}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
