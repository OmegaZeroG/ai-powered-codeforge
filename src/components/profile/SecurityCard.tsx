"use client"

import { useState } from "react"
import Image from "next/image"
import {
  ShieldCheck,
  Shield,
  Loader2,
  Smartphone,
  Mail,
  Copy,
  Check,
  KeyRound,
  Star,
} from "lucide-react"

type Method = "email" | "totp"

// Account-security card. Two 2FA methods can be enrolled at once and coexist:
//   • email  — a one-time code mailed each login (no setup ceremony)
//   • totp   — an authenticator app; needs a QR-scan enrollment + backup codes
// One enrolled method is the "primary" (challenged first at login); the other is
// reachable at login via "Try another way". OAuth-only accounts see no controls.
export function SecurityCard({
  initialEmailEnabled,
  initialTotpEnabled,
  initialPrimary,
  initialBackupCount,
  isPasswordAccount,
}: {
  initialEmailEnabled: boolean
  initialTotpEnabled: boolean
  initialPrimary: string | null
  initialBackupCount: number
  isPasswordAccount: boolean
}) {
  const [emailOn, setEmailOn] = useState(initialEmailEnabled)
  const [totpOn, setTotpOn] = useState(initialTotpEnabled)
  const [primary, setPrimary] = useState<Method | null>(
    initialPrimary === "totp" || initialPrimary === "email"
      ? initialPrimary
      : null,
  )
  const [backupCount, setBackupCount] = useState(initialBackupCount)
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  // TOTP enrollment sub-state.
  const [totpStep, setTotpStep] = useState<"idle" | "scan" | "codes">("idle")
  const [qrDataUrl, setQrDataUrl] = useState("")
  const [secret, setSecret] = useState("")
  const [totpCode, setTotpCode] = useState("")
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  // Disable / regenerate confirmation sub-state. `disarmMode` picks which action
  // the entered code confirms; null means the dialog is closed.
  const [disarmCode, setDisarmCode] = useState("")
  const [disarmMode, setDisarmMode] = useState<"disable" | "regen" | null>(null)

  const anyOn = emailOn || totpOn

  async function post(url: string, body?: unknown) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      ...(body ? { body: JSON.stringify(body) } : {}),
    })
    const data = await res.json().catch(() => null)
    return { ok: res.ok, data }
  }

  // Apply the server's reconciled primary (returned by every mutating route) so
  // the UI never drifts from the actual account state.
  function syncPrimary(data: { primary?: string | null } | null) {
    if (!data) return
    const p = data.primary
    setPrimary(p === "email" || p === "totp" ? p : null)
  }

  // --- Email method: independent on/off toggle ---
  async function toggleEmail() {
    if (busy) return
    setBusy(true)
    setError(null)
    const next = !emailOn
    const { ok, data } = await post("/api/account/2fa/email", { enable: next })
    if (!ok) {
      setError(data?.error || "Couldn't update email two-factor. Try again.")
    } else {
      setEmailOn(next)
      syncPrimary(data)
    }
    setBusy(false)
  }

  // --- TOTP method: setup → scan → verify → backup codes ---
  async function startTotp() {
    if (busy) return
    setBusy(true)
    setError(null)
    const { ok, data } = await post("/api/account/2fa/totp/setup")
    if (!ok) {
      setError(data?.error || "Couldn't start authenticator setup.")
    } else {
      setQrDataUrl(data.qrDataUrl || "")
      setSecret(data.secret || "")
      setTotpCode("")
      setTotpStep("scan")
    }
    setBusy(false)
  }

  async function confirmTotp() {
    if (busy || totpCode.length !== 6) return
    setBusy(true)
    setError(null)
    const { ok, data } = await post("/api/account/2fa/totp/enable", {
      code: totpCode,
    })
    if (!ok) {
      setError(data?.error || "That code is incorrect. Try again.")
    } else {
      setBackupCodes(data.backupCodes || [])
      setBackupCount((data.backupCodes || []).length)
      setTotpOn(true)
      setPrimary("totp")
      setTotpStep("codes")
    }
    setBusy(false)
  }

  async function disableTotp() {
    if (busy || disarmCode.length < 6) return
    setBusy(true)
    setError(null)
    const { ok, data } = await post("/api/account/2fa/totp/disable", {
      code: disarmCode,
    })
    if (!ok) {
      setError(data?.error || "That code is incorrect.")
    } else {
      setTotpOn(false)
      setBackupCount(0)
      syncPrimary(data)
      setDisarmMode(null)
      setDisarmCode("")
    }
    setBusy(false)
  }

  async function regenerateCodes() {
    if (busy || disarmCode.length !== 6) return
    setBusy(true)
    setError(null)
    const { ok, data } = await post("/api/account/2fa/totp/backup-codes", {
      code: disarmCode,
    })
    if (!ok) {
      setError(data?.error || "That code is incorrect.")
    } else {
      setBackupCodes(data.backupCodes || [])
      setBackupCount((data.backupCodes || []).length)
      setDisarmMode(null)
      setDisarmCode("")
      setTotpStep("codes")
    }
    setBusy(false)
  }

  // --- Choose which enrolled method is challenged first at login ---
  async function makePrimary(method: Method) {
    if (busy || primary === method) return
    setBusy(true)
    setError(null)
    const { ok, data } = await post("/api/account/2fa/primary", { method })
    if (!ok) {
      setError(data?.error || "Couldn't update your primary method.")
    } else {
      syncPrimary(data)
    }
    setBusy(false)
  }

  function copyCodes() {
    navigator.clipboard?.writeText(backupCodes.join("\n")).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  function finishCodes() {
    setTotpStep("idle")
    setBackupCodes([])
  }

  // A "Primary" control only makes sense when BOTH methods are enrolled.
  const showPrimaryPicker = emailOn && totpOn

  return (
    <section className="rounded-2xl border border-border/70 bg-card/60 p-6 backdrop-blur-sm">
      <div className="flex items-start gap-3">
        <div
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
            anyOn
              ? "bg-primary/15 text-primary"
              : "bg-secondary text-muted-foreground"
          }`}
        >
          {anyOn ? <ShieldCheck size={18} /> : <Shield size={18} />}
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-lg tracking-tight text-foreground">
            Two-factor authentication
          </h2>

          {!isPasswordAccount ? (
            <p className="mt-1 text-sm text-muted-foreground">
              You sign in with a linked provider (Google/GitHub). Manage
              two-factor from that provider&apos;s security settings.
            </p>
          ) : (
            <>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a second step at login so a leaked password isn&apos;t enough
                to get in. You can turn on more than one — the primary is asked
                first, and you can switch at login.
              </p>

              {/* Backup-code sheet: shown right after enable or regenerate */}
              {totpStep === "codes" && backupCodes.length > 0 ? (
                <div className="mt-4 rounded-lg border border-primary/40 bg-primary/10 p-4">
                  <div className="flex items-center gap-2 text-foreground">
                    <KeyRound size={16} className="text-primary" />
                    <span className="text-sm font-medium">
                      Save your backup codes
                    </span>
                  </div>
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    Each code works once if you lose your authenticator. Store
                    them somewhere safe — you won&apos;t see them again.
                  </p>
                  <div className="mt-3 grid grid-cols-2 gap-2 rounded-md border border-border/70 bg-background/60 p-3 font-mono text-sm text-foreground">
                    {backupCodes.map((c) => (
                      <span key={c} className="tracking-widest">
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={copyCodes}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/50 px-3 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted"
                    >
                      {copied ? <Check size={13} /> : <Copy size={13} />}
                      {copied ? "Copied" : "Copy codes"}
                    </button>
                    <button
                      type="button"
                      onClick={finishCodes}
                      className="text-[13px] font-medium text-primary hover:underline"
                    >
                      I&apos;ve saved them
                    </button>
                  </div>
                </div>
              ) : totpStep === "scan" ? (
                /* QR enrollment step */
                <div className="mt-4 rounded-lg border border-border/70 bg-background/40 p-4">
                  <p className="text-[13px] text-muted-foreground">
                    Scan this with Google Authenticator, Authy, or 1Password —
                    then enter the 6-digit code it shows.
                  </p>
                  <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
                    {qrDataUrl ? (
                      <Image
                        src={qrDataUrl}
                        alt="Authenticator QR code"
                        width={176}
                        height={176}
                        unoptimized
                        className="rounded-lg border border-border bg-white p-2"
                      />
                    ) : null}
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
                        Or enter this key manually
                      </p>
                      <code className="mt-1 block break-all rounded-md border border-border/70 bg-background/60 px-2 py-1.5 font-mono text-xs text-foreground">
                        {secret}
                      </code>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        value={totpCode}
                        onChange={(e) =>
                          setTotpCode(
                            e.target.value.replace(/\D/g, "").slice(0, 6),
                          )
                        }
                        className="mt-3 w-full rounded-md border border-border bg-background/50 px-3 py-2 text-center font-mono text-lg tracking-[0.4em] text-foreground outline-none focus:border-primary/60"
                        placeholder="000000"
                      />
                      <div className="mt-3 flex items-center gap-3">
                        <button
                          type="button"
                          onClick={confirmTotp}
                          disabled={busy || totpCode.length !== 6}
                          className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
                        >
                          {busy && <Loader2 size={13} className="animate-spin" />}
                          Verify & turn on
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setTotpStep("idle")
                            setError(null)
                          }}
                          className="text-[13px] font-medium text-muted-foreground hover:text-foreground"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : disarmMode ? (
                /* Confirm-with-code step for disable or regenerate */
                <div className="mt-4 rounded-lg border border-border/70 bg-background/40 p-4">
                  <p className="text-[13px] text-muted-foreground">
                    {disarmMode === "disable"
                      ? "Enter a current authenticator code (or a backup code) to turn off the authenticator."
                      : "Enter a current authenticator code to generate a fresh set of backup codes. Your old codes stop working."}
                  </p>
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={9}
                    value={disarmCode}
                    onChange={(e) =>
                      setDisarmCode(
                        e.target.value.replace(/[^0-9a-zA-Z-]/g, "").slice(0, 9),
                      )
                    }
                    className="mt-2 w-40 rounded-md border border-border bg-background/50 px-3 py-2 text-center font-mono text-lg tracking-[0.3em] text-foreground outline-none focus:border-primary/60"
                    placeholder="000000"
                  />
                  <div className="mt-3 flex items-center gap-3">
                    {disarmMode === "disable" ? (
                      <button
                        type="button"
                        onClick={disableTotp}
                        disabled={busy || disarmCode.length < 6}
                        className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-4 py-2 text-[13px] font-medium text-white transition-all hover:brightness-110 disabled:opacity-60"
                      >
                        {busy && <Loader2 size={13} className="animate-spin" />}
                        Turn off authenticator
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={regenerateCodes}
                        disabled={busy || disarmCode.length !== 6}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-60"
                      >
                        {busy && <Loader2 size={13} className="animate-spin" />}
                        Generate new codes
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setDisarmMode(null)
                        setDisarmCode("")
                        setError(null)
                      }}
                      className="text-[13px] font-medium text-muted-foreground hover:text-foreground"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Default: method controls */
                <div className="mt-4 space-y-3">
                  {/* Email 2FA row */}
                  <div className="flex items-center justify-between rounded-lg border border-border/70 bg-background/40 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Mail size={16} className="text-muted-foreground" />
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          Email code
                          {showPrimaryPicker && primary === "email" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                              <Star size={9} className="fill-current" /> Primary
                            </span>
                          )}
                        </div>
                        <div className="text-[12px] text-muted-foreground">
                          A code sent to your inbox each login.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {showPrimaryPicker && primary !== "email" && (
                        <button
                          type="button"
                          onClick={() => makePrimary("email")}
                          disabled={busy}
                          className="text-[12px] font-medium text-muted-foreground transition-colors hover:text-primary disabled:opacity-60"
                        >
                          Make primary
                        </button>
                      )}
                      <button
                        type="button"
                        role="switch"
                        aria-checked={emailOn}
                        onClick={toggleEmail}
                        disabled={busy}
                        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors disabled:opacity-40 ${
                          emailOn ? "bg-primary" : "bg-secondary"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-background shadow transition-transform ${
                            emailOn ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Authenticator (TOTP) row */}
                  <div className="flex items-center justify-between rounded-lg border border-border/70 bg-background/40 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Smartphone size={16} className="text-muted-foreground" />
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                          Authenticator app
                          {showPrimaryPicker && primary === "totp" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-primary">
                              <Star size={9} className="fill-current" /> Primary
                            </span>
                          )}
                        </div>
                        <div className="text-[12px] text-muted-foreground">
                          {totpOn
                            ? `On · ${backupCount} backup code${
                                backupCount === 1 ? "" : "s"
                              } left`
                            : "Codes from Google Authenticator, Authy, etc."}
                        </div>
                      </div>
                    </div>
                    {totpOn ? (
                      <div className="flex items-center gap-2">
                        {showPrimaryPicker && primary !== "totp" && (
                          <button
                            type="button"
                            onClick={() => makePrimary("totp")}
                            disabled={busy}
                            className="text-[12px] font-medium text-muted-foreground transition-colors hover:text-primary disabled:opacity-60"
                          >
                            Make primary
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setDisarmMode("regen")
                            setError(null)
                          }}
                          disabled={busy}
                          className="rounded-full border border-border bg-background/50 px-3 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-60"
                        >
                          New codes
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setDisarmMode("disable")
                            setError(null)
                          }}
                          disabled={busy}
                          className="rounded-full border border-border bg-background/50 px-3 py-1.5 text-[13px] font-medium text-foreground transition-colors hover:bg-muted disabled:opacity-60"
                        >
                          Turn off
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={startTotp}
                        disabled={busy}
                        className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-[13px] font-medium text-primary-foreground transition-all hover:brightness-110 disabled:opacity-40"
                      >
                        {busy && <Loader2 size={13} className="animate-spin" />}
                        Set up
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          )}

          {error && <p className="mt-3 text-[13px] text-destructive">{error}</p>}
        </div>
      </div>
    </section>
  )
}
