"use client"

import { Suspense, useState, type FormEvent } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Loader2, Terminal, CheckCircle2 } from "lucide-react"

function ResetForm() {
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get("token") ?? ""

  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (!token) {
      setError("Missing reset token. Request a new link.")
      return
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }
    if (password !== confirm) {
      setError("Passwords do not match.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) {
        setError(data?.error || "Something went wrong.")
        setLoading(false)
        return
      }
      setDone(true)
      // Send them to the login modal after a moment.
      setTimeout(() => router.push("/?auth=login"), 1800)
    } catch {
      setError("Something went wrong. Please try again.")
      setLoading(false)
    }
  }

  return (
    <div className="landing min-h-screen grid place-items-center px-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card p-7 shadow-2xl glow-orange">
        <div className="flex items-center gap-2.5">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-primary">
            <Terminal className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="font-sans text-[15px] font-medium tracking-tight">
            Codeforge
          </span>
        </div>

        {done ? (
          <div className="mt-6 flex flex-col items-center gap-3 text-center">
            <CheckCircle2 className="h-8 w-8 text-primary" />
            <h2 className="font-sans text-xl font-medium tracking-tight">
              Password updated
            </h2>
            <p className="text-[13px] text-muted-foreground">
              Redirecting you to log in…
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <h2 className="font-sans text-xl font-medium tracking-tight">
                Choose a new password
              </h2>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Enter a new password for your account.
              </p>
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] text-muted-foreground">
                New password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[13px] text-muted-foreground">
                Confirm password
              </label>
              <input
                type="password"
                required
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                placeholder="Re-enter your password"
              />
            </div>

            {error && <p className="text-[13px] text-destructive">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {loading ? "Updating…" : "Update password"}
            </button>

            <p className="text-center text-[13px] text-muted-foreground">
              <Link href="/?auth=login" className="font-medium text-primary hover:underline">
                Back to log in
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="landing min-h-screen" />}>
      <ResetForm />
    </Suspense>
  )
}
