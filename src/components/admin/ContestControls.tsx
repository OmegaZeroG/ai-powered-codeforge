"use client"

// Admin contest controls: a create form (difficulty + start time) and a cancel
// button. The start time defaults to the next Sunday 10 PM slot but the admin
// can override it; the server still auto-picks the 3 problems.
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { CalendarPlus, Trash2 } from "lucide-react"

const CONTEST_DAY = 0 // Sunday
const CONTEST_HOUR = 22 // 10 PM

// Next Sunday 22:00 (strictly future) as a `datetime-local` value string
// ("YYYY-MM-DDTHH:mm") in the browser's local timezone. Mirrors
// nextContestSlot() in src/lib/contest.ts; used only to seed the input default.
function defaultSlotLocalValue(): string {
  const d = new Date()
  d.setSeconds(0, 0)
  d.setMinutes(0)
  d.setHours(CONTEST_HOUR)
  const delta = (CONTEST_DAY - d.getDay() + 7) % 7
  d.setDate(d.getDate() + delta)
  if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 7)
  const pad = (n: number) => String(n).padStart(2, "0")
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours(),
  )}:${pad(d.getMinutes())}`
}

type ActionResult = { ok: true } | { ok: false; error: string }
type Difficulty = "EASY" | "MEDIUM" | "HARD"

const DIFFICULTIES: { key: Difficulty; label: string; tone: string }[] = [
  { key: "EASY", label: "All Easy", tone: "var(--easy)" },
  { key: "MEDIUM", label: "All Medium", tone: "var(--medium)" },
  { key: "HARD", label: "All Hard", tone: "var(--hard)" },
]

export function CreateContestControl({
  action,
}: {
  action: (formData: FormData) => Promise<ActionResult>
}) {
  const [difficulty, setDifficulty] = useState<Difficulty>("EASY")
  const [startsAt, setStartsAt] = useState<string>(defaultSlotLocalValue)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function submit() {
    setError(null)
    const fd = new FormData()
    fd.set("difficulty", difficulty)
    if (startsAt) {
      // `startsAt` is a timezone-less wall-clock ("2026-07-19T03:00"). The
      // browser parses datetime-local as LOCAL time, so new Date() yields the
      // correct absolute instant for the admin's timezone -- send that as an
      // unambiguous ISO string. Also pass the IANA tz so the server can build
      // the title/slug date label in the admin's zone rather than the server's.
      const instant = new Date(startsAt)
      if (Number.isNaN(instant.getTime())) {
        setError("Enter a valid start date and time.")
        return
      }
      fd.set("startsAt", instant.toISOString())
      fd.set("timeZone", Intl.DateTimeFormat().resolvedOptions().timeZone)
    }
    startTransition(async () => {
      const res = await action(fd)
      if (res.ok) {
        router.refresh()
      } else {
        setError(res.error)
      }
    })
  }

  return (
    <div className="space-y-3 rounded-2xl border border-border/60 bg-background/50 p-5">
      <div>
        <h2 className="font-display text-lg tracking-tight text-foreground">
          Schedule next contest
        </h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          Pick a difficulty and start time. The system picks 3 problems for a
          1-hour round. Start defaults to the next Sunday 10 PM.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {DIFFICULTIES.map((d) => (
          <button
            key={d.key}
            type="button"
            onClick={() => setDifficulty(d.key)}
            className={`rounded-lg border px-3 py-1.5 text-sm transition-colors ${
              difficulty === d.key
                ? "border-foreground/40 bg-foreground/10 text-foreground"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
            style={
              difficulty === d.key ? { color: d.tone, borderColor: d.tone } : undefined
            }
          >
            {d.label}
          </button>
        ))}
      </div>

      <label className="block space-y-1">
        <span className="text-xs text-muted-foreground">Starts at</span>
        <input
          type="datetime-local"
          value={startsAt}
          onChange={(e) => setStartsAt(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-border/60 bg-background/60 px-3 py-1.5 text-sm text-foreground outline-none focus:border-primary/50"
        />
        <span className="block text-[11px] text-muted-foreground/70">
          Runs for 1 hour. Times are in your local timezone.
        </span>
      </label>

      {error ? <p className="text-xs text-red-400">{error}</p> : null}

      <button
        type="button"
        disabled={pending}
        onClick={submit}
        className="inline-flex items-center gap-1.5 rounded-lg border border-primary/40 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary/10 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <CalendarPlus size={15} />
        {pending ? "Scheduling…" : "Schedule contest"}
      </button>
    </div>
  )
}

export function CancelContestButton({
  action,
  contestId,
}: {
  action: (formData: FormData) => Promise<ActionResult>
  contestId: string
}) {
  const [error, setError] = useState<string | null>(null)
  const [confirming, setConfirming] = useState(false)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function cancel() {
    setError(null)
    const fd = new FormData()
    fd.set("contestId", contestId)
    startTransition(async () => {
      const res = await action(fd)
      if (res.ok) {
        router.refresh()
      } else {
        setError(res.error)
        setConfirming(false)
      }
    })
  }

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="inline-flex items-center gap-1 rounded-lg border border-red-500/40 px-2.5 py-1 text-xs text-red-300 transition-colors hover:bg-red-500/10"
      >
        <Trash2 size={12} /> Cancel
      </button>
    )
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        disabled={pending}
        onClick={cancel}
        className="rounded-lg border border-red-500/40 px-2.5 py-1 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/10 disabled:opacity-50"
      >
        {pending ? "Cancelling…" : "Confirm"}
      </button>
      <button
        type="button"
        disabled={pending}
        onClick={() => setConfirming(false)}
        className="rounded-lg px-2 py-1 text-xs text-muted-foreground hover:text-foreground"
      >
        Keep
      </button>
      {error ? <span className="text-xs text-red-400">{error}</span> : null}
    </div>
  )
}
