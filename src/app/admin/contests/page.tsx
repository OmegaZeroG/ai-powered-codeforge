import { prisma } from "@/lib/prisma"
import { requirePermissionPage } from "@/lib/authz"
import { contestStatus, CONTEST_PROBLEM_COUNT } from "@/lib/contest"
import { createContest, cancelContest } from "@/app/admin/_actions/contests"
import {
  CreateContestControl,
  CancelContestButton,
} from "@/components/admin/ContestControls"
import { Trophy, Clock } from "lucide-react"
import { LocalTime } from "@/components/contests/LocalTime"

export const dynamic = "force-dynamic"

const STATUS_LABEL: Record<string, string> = {
  live: "Live",
  upcoming: "Upcoming",
  past: "Past",
}

const DIFF_TONE: Record<string, string> = {
  EASY: "var(--easy)",
  MEDIUM: "var(--medium)",
  HARD: "var(--hard)",
}

export default async function AdminContestsPage() {
  await requirePermissionPage("MANAGE_CONTESTS")

  const now = new Date()
  const contests = await prisma.contest.findMany({
    orderBy: { startsAt: "desc" },
    include: {
      _count: { select: { problems: true } },
      createdBy: { select: { name: true } },
    },
  })

  const withStatus = contests.map((c) => ({
    contest: c,
    status: contestStatus(c, now.getTime()),
  }))
  const active = withStatus.filter((c) => c.status !== "past")
  const past = withStatus.filter((c) => c.status === "past")

  return (
    <div className="space-y-8">
      <header className="flex items-center gap-2">
        <Trophy size={20} className="text-primary" />
        <h1 className="font-display text-2xl tracking-tight text-foreground">
          Contests
        </h1>
      </header>

      <CreateContestControl action={createContest} />

      <section className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">
          Scheduled &amp; live
        </h2>
        {active.length === 0 ? (
          <p className="rounded-xl border border-border/60 bg-background/40 p-4 text-sm text-muted-foreground">
            No upcoming or live contests. Schedule one above.
          </p>
        ) : (
          <ul className="space-y-2">
            {active.map(({ contest, status }) => (
              <ContestRow
                key={contest.id}
                contest={contest}
                status={status}
                cancellable
              />
            ))}
          </ul>
        )}
      </section>

      {past.length > 0 ? (
        <section className="space-y-3">
          <h2 className="text-sm font-medium text-muted-foreground">Past</h2>
          <ul className="space-y-2">
            {past.map(({ contest, status }) => (
              <ContestRow key={contest.id} contest={contest} status={status} />
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}

function ContestRow({
  contest,
  status,
  cancellable = false,
}: {
  contest: {
    id: string
    title: string
    difficulty: string
    startsAt: Date
    endsAt: Date
    _count: { problems: number }
    createdBy: { name: string | null } | null
  }
  status: string
  cancellable?: boolean
}) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/40 p-4">
      <div className="min-w-0 space-y-1">
        <div className="flex items-center gap-2">
          <span
            className="rounded-md border px-2 py-0.5 text-xs font-medium"
            style={{
              color: DIFF_TONE[contest.difficulty],
              borderColor: DIFF_TONE[contest.difficulty],
            }}
          >
            {contest.difficulty}
          </span>
          <span className="font-medium text-foreground">{contest.title}</span>
          <span
            className={`rounded-md px-1.5 py-0.5 text-[11px] ${
              status === "live"
                ? "bg-primary/15 text-primary"
                : status === "upcoming"
                  ? "bg-foreground/10 text-muted-foreground"
                  : "bg-transparent text-muted-foreground/70"
            }`}
          >
            {STATUS_LABEL[status]}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock size={12} />
          <LocalTime value={contest.startsAt.toISOString()} /> →{" "}
          <LocalTime value={contest.endsAt.toISOString()} />
          <span className="text-muted-foreground/60">·</span>
          {contest._count.problems} / {CONTEST_PROBLEM_COUNT} problems
          {contest.createdBy?.name ? (
            <>
              <span className="text-muted-foreground/60">·</span>
              by {contest.createdBy.name}
            </>
          ) : null}
        </div>
      </div>
      {cancellable ? (
        <CancelContestButton action={cancelContest} contestId={contest.id} />
      ) : null}
    </li>
  )
}
