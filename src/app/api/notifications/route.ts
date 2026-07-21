import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { isBanActive, isPermanentBan } from "@/lib/ban"

export const dynamic = "force-dynamic"

// GET /api/notifications — everything the signed-in user should see in the bell:
// an active account ban (with reason), warnings issued by staff (with reason),
// revoked submissions (with reason), and upcoming / currently-live contests.
// Owner-scoped: only the caller's own moderation state is returned. Read-only.
export async function GET() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const userId = session.user.id
  const now = new Date()

  // Human-friendly IST timestamp, e.g. "20 Jul 2026, 10:00 PM".
  const fmtIST = (d: Date) =>
    d.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    })

  const [user, warnings, revoked, contests] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { banned: true, bannedAt: true, bannedUntil: true, bannedReason: true },
    }),
    prisma.warning.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: { id: true, reason: true, acknowledgedAt: true, createdAt: true },
    }),
    prisma.submission.findMany({
      where: { userId, revoked: true },
      orderBy: { revokedAt: "desc" },
      take: 20,
      select: {
        id: true,
        revokedReason: true,
        revokedAt: true,
        problem: { select: { title: true, slug: true } },
      },
    }),
    // Live now or starting within the next 14 days.
    prisma.contest.findMany({
      where: { endsAt: { gte: now } },
      orderBy: { startsAt: "asc" },
      take: 10,
      select: { id: true, title: true, slug: true, startsAt: true, endsAt: true },
    }),
  ])

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

  const items: Notification[] = []

  // --- Active ban ---
  if (user && isBanActive(user)) {
    const until = isPermanentBan(user)
      ? "This is a permanent ban."
      : `Ban lifts on ${fmtIST(user.bannedUntil!)}.`
    items.push({
      id: "ban",
      kind: "ban",
      severity: "critical",
      title: "Your account is banned",
      body: `${user.bannedReason?.trim() || "No reason provided."} ${until}`,
      href: "/profile",
      at: (user.bannedAt ?? now).toISOString(),
      // A ban is always pinned red at the top; it should not keep the unread
      // counter stuck since there is nothing the user can "read away".
      unread: false,
    })
  }

  // --- Warnings ---
  for (const w of warnings) {
    items.push({
      id: `warning:${w.id}`,
      kind: "warning",
      severity: "warning",
      title: "Warning from staff",
      body: w.reason?.trim() || "No reason provided.",
      href: "/profile",
      at: w.createdAt.toISOString(),
      unread: w.acknowledgedAt == null,
    })
  }

  // --- Revoked submissions ---
  for (const s of revoked) {
    items.push({
      id: `revoked:${s.id}`,
      kind: "revoked",
      severity: "warning",
      title: `Submission revoked — ${s.problem?.title ?? "problem"}`,
      body: s.revokedReason?.trim() || "No reason provided.",
      href: s.problem?.slug ? `/problems/${s.problem.slug}` : "/profile",
      at: (s.revokedAt ?? now).toISOString(),
      unread: false,
    })
  }

  // --- Contests (live + upcoming) ---
  for (const c of contests) {
    const live = c.startsAt <= now && c.endsAt >= now
    items.push({
      id: `contest:${c.id}`,
      kind: "contest",
      severity: "info",
      title: live ? `Live now: ${c.title}` : `Upcoming contest: ${c.title}`,
      body: live
        ? `Ends ${fmtIST(c.endsAt)}.`
        : `Starts ${fmtIST(c.startsAt)}.`,
      href: `/contests/${c.slug}`,
      at: c.startsAt.toISOString(),
      unread: false,
    })
  }

  // Ban first, then most recent. Contests sort by their own time via `at`.
  items.sort((a, b) => {
    if (a.kind === "ban") return -1
    if (b.kind === "ban") return 1
    return new Date(b.at).getTime() - new Date(a.at).getTime()
  })

  const unreadCount = items.filter((i) => i.unread).length

  return NextResponse.json({ items, unreadCount })
}

// POST /api/notifications — mark the caller's unread notifications as read.
// Called when the bell dropdown is opened. Currently the only durable "unread"
// signal is an unacknowledged warning, so we stamp acknowledgedAt on all of the
// user's un-acknowledged warnings. Raw SQL single statement: the Neon HTTP
// adapter rejects the internal transaction Prisma wraps around updateMany.
export async function POST() {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  await prisma.$executeRaw`
    UPDATE "warnings"
    SET "acknowledgedAt" = NOW()
    WHERE "userId" = ${session.user.id} AND "acknowledgedAt" IS NULL
  `

  return NextResponse.json({ ok: true })
}
