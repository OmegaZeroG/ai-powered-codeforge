import Link from "next/link"
import {
  Award,
  Flame,
  Target,
  Trophy,
  Zap,
  Sparkles,
  Swords,
  type LucideIcon,
} from "lucide-react"
import type { Badge, RankInfo } from "@/lib/gamification"
import type { ContestStats } from "@/lib/contest-stats"

/* ---------------------------------------------------------------------------
   Gamification cards — rank, badges, daily/weekly tasks, streak.
   Warm-ember design (bg-card / border / primary / easy-medium-hard), a faithful
   port of the approved Lovable look, server-rendered from real derived data.
   The interactive calendar lives in SolveCalendar.tsx.
--------------------------------------------------------------------------- */

function CardShell({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      className={`rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-sm ${className}`}
    >
      {children}
    </section>
  )
}

function CardEyebrow({
  icon: Icon,
  children,
  right,
}: {
  icon: LucideIcon
  children: React.ReactNode
  right?: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
        <Icon size={13} className="text-primary" />
        {children}
      </span>
      {right && (
        <span className="font-mono text-[11px] text-muted-foreground/70">
          {right}
        </span>
      )}
    </div>
  )
}

/* ---------------------------------------------------------------- Rank ---- */

export function RankCard({ rank }: { rank: RankInfo }) {
  return (
    <CardShell>
      <CardEyebrow icon={Trophy}>Rank</CardEyebrow>
      <div className="mt-4 flex items-baseline gap-2">
        <div className="font-display text-3xl text-ember-glow text-foreground">
          {rank.tier}
        </div>
        <div className="font-mono text-[11px] text-muted-foreground">
          Tier {rank.romanDivision}
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
          <span>{rank.xp.toLocaleString()} XP</span>
          <span>
            {rank.tierCeil !== null
              ? `${rank.tierCeil.toLocaleString()} XP`
              : "MAX"}
          </span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-ember-glow shadow-[0_0_12px_var(--ember)]"
            style={{ width: `${Math.round(rank.progress * 100)}%` }}
          />
        </div>
        <p className="mt-3 text-xs text-muted-foreground">
          {rank.xpToNext !== null && rank.nextTier ? (
            <>
              {rank.xpToNext.toLocaleString()} XP to{" "}
              <span className="font-medium text-foreground">
                {rank.nextTier}
              </span>
            </>
          ) : (
            "Top tier reached."
          )}
        </p>
      </div>
    </CardShell>
  )
}

/* -------------------------------------------------------------- Badges ---- */

const BADGE_ICONS: Record<Badge["key"], LucideIcon> = {
  "first-solve": Flame,
  speed: Zap,
  accurate: Target,
  "ten-solved": Award,
  "topic-master": Trophy,
  "week-streak": Sparkles,
}

export function BadgesCard({ badges }: { badges: Badge[] }) {
  const earned = badges.filter((b) => b.earned).length
  return (
    <CardShell>
      <CardEyebrow icon={Award} right={`${earned}/${badges.length}`}>
        Badges
      </CardEyebrow>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {badges.map((badge) => {
          const Icon = BADGE_ICONS[badge.key]
          return (
            <div
              key={badge.key}
              title={badge.description}
              className={`flex flex-col items-center gap-1.5 rounded-xl border p-3 text-center transition-colors ${
                badge.earned
                  ? "border-primary/50 bg-primary/10 text-foreground"
                  : "border-border/60 bg-secondary/40 text-muted-foreground/50"
              }`}
            >
              <Icon
                size={18}
                className={badge.earned ? "text-primary" : ""}
              />
              <span className="font-mono text-[9px] uppercase leading-tight tracking-wider">
                {badge.label}
              </span>
            </div>
          )
        })}
      </div>
    </CardShell>
  )
}

/* --------------------------------------------------------------- Tasks ---- */
/* TasksCard lives in ./TasksCard.tsx — it's interactive (claim buttons) and
   therefore a client component, kept separate from these server cards. */

/* -------------------------------------------------------------- Streak ---- */

