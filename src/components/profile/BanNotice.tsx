"use client"

// The banned-user notice shown at the top of their own profile. A banned user
// can still sign in and reach /profile, but every action-bearing route is
// closed to them (see proxy.ts). This is the single message the user sees:
// why they're banned and — for a timed ban — a live countdown to reinstatement.
import { useEffect, useState } from "react"
import { Ban } from "lucide-react"

// Break a millisecond span into d/h/m/s. Never negative.
function parts(ms: number) {
  const clamped = Math.max(0, ms)
  const totalSeconds = Math.floor(clamped / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

export function BanNotice({
  reason,
  bannedUntil,
}: {
  reason: string | null
  // ISO string for a timed ban, or null for a permanent one.
  bannedUntil: string | null
}) {
  const permanent = bannedUntil === null
  const target = bannedUntil ? new Date(bannedUntil).getTime() : null

  // Tick every second while a timed ban is counting down. `now` starts null so
  // server and first client render agree (avoids hydration mismatch); the real
  // clock is read in the effect, on the client only.
  const [now, setNow] = useState<number | null>(null)

  useEffect(() => {
    if (permanent || target === null) return
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [permanent, target])

  const remaining = target !== null && now !== null ? target - now : null
  const expired = remaining !== null && remaining <= 0
  const p = remaining !== null ? parts(remaining) : null

  return (
    <section
      role="alert"
      className="rounded-2xl border border-red-500/40 bg-red-500/[0.07] p-6 backdrop-blur-sm"
    >
      <div className="flex items-start gap-4">
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-red-500/15 text-red-300">
          <Ban size={22} />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="font-display text-xl tracking-tight text-red-200">
            {permanent
              ? "Your account is banned"
              : expired
                ? "Your ban has ended"
                : "Your account is suspended"}
          </h2>

          <p className="mt-1.5 text-sm text-red-100/80">
            {permanent
              ? "This is a permanent ban. You can view your profile, but you cannot open problems, use the editor, or submit solutions."
              : expired
                ? "Your restrictions have been lifted. Refresh the page to regain full access."
                : "While suspended you can view your profile, but you cannot open problems, use the editor, or submit solutions."}
          </p>

          {reason ? (
            <p className="mt-3 text-sm text-red-100/90">
              <span className="font-medium text-red-200">Reason: </span>
              {reason}
            </p>
          ) : null}

          {!permanent && !expired ? (
            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-wider text-red-300/70">
                Time remaining
              </p>
              {p ? (
                <div className="mt-2 flex gap-2">
                  {[
                    { v: p.days, l: "days" },
                    { v: p.hours, l: "hrs" },
                    { v: p.minutes, l: "min" },
                    { v: p.seconds, l: "sec" },
                  ].map((u) => (
                    <div
                      key={u.l}
                      className="min-w-14 rounded-xl border border-red-500/30 bg-background/50 px-3 py-2 text-center"
                    >
                      <div className="font-display text-2xl tabular-nums text-red-100">
                        {String(u.v).padStart(2, "0")}
                      </div>
                      <div className="font-mono text-[9px] uppercase tracking-wider text-red-300/60">
                        {u.l}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                // Pre-hydration / before the first tick: show the target instant
                // so there's never an empty flash. Date formatting is locale-
                // dependent (server vs browser differ), so suppress the one-frame
                // hydration diff — the countdown replaces this on the next tick.
                <p
                  className="mt-2 text-sm text-red-100/80"
                  suppressHydrationWarning
                >
                  Until {new Date(bannedUntil!).toLocaleString()}
                </p>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
