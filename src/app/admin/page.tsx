import Link from "next/link"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { hasPermission } from "@/lib/authz"
import {
  Users,
  FileCode2,
  ShieldAlert,
  Ban,
  EyeOff,
  CheckCircle2,
  ScrollText,
} from "lucide-react"

export const dynamic = "force-dynamic"

// A single overview stat.
function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  tone = "default",
  href,
}: {
  label: string
  value: string | number
  sub?: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  tone?: "default" | "alert" | "good"
  href?: string
}) {
  const ring =
    tone === "alert"
      ? "ring-red-500/30"
      : tone === "good"
        ? "ring-emerald-500/25"
        : "ring-border/60"
  const iconColor =
    tone === "alert"
      ? "text-red-400"
      : tone === "good"
        ? "text-emerald-400"
        : "text-muted-foreground"

  const body = (
    <div
      className={`flex flex-col gap-3 rounded-2xl border border-border/60 bg-background/50 p-5 ring-1 ${ring} transition-colors hover:border-border`}
    >
      <div className="flex items-center justify-between">
        <span className="text-[13px] text-muted-foreground">{label}</span>
        <Icon size={16} className={iconColor} />
      </div>
      <div className="font-display text-3xl tracking-tight text-foreground">
        {value}
      </div>
      {sub ? <span className="text-xs text-muted-foreground">{sub}</span> : null}
    </div>
  )

  return href ? (
    <Link href={href} className="block">
      {body}
    </Link>
  ) : (
    body
  )
}

export default async function AdminOverviewPage() {
  const session = await auth()
  const canSeeAudit = hasPermission(session, "VIEW_AUDIT")

  const [
    totalUsers,
    bannedUsers,
    totalSubmissions,
    acceptedSubmissions,
    suspectedCount,
    revokedCount,
    warningsCount,
    recentAudit,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { banned: true } }),
    prisma.submission.count(),
    prisma.submission.count({ where: { verdict: "ACCEPTED" } }),
    prisma.submission.count({ where: { suspectedAiPasted: true } }),
    prisma.submission.count({ where: { revoked: true } }),
    prisma.warning.count(),
    canSeeAudit
      ? prisma.auditLog.findMany({
          orderBy: { createdAt: "desc" },
          take: 8,
          include: { actor: { select: { name: true, email: true } } },
        })
      : Promise.resolve([]),
  ])

  const acceptRate =
    totalSubmissions > 0
      ? Math.round((acceptedSubmissions / totalSubmissions) * 100)
      : 0

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl tracking-tight text-foreground">
          Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Live state of the platform. All moderation is soft and reversible; every
          action is written to the audit log.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Users"
          value={totalUsers}
          sub={`${bannedUsers} banned`}
          icon={Users}
          href={hasPermission(session, "VIEW_USERS") ? "/admin/users" : undefined}
        />
        <StatCard
          label="Submissions"
          value={totalSubmissions}
          sub={`${revokedCount} revoked`}
          icon={FileCode2}
          href={
            hasPermission(session, "VIEW_SUBMISSIONS")
              ? "/admin/submissions"
              : undefined
          }
        />
        <StatCard
          label="Accept rate"
          value={`${acceptRate}%`}
          sub={`${acceptedSubmissions} accepted`}
          icon={CheckCircle2}
          tone="good"
        />
        <StatCard
          label="Suspected AI paste"
          value={suspectedCount}
          sub="canary-token hits"
          icon={ShieldAlert}
          tone={suspectedCount > 0 ? "alert" : "default"}
          href={
            hasPermission(session, "VIEW_ANTICHEAT")
              ? "/admin/anti-cheat"
              : undefined
          }
        />
        <StatCard
          label="Banned users"
          value={bannedUsers}
          icon={Ban}
          tone={bannedUsers > 0 ? "alert" : "default"}
        />
        <StatCard
          label="Revoked submissions"
          value={revokedCount}
          icon={EyeOff}
        />
        <StatCard label="Warnings issued" value={warningsCount} icon={ScrollText} />
      </div>

      {canSeeAudit ? (
        <section className="rounded-2xl border border-border/60 bg-background/50 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg tracking-tight text-foreground">
              Recent activity
            </h2>
            <Link
              href="/admin/audit"
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
            >
              View all →
            </Link>
          </div>
          {recentAudit.length === 0 ? (
            <p className="text-sm text-muted-foreground">No audit events yet.</p>
          ) : (
            <ul className="divide-y divide-border/50">
              {recentAudit.map((e) => (
                <li
                  key={e.id}
                  className="flex items-center justify-between gap-4 py-2.5 text-sm"
                >
                  <span className="text-foreground">
                    <span className="font-mono text-xs text-muted-foreground">
                      {e.action}
                    </span>{" "}
                    on {e.targetType} {e.targetId.slice(0, 8)}…
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
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
  )
}
