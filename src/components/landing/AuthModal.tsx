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
  // Set when a login is blocked because the email isn't verified yet — drives a
  // "resend verification" affordance under the error message.
  const [needsVerify, setNeedsVerify] = useState(false)
  const [resendState, setResendState] = useState<"idle" | "sending" | "sent">("idle")
  // Two-factor login: once the server says a code is required we flip to a
  // code-entry step. `otp` holds what the user types; `otpMethod` decides the
  // copy — an emailed code (with resend) vs. one from an authenticator app.
  const [needsOtp, setNeedsOtp] = useState(false)
  const [otp, setOtp] = useState("")
  const [otpResent, setOtpResent] = useState(false)
  const [otpMethod, setOtpMethod] = useState<"email" | "totp">("email")
  // The full set of methods this account has enrolled, learned from
  // login-status. When it holds more than the one being challenged, we show a
  // "Try another way" affordance to switch factors mid-login (mirrors Google).
  const [otpMethods, setOtpMethods] = useState<("email" | "totp")[]>([])
  // True while a "Try another way" switch is re-priming the server (e.g.
  // re-issuing an email code) so the input reflects the new method cleanly.
  const [switchingMethod, setSwitchingMethod] = useState(false)

  // Reset transient state whenever the modal opens or the tab switches.
  useEffect(() => {
    setError(null)
    setPassword("")
    setForgotView(false)
    setForgotSent(false)
    setNeedsVerify(false)
    setResendState("idle")
    setNeedsOtp(false)
    setOtp("")
    setOtpResent(false)
    setOtpMethod("email")
    setOtpMethods([])
    setSwitchingMethod(false)
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
        // Accounts start unverified — do NOT attempt sign-in (the gate would
        // reject it). Show the "check your email" confirmation instead.
        setNeedsVerify(true)
        setResendState("sent")
        setError(null)
        setIsLoading(false)
        return
      }

      const result = await signIn("credentials", {
        email,
        password,
        // Empty until the user reaches the code-entry step; ignored by the
        // server unless the account has 2FA on. otpMethod tells authorize()
        // which enrolled factor this code answers (set by "Try another way").
        otp: needsOtp ? otp : "",
        otpMethod: needsOtp ? otpMethod : "",
        redirect: false,
      })

      if (result?.error) {
        // next-auth collapses every authorize() failure into one opaque error.
        // Ask the server WHY so we can offer "resend verification" when the
        // account exists and the only blocker is an unconfirmed email, or flip
        // to the 2FA code step when a login code is required.
        let reason = "bad_credentials"
        let challengeMethod: "email" | "totp" = "email"
        let enrolledMethods: ("email" | "totp")[] = []
        try {
          const r = await fetch("/api/auth/login-status", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // Send otp + the chosen method only once we're on the code step, so
            // the server knows NOT to re-issue a fresh email code on a wrong-code
            // retry, and challenges the method the user is actually answering.
            body: JSON.stringify(
              needsOtp
                ? { email, password, otp, method: otpMethod }
                : { email, password }
            ),
          })
          const d = await r.json().catch(() => null)
          if (d?.reason) reason = d.reason
          if (d?.method === "totp" || d?.method === "email") challengeMethod = d.method
          if (Array.isArray(d?.methods)) {
            enrolledMethods = d.methods.filter(
              (m: unknown) => m === "email" || m === "totp"
            )
          }
        } catch {
          // fall through to generic message
        }

        if (reason === "email_unverified") {
          setNeedsVerify(true)
          setError("Please confirm your email before logging in.")
        } else if (reason === "otp_required") {
          // First time we learn 2FA is on: for email the precheck just mailed a
          // code; for totp the user reads it from their app. Flip to code entry.
          // If we were ALREADY on the code step, the submitted code was wrong.
          if (enrolledMethods.length > 0) setOtpMethods(enrolledMethods)
          if (needsOtp) {
            setError(
              challengeMethod === "totp"
                ? "That code is incorrect. Open your authenticator app and try again."
                : "That code is invalid or expired. Check your email and try again."
            )
          } else {
            setOtpMethod(challengeMethod)
            setNeedsOtp(true)
            setError(null)
          }
        } else {
          setError("Invalid email or password.")
          // A bad password mid-2FA drops us back to the start.
          setNeedsOtp(false)
          setOtp("")
        }
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

  async function handleResendVerification() {
    if (!email) {
      setError("Enter your email above, then resend.")
      return
    }
    setResendState("sending")
    try {
      await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      // Enumeration-safe endpoint always returns ok; show sent regardless.
      setResendState("sent")
    } catch {
      setResendState("idle")
      setError("Couldn't resend right now. Try again in a moment.")
    }
  }

  async function handleResendOtp() {
    if (!email || !password) return
    setOtpResent(false)
    setError(null)
    try {
      // Calling login-status WITHOUT otp re-issues a fresh code (the server only
      // suppresses re-issue when an otp field is present).
      await fetch("/api/auth/login-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
      setOtp("")
      setOtpResent(true)
    } catch {
      setError("Couldn't resend the code. Try again in a moment.")
    }
  }

  // "Try another way": switch the active challenge to a different enrolled
  // method mid-login. We re-call login-status with the chosen method so the
  // server can prime it — importantly, switching TO email (with no otp in the
  // body) re-issues a fresh emailed code. TOTP needs no priming.
  async function switchMethod(next: "email" | "totp") {
    if (next === otpMethod || switchingMethod) return
    setSwitchingMethod(true)
    setError(null)
    setOtp("")
    setOtpResent(false)
    try {
      await fetch("/api/auth/login-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, method: next }),
      })
      setOtpMethod(next)
      if (next === "email") setOtpResent(true)
    } catch {
      setError("Couldn't switch methods. Try again in a moment.")
    } finally {
      setSwitchingMethod(false)
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

              {needsVerify && (
                <div className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-3 text-[13px]">
                  <p className="font-medium text-foreground">
                    {mode === "signup"
                      ? "Confirm your email to finish"
                      : "Email not confirmed yet"}
                  </p>
                  <p className="mt-1 text-muted-foreground">
                    We sent a confirmation link to{" "}
                    <span className="text-foreground">{email || "your inbox"}</span>.
                    Click it to activate your account, then log in.
                  </p>
                  <button
                    type="button"
                    onClick={handleResendVerification}
                    disabled={resendState === "sending"}
                    className="mt-2 inline-flex items-center gap-1.5 text-[13px] font-medium text-primary hover:underline disabled:opacity-60"
                  >
                    {resendState === "sending" && (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    )}
                    {resendState === "sent"
                      ? "Verification email sent — check your inbox"
                      : resendState === "sending"
                        ? "Sending…"
                        : "Resend verification email"}
                  </button>
                </div>
              )}

              {mode === "login" && needsOtp && (
                <div className="rounded-lg border border-primary/40 bg-primary/10 px-3 py-3">
                  <label className="block text-[13px] font-medium text-foreground">
                    Enter your login code
                  </label>
                  {otpMethod === "totp" ? (
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      Open your authenticator app and enter the current 6-digit
                      code — or use one of your backup codes.
                    </p>
                  ) : (
                    <p className="mt-1 text-[13px] text-muted-foreground">
                      We emailed a 6-digit code to{" "}
                      <span className="text-foreground">{email}</span>. It expires
                      in 10 minutes.
                    </p>
                  )}
                  <input
                    type="text"
                    inputMode={otpMethod === "totp" ? "text" : "numeric"}
                    autoComplete="one-time-code"
                    maxLength={otpMethod === "totp" ? 9 : 6}
                    value={otp}
                    onChange={(e) => {
                      const raw = e.target.value
                      setOtp(
                        otpMethod === "totp"
                          ? raw.replace(/[^0-9a-zA-Z-]/g, "").slice(0, 9)
                          : raw.replace(/\D/g, "").slice(0, 6)
                      )
                      setOtpResent(false)
                    }}
                    className="mt-2 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-center font-mono text-lg tracking-[0.4em] text-foreground outline-none transition-colors focus:border-primary/60"
                    placeholder={otpMethod === "totp" ? "000000" : "000000"}
                    autoFocus
                  />
                  {otpMethod === "email" && (
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="mt-2 text-[13px] font-medium text-primary hover:underline"
                    >
                      {otpResent ? "New code sent — check your inbox" : "Resend code"}
                    </button>
                  )}

                  {/* "Try another way": offer any OTHER enrolled method. */}
                  {otpMethods.filter((m) => m !== otpMethod).length > 0 && (
                    <div className="mt-3 border-t border-border/60 pt-3">
                      <p className="text-[12px] text-muted-foreground">
                        Try another way
                      </p>
                      <div className="mt-1.5 flex flex-wrap gap-2">
                        {otpMethods
                          .filter((m) => m !== otpMethod)
                          .map((m) => (
                            <button
                              key={m}
                              type="button"
                              onClick={() => switchMethod(m)}
                              disabled={switchingMethod}
                              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1.5 text-[12px] font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-60"
                            >
                              {switchingMethod && (
                                <Loader2 className="h-3 w-3 animate-spin" />
                              )}
                              {m === "totp"
                                ? "Use authenticator app"
                                : "Email me a code"}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={
                  isLoading ||
                  (needsOtp &&
                    (otpMethod === "totp" ? otp.length < 6 : otp.length !== 6))
                }
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
              >
                {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                {isLoading
                  ? mode === "login"
                    ? needsOtp
                      ? "Verifying…"
                      : "Logging in…"
                    : "Creating account…"
                  : mode === "login"
                    ? needsOtp
                      ? "Verify & log in"
                      : "Log in"
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
