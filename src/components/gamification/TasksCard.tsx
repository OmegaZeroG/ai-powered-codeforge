"use client"

import * as React from "react"
import { Target, CheckCircle2, Loader2 } from "lucide-react"
import type { Task } from "@/lib/gamification"
import { claimTask } from "@/app/profile/actions"

/* ---------------------------------------------------------------------------
   TasksCard — daily/weekly objectives with real "Claim +XP" buttons.
   A task moves through three states: not done → done (claimable) → claimed.
   Claiming calls the server action, which re-verifies completion and banks the
   XP into the user's total; on success we optimistically flip to "claimed" and
   refresh so the rank bar reflects the new XP.
--------------------------------------------------------------------------- */

function TaskRow({ task }: { task: Task }) {
  const [pending, startTransition] = React.useTransition()
  const [claimed, setClaimed] = React.useState(task.claimed)
  const [error, setError] = React.useState<string | null>(null)

  // Keep in sync if the server sends a fresh value after revalidation.
  React.useEffect(() => setClaimed(task.claimed), [task.claimed])

  const onClaim = () => {
    setError(null)
    startTransition(async () => {
      const res = await claimTask(task.key)
      if (res.ok) {
        setClaimed(true)
      } else {
        setError(res.error)
      }
    })
  }

  return (
    <li className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-secondary/30 px-3 py-2.5 text-sm">
      <div className="flex min-w-0 items-center gap-2.5">
        <span
          className={`grid h-4 w-4 shrink-0 place-items-center rounded-sm border ${
            task.done
              ? "border-easy bg-easy text-background"
              : "border-border text-transparent"
          }`}
        >
          {task.done && <CheckCircle2 size={11} strokeWidth={3} />}
        </span>
        <span
          className={`truncate ${
            claimed ? "text-muted-foreground/60 line-through" : "text-foreground/90"
          }`}
          title={error ?? undefined}
        >
          {task.label}
        </span>
      </div>

      {claimed ? (
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
          Claimed
        </span>
      ) : task.done ? (
        <button
          type="button"
          onClick={onClaim}
          disabled={pending}
          className="inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/50 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-primary transition-colors hover:bg-primary/20 disabled:opacity-60"
        >
          {pending && <Loader2 size={10} className="animate-spin" />}
          Claim +{task.xp}
        </button>
      ) : (
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-muted-foreground/50">
          +{task.xp}
        </span>
      )}
    </li>
  )
}

export function TasksCard({
  daily,
  weekly,
}: {
  daily: Task[]
  weekly: Task[]
}) {
  return (
    <section className="rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          <Target size={13} className="text-primary" />
          Daily tasks
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {daily.map((t) => (
          <TaskRow key={t.key} task={t} />
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Weekly
        </span>
      </div>
      <ul className="mt-3 space-y-2">
        {weekly.map((t) => (
          <TaskRow key={t.key} task={t} />
        ))}
      </ul>
    </section>
  )
}
