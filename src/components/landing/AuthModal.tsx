"use client"

import { useState, useEffect, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { motion, AnimatePresence } from "motion/react"
import { X, Loader2, Terminal } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

type Mode = "login" | "signup"

export function AuthModal({
  open,
  mode,
  callbackUrl,
  onClose,
  onModeChange,
}: {
  open: boolean
  mode: Mode
  callbackUrl?: string
  onClose: () => void
  onModeChange: (mode: Mode) => void
}) {
  // Where to send the user after a successful auth. Falls back to the app home.
  const dest = callbackUrl && callbackUrl.startsWith("/") ? callbackUrl : "/"
  const router = useRouter()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [oauthLoading, setOauthLoading] = useState<"github" | "google" | null>(
    null
  )
  // "Forgot password?" is a sub-view of the login tab.
  const [forgotView, setForgotView] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)

  // Reset transient state whenever the modal opens or the tab switches.
  useEffect(() => {
    setError(null)
    setPassword("")
    setForgotView(false)
    setForgotSent(false)
  }, [mode, open])

  // Close on Escape and lock body scroll while open.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  function handleOAuth(provider: "github" | "google") {
    setError(null)
    setOauthLoading(provider)
    // Full-page redirect to the provider; NextAuth returns to callbackUrl.
    signIn(provider, { callbackUrl: dest })
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (mode === "signup") {
        const res = await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        })
        const data = await res.json().catch(() => null)
        if (!res.ok) {
          setError(data?.error || "Something went wrong.")
          setIsLoading(false)
          return
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError(
          mode === "signup"
            ? "Account created, but sign in failed. Try logging in."
            : "Invalid email or password."
        )
        setIsLoading(false)
        return
      }

      onClose()
      router.push(dest)
      router.refresh()
    } catch {
      setError("Something went wrong. Please try again.")
      setIsLoading(false)
    }
  }

  async function handleForgot(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      // The endpoint always returns ok (no account enumeration); show a
      // neutral confirmation regardless.
      await res.json().catch(() => null)
      setForgotSent(true)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="landing fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ backgroundColor: "transparent" }}
          aria-modal="true"
          role="dialog"
        >
          {/* Blurred backdrop */}
          <button
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-background/40 backdrop-blur-lg"
          />

          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-border bg-card shadow-2xl glow-orange"
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="px-7 pt-7">
              <div className="flex items-center gap-2.5">
                <div className="grid h-7 w-7 place-items-center rounded-md bg-primary">
                  <Terminal
                    className="h-4 w-4 text-primary-foreground"
                    strokeWidth={2.5}
                  />
                </div>
                <span className="font-sans text-[15px] font-medium tracking-tight">
                  Codeforge
                </span>
              </div>

              {/* Sign in / Sign up toggle */}
              <div className="mt-6 grid grid-cols-2 gap-1 rounded-full border border-border bg-background/50 p-1">
                {(["login", "signup"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => onModeChange(m)}
                    className="relative rounded-full px-4 py-2 text-[13px] font-medium transition-colors"
                  >
                    {mode === m && (
                      <motion.span
                        layoutId="auth-toggle"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-primary"
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        mode === m
                          ? "text-primary-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      {m === "login" ? "Log in" : "Sign up"}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {forgotView && (
              <form onSubmit={handleForgot} className="space-y-4 px-7 pb-7 pt-6">
                <div>
                  <h2 className="font-sans text-xl font-medium tracking-tight">
                    Reset your password
                  </h2>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {forgotSent
                      ? "Check your inbox for a reset link."
                      : "Enter your email and we'll send you a reset link."}
                  </p>
                </div>

                {forgotSent ? (
                  <p className="rounded-md border border-border bg-background/50 px-3 py-3 text-[13px] text-muted-foreground">
                    If an account exists for{" "}
                    <span className="text-foreground">{email}</span>, a reset link
                    is on its way. The link is valid for 30 minutes.
                  </p>
                ) : (
                  <>
                    <div>
                      <label className="mb-1.5 block text-[13px] text-muted-foreground">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                        placeholder="jane@example.com"
                      />
                    </div>

                    {error && (
                      <p className="text-[13px] text-destructive">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
                    >
                      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                      {isLoading ? "Sending…" : "Send reset link"}
                    </button>
                  </>
                )}

                <p className="text-center text-[13px] text-muted-foreground">
                  <button
                    type="button"
                    onClick={() => {
                      setForgotView(false)
                      setForgotSent(false)
                      setError(null)
                    }}
                    className="font-medium text-primary hover:underline"
                  >
                    Back to log in
                  </button>
                </p>
              </form>
            )}

            <form
              onSubmit={handleSubmit}
              className={`space-y-4 px-7 pb-7 pt-6 ${forgotView ? "hidden" : ""}`}
            >
              <div>
                <h2 className="font-sans text-xl font-medium tracking-tight">
                  {mode === "login" ? "Welcome back" : "Create your account"}
                </h2>
                <p className="mt-1 text-[13px] text-muted-foreground">
                  {mode === "login"
                    ? "Log in to access your snippets and AI assistant."
                    : "Start solving with a judge you can trust."}
                </p>
              </div>

              {/* OAuth providers */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleOAuth("github")}
                  disabled={isLoading || oauthLoading !== null}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background/50 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-60"
                >
                  {oauthLoading === "github" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FaGithub className="h-4 w-4" />
                  )}
                  GitHub
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuth("google")}
                  disabled={isLoading || oauthLoading !== null}
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-border bg-background/50 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-60"
                >
                  {oauthLoading === "google" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <FcGoogle className="h-4 w-4" />
                  )}
                  Google
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  or
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <AnimatePresence initial={false}>
                {mode === "signup" && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <label className="mb-1.5 block text-[13px] text-muted-foreground">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                      placeholder="Jane Doe"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="mb-1.5 block text-[13px] text-muted-foreground">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-[13px] text-muted-foreground">
                    Password
                  </label>
                  {mode === "login" && (
                    <button
                      type="button"
                      onClick={() => {
                        setForgotView(true)
                        setError(null)
                      }}
                      className="text-[12px] font-medium text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  required
                  minLength={mode === "signup" ? 8 : undefined}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border border-border bg-background/50 px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary/60"
                  placeholder={
                    mode === "signup" ? "At least 8 characters" : "Your password"
                  }
                />
              </div>

              {error && <p className="text-[13px] text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isLoading
                  ? mode === "login"
                    ? "Logging in…"
                    : "Creating account…"
                  : mode === "login"
                    ? "Log in"
                    : "Sign up"}
              </button>

              <p className="text-center text-[13px] text-muted-foreground">
                {mode === "login" ? (
                  <>
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => onModeChange("signup")}
                      className="font-medium text-primary hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => onModeChange("login")}
                      className="font-medium text-primary hover:underline"
                    >
                      Log in
                    </button>
                  </>
                )}
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
