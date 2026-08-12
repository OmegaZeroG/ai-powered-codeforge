import { AlertTriangle } from "lucide-react"
import type { Difficulty, Verdict } from "@/types"

/* ---------------------------------------------------------------------------
   Verdict + difficulty language — the single source of truth.
   Judges speak in stamps: short mono codes, sharp corners, verdict colors.
--------------------------------------------------------------------------- */

export const VERDICT_META: Record<
  Verdict,
  { code: string; label: string; color: string }
> = {
  PENDING: { code: "···", label: "Pending", color: "fg-muted" },
  ACCEPTED: { code: "AC", label: "Accepted", color: "ac" },
  WRONG_ANSWER: { code: "WA", label: "Wrong Answer", color: "wa" },
  RUNTIME_ERROR: { code: "RE", label: "Runtime Error", color: "wa" },
  TIME_LIMIT_EXCEEDED: { code: "TLE", label: "Time Limit Exceeded", color: "tle" },
  COMPILE_ERROR: { code: "CE", label: "Compile Error", color: "wa" },
}

const STAMP_COLOR: Record<string, string> = {
  ac: "text-ac border-ac/50 bg-ac/10",
  wa: "text-wa border-wa/50 bg-wa/10",
  tle: "text-tle border-tle/50 bg-tle/10",
  "fg-muted": "text-fg-muted border-edge bg-raised",
}

/** Compact verdict stamp: `AC` / `WA` / `TLE` chip + full label beside it. */
export function VerdictStamp({
  verdict,
  showLabel = true,
}: {
  verdict: Verdict
  showLabel?: boolean
}) {
  const meta = VERDICT_META[verdict]
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className={`font-mono text-[10px] font-bold tracking-[0.15em] uppercase border rounded-[3px] px-1.5 py-px ${STAMP_COLOR[meta.color]}`}
      >
        {meta.code}
      </span>
      {showLabel && (
        <span
          className={`text-xs font-medium ${
            meta.color === "ac"
              ? "text-ac"
              : meta.color === "wa"
                ? "text-wa"
                : meta.color === "tle"
                  ? "text-tle"
                  : "text-fg-muted"
          }`}
        >
          {meta.label}
        </span>
      )}
    </span>
  )
}

// Only verdicts that are meaningfully "this specific test case failed" get a
// hidden-test note — a compile error isn't attributable to any one test case,
// so it's excluded (the CE badge + stderr already explain it on its own).
const HIDDEN_FAILURE_COPY: Partial<Record<Verdict, string>> = {
  WRONG_ANSWER: "produced the wrong output on a hidden test case",
  RUNTIME_ERROR: "crashed on a hidden test case",
  TIME_LIMIT_EXCEEDED: "timed out on a hidden test case",
}

/** Shown when every *visible* (sample) test case passed but the verdict still
 *  failed — makes clear the failure is on a hidden test case rather than
 *  leaving people staring at all-green samples next to a bare "Wrong Answer".
 *  Never reveals the hidden test's input/expected/actual. */
export function HiddenTestFailureNote({ verdict }: { verdict: Verdict }) {
  const copy = HIDDEN_FAILURE_COPY[verdict]
  if (!copy) return null
  return (
    <div className="flex items-start gap-2 rounded-md border border-wa/40 bg-wa/5 p-3">
      <AlertTriangle size={14} className="mt-0.5 shrink-0 text-wa" />
      <p className="text-xs text-fg-dim">
        All sample test cases passed — your solution {copy}. Hidden test
        cases aren&apos;t shown, so their input and expected output stay
        hidden.
      </p>
    </div>
  )
}

/** The big rubber stamp for the Accepted moment. Pair with `.stamp-in`. */
export function AcceptedStamp({
  passedCount,
  totalCount,
  runtimeMs,
}: {
  passedCount: number
  totalCount: number
  runtimeMs: number | null
}) {
  return (
    <div className="stamp-in inline-flex flex-col items-center gap-1 border-2 border-ac/70 rounded-[4px] px-6 py-3 bg-ac/10 select-none">
      <span className="font-mono text-xl font-bold tracking-[0.3em] uppercase text-ac">
        Accepted
      </span>
      <span className="font-mono text-[11px] text-ac/80 tracking-wider">
        {passedCount}/{totalCount} test cases
        {runtimeMs !== null ? ` · ${runtimeMs}ms` : ""}
      </span>
    </div>
  )
}

/* ------------------------------------------------------------------------- */

const DIFFICULTY_META: Record<Difficulty, { label: string; className: string }> = {
  EASY: { label: "Easy", className: "text-ac border-ac/40" },
  MEDIUM: { label: "Medium", className: "text-tle border-tle/40" },
  HARD: { label: "Hard", className: "text-wa border-wa/40" },
}

/** Difficulty as an outlined pill in the shared verdict color language. */
export function DifficultyTag({ difficulty }: { difficulty: Difficulty }) {
  const meta = DIFFICULTY_META[difficulty]
  return (
    <span
      className={`font-mono text-[10px] font-medium uppercase tracking-[0.12em] border rounded-full px-2.5 py-0.5 ${meta.className}`}
    >
      {meta.label}
    </span>
  )
}
