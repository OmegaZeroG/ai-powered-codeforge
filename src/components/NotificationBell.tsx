"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Bell, Ban, AlertTriangle, XCircle, Trophy, Loader2 } from "lucide-react"



type Notification = {
  id: string
  kind: "ban" | "warning" | "revoked" | "contest"
  severity: "critical" | "warning" | "info"
  title: string
  body: string | null
  href: string | null
  at: string
  unread: boolean
}

const ICONS = {
  ban: Ban,
  warning: AlertTriangle,
  revoked: XCircle,
  contest: Trophy,
} as const

const ACCENT = {
  critical: "text-red-400",
  warning: "text-amber-400",
  info: "text-primary",
} as const

function timeAgo(iso: string): string {
  const then = new Date(iso).getTime()
  const diff = Date.now() - then
  const abs = Math.abs(diff)
  const mins = Math.round(abs / 60000)
  const future = diff < 0
  const fmt = (n: number, unit: string) =>
    future ? `in ${n} ${unit}${n === 1 ? "" : "s"}` : `${n} ${unit}${n === 1 ? "" : "s"} ago`
  if (mins < 1) return "just now"
  if (mins < 60) return fmt(mins, "min")
  const hrs = Math.round(mins / 60)
  if (hrs < 24) return fmt(hrs, "hour")
  const days = Math.round(hrs / 24)
  return fmt(days, "day")
}

export function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<Notification[]>([])
  const [unread, setUnread] = useState(0)
  const [loading, setLoading] = useState(true)
  const wrapRef = useRef<HTMLDivElement>(null)

  const load = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications", { cache: "no-store" })
      if (!res.ok) return
      const data = (await res.json()) as { items: Notification[]; unreadCount: number }
      setItems(data.items ?? [])
      setUnread(data.unreadCount ?? 0)
    } catch {
      // best-effort; the bell degrades quietly if the fetch fails
    } finally {
      setLoading(false)
    }
  }, [])

  // Initial load + refresh every 60s.
  useEffect(() => {
    load()
    const t = setInterval(load, 60000)
    return () => clearInterval(t)
  }, [load])

  // Mark everything read: clear the badge + per-row dots optimistically, then
  // persist. Fired when the dropdown is opened.
  const markRead = useCallback(async () => {
    setUnread(0)
    setItems((prev) => prev.map((n) => (n.unread ? { ...n, unread: false } : n)))
    try {
      await fetch("/api/notifications", { method: "POST" })
    } catch {
      // best-effort; the next poll will reconcile if this failed
    }
  }, [])

  const toggle = useCallback(() => {
    setOpen((v) => {
      const next = !v
      if (next && unread > 0) markRead()
      return next
    })
  }, [unread, markRead])

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-label="Notifications"
        aria-expanded={open}
        className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-border/70 text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
      >
        <Bell size={16} />
        {unread > 0 ? (
          <span className="absolute right-1 top-1 grid min-h-[16px] min-w-[16px] place-items-center rounded-full bg-red-500 px-1 text-[10px] font-semibold leading-none text-white">
            {unread > 9 ? "9+" : unread}
          </span>
        ) : null}
      </button>

      {open ? (
        <div className="absolute right-0 z-50 mt-2 w-[min(92vw,360px)] overflow-hidden rounded-2xl border border-border/70 bg-background/95 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <span className="font-display text-sm text-foreground">Notifications</span>
            {unread > 0 ? (
              <span className="rounded-full bg-red-500/15 px-2 py-0.5 text-[11px] font-medium text-red-400">
                {unread} unread
              </span>
            ) : null}
          </div>

          <div className="max-h-[70vh] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center gap-2 px-4 py-8 text-sm text-muted-foreground">
                <Loader2 size={15} className="animate-spin" />
                Loading…
              </div>
            ) : items.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                You&apos;re all caught up.
              </div>
            ) : (
              <ul className="divide-y divide-border/50">
                {items.map((n) => {
                  const Icon = ICONS[n.kind]
                  const row = (
                    <div className="flex gap-3 px-4 py-3 transition-colors hover:bg-secondary/40">
                      <span className={`mt-0.5 shrink-0 ${ACCENT[n.severity]}`}>
                        <Icon size={16} />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-[13px] font-medium leading-snug text-foreground">
                            {n.title}
                          </p>
                          {n.unread ? (
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-500" />
                          ) : null}
                        </div>
                        {n.body ? (
                          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
                            {n.body}
                          </p>
                        ) : null}
                        <p className="mt-1 text-[11px] text-muted-foreground/70">
                          {timeAgo(n.at)}
                        </p>
                      </div>
                    </div>
                  )
                  return (
                    <li key={n.id}>
                      {n.href ? (
                        <Link href={n.href} onClick={() => setOpen(false)}>
                          {row}
                        </Link>
                      ) : (
                        row
                      )}
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
