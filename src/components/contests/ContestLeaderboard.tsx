import { formatPenaltyTime } from "@/lib/contest-score"
import type { LeaderboardRow, ProblemMeta } from "@/lib/contest-leaderboard"
import { Trophy } from "lucide-react"

// Presentational leaderboard table. Themed with the public `.forge` tokens so it
// sits inside the contest pages. `live` just tweaks the heading/caption.
// Each problem gets its own column showing that player's solve time + the wrong-
// submission penalty they took on it (the ICPC-style per-problem breakdown).
export function ContestLeaderboard({
  rows,
  problemCount,
  problemsMeta,
  live,
}: {
  rows: LeaderboardRow[]
  problemCount: number
  problemsMeta: ProblemMeta[]
  live: boolean
}) {
  if (rows.length === 0) {
    return (
      <div className="rounded-2xl border border-border/70 bg-card/60 p-6 text-center text-sm text-muted-foreground backdrop-blur-sm">
        No one has submitted yet. {live ? "Be the first!" : "This round had no entrants."}
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm">
      <div className="flex items-center justify-between border-b border-border/70 px-5 py-3">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-primary" />
          <h2 className="text-sm font-medium text-foreground">
            {live ? "Live standings" : "Final standings"}
          </h2>
        </div>
        {live ? (
          <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wide text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Updating
          </span>
        ) : null}
      </div>

      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
            <th className="px-5 py-2 font-medium">#</th>
            <th className="px-2 py-2 font-medium">Player</th>
            <th className="px-2 py-2 text-center font-medium">Solved</th>
            {problemsMeta.map((p) => (
              <th
                key={p.problemId}
                className="px-2 py-2 text-center font-medium"
                title={p.title}
              >
                {p.label}
              </th>
            ))}
            <th className="px-2 py-2 text-center font-medium">Time</th>
            <th className="px-5 py-2 text-right font-medium">XP</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => {
            // Per-problem scores keyed by id so columns line up with the header
            // regardless of the order scoring returned them in.
            const byId = new Map(r.perProblem.map((p) => [p.problemId, p]))
            return (
              <tr
                key={r.userId}
                className={`border-t border-border/50 ${
                  r.isCurrentUser ? "bg-primary/10" : ""
                }`}
              >
                <td className="px-5 py-2.5 font-mono text-muted-foreground">
                  {r.rank <= 3 ? (
                    <span
                      className={
                        r.rank === 1
                          ? "text-yellow-400"
                          : r.rank === 2
                            ? "text-zinc-300"
                            : "text-amber-600"
                      }
                    >
                      {r.rank}
                    </span>
                  ) : (
                    r.rank
                  )}
                </td>
                <td className="px-2 py-2.5">
                  <span
                    className={
                      r.isCurrentUser
                        ? "font-medium text-primary"
                        : "text-foreground/90"
                    }
                  >
                    {r.name}
                    {r.isCurrentUser ? " (you)" : ""}
                  </span>
                </td>
                <td className="px-2 py-2.5 text-center font-mono text-foreground">
                  {r.solvedCount}
                  <span className="text-muted-foreground/60">/{problemCount}</span>
                </td>
                {problemsMeta.map((p) => (
                  <td
                    key={p.problemId}
                    className="px-2 py-2.5 text-center font-mono"
                  >
                    <ProblemCell score={byId.get(p.problemId)} />
                  </td>
                ))}
                <td className="px-2 py-2.5 text-center font-mono text-muted-foreground">
                  {r.solvedCount > 0 ? formatPenaltyTime(r.penaltyTime) : "—"}
                </td>
                <td className="px-5 py-2.5 text-right font-mono text-primary">
                  +{r.contestXp}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

// One problem cell: green solve-minute for a solved problem (with a red "+N"
// wrong-penalty tag if they missed before solving), or a dim dash / red wrong
// count if they never got it.
function ProblemCell({
  score,
}: {
  score?: {
    solved: boolean
    solveMinutes: number | null
    wrongBeforeSolve: number
  }
}) {
  if (!score || (!score.solved && score.wrongBeforeSolve === 0)) {
    return <span className="text-muted-foreground/40">·</span>
  }
  if (score.solved) {
    return (
      <span className="inline-flex flex-col items-center leading-tight">
        <span className="text-emerald-400">{score.solveMinutes}′</span>
        {score.wrongBeforeSolve > 0 ? (
          <span className="text-[10px] text-red-400/80">
            +{score.wrongBeforeSolve}
          </span>
        ) : null}
      </span>
    )
  }
  return (
    <span className="text-red-400/70" title={`${score.wrongBeforeSolve} wrong`}>
      −{score.wrongBeforeSolve}
    </span>
  )
}
