"use client"

import { Suspense, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Loader2, Terminal, CheckCircle2, XCircle } from "lucide-react"

type State = "verifying" | "success" | "error"

function VerifyInner() {
  const router = useRouter()
  const params = useSearchParams()
  const token = params.get("token") ?? ""

  const [state, setState] = useState<State>("verifying")
  const [message, setMessage] = useState<string>("")
  // Guard against React StrictMode double-invoke in dev consuming the token twice.
  const ran = useRef(false)

  useEffect(() => {
    if (ran.current) return
    ran.current = true

    if (!token) {
      setState("error")
      setMessage("This link is missing its verification token.")
      return
    }

    ;(async () => {
      try {
        const res = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })
        const data = await res.json().catch(() => null)
        if (!res.ok) {
          setState("error")
          setMessage(data?.error || "This verification link is invalid or has expired.")
          return
        }
        setState("success")
        setMessage("Your email is confirmed. You can now log in.")
        setTimeout(() => router.push("/?auth=login"), 1800)
      } catch {
        setState("error")
        setMessage("Something went wrong. Please try again.")
      }
    })()
  }, [token, router])

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

        <div className="mt-6 flex flex-col items-center gap-3 text-center">
          {state === "verifying" && (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <h2 className="font-sans text-xl font-medium tracking-tight">
                Confirming your email…
              </h2>
              <p className="text-[13px] text-muted-foreground">
                Hang tight, this only takes a moment.
              </p>
            </>
          )}

          {state === "success" && (
            <>
              <CheckCircle2 className="h-8 w-8 text-primary" />
              <h2 className="font-sans text-xl font-medium tracking-tight">
                Email confirmed
              </h2>
              <p className="text-[13px] text-muted-foreground">{message}</p>
              <p className="text-[13px] text-muted-foreground">Redirecting you to log in…</p>
            </>
          )}

          {state === "error" && (
            <>
              <XCircle className="h-8 w-8 text-destructive" />
              <h2 className="font-sans text-xl font-medium tracking-tight">
                Verification failed
              </h2>
              <p className="text-[13px] text-muted-foreground">{message}</p>
              <Link
                href="/?auth=login"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
              >
                Back to log in
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default function VerifyPage() {
  return (
    <Suspense fallback={<div className="landing min-h-screen" />}>
      <VerifyInner />
    </Suspense>
  )
}
