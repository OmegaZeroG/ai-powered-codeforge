import Link from "next/link"
import { LocalTime } from "@/components/contests/LocalTime"
import { ContestLeaderboard } from "@/components/contests/ContestLeaderboard"
import { formatPenaltyTime, PENALTY_MINUTES } from "@/lib/contest-score"
import type { LeaderboardData } from "@/lib/contest-leaderboard"
import type { Difficulty } from "@/types"
import { DifficultyTag } from "@/components/Verdict"
import { Trophy, Medal, Target, Timer, Sparkles } from "lucide-react"

// The results screen: a personal score card (rank / solved / time / XP) on top
// of the standings. Shown when a user has finished a live contest early, and on
// any past contest. `live` toggles the "still running" framing.
export function ContestResultView({
  title,
  difficulty,
  startsAt,
  board,
  live,
  finishedEarly,
}: {
  title: string
  difficulty: Difficulty
  startsAt: string
  board: LeaderboardData
  live: boolean
  finishedEarly: boolean
}) {
  const me = board.me

  return (
    <div className="space-y-6">
      <header className="text-center">
        <div className="flex items-center justify-center gap-2">
          <Trophy size={20} className="text-primary" />
          <h1 className="font-display text-2xl tracking-tight text-foreground">
            {title}
          </h1>
          <DifficultyTag difficulty={difficulty} />
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          {live
            ? finishedEarly
              ? "You've ended your round. Standings update live until the contest closes."
              : "The contest is live — here are the current standings."
            : "This contest has finished. Here are the final results."}{" "}
          <span className="inline-flex items-center gap-1 align-middle">
            <LocalTime value={startsAt} />
          </span>
        </p>
      </header>

      {me ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <ScoreStat
            icon={<Medal size={16} />}
            label={live ? "Current rank" : "Final rank"}
            value={`#${me.rank}`}
            accent
          />
          <ScoreStat
            icon={<Target size={16} />}
            label="Solved"
            value={`${me.solvedCount}/${board.problemCount}`}
          />
          <ScoreStat
            icon={<Timer size={16} />}
            label="Time + penalty"
            value={me.solvedCount > 0 ? formatPenaltyTime(me.penaltyTime) : "—"}
          />
          <ScoreStat
            icon={<Sparkles size={16} />}
            label="Contest XP"
            value={`+${me.contestXp}`}
            accent
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-border/70 bg-card/60 p-5 text-center text-sm text-muted-foreground backdrop-blur-sm">
          You didn&apos;t submit anything in this contest, so you&apos;re not on
          the board.
        </div>
      )}

      {me && me.perProblem.some((p) => p.solved || p.wrongBeforeSolve > 0) ? (
        <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm">
          <div className="border-b border-border/70 px-5 py-3 text-sm font-medium text-foreground">
            Your problem breakdown
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-2 font-medium">Problem</th>
                <th className="px-2 py-2 text-center font-medium">Status</th>
                <th className="px-2 py-2 text-center font-medium">Solved at</th>
                <th className="px-2 py-2 text-center font-medium">Wrong tries</th>
                <th className="px-5 py-2 text-right font-medium">Penalty</th>
              </tr>
            </thead>
            <tbody>
              {board.problemsMeta.map((pm) => {
                const ps = me.perProblem.find(
                  (p) => p.problemId === pm.problemId,
                )
                const solved = ps?.solved ?? false
                const attempted = solved || (ps?.wrongBeforeSolve ?? 0) > 0
                return (
                  <tr key={pm.problemId} className="border-t border-border/50">
                    <td className="px-5 py-2.5">
                      <span className="font-mono text-muted-foreground">
                        {pm.label}
                      </span>{" "}
                      <span className="text-foreground/90">{pm.title}</span>
                    </td>
                    <td className="px-2 py-2.5 text-center">
                      {solved ? (
                        <span className="text-emerald-400">Solved</span>
                      ) : attempted ? (
                        <span className="text-red-400/80">Unsolved</span>
                      ) : (
                        <span className="text-muted-foreground/50">—</span>
                      )}
                    </td>
                    <td className="px-2 py-2.5 text-center font-mono text-foreground">
                      {solved && ps?.solveMinutes != null
                        ? formatPenaltyTime(ps.solveMinutes)
                        : "—"}
                    </td>
                    <td className="px-2 py-2.5 text-center font-mono text-muted-foreground">
                      {ps?.wrongBeforeSolve ? ps.wrongBeforeSolve : "—"}
                    </td>
                    <td className="px-5 py-2.5 text-right font-mono">
                      {solved && ps ? (
                        <span className="text-foreground">
                          {formatPenaltyTime(ps.penaltyMinutes)}
                          {ps.wrongBeforeSolve > 0 ? (
                            <span className="ml-1 text-[10px] text-red-400/70">
                              ({ps.solveMinutes}′ +{ps.wrongBeforeSolve}×{PENALTY_MINUTES})
                            </span>
                          ) : null}
                        </span>
                      ) : (
                        <span className="text-muted-foreground/50">—</span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      ) : null}

      <ContestLeaderboard
        rows={board.rows}
        problemCount={board.problemCount}
        problemsMeta={board.problemsMeta}
        live={live}
      />

      <div className="text-center">
        <Link
          href="/contests"
          className="inline-flex items-center gap-1.5 rounded-md border border-border/70 px-4 py-2 text-sm font-medium text-foreground/90 transition-opacity hover:opacity-90"
        >
          Back to contests
        </Link>
      </div>
    </div>
  )
}

function ScoreStat({
  icon,
  label,
  value,
  accent = false,
}: {
  icon: React.ReactNode
  label: string
  value: string
  accent?: boolean
}) {
  return (
    <div className="rounded-xl border border-border/70 bg-card/60 p-4 text-center backdrop-blur-sm">
      <div
        className={`mx-auto mb-1.5 flex h-8 w-8 items-center justify-center rounded-lg ${
          accent ? "bg-primary/15 text-primary" : "bg-muted/40 text-muted-foreground"
        }`}
      >
        {icon}
      </div>
      <div
        className={`font-display text-xl tracking-tight ${
          accent ? "text-primary" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div className="mt-0.5 text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </div>
    </div>
  )
}
