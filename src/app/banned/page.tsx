import { Ban } from "lucide-react"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "Account suspended — CodeForge",
  robots: { index: false, follow: false },
}

export const dynamic = "force-dynamic"

export default async function BannedPage() {
  const session = await auth()
  let reason: string | null = null
  if (session?.user?.id) {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { bannedReason: true, banned: true },
    })
    reason = user?.banned ? user.bannedReason : null
  }

  return (
    <div className="forge relative grid min-h-screen place-items-center overflow-hidden bg-background px-6 text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="relative z-10 w-full max-w-md rounded-2xl border border-red-500/30 bg-background/70 p-8 text-center ring-1 ring-red-500/20 backdrop-blur-xl">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-red-500/15 ring-1 ring-red-500/40">
          <Ban size={22} className="text-red-400" />
        </span>
        <h1 className="mt-5 font-display text-xl tracking-tight">
          Account suspended
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Your account has been suspended and cannot access CodeForge.
        </p>
        {reason ? (
          <p className="mt-4 rounded-lg border border-border/60 bg-background/50 px-4 py-3 text-left text-sm text-muted-foreground">
            <span className="text-foreground">Reason:</span> {reason}
          </p>
        ) : null}
        <p className="mt-6 text-xs text-muted-foreground">
          If you believe this is a mistake, contact support.
        </p>
      </div>
    </div>
  )
}