export function StreakCard({
  streak,
  bestStreak,
}: {
  streak: number
  bestStreak: number
}) {
  return (
    <CardShell>
      <CardEyebrow icon={Flame} right={`best ${bestStreak}`}>
        Streak
      </CardEyebrow>
      <div className="mt-3 flex items-baseline gap-2">
        <div className="font-display text-5xl text-ember-glow text-primary">
          {streak}
        </div>
        <div className="text-sm text-muted-foreground">
          {streak === 1 ? "day" : "days"}
        </div>
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        {streak > 0
          ? "Solve one problem today to keep it alive."
          : "Solve a problem today to start a streak."}
      </p>
    </CardShell>
  )
}

/* ------------------------------------------------------ Contest stats ---- */

export function ContestStatsCard({ stats }: { stats: ContestStats }) {
  const cells: { label: string; value: string }[] = [
    { label: "Contests", value: String(stats.participated) },
    { label: "Best rank", value: stats.bestRank ? `#${stats.bestRank}` : "—" },
    { label: "Avg rank", value: stats.avgRank ? `#${stats.avgRank}` : "—" },
    {
      label: "Recent",
      value: stats.recentRank ? `#${stats.recentRank}` : "—",
    },
  ]

  return (
    <CardShell>
      <CardEyebrow
        icon={Swords}
        right={
          <Link
            href="/contests/history"
            className="text-primary transition-colors hover:text-ember-glow"
          >
            All →
          </Link>
        }
      >
        Contests
      </CardEyebrow>

      {stats.participated === 0 ? (
        <p className="mt-4 text-xs text-muted-foreground">
          You haven&apos;t finished a contest yet. Your ranking history will show
          up here once you compete.
        </p>
      ) : (
        <>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {cells.map((c) => (
              <div
                key={c.label}
                className="rounded-xl border border-border/60 bg-secondary/40 p-3 text-center"
              >
                <div className="font-display text-2xl text-foreground">
                  {c.value}
                </div>
                <div className="mt-0.5 font-mono text-[9px] uppercase tracking-wider text-muted-foreground">
                  {c.label}
                </div>
              </div>
            ))}
          </div>
          {stats.recent ? (
            <Link
              href={`/contests/${stats.recent.slug}`}
              className="mt-3 block truncate text-center font-mono text-[11px] text-muted-foreground transition-colors hover:text-primary"
              title={stats.recent.title}
            >
              Last: {stats.recent.title}
            </Link>
          ) : null}
        </>
      )}
    </CardShell>
  )
}

/* ------------------------------------------------------- Recent solves ---- */

const RECENT_DIFF_COLOR: Record<string, string> = {
  EASY: "text-easy border-easy/40",
  MEDIUM: "text-medium border-medium/40",
  HARD: "text-hard border-hard/40",
}

export function RecentSolvesCard({
  solves,
}: {
  solves: {
    title: string
    slug: string
    topic: string
    difficulty: string
    solvedAt: Date | null
  }[]
}) {
  return (
    <CardShell>
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Recent solves
        </span>
        <Link
          href="/topics"
          className="font-mono text-[11px] text-primary transition-colors hover:text-ember-glow"
        >
          View all →
        </Link>
      </div>
      {solves.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground/70">
          No solves yet — your accepted problems will show up here.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-border/60">
          {solves.map((s) => (
            <li
              key={s.slug}
              className="flex items-center justify-between gap-4 py-3"
            >
              <div className="min-w-0">
                <Link
                  href={`/problems/${s.slug}`}
                  className="block truncate text-sm text-foreground transition-colors hover:text-primary"
                >
                  {s.title}
                </Link>
                <div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                  {s.topic}
                  {s.solvedAt ? ` · ${relativeTime(s.solvedAt)}` : ""}
                </div>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                  RECENT_DIFF_COLOR[s.difficulty] ??
                  "border-border text-muted-foreground"
                }`}
              >
                {s.difficulty.charAt(0) + s.difficulty.slice(1).toLowerCase()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </CardShell>
  )
}

function relativeTime(date: Date): string {
  const diff = Date.now() - date.getTime()
  const mins = Math.round(diff / 60000)
  if (mins < 1) return "just now"
  if (mins < 60) return `${mins}m ago`
  const hours = Math.round(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.round(hours / 24)
  if (days === 1) return "yesterday"
  if (days < 30) return `${days}d ago`
  const months = Math.round(days / 30)
  return `${months}mo ago`
}
