"use client"

import { useState, type FormEvent } from "react"
import { ArrowRight, Check, Loader2 } from "lucide-react"

type State = "idle" | "loading" | "success" | "error"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [state, setState] = useState<State>("idle")
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (state === "loading") return

    if (!EMAIL_RE.test(email)) {
      setState("error")
      setError("Enter a valid email address.")
      return
    }

    setState("loading")
    setError(null)
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => null)
        throw new Error(data?.error ?? "Something went wrong.")
      }
      setState("success")
      setEmail("")
    } catch (err) {
      setState("error")
      setError(err instanceof Error ? err.message : "Something went wrong.")
    }
  }

  if (state === "success") {
    return (
      <div className="mt-5 flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2.5 text-sm text-foreground">
        <Check className="h-4 w-4 text-primary" />
        You&apos;re on the list. Watch your inbox.
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="mt-5" noValidate>
      <div className="flex items-center gap-2 rounded-full border border-border bg-card/60 p-1 pl-4 backdrop-blur focus-within:border-primary/50">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
            if (state === "error") setState("idle")
          }}
          placeholder="you@domain.com"
          aria-label="Email address"
          className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="submit"
          disabled={state === "loading"}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-70"
        >
          {state === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              Subscribe
              <ArrowRight className="h-3.5 w-3.5" />
            </>
          )}
        </button>
      </div>
      {state === "error" && error && (
        <p className="mt-2 pl-4 text-[12px] text-destructive">{error}</p>
      )}
    </form>
  )
}
