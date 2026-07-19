import Link from "next/link"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { loadContestHistory } from "@/lib/contest-stats"
import { formatPenaltyTime } from "@/lib/contest-score"
import { ProductNav } from "@/components/ProductNav"
import { LocalTime } from "@/components/contests/LocalTime"
import { Swords, CalendarClock } from "lucide-react"
import type { Difficulty } from "@/types"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "My contests — CodeForge",
  description: "Every rated round you've competed in, with your rank and score.",
}

const DIFF_PILL: Record<Difficulty, string> = {
  EASY: "text-easy border-easy/40",
  MEDIUM: "text-medium border-medium/40",
  HARD: "text-hard border-hard/40",
}

export default async function ContestHistoryPage() {
  const session = await auth()
  const userId = session?.user?.id
  if (!userId) redirect("/login?callbackUrl=/contests/history")

  const history = await loadContestHistory(userId)

  const best = history.length ? Math.min(...history.map((h) => h.rank)) : null
  const avg = history.length
    ? Math.round(
        (history.reduce((a, h) => a + h.rank, 0) / history.length) * 10,
      ) / 10
    : null
  const totalXp = history.reduce((a, h) => a + h.contestXp, 0)

  return (
    <div className="forge relative min-h-screen overflow-hidden">
      <div className="relative z-10">
        <ProductNav />
        <main className="mx-auto max-w-4xl px-6 py-10">
          <header className="mb-8">
            <div className="flex items-center gap-2">
              <Swords size={20} className="text-primary" />
              <h1 className="font-display text-2xl tracking-tight text-foreground">
                My contests
              </h1>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              Every rated round you&apos;ve competed in, with the rank and score
              you finished on.
            </p>
          </header>

          {history.length === 0 ? (
            <div className="rounded-2xl border border-border/70 bg-card/60 p-8 text-center backdrop-blur-sm">
              <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-primary/10 text-primary">
                <CalendarClock size={22} />
              </div>
              <h2 className="mt-4 font-medium text-foreground">
                No contests yet
              </h2>
              <p className="mx-auto mt-1.5 max-w-md text-sm text-muted-foreground">
                Once you compete in a rated round and it finishes, your ranking
                history shows up here.
              </p>
              <div className="mt-6">
                <Link
                  href="/contests"
                  className="inline-flex items-center gap-1.5 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Browse contests
                </Link>
              </div>
            </div>
          ) : (
            <>
              {/* Summary strip */}
              <section className="mb-6 grid grid-cols-3 gap-3">
                <SummaryCell label="Contests" value={String(history.length)} />
                <SummaryCell label="Best rank" value={best ? `#${best}` : "—"} />
                <SummaryCell label="Avg rank" value={avg ? `#${avg}` : "—"} />
              </section>

              {/* History table */}
              <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                      <th className="px-5 py-3 font-medium">Contest</th>
                      <th className="px-2 py-3 text-center font-medium">Rank</th>
                      <th className="px-2 py-3 text-center font-medium">Solved</th>
                      <th className="px-2 py-3 text-center font-medium">Time</th>
                      <th className="px-5 py-3 text-right font-medium">XP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.map((h) => (
                      <tr key={h.contestId} className="border-t border-border/50">
                        <td className="px-5 py-3">
                          <Link
                            href={`/contests/${h.slug}`}
                            className="group inline-flex flex-col"
                          >
                            <span className="flex items-center gap-2">
                              <span
                                className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] ${DIFF_PILL[h.difficulty]}`}
                              >
                                {h.difficulty.charAt(0) +
                                  h.difficulty.slice(1).toLowerCase()}
                              </span>
                              <span className="text-foreground transition-colors group-hover:text-primary">
                                {h.title}
                              </span>
                            </span>
                            <span className="mt-0.5 font-mono text-[11px] text-muted-foreground">
                              <LocalTime value={h.endsAt.toISOString()} />
                            </span>
                          </Link>
                        </td>
                        <td className="px-2 py-3 text-center font-mono">
                          <span
                            className={
                              h.rank === 1
                                ? "text-yellow-400"
                                : h.rank === 2
                                  ? "text-zinc-300"
                                  : h.rank === 3
                                    ? "text-amber-600"
                                    : "text-foreground"
                            }
                          >
                            #{h.rank}
                          </span>
                          <span className="text-muted-foreground/60">
                            /{h.totalPlayers}
                          </span>
                        </td>
                        <td className="px-2 py-3 text-center font-mono text-foreground">
                          {h.solvedCount}
                        </td>
                        <td className="px-2 py-3 text-center font-mono text-muted-foreground">
                          {h.solvedCount > 0
                            ? formatPenaltyTime(h.penaltyTime)
                            : "—"}
                        </td>
                        <td className="px-5 py-3 text-right font-mono text-primary">
                          +{h.contestXp}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-right font-mono text-[11px] text-muted-foreground">
                Total contest XP earned:{" "}
                <span className="text-primary">+{totalXp}</span>
              </p>
            </>
          )}
        </main>
      </div>
    </div>
  )
}

function SummaryCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 p-4 text-center backdrop-blur-sm">
      <div className="font-display text-2xl text-foreground">{value}</div>
      <div className="mt-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  )
}
