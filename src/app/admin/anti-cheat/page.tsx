import Link from "next/link"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { hasPermission, requirePermissionPage } from "@/lib/authz"
import { Avatar } from "@/components/admin/Avatar"
import { ModerationAction } from "@/components/admin/ModerationAction"
import { revokeSubmission, restoreSubmission, warnUser } from "../_actions/moderation"
import { ShieldAlert } from "lucide-react"

export const dynamic = "force-dynamic"

// The anti-cheat queue surfaces submissions that tripped the canary-token
// heuristic (see src/lib/anticheat.ts). It is explicitly a *review* queue, not
// an automated verdict: staff read the evidence and decide whether to revoke
// the submission and/or warn the author.
export default async function AntiCheatPage({
  searchParams,
}: {
  searchParams: Promise<{ show?: string }>
}) {
  await requirePermissionPage("VIEW_ANTICHEAT")
  const session = await auth()
  const canRevoke = hasPermission(session, "REVOKE_SUBMISSION")
  const canWarn = hasPermission(session, "WARN_USER")
  const canSeePii = hasPermission(session, "VIEW_PII")

  const { show } = await searchParams
  // Default hides already-revoked hits (the "handled" ones); ?show=all reveals them.
  const includeHandled = show === "all"

  const [flagged, handledCount] = await Promise.all([
    prisma.submission.findMany({
      where: {
        suspectedAiPasted: true,
        ...(includeHandled ? {} : { revoked: false }),
      },
      orderBy: { createdAt: "desc" },
      take: 100,
      select: {
        id: true,
        verdict: true,
        language: true,
        code: true,
        revoked: true,
        revokedReason: true,
        createdAt: true,
        problem: { select: { title: true, slug: true } },
        user: {
          select: { id: true, name: true, email: true, image: true, banned: true },
        },
      },
    }),
    prisma.submission.count({
      where: { suspectedAiPasted: true, revoked: true },
    }),
  ])

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 font-display text-2xl tracking-tight text-foreground">
            <ShieldAlert size={22} className="text-amber-400" />
            Anti-cheat review
          </h1>
          <p className="mt-1 max-w-prose text-sm text-muted-foreground">
            Submissions whose code carried a problem&apos;s canary token — a signal
            of copy-pasting the statement into an external tool, not proof. Review
            the evidence before acting.
          </p>
        </div>
        <div className="flex gap-1.5">
          <Link
            href="/admin/anti-cheat"
            className={`rounded-lg border px-3 py-1 text-xs font-medium transition-colors ${
              !includeHandled
                ? "border-foreground/30 bg-foreground/10 text-foreground"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            Open
          </Link>
          <Link
            href="/admin/anti-cheat?show=all"
            className={`rounded-lg border px-3 py-1 text-xs font-medium transition-colors ${
              includeHandled
                ? "border-foreground/30 bg-foreground/10 text-foreground"
                : "border-border/60 text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({handledCount} handled)
          </Link>
        </div>
      </div>

      {flagged.length === 0 ? (
        <div className="rounded-2xl border border-border/60 bg-background/40 p-10 text-center">
          <p className="text-sm text-muted-foreground">
            {includeHandled
              ? "No flagged submissions."
              : "Nothing in the queue. All caught up."}
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {flagged.map((s) => (
            <li
              key={s.id}
              className="space-y-3 rounded-2xl border border-amber-500/25 bg-background/40 p-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={s.user.name}
                    email={canSeePii ? s.user.email : null}
                    image={s.user.image}
                    size={36}
                  />
                  <div>
                    <Link
                      href={`/admin/users/${s.user.id}`}
                      className="font-medium text-foreground hover:underline"
                    >
                      {s.user.name ?? (canSeePii ? s.user.email : s.user.id.slice(0, 12) + "…")}
                    </Link>
                    {s.user.banned ? (
                      <span className="ml-2 rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] text-red-300">
                        banned
                      </span>
                    ) : null}
                    <div className="text-xs text-muted-foreground">
                      {s.problem.title} · {s.language} · {s.verdict} ·{" "}
                      {s.createdAt.toLocaleString()}
                    </div>
                  </div>
                </div>
                {s.revoked ? (
                  <span className="rounded-full bg-red-500/10 px-2 py-0.5 text-xs text-red-300">
                    revoked
                  </span>
                ) : null}
              </div>

              <details className="group">
                <summary className="cursor-pointer text-xs text-muted-foreground transition-colors hover:text-foreground">
                  View submitted code
                </summary>
                <pre className="mt-2 max-h-80 overflow-auto rounded-xl border border-border/60 bg-background p-3 text-xs leading-relaxed text-foreground">
                  <code>{s.code}</code>
                </pre>
              </details>

              {s.revoked && s.revokedReason ? (
                <p className="text-xs text-red-300/80">Revoked: {s.revokedReason}</p>
              ) : null}

              {canRevoke || canWarn ? (
                <div className="flex flex-wrap gap-2 pt-1">
                  {canRevoke &&
                    (s.revoked ? (
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
                        label="Revoke submission"
                        tone="danger"
                        placeholder="Reason for revoking…"
                      />
                    ))}
                  {canWarn && !s.user.banned ? (
                    <ModerationAction
                      action={warnUser}
                      hiddenFields={{ userId: s.user.id }}
                      label="Warn author"
                      tone="warn"
                      placeholder="What is the warning for?"
                    />
                  ) : null}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
