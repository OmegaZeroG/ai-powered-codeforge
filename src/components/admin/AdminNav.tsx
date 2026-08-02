"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { motion, AnimatePresence } from "motion/react"
import { ShieldAlert, LogOut, ArrowLeft, Menu, X } from "lucide-react"
import type { Permission } from "@prisma/client"

/* ---------------------------------------------------------------------------
   AdminNav — top bar for the mastercontrol panel. Deliberately distinct from
   the product ProductNav (red "shield" accent, "MASTERCONTROL" wordmark) so it
   is unmistakable which surface you are on. Links are filtered by the viewer's
   permissions; the server layout is still the real gate.
--------------------------------------------------------------------------- */

type NavLink = { label: string; href: string; needs: Permission }

const LINKS: NavLink[] = [
  { label: "Overview", href: "/admin", needs: "VIEW_ADMIN" },
  { label: "Users", href: "/admin/users", needs: "VIEW_USERS" },
  { label: "Submissions", href: "/admin/submissions", needs: "VIEW_SUBMISSIONS" },
  { label: "Anti-cheat", href: "/admin/anti-cheat", needs: "VIEW_ANTICHEAT" },
  { label: "Contests", href: "/admin/contests", needs: "MANAGE_CONTESTS" },
  { label: "Audit log", href: "/admin/audit", needs: "VIEW_AUDIT" },
]

export function AdminNav({ permissions }: { permissions: Permission[] }) {
  const pathname = usePathname()
  const links = LINKS.filter((l) => permissions.includes(l.needs))
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <header className="sticky top-0 z-40 border-b border-red-500/20 bg-background/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/admin"
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
            title="Admin overview"
          >
            <span className="grid h-7 w-7 place-items-center rounded-lg bg-red-500/15 ring-1 ring-red-500/40">
              <ShieldAlert size={15} className="text-red-400" strokeWidth={2.5} />
            </span>
            <span className="font-display text-lg tracking-tight text-foreground">
              Mastercontrol
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => {
              const active =
                l.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === l.href || pathname.startsWith(l.href + "/")
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-full px-4 py-1.5 text-[13px] transition-colors ${
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/topics"
            className="hidden items-center gap-1.5 rounded-full border border-border/70 px-4 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground sm:inline-flex"
            title="Back to the app"
          >
            <ArrowLeft size={14} />
            <span className="hidden sm:inline">Exit</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="hidden items-center gap-1.5 rounded-full border border-border/70 px-4 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-red-500/50 hover:text-foreground sm:inline-flex"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Log out</span>
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid h-8 w-8 place-items-center rounded-full border border-border/70 text-foreground transition-colors hover:border-red-500/50 md:hidden"
          >
            {menuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col gap-1 border-t border-red-500/20 bg-background/95 p-3 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => {
              const active =
                l.href === "/admin"
                  ? pathname === "/admin"
                  : pathname === l.href || pathname.startsWith(l.href + "/")
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-xl px-4 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
            <Link
              href="/topics"
              className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              <ArrowLeft size={14} />
              Exit to app
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
            >
              <LogOut size={14} />
              Log out
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
