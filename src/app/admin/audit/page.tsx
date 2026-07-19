import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { requirePermissionPage } from "@/lib/authz"
import type { AuditAction } from "@prisma/client"
import { ScrollText } from "lucide-react"

export const dynamic = "force-dynamic"

const PAGE_SIZE = 40

const ACTION_TONE: Record<AuditAction, string> = {
  BAN_USER: "bg-red-500/10 text-red-300",
  UNBAN_USER: "bg-emerald-500/10 text-emerald-300",
  REVOKE_SUBMISSION: "bg-red-500/10 text-red-300",
  RESTORE_SUBMISSION: "bg-emerald-500/10 text-emerald-300",
  WARN_USER: "bg-amber-500/10 text-amber-300",
  GRANT_PERMISSIONS: "bg-sky-500/10 text-sky-300",
  REVOKE_PERMISSIONS: "bg-sky-500/10 text-sky-300",
  CREATE_CONTEST: "bg-violet-500/10 text-violet-300",
  CANCEL_CONTEST: "bg-red-500/10 text-red-300",
}

const ALL_ACTIONS: AuditAction[] = [
  "BAN_USER",
  "UNBAN_USER",
  "REVOKE_SUBMISSION",
  "RESTORE_SUBMISSION",
  "WARN_USER",
  "GRANT_PERMISSIONS",
  "REVOKE_PERMISSIONS",
  "CREATE_CONTEST",
  "CANCEL_CONTEST",
]

export default async function AuditLogPage({
  searchParams,
}: {
  searchParams: Promise<{ action?: string; page?: string }>
}) {
  await requirePermissionPage("VIEW_AUDIT")
  const { action, page: pageParam } = await searchParams
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1)
  const actionFilter = ALL_ACTIONS.includes(action as AuditAction)
    ? (action as AuditAction)
    : undefined
  const where = actionFilter ? { action: actionFilter } : {}

  const [total, events] = await Promise.all([
    prisma.auditLog.count({ where }),
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      include: { actor: { select: { id: true, name: true, email: true } } },
    }),
  ])
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  function href(p: number, a?: string) {
    const sp = new URLSearchParams()
    if (a) sp.set("action", a)
    if (p > 1) sp.set("page", String(p))
    const s = sp.toString()
    return `/admin/audit${s ? `?${s}` : ""}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 font-display text-2xl tracking-tight text-foreground">
          <ScrollText size={22} className="text-muted-foreground" />
          Audit log
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {total} recorded {total === 1 ? "action" : "actions"}. Every moderation
          event, immutable and attributed.
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Link
          href="/admin/audit"
          className={`rounded-lg border px-3 py-1 text-xs font-medium transition-colors ${
            !actionFilter
              ? "border-foreground/30 bg-foreground/10 text-foreground"
              : "border-border/60 text-muted-foreground hover:text-foreground"
          }`}
        >
          All
        </Link>
        {ALL_ACTIONS.map((a) => (
          <Link
            key={a}
            href={href(1, a)}
            className={`rounded-lg border px-3 py-1 text-xs font-medium transition-colors ${
              actionFilter === a
                ? "border-foreground/30 bg-foreground/10 text-foreground"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            {a}
          </Link>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-background/40 text-left text-xs text-muted-foreground">
              <th className="px-4 py-2.5 font-medium">Action</th>
              <th className="px-4 py-2.5 font-medium">Target</th>
              <th className="px-4 py-2.5 font-medium">Reason</th>
              <th className="px-4 py-2.5 font-medium">Actor</th>
              <th className="px-4 py-2.5 font-medium">When</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {events.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  No events.
                </td>
              </tr>
            ) : (
              events.map((e) => (
                <tr key={e.id} className="align-top transition-colors hover:bg-foreground/[0.03]">
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${ACTION_TONE[e.action]}`}
                    >
                      {e.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {e.targetType === "user" ? (
                      <Link
                        href={`/admin/users/${e.targetId}`}
                        className="font-mono hover:text-foreground hover:underline"
                      >
                        {e.targetType}/{e.targetId.slice(0, 10)}…
                      </Link>
                    ) : (
                      <span className="font-mono">
                        {e.targetType}/{e.targetId.slice(0, 10)}…
                      </span>
                    )}
                    {e.ipAddress ? (
                      <div className="mt-0.5 text-muted-foreground/60">{e.ipAddress}</div>
                    ) : null}
                  </td>
                  <td className="max-w-xs px-4 py-3 text-xs text-foreground">
                    {e.reason ?? <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {e.actor?.name ?? e.actor?.email ?? "unknown"}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                    {e.createdAt.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 ? (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <div className="flex gap-2">
            {page > 1 ? (
              <Link
                href={href(page - 1, actionFilter)}
                className="rounded-lg border border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Prev
              </Link>
            ) : null}
            {page < totalPages ? (
              <Link
                href={href(page + 1, actionFilter)}
                className="rounded-lg border border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Next →
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  )
}
