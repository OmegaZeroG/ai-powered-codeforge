import Link from "next/link"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { hasPermission, requirePermissionPage } from "@/lib/authz"
import { Ban, ShieldCheck, Search } from "lucide-react"
import { Avatar } from "@/components/admin/Avatar"

export const dynamic = "force-dynamic"

const PAGE_SIZE = 25

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string; filter?: string }>
}) {
  await requirePermissionPage("VIEW_USERS")
  const session = await auth()
  const canSeePii = hasPermission(session, "VIEW_PII")

  const { q, page: pageParam, filter } = await searchParams
  const query = (q ?? "").trim()
  const page = Math.max(1, Number.parseInt(pageParam ?? "1", 10) || 1)

  // Search covers name always; email only when the viewer can see PII (so a
  // VIEW_USERS-without-VIEW_PII operator can't enumerate accounts by email).
  const searchWhere = query
    ? {
        OR: [
          { name: { contains: query, mode: "insensitive" as const } },
          ...(canSeePii
            ? [{ email: { contains: query, mode: "insensitive" as const } }]
            : []),
        ],
      }
    : {}
  const filterWhere =
    filter === "banned"
      ? { banned: true }
      : filter === "staff"
        ? { permissions: { isEmpty: false } }
        : {}
  const where = { ...searchWhere, ...filterWhere }

  const [total, users] = await Promise.all([
    prisma.user.count({ where }),
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        banned: true,
        permissions: true,
        createdAt: true,
        _count: { select: { submissions: true, warnings: true } },
      },
    }),
  ])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  function pageHref(p: number) {
    const sp = new URLSearchParams()
    if (query) sp.set("q", query)
    if (filter) sp.set("filter", filter)
    if (p > 1) sp.set("page", String(p))
    const s = sp.toString()
    return `/admin/users${s ? `?${s}` : ""}`
  }

  const filters = [
    { key: "", label: "All" },
    { key: "banned", label: "Banned" },
    { key: "staff", label: "Staff" },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl tracking-tight text-foreground">
            Users
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {total} {total === 1 ? "account" : "accounts"}
            {filter ? ` · ${filter}` : ""}
          </p>
        </div>
        <form method="get" className="flex items-center gap-2">
          {filter ? <input type="hidden" name="filter" value={filter} /> : null}
          <div className="relative">
            <Search
              size={15}
              className="pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            />
            <input
              name="q"
              defaultValue={query}
              placeholder={canSeePii ? "Search name or email…" : "Search name…"}
              className="w-64 rounded-lg border border-border/60 bg-background py-1.5 pl-8 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground/70 focus:border-foreground/30"
            />
          </div>
        </form>
      </div>

      <div className="flex gap-1.5">
        {filters.map((f) => {
          const active = (filter ?? "") === f.key
          const sp = new URLSearchParams()
          if (query) sp.set("q", query)
          if (f.key) sp.set("filter", f.key)
          const s = sp.toString()
          return (
            <Link
              key={f.key || "all"}
              href={`/admin/users${s ? `?${s}` : ""}`}
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
              <th className="px-4 py-2.5 font-medium">User</th>
              <th className="px-4 py-2.5 font-medium">Submissions</th>
              <th className="px-4 py-2.5 font-medium">Warnings</th>
              <th className="px-4 py-2.5 font-medium">Joined</th>
              <th className="px-4 py-2.5 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-muted-foreground">
                  No users match.
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u.id} className="transition-colors hover:bg-foreground/[0.03]">
                  <td className="px-4 py-3">
                    <Link href={`/admin/users/${u.id}`} className="flex items-center gap-3">
                      <Avatar name={u.name} email={canSeePii ? u.email : null} image={u.image} size={32} />
                      <div className="min-w-0">
                        <div className="truncate font-medium text-foreground">
                          {u.name ?? "—"}
                        </div>
                        <div className="truncate text-xs text-muted-foreground">
                          {canSeePii ? u.email : `${u.id.slice(0, 12)}…`}
                        </div>
                      </div>
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {u._count.submissions}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {u._count.warnings}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {u.createdAt.toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    {u.banned ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-xs text-red-300">
                        <Ban size={12} /> Banned
                      </span>
                    ) : u.permissions.length > 0 ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-300">
                        <ShieldCheck size={12} /> Staff
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground">Active</span>
                    )}
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
                href={pageHref(page - 1)}
                className="rounded-lg border border-border/60 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                ← Prev
              </Link>
            ) : null}
            {page < totalPages ? (
              <Link
                href={pageHref(page + 1)}
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
