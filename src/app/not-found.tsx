import Link from "next/link"
import type { Metadata } from "next"
import { Terminal } from "lucide-react"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
}

export default function NotFound() {
  return (
    <div className="landing grid min-h-screen place-items-center px-4">
      <div className="w-full max-w-md text-center">
        <Link
          href="/"
          aria-label="CodeForge home"
          className="mx-auto inline-flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md bg-primary">
            <Terminal className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </span>
          <span className="font-sans text-base font-medium tracking-tight">Codeforge</span>
        </Link>

        <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-3 font-sans text-4xl font-medium tracking-tight sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist, or it moved. Check the
          address, or head back to something that does.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            Back to home
          </Link>
          <Link
            href="/topics"
            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:border-primary/50"
          >
            Browse problems
          </Link>
        </div>
      </div>
    </div>
  )
}
