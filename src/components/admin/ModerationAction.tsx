"use client"

// A reusable moderation control: a button that expands into a reason field and
// a confirm, then invokes a server action returning ActionResult. Keeps every
// destructive/soft action behind an explicit reason + confirmation, and shows
// the structured error inline instead of throwing.
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

type ActionResult = { ok: true } | { ok: false; error: string }

export function ModerationAction({
  action,
  hiddenFields,
  label,
  confirmLabel,
  title,
  placeholder = "Reason (recorded in the audit log)…",
  tone = "danger",
  requireReason = true,
}: {
  action: (formData: FormData) => Promise<ActionResult>
  hiddenFields: Record<string, string>
  label: string
  confirmLabel?: string
  title?: string
  placeholder?: string
  tone?: "danger" | "warn" | "neutral" | "good"
  requireReason?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [reason, setReason] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  const toneCls =
    tone === "danger"
      ? "border-red-500/40 text-red-300 hover:bg-red-500/10"
      : tone === "warn"
        ? "border-amber-500/40 text-amber-300 hover:bg-amber-500/10"
        : tone === "good"
          ? "border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/10"
          : "border-border/60 text-muted-foreground hover:bg-foreground/5"

  function submit() {
    setError(null)
    const fd = new FormData()
    for (const [k, v] of Object.entries(hiddenFields)) fd.set(k, v)
    fd.set("reason", reason)
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
        className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${toneCls}`}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="w-full max-w-sm space-y-2 rounded-xl border border-border/60 bg-background/70 p-3">
      {title ? (
        <p className="text-xs font-medium text-foreground">{title}</p>
      ) : null}
      <textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder={placeholder}
        rows={2}
        className="w-full resize-none rounded-lg border border-border/60 bg-background px-2.5 py-1.5 text-xs text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-foreground/30"
      />
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
      <div className="flex items-center gap-2">
        <button
          type="button"
          disabled={pending || (requireReason && reason.trim().length < 3)}
          onClick={submit}
          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${toneCls}`}
        >
          {pending ? "Working…" : (confirmLabel ?? `Confirm ${label.toLowerCase()}`)}
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
