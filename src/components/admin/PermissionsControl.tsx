"use client"

// Lets a MANAGE_ADMINS holder toggle another account's permission set and
// save it in one shot, instead of one button per permission. Mirrors
// ModerationAction's expand/confirm shape so the admin panel stays visually
// consistent, but this one carries a checkbox list instead of a reason field.
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"

type ActionResult = { ok: true } | { ok: false; error: string }

const PERMISSION_LABELS: Record<string, string> = {
  VIEW_ADMIN: "View admin panel",
  VIEW_USERS: "View users",
  VIEW_PII: "View emails & PII",
  VIEW_SUBMISSIONS: "View submissions",
  VIEW_ANTICHEAT: "View anti-cheat queue",
  VIEW_AUDIT: "View audit log",
  BAN_USER: "Ban / unban users",
  REVOKE_SUBMISSION: "Revoke / restore submissions",
  WARN_USER: "Issue warnings",
  MANAGE_ADMINS: "Manage admin permissions",
  MANAGE_CONTESTS: "Manage contests",
}

export function PermissionsControl({
  action,
  userId,
  allPermissions,
  currentPermissions,
}: {
  action: (formData: FormData) => Promise<ActionResult>
  userId: string
  allPermissions: string[]
  currentPermissions: string[]
}) {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<Set<string>>(new Set(currentPermissions))
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  function toggle(p: string) {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(p)) next.delete(p)
      else next.add(p)
      return next
    })
  }

  function submit() {
    setError(null)
    const fd = new FormData()
    fd.set("userId", userId)
    for (const p of selected) fd.append("permissions", p)
    startTransition(async () => {
      const res = await action(fd)
      if (res.ok) {
        setOpen(false)
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
        className="rounded-lg border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-foreground/5"
      >
        Manage permissions
      </button>
    )
  }

  return (
    <div className="w-full max-w-sm space-y-2 rounded-xl border border-border/60 bg-background/70 p-3">
      <p className="text-xs font-medium text-foreground">Permissions</p>
      <div className="grid grid-cols-1 gap-1.5">
        {allPermissions.map((p) => (
          <label key={p} className="flex items-center gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={selected.has(p)}
              onChange={() => toggle(p)}
              className="h-3.5 w-3.5 rounded border-border/60 accent-foreground"
            />
            {PERMISSION_LABELS[p] ?? p}
          </label>
        ))}
      </div>
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
      <div className="flex items-center gap-2 pt-1">
        <button
          type="button"
          disabled={pending}
          onClick={submit}
          className="rounded-lg border border-emerald-500/40 px-3 py-1.5 text-xs font-medium text-emerald-300 transition-colors hover:bg-emerald-500/10 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Saving…" : "Save changes"}
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={() => {
            setOpen(false)
            setError(null)
            setSelected(new Set(currentPermissions))
          }}
          className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
