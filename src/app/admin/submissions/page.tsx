import Link from "next/link"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { hasPermission, requirePermissionPage } from "@/lib/authz"
import { Avatar } from "@/components/admin/Avatar"
import { ModerationAction } from "@/components/admin/ModerationAction"
import { revokeSubmission, restoreSubmission } from "../_actions/moderation"
import type { Prisma } from "@prisma/client"

export const dynamic = "force-dynamic"

const PAGE_SIZE = 30

const VERDICT_TONE: Record<string, string> = {
  ACCEPTED: "text-emerald-300",
  WRONG_ANSWER: "text-red-300",
  RUNTIME_ERROR: "text-red-300",
  TIME_LIMIT_EXCEEDED: "text-amber-300",
  COMPILE_ERROR: "text-amber-300",
  PENDING: "text-muted-foreground",
}

const FILTERS = [
  { key: "", label: "All" },
  { key: "revoked", label: "Revoked" },
  { key: "flagged", label: "Suspected paste" },
  { key: "accepted", label: "Accepted" },
] as const

export default async function AdminSubmissionsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string; page?: string }>
}) {
  await requirePermissionPage("VIEW_SUBMISSIONS")
  const session = await auth()
  const canRevoke = hasPermission(session, "REVOKE_SUBMISSION")
  const canSeePii = hasPermission(session, "VIEW_PII")

  const { filter, page: pageParam } = await searchParams
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1)

  const where: Prisma.SubmissionWhereInput =
    filter === "revoked"
      ? { revoked: true }
      : filter === "flagged"
        ? { suspectedAiPasted: true }
        : filter === "accepted"
          ? { verdict: "ACCEPTED" }
          : {}

  const [total, subs] = await Promise.all([
    prisma.submission.count({ where }),
    prisma.submission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        verdict: true,
        language: true,
        revoked: true,
        revokedReason: true,
        suspectedAiPasted: true,
        createdAt: true,
        problem: { select: { title: true } },
        user: { select: { id: true, name: true, email: true, image: true } },
      },
    }),
  ])
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  function href(p: number, f?: string) {
    const sp = new URLSearchParams()
    if (f) sp.set("filter", f)
    if (p > 1) sp.set("page", String(p))
    const s = sp.toString()
    return `/admin/submissions${s ? `?${s}` : ""}`
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl tracking-tight text-foreground">
          Submissions
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {total} {total === 1 ? "submission" : "submissions"}
          {filter ? ` · ${filter}` : ""}
        </p>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {FILTERS.map((f) => {
          const active = (filter ?? "") === f.key
          return (
            <Link
              key={f.key || "all"}
              href={href(1, f.key || undefined)}
              className={`rounded-lg border px-3 py-1 text-xs font-medium transition-colors ${
                active
                  ? "border-foreground/30 bg-foreground/10 text-foreground"
                  : "border-border/60 text-muted-foreground hover:text-foreground"
              }`}
            >
              {f.label}
            </Link>
          )
        })}
      </div>

      <div className="overflow-hidden rounded-2xl border border-border/60">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border/60 bg-background/40 text-left text-xs text-muted-foreground">
              <th className="px-4 py-2.5 font-medium">Problem</th>
              <th className="px-4 py-2.5 font-medium">Author</th>
              <th className="px-4 py-2.5 font-medium">Verdict</th>
              <th className="px-4 py-2.5 font-medium">When</th>
              <th className="px-4 py-2.5 font-medium">Flags</th>
              {canRevoke ? <th className="px-4 py-2.5 font-medium"></th> : null}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {subs.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-muted-foreground">
                  No submissions match.
                </td>
              </tr>
            ) : (
              subs.map((s) => (
                <tr key={s.id} className="align-top transition-colors hover:bg-foreground/[0.03]">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {s.problem.title}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/users/${s.user.id}`}
                      className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <Avatar
                        name={s.user.name}
                        email={canSeePii ? s.user.email : null}
                        image={s.user.image}
                        size={22}
                      />
                      <span className="truncate">
                        {s.user.name ?? (canSeePii ? s.user.email : s.user.id.slice(0, 8) + "…")}
                      </span>
                    </Link>
                  </td>
                  <td className={`px-4 py-3 text-xs ${VERDICT_TONE[s.verdict] ?? "text-muted-foreground"}`}>
                    {s.verdict}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-muted-foreground">
                    {s.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {s.suspectedAiPasted ? (
                        <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-300">
                          paste
                        </span>
                      ) : null}
                      {s.revoked ? (
                        <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] text-red-300">
                          revoked
                        </span>
                      ) : null}
                    </div>
                  </td>
                  {canRevoke ? (
                    <td className="px-4 py-3">
                      {s.revoked ? (
                        <ModerationAction
                          action={restoreSubmission}
                          hiddenFields={{ submissionId: s.id }}
                          label="Restore"
                          tone="good"
                          placeholder="Reason for restoring…"
                        />
                      ) : (
                        <ModerationAction
                          action={revokeSubmission}
                          hiddenFields={{ submissionId: s.id }}
                          label="Revoke"
                          tone="danger"
                          placeholder="Reason for revoking…"
                        />
                      )}
                    </td>
                  ) : null}
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
                href={href(page - 1, filter)}
                className="rounded-lg border border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Prev
              </Link>
            ) : null}
            {page < totalPages ? (
              <Link
                href={href(page + 1, filter)}
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
