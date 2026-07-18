"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

/* ---------------------------------------------------------------------------
   SolveCalendar — month grid of solve activity.
   Days are compared in UTC to match the server's dayKey bucketing, so the
   highlighted cells line up with the streak math regardless of viewer locale.
   `solvedDays` is a list of "YYYY-MM-DD" UTC keys. Warm-ember design.
--------------------------------------------------------------------------- */

function utcDayKey(y: number, m: number, d: number): string {
  return new Date(Date.UTC(y, m, d)).toISOString().slice(0, 10)
}

export function SolveCalendar({ solvedDays }: { solvedDays: string[] }) {
  const solved = React.useMemo(() => new Set(solvedDays), [solvedDays])

  // Anchor "today" once on mount (client clock) to avoid hydration drift.
  const [now] = React.useState(() => new Date())
  const todayY = now.getUTCFullYear()
  const todayM = now.getUTCMonth()
  const todayD = now.getUTCDate()

  const [view, setView] = React.useState({ y: todayY, m: todayM })

  const first = new Date(Date.UTC(view.y, view.m, 1))
  const daysInMonth = new Date(Date.UTC(view.y, view.m + 1, 0)).getUTCDate()
  const startWeekday = first.getUTCDay()
  const monthName = first.toLocaleString("en-US", {
    month: "long",
    timeZone: "UTC",
  })

  const cells: Array<number | null> = []
  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const isToday = (d: number) =>
    d === todayD && view.m === todayM && view.y === todayY

  const prevMonth = () =>
    setView((v) => ({
      y: v.m === 0 ? v.y - 1 : v.y,
      m: v.m === 0 ? 11 : v.m - 1,
    }))
  const nextMonth = () =>
    setView((v) => ({
      y: v.m === 11 ? v.y + 1 : v.y,
      m: v.m === 11 ? 0 : v.m + 1,
    }))

  return (
    <section className="rounded-2xl border border-border/70 bg-card/60 p-5 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Calendar
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={prevMonth}
            aria-label="Previous month"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ChevronLeft size={14} />
          </button>
          <button
            onClick={nextMonth}
            aria-label="Next month"
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <ChevronRight size={14} />
          </button>
        </div>
      </div>

      <div className="mt-3 text-foreground">
        {monthName} <span className="text-muted-foreground">{view.y}</span>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="py-1">
            {d}
          </div>
        ))}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((d, i) => {
          if (d === null) return <div key={i} className="aspect-square" />
          const isSolved = solved.has(utcDayKey(view.y, view.m, d))
          const today = isToday(d)
          return (
            <div
              key={i}
              className={`grid aspect-square place-items-center rounded-md font-mono text-xs transition-colors ${
                today
                  ? "border border-primary bg-primary/20 text-foreground shadow-[0_0_10px_-2px_var(--ember)]"
                  : isSolved
                    ? "bg-primary/30 text-foreground"
                    : "text-muted-foreground/50 hover:bg-secondary/50"
              }`}
            >
              {d}
            </div>
          )
        })}
      </div>

      <div className="mt-4 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
        <span>Solved</span>
        <div className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-primary/15" />
          <span className="h-2.5 w-2.5 rounded-sm bg-primary/40" />
          <span className="h-2.5 w-2.5 rounded-sm bg-primary/70" />
          <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
        </div>
      </div>
    </section>
  )
}
