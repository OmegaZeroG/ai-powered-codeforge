import Link from "next/link"
import { notFound } from "next/navigation"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { hasPermission, requirePermissionPage } from "@/lib/authz"
import { Avatar } from "@/components/admin/Avatar"
import { ModerationAction } from "@/components/admin/ModerationAction"
import { BanUserControl } from "@/components/admin/BanUserControl"
import { isBanActive, isBanExpired, isPermanentBan, formatRemaining } from "@/lib/ban"
import { banUser, unbanUser, warnUser, revokeSubmission, restoreSubmission } from "../../_actions/moderation"
import { ArrowLeft, Ban, ShieldCheck, Mail, MapPin, Code2, Globe } from "lucide-react"

export const dynamic = "force-dynamic"

const VERDICT_TONE: Record<string, string> = {
  ACCEPTED: "text-emerald-300",
  WRONG_ANSWER: "text-red-300",
  RUNTIME_ERROR: "text-red-300",
  TIME_LIMIT_EXCEEDED: "text-amber-300",
  COMPILE_ERROR: "text-amber-300",
  PENDING: "text-muted-foreground",
}

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requirePermissionPage("VIEW_USERS")
  const session = await auth()
  const { id } = await params

  const canSeePii = hasPermission(session, "VIEW_PII")
  const canSeeSubmissions = hasPermission(session, "VIEW_SUBMISSIONS")
  const canBan = hasPermission(session, "BAN_USER")
  const canWarn = hasPermission(session, "WARN_USER")
  const canRevoke = hasPermission(session, "REVOKE_SUBMISSION")
  const canSeeAudit = hasPermission(session, "VIEW_AUDIT")

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      bio: true,
      location: true,
      githubHandle: true,
      website: true,
      permissions: true,
      banned: true,
      bannedAt: true,
      bannedUntil: true,
      bannedReason: true,
      createdAt: true,
      _count: { select: { submissions: true } },
      warnings: {
        orderBy: { createdAt: "desc" },
        take: 20,
        include: { issuedBy: { select: { name: true, email: true } } },
      },
      submissions: canSeeSubmissions
        ? {
            orderBy: { createdAt: "desc" },
            take: 25,
            select: {
              id: true,
              verdict: true,
              language: true,
              revoked: true,
              revokedReason: true,
              suspectedAiPasted: true,
              createdAt: true,
              problem: { select: { title: true, slug: true } },
            },
          }
        : false,
    },
  })

  if (!user) notFound()

  const isStaffTarget = user.permissions.length > 0
  const isSelf = user.id === session?.user?.id
  const banActive = isBanActive(user)
  const banExpired = user.banned && isBanExpired(user)

  const auditEvents = canSeeAudit
    ? await prisma.auditLog.findMany({
        where: { targetType: "user", targetId: id },
        orderBy: { createdAt: "desc" },
        take: 20,
        include: { actor: { select: { name: true, email: true } } },
      })
    : []

  return (
    <div className="space-y-6">
      <Link
        href="/admin/users"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft size={15} /> Users
      </Link>

      {/* Identity header */}
      <div className="flex flex-col gap-5 rounded-2xl border border-border/60 bg-background/50 p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Avatar name={user.name} email={canSeePii ? user.email : null} image={user.image} size={56} />
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <h1 className="font-display text-xl tracking-tight text-foreground">
                {user.name ?? "Unnamed account"}
              </h1>
              {banActive ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-xs text-red-300">
                  <Ban size={12} />{" "}
                  {isPermanentBan(user)
                    ? "Banned · permanent"
                    : `Banned · ${formatRemaining(user.bannedUntil!, Date.now())} left`}
                </span>
              ) : banExpired ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-300">
                  <Ban size={12} /> Ban expired
                </span>
              ) : isStaffTarget ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                  <ShieldCheck size={12} /> Staff
                </span>
              ) : null}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              {canSeePii ? (
                <span className="inline-flex items-center gap-1">
                  <Mail size={12} /> {user.email}
                </span>
              ) : (
                <span className="font-mono">{user.id}</span>
              )}
              {user.location ? (
                <span className="inline-flex items-center gap-1">
                  <MapPin size={12} /> {user.location}
                </span>
              ) : null}
              {user.githubHandle ? (
                <span className="inline-flex items-center gap-1">
                  <Code2 size={12} /> {user.githubHandle}
                </span>
              ) : null}
              {user.website ? (
                <span className="inline-flex items-center gap-1">
                  <Globe size={12} /> {user.website}
                </span>
              ) : null}
              <span>Joined {user.createdAt.toLocaleDateString()}</span>
            </div>
            {user.bio ? (
              <p className="max-w-prose pt-1 text-sm text-muted-foreground">{user.bio}</p>
            ) : null}
          </div>
        </div>

        {/* Moderation controls */}
        <div className="flex flex-col items-start gap-2 sm:items-end">
          {isStaffTarget || isSelf ? (
            <p className="text-xs text-muted-foreground">
              {isSelf ? "This is your account." : "Staff account — protected."}
            </p>
          ) : (
            <>
              {canBan &&
                (user.banned ? (
                  <ModerationAction
                    action={unbanUser}
                    hiddenFields={{ userId: user.id }}
                    label={banExpired ? "Clear expired ban" : "Unban"}
                    title="Lift the ban on this account"
                    tone="good"
                    placeholder="Reason for unbanning…"
                  />
                ) : (
                  <BanUserControl action={banUser} userId={user.id} />
                ))}
              {canWarn ? (
                <ModerationAction
                  action={warnUser}
                  hiddenFields={{ userId: user.id }}
                  label="Issue warning"
                  title="Send a warning to this user"
                  tone="warn"
                  placeholder="What is the warning for?"
                />
              ) : null}
            </>
          )}
        </div>
      </div>

      {user.banned && user.bannedReason ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-sm text-red-200">
          <span className="font-medium">Ban reason:</span> {user.bannedReason}
          {user.bannedAt ? (
            <span className="text-red-300/70"> · {user.bannedAt.toLocaleString()}</span>
          ) : null}
          <div className="mt-1 text-xs text-red-300/70">
            {isPermanentBan(user)
              ? "Permanent ban."
              : banExpired
                ? `Expired ${user.bannedUntil!.toLocaleString()} — still flagged; clear to restore access.`
                : `Ends ${user.bannedUntil!.toLocaleString()} (${formatRemaining(user.bannedUntil!, Date.now())} left).`}
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Submissions */}
        <section className="lg:col-span-2 space-y-3">
          <h2 className="font-display text-lg tracking-tight text-foreground">
            Submissions{" "}
            <span className="text-sm text-muted-foreground">
              ({user._count.submissions})
            </span>
          </h2>
          {!canSeeSubmissions ? (
            <p className="text-sm text-muted-foreground">
              You lack permission to view submissions.
            </p>
          ) : !user.submissions || user.submissions.length === 0 ? (
            <p className="text-sm text-muted-foreground">No submissions.</p>
          ) : (
            <ul className="space-y-2">
              {user.submissions.map((s) => (
                <li
                  key={s.id}
                  className="rounded-xl border border-border/60 bg-background/40 p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="min-w-0">
                      <span className="font-medium text-foreground">
                        {s.problem.title}
                      </span>
                      <span className={`ml-2 text-xs ${VERDICT_TONE[s.verdict] ?? "text-muted-foreground"}`}>
                        {s.verdict}
                      </span>
                      {s.suspectedAiPasted ? (
                        <span className="ml-2 rounded-full bg-amber-500/10 px-2 py-0.5 text-[11px] text-amber-300">
                          suspected paste
                        </span>
                      ) : null}
                      {s.revoked ? (
                        <span className="ml-2 rounded-full bg-red-500/10 px-2 py-0.5 text-[11px] text-red-300">
                          revoked
                        </span>
                      ) : null}
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {s.language} · {s.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  {s.revoked && s.revokedReason ? (
                    <p className="mt-1.5 text-xs text-red-300/80">
                      Revoked: {s.revokedReason}
                    </p>
                  ) : null}
                  {canRevoke ? (
                    <div className="mt-2">
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
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Warnings + audit */}
        <div className="space-y-6">
          <section className="space-y-3">
            <h2 className="font-display text-lg tracking-tight text-foreground">
              Warnings{" "}
              <span className="text-sm text-muted-foreground">
                ({user.warnings.length})
              </span>
            </h2>
            {user.warnings.length === 0 ? (
              <p className="text-sm text-muted-foreground">No warnings.</p>
            ) : (
              <ul className="space-y-2">
                {user.warnings.map((w) => (
                  <li
                    key={w.id}
                    className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-3 text-sm"
                  >
                    <p className="text-amber-100">{w.reason}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      by {w.issuedBy?.name ?? w.issuedBy?.email ?? "staff"} ·{" "}
                      {w.createdAt.toLocaleDateString()}
                      {w.acknowledgedAt ? " · acknowledged" : ""}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {canSeeAudit ? (
            <section className="space-y-3">
              <h2 className="font-display text-lg tracking-tight text-foreground">
                Audit trail
              </h2>
              {auditEvents.length === 0 ? (
                <p className="text-sm text-muted-foreground">No actions recorded.</p>
              ) : (
                <ul className="space-y-1.5">
                  {auditEvents.map((e) => (
                    <li key={e.id} className="text-xs text-muted-foreground">
                      <span className="font-mono text-foreground">{e.action}</span>
                      {e.reason ? ` — ${e.reason}` : ""}
                      <br />
                      <span className="text-muted-foreground/70">
                        {e.actor?.name ?? e.actor?.email ?? "unknown"} ·{" "}
                        {e.createdAt.toLocaleString()}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ) : null}
        </div>
      </div>
    </div>
  )
}
