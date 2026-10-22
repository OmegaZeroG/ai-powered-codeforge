"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Terminal } from "lucide-react"

export default function RouteError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

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

        <h1 className="mt-10 font-sans text-3xl font-medium tracking-tight sm:text-4xl">
          Something went wrong
        </h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
          This page hit an unexpected error. Your work is safe — try loading it again, and
          if it keeps happening, head back home.
        </p>
        {error.digest ? (
          <p className="mt-3 font-mono text-[11px] text-muted-foreground/70">
            Reference: {error.digest}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-border px-5 py-2.5 text-sm text-foreground transition-colors hover:border-primary/50"
          >
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
