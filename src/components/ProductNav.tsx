"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { Terminal, LogOut, ShieldCheck } from "lucide-react"
import { NotificationBell } from "@/components/NotificationBell"

/* ---------------------------------------------------------------------------
   ProductNav — the in-app top bar for logged-in pages (Topics, Profile, …).
   Warm-ember pill nav, a faithful port of the approved Lovable design: a
   rounded-full frame with the Codeforge wordmark, active link by pathname,
   and a sign-out control. Logo returns home.
--------------------------------------------------------------------------- */

const LINKS = [
  { label: "Problems", href: "/topics" },
  { label: "Editor", href: "/editor" },
  { label: "Contests", href: "/contests" },
  { label: "Profile", href: "/profile" },
]

export function ProductNav() {
  const pathname = usePathname()
  const { data: session } = useSession()
  // Show the admin entry only to staff (anyone holding a permission). The
  // panel itself re-checks server-side; this is purely a convenience link so
  // staff don't have to type /admin by hand. Invisible to normal users.
  const isStaff = (session?.user?.permissions?.length ?? 0) > 0

  return (
    <header className="sticky top-0 z-40 px-4 pt-4">
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-border/70 bg-background/70 px-5 py-2.5 backdrop-blur-xl">
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          title="Go to home"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-primary">
            <Terminal
              size={15}
              className="text-primary-foreground"
              strokeWidth={2.75}
            />
          </span>
          <span className="font-display text-lg tracking-tight text-foreground">
            Codeforge
          </span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => {
            const active =
              l.href === "/topics"
                ? pathname === "/topics" || pathname.startsWith("/topics/")
                : pathname === l.href
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

          {isStaff ? (
            <Link
              href="/admin"
              title="Open the admin control panel"
              className={`ml-1 inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-[13px] transition-colors ${
                pathname.startsWith("/admin")
                  ? "border-primary/60 bg-primary/15 text-foreground"
                  : "border-primary/40 text-primary hover:bg-primary/10 hover:text-foreground"
              }`}
            >
              <ShieldCheck size={14} />
              Admin Control
            </Link>
          ) : null}
        </div>

        <div className="flex items-center gap-2">
          <NotificationBell />
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-4 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Log out</span>
          </button>
        </div>
      </nav>
    </header>
  )
}
