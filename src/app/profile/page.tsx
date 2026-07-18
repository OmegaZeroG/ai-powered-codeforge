import { redirect } from "next/navigation"
import Link from "next/link"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { loadGamification } from "@/lib/gamification"
import { ProductNav } from "@/components/ProductNav"
import {
  RankCard,
  BadgesCard,
  StreakCard,
  RecentSolvesCard,
} from "@/components/gamification/GamificationCards"
import { TasksCard } from "@/components/gamification/TasksCard"
import { SolveCalendar } from "@/components/gamification/SolveCalendar"
import { EditProfileDialog } from "@/components/profile/EditProfileDialog"
import { BanNotice } from "@/components/profile/BanNotice"
import { isBanActive } from "@/lib/ban"
import { MapPin, LinkIcon } from "lucide-react"
import type { Difficulty } from "@/types"

export const metadata = {
  title: "Profile — CodeForge",
  description:
    "Your CodeForge profile: rank, badges, daily tasks, solve calendar and streak.",
}

const DIFF_COLOR: Record<Difficulty, string> = {
  EASY: "var(--easy)",
  MEDIUM: "var(--medium)",
  HARD: "var(--hard)",
}

// lucide-react dropped its brand glyphs (Github/Linkedin); inline the mark.
function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .5C5.73.5.5 5.73.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.2-3.1-.12-.29-.52-1.46.11-3.05 0 0 .98-.31 3.2 1.18a11.1 11.1 0 0 1 5.82 0c2.22-1.5 3.2-1.18 3.2-1.18.63 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.7 5.4-5.28 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
    </svg>
  )
}

export default async function ProfilePage() {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) redirect("/login?callbackUrl=/profile")

  const [user, game] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        image: true,
        createdAt: true,
        bio: true,
        location: true,
        githubHandle: true,
        website: true,
        banned: true,
        bannedUntil: true,
        bannedReason: true,
      },
    }),
    loadGamification(userId),
  ])

  const banned = user ? isBanActive(user) : false
  const displayName = user?.name || user?.email?.split("@")[0] || "Coder"
  const handle = user?.email ? user.email.split("@")[0] : "coder"
  const initials = displayName
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
  const joined = user?.createdAt
    ? user.createdAt.toLocaleString("en-US", { month: "short", year: "numeric" })
    : null

  const acceptance =
    game.stats.recentAccuracy !== null
      ? `${Math.round(game.stats.recentAccuracy * 100)}%`
      : "—"

  const stats = [
    {
      label: "Solved",
      value: String(game.stats.solvedCount),
      sub: `of ${game.stats.totalProblems}`,
    },
    { label: "Acceptance", value: acceptance, sub: "recent" },
    {
      label: "Submissions",
      value: String(game.stats.submissionCount),
      sub: "all time",
    },
    { label: "Streak", value: String(game.streak), sub: `best ${game.bestStreak}` },
  ]

  const difficulties: Difficulty[] = ["EASY", "MEDIUM", "HARD"]

  return (
    <div className="forge relative min-h-screen overflow-hidden">
      {/* Warm-ember backdrop: fine grid + a soft radial glow up top */}
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-ember-radial opacity-40" />

      <div className="relative z-10">
        <ProductNav />

        <main className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)_300px]">
            {/* LEFT rail */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <RankCard rank={game.rank} />
              <BadgesCard badges={game.badges} />
              <TasksCard daily={game.tasks.daily} weekly={game.tasks.weekly} />
            </aside>

            {/* CENTER */}
            <div className="space-y-6">
              {banned ? (
                <BanNotice
                  reason={user?.bannedReason ?? null}
                  bannedUntil={
                    user?.bannedUntil ? user.bannedUntil.toISOString() : null
                  }
                />
              ) : null}
              {/* Identity */}
              <section className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {user?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.image}
                          alt={displayName}
                          className="h-20 w-20 rounded-2xl object-cover shadow-[0_0_36px_-8px_var(--ember)]"
                        />
                      ) : (
                        <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-primary to-primary/40 font-display text-3xl text-primary-foreground shadow-[0_0_36px_-8px_var(--ember)]">
                          {initials || "CF"}
                        </div>
                      )}
                      <div className="absolute -bottom-1.5 -right-1.5 rounded-md border border-primary/60 bg-background px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-primary">
                        {game.rank.tier} {game.rank.romanDivision}
                      </div>
                    </div>
                    <div>
                      <h1 className="font-display text-3xl tracking-tight text-foreground sm:text-4xl">
                        {displayName}
                      </h1>
                      <p className="mt-1 font-mono text-xs text-muted-foreground">
                        @{handle}
                        {joined ? ` · Joined ${joined}` : ""}
                      </p>
                      {user?.bio && (
                        <p className="mt-2 max-w-md text-sm text-foreground/80">
                          {user.bio}
                        </p>
                      )}
                      <div className="mt-2 flex flex-wrap items-center gap-3 font-mono text-[11px] text-muted-foreground">
                        {user?.location && (
                          <span className="flex items-center gap-1.5">
                            <MapPin size={12} /> {user.location}
                          </span>
                        )}
                        {user?.githubHandle && (
                          <a
                            href={`https://github.com/${user.githubHandle}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 transition-colors hover:text-primary"
                          >
                            <GithubIcon className="h-3 w-3" /> {user.githubHandle}
                          </a>
                        )}
                        {user?.website && (
                          <a
                            href={user.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 transition-colors hover:text-primary"
                          >
                            <LinkIcon size={12} />{" "}
                            {user.website.replace(/^https?:\/\//, "")}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                  <EditProfileDialog
                    initial={{
                      name: user?.name ?? "",
                      image: user?.image ?? "",
                      bio: user?.bio ?? "",
                      location: user?.location ?? "",
                      githubHandle: user?.githubHandle ?? "",
                      website: user?.website ?? "",
                    }}
                  />
                </div>
              </section>

              {/* Stats grid */}
              <section className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                      {s.label}
                    </div>
                    <div className="mt-2 font-display text-3xl text-foreground">
                      {s.value}
                    </div>
                    <div className="mt-1 font-mono text-[11px] text-muted-foreground/70">
                      {s.sub}
                    </div>
                  </div>
                ))}
              </section>

              {/* Solved by difficulty */}
              <section className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  <span>Solved by difficulty</span>
                  <span>{game.stats.solvedCount} total</span>
                </div>
                <div className="mt-5 space-y-4">
                  {difficulties.map((d) => {
                    const row = game.byDifficulty[d]
                    const pct =
                      row.total === 0 ? 0 : (row.solved / row.total) * 100
                    const color = DIFF_COLOR[d]
                    return (
                      <div key={d}>
                        <div className="flex items-center justify-between text-sm">
                          <span
                            style={{ color }}
                            className="font-mono text-xs uppercase tracking-wider"
                          >
                            {d.charAt(0) + d.slice(1).toLowerCase()}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {row.solved}/{row.total}
                          </span>
                        </div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${pct}%`,
                              background: color,
                              opacity: 0.9,
                            }}
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>

              {/* Recent solves */}
              <RecentSolvesCard solves={game.recentSolves} />
            </div>

            {/* RIGHT rail */}
            <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
              <SolveCalendar solvedDays={game.solvedDays} />
              <StreakCard streak={game.streak} bestStreak={game.bestStreak} />
            </aside>
          </div>

          <p className="mt-10 text-center font-mono text-[11px] text-muted-foreground/70">
            Practicing pays off —{" "}
            <Link href="/topics" className="text-primary hover:text-ember-glow">
              keep solving →
            </Link>
          </p>
        </main>
      </div>
    </div>
  )
}
