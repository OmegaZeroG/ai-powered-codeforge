"use client"

// Ban control with a duration picker. Unlike the generic ModerationAction, a
// ban needs a length: presets (1/7/30 days, permanent) plus a custom date.
// Submits duration + optional customUntil + reason to the banUser server action.
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { BAN_DURATIONS } from "@/lib/ban"

type ActionResult = { ok: true } | { ok: false; error: string }

export function BanUserControl({
  action,
  userId,
}: {
  action: (formData: FormData) => Promise<ActionResult>
  userId: string
}) {
  const [open, setOpen] = useState(false)
  const [duration, setDuration] = useState<string>("7d")
  const [customUntil, setCustomUntil] = useState("")
  const [reason, setReason] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function submit() {
    setError(null)
    const fd = new FormData()
    fd.set("userId", userId)
    fd.set("reason", reason)
    fd.set("duration", duration)
    if (duration === "custom") fd.set("customUntil", customUntil)
    startTransition(async () => {
      const res = await action(fd)
      if (res.ok) {
        setOpen(false)
        setReason("")
        router.refresh()
      } else {
        setError(res.error)
      }
    })
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/10"
      >
        Ban user
      </button>
    )
  }

  return (
    <div className="w-full max-w-sm space-y-3 rounded-xl border border-red-500/30 bg-background/70 p-3">
      <p className="text-xs font-medium text-foreground">Ban this account</p>

      <div>
        <label className="mb-1 block text-[11px] text-muted-foreground">
          Duration
        </label>
        <div className="flex flex-wrap gap-1.5">
          {BAN_DURATIONS.map((d) => (
            <button
              key={d.key}
              type="button"
              onClick={() => setDuration(d.key)}
              className={`rounded-lg border px-2.5 py-1 text-xs transition-colors ${
                duration === d.key
                  ? "border-red-500/50 bg-red-500/10 text-red-200"
                  : "border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {d.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setDuration("custom")}
            className={`rounded-lg border px-2.5 py-1 text-xs transition-colors ${
              duration === "custom"
                ? "border-red-500/50 bg-red-500/10 text-red-200"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            Custom
          </button>
        </div>
      </div>

      {duration === "custom" ? (
        <div>
          <label className="mb-1 block text-[11px] text-muted-foreground">
            Ends at
          </label>
          <input
            type="datetime-local"
            value={customUntil}
            onChange={(e) => setCustomUntil(e.target.value)}
            className="w-full rounded-lg border border-border/60 bg-background px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-foreground/30"
          />
        </div>
      ) : null}

      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason (shown to the user and recorded in the audit log)…"
        rows={2}
        className="w-full resize-none rounded-lg border border-border/60 bg-background px-2.5 py-1.5 text-xs text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-foreground/30"
      />

      {error ? <p className="text-xs text-red-400">{error}</p> : null}

      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={
            pending ||
            reason.trim().length < 3 ||
            (duration === "custom" && !customUntil)
          }
          onClick={submit}
          className="rounded-lg border border-red-500/40 px-3 py-1.5 text-xs font-medium text-red-300 transition-colors hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Banning…" : "Confirm ban"}
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            setOpen(false)
            setError(null)
            setReason("")
          }}
          className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
