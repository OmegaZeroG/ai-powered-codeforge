import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { ProductNav } from "@/components/ProductNav"
import { ContestCountdown } from "@/components/contests/ContestCountdown"
import { LocalTime } from "@/components/contests/LocalTime"
import {
  contestStatus,
  CONTEST_DURATION_MS,
  type ContestStatus,
} from "@/lib/contest"
import { Trophy, CalendarClock, Clock } from "lucide-react"
import type { Difficulty } from "@/types"

export const dynamic = "force-dynamic"

const DIFF_PILL: Record<Difficulty, string> = {
  EASY: "text-easy border-easy/40",
  MEDIUM: "text-medium border-medium/40",
  HARD: "text-hard border-hard/40",
}

function DifficultyPill({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] ${DIFF_PILL[difficulty]}`}
    >
      {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
    </span>
  )
}

type ContestCard = {
  id: string
  title: string
  slug: string
  difficulty: Difficulty
  startsAt: Date
  endsAt: Date
  problems: { problem: { title: string; slug: string } }[]
}

export default async function ContestsPage() {
  const now = new Date()
  const rows = await prisma.contest.findMany({
    orderBy: { startsAt: "asc" },
    include: {
      problems: {
        orderBy: { order: "asc" },
        include: { problem: { select: { title: true, slug: true } } },
      },
    },
  })

  const contests = rows.map((c) => ({
    contest: c as unknown as ContestCard,
    status: contestStatus(c, now.getTime()) as ContestStatus,
  }))
  const live = contests.filter((c) => c.status === "live")
  const upcoming = contests.filter((c) => c.status === "upcoming")
  const past = contests
    .filter((c) => c.status === "past")
    .sort((a, b) => b.contest.startsAt.getTime() - a.contest.startsAt.getTime())
    .slice(0, 8)

  const hasAny = live.length + upcoming.length + past.length > 0

  return (
    <div className="forge relative min-h-screen overflow-hidden">
      <div className="relative z-10">
        <ProductNav />
        <main className="mx-auto max-w-4xl px-6 py-10">
          <header className="mb-8">
            <div className="flex items-center gap-2">
              <Trophy size={20} className="text-primary" />
              <h1 className="font-display text-2xl tracking-tight text-foreground">
                Contests
              </h1>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Weekly rated rounds — every Sunday at 10 PM, one hour, three
              problems of a single difficulty.
            </p>
          </header>

          {live.length > 0 ? (
            <section className="mb-8 space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                Live now
              </h2>
              {live.map(({ contest }) => (
                <ContestCardView key={contest.id} contest={contest} status="live" />
              ))}
            </section>
          ) : null}

          {upcoming.length > 0 ? (
            <section className="mb-8 space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                Upcoming
              </h2>
              {upcoming.map(({ contest }) => (
                <ContestCardView
                  key={contest.id}
                  contest={contest}
                  status="upcoming"
                />
              ))}
            </section>
          ) : null}

          {past.length > 0 ? (
            <section className="mb-8 space-y-3">
              <h2 className="text-sm font-medium text-muted-foreground">
                Past rounds
              </h2>
              {past.map(({ contest }) => (
                <ContestCardView key={contest.id} contest={contest} status="past" />
              ))}
            </section>
          ) : null}

          {!hasAny ? (
            <div className="rounded-2xl border border-border/70 bg-card/60 p-8 text-center backdrop-blur-sm">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <CalendarClock size={22} />
              </div>
              <h2 className="mt-4 font-medium text-foreground">
                No contests scheduled yet
              </h2>
              <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
                Rated rounds are on the way. In the meantime, keep sharp by
                working through the problem set.
              </p>
              <div className="mt-6">
                <Link
                  href="/problems"
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Practice problems
                </Link>
              </div>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  )
}

function ContestCardView({
  contest,
  status,
}: {
  contest: ContestCard
  status: ContestStatus
}) {
  const durationMin = Math.round(CONTEST_DURATION_MS / 60000)
  return (
    <article className="rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-sm">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <DifficultyPill difficulty={contest.difficulty} />
          <h3 className="font-display text-lg tracking-tight text-foreground">
            {contest.title}
          </h3>
        </div>
        {status === "live" ? (
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wide text-primary">
              Ends in
            </div>
            <ContestCountdown
              target={contest.endsAt}
              className="font-mono text-sm text-foreground"
            />
          </div>
        ) : status === "upcoming" ? (
          <div className="text-right">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Starts in
            </div>
            <ContestCountdown
              target={contest.startsAt}
              className="font-mono text-sm text-foreground"
            />
          </div>
        ) : (
          <span className="text-xs text-muted-foreground/70">Finished</span>
        )}
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <CalendarClock size={12} />
          <LocalTime value={contest.startsAt.toISOString()} />
        </span>
        <span className="inline-flex items-center gap-1">
          <Clock size={12} />
          {durationMin} min
        </span>
        <span>{contest.problems.length} problems</span>
      </div>

      <ol className="mt-3 space-y-1">
        {contest.problems.map((p, i) => {
          const locked = status === "upcoming"
          const label = (
            <>
              <span className="mr-2 font-mono text-xs text-muted-foreground/70">
                {String.fromCharCode(65 + i)}
              </span>
              {locked ? "Hidden until start" : p.problem.title}
            </>
          )
          return (
            <li key={p.problem.slug}>
              {locked ? (
                <span className="text-sm text-muted-foreground/60">{label}</span>
              ) : (
                <Link
                  href={`/problems/${p.problem.slug}`}
                  className="text-sm text-foreground/90 transition-colors hover:text-primary"
                >
                  {label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </article>
  )
}
