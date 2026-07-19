"use client"

// Live ticking countdown to a target instant. Renders a stable placeholder on
// the server (suppressHydrationWarning) so a locale/clock mismatch can't trip
// hydration, then updates every second on the client.
import { useEffect, useState } from "react"

function remaining(target: number, now: number): string {
  const ms = Math.max(0, target - now)
  const s = Math.floor(ms / 1000)
  const d = Math.floor(s / 86400)
  const h = Math.floor((s % 86400) / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n: number) => String(n).padStart(2, "0")
  return d > 0
    ? `${d}d ${pad(h)}h ${pad(m)}m ${pad(sec)}s`
    : `${pad(h)}h ${pad(m)}m ${pad(sec)}s`
}

export function ContestCountdown({
  target,
  className,
}: {
  target: string | number | Date
  className?: string
}) {
  const targetMs = new Date(target).getTime()
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <span className={className} suppressHydrationWarning>
      {now === null ? "—" : remaining(targetMs, now)}
    </span>
  )
}
