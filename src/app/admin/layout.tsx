import type { Metadata } from "next"
import { requirePermissionPage } from "@/lib/authz"
import { AdminNav } from "@/components/admin/AdminNav"

export const metadata: Metadata = {
  title: "Mastercontrol — CodeForge",
  robots: { index: false, follow: false },
}

// The admin surface must never be statically cached or prerendered: it is
// per-request, permission-gated, and shows live moderation state.
export const dynamic = "force-dynamic"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Server-side gate. VIEW_ADMIN is the baseline capability to open the panel;
  // the edge proxy check is only defense-in-depth. Individual pages/actions
  // further require their specific permission.
  const session = await requirePermissionPage("VIEW_ADMIN")

  return (
    <div className="forge relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="relative z-10">
        <AdminNav permissions={session.user.permissions} />
        <main className="mx-auto max-w-7xl px-6 py-8">{children}</main>
      </div>
    </div>
  )
}
