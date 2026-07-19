"use client"

// The live contest arena. Self-contained (does NOT use the shared editorStore,
// since a round holds three problems side by side) — it keeps per-problem code,
// language and verdict in local state, and submits through /api/execute tagged
// with contestId so the server can validate the live window + membership.
//
// Copy protection: per the product decision, we BLOCK PASTE INTO the editor
// (and drag-drop of text) so contestants can't paste in an external solution,
// but we deliberately leave copy-OUT working so they can keep their own code.
import { useCallback, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import MonacoEditor, { type Monaco } from "@monaco-editor/react"
import type { editor as MonacoEditorNS } from "monaco-editor"
import { defineCodeForgeTheme } from "@/components/Editor"
import { ContestCountdown } from "@/components/contests/ContestCountdown"
import { DifficultyTag } from "@/components/Verdict"
import type { Language, SubmitResponse, EnqueueResponse, Difficulty } from "@/types"
import {
  Play,
  CheckCircle2,
  XCircle,
  Trophy,
  Ban,
  ClipboardX,
  Flag,
  Loader2,
} from "lucide-react"
import { endContest, enterContest } from "@/app/contests/actions"
import { pollSubmission } from "@/lib/poll"

export type ArenaProblem = {
  id: string
  slug: string
  title: string
  statement: string
  constraints: string | null
  difficulty: Difficulty
  starterCode: Partial<Record<Language, string>> | null
  sampleTestCases: { input: string; expected: string; isSample: boolean }[]
}

export type ArenaContest = {
  id: string
  title: string
  difficulty: Difficulty
  startsAt: string
  endsAt: string
}

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
]

const DEFAULT_CODE: Record<Language, string> = {
  javascript: `// JavaScript\n`,
  python: `# Python\n`,
  cpp: `// C++\n#include <iostream>\nint main() {\n  \n  return 0;\n}`,
  java: `// Java\npublic class Main {\n  public static void main(String[] args) {\n    \n  }\n}`,
}

function starterFor(
  problem: ArenaProblem,
  language: Language,
): string {
  return problem.starterCode?.[language] ?? DEFAULT_CODE[language]
}

export function ContestArena({
  contest,
  problems,
  initialSolvedIds,
}: {
  contest: ArenaContest
  problems: ArenaProblem[]
  initialSolvedIds: string[]
}) {
  const router = useRouter()
  const endMs = useMemo(() => new Date(contest.endsAt).getTime(), [contest.endsAt])

  const [activeIdx, setActiveIdx] = useState(0)
  const [language, setLanguage] = useState<Language>("cpp")

  // Per-problem, per-language code buffers. Seeded lazily from starter code.
  const [codeByKey, setCodeByKey] = useState<Record<string, string>>({})
  const [resultById, setResultById] = useState<Record<string, SubmitResponse | null>>(
    {},
  )
  const [runningId, setRunningId] = useState<string | null>(null)
  // Transient pipeline status per problem ("Queued..." / "Judging...").
  const [statusById, setStatusById] = useState<Record<string, string>>({})
  const [solved, setSolved] = useState<Set<string>>(new Set(initialSolvedIds))
  const [pasteBlocked, setPasteBlocked] = useState(false)
  const [confirmingEnd, setConfirmingEnd] = useState(false)
  const [endingPending, setEndingPending] = useState(false)
  const [endError, setEndError] = useState<string | null>(null)

  // Whether the round is still open. Recomputed each second by the tick below.
  const [ended, setEnded] = useState(() => Date.now() >= endMs)
  useEffect(() => {
    if (ended) return
    const id = setInterval(() => {
      if (Date.now() >= endMs) setEnded(true)
    }, 1000)
    return () => clearInterval(id)
  }, [ended, endMs])

  // Mark this user as a participant as soon as they open the live arena, so the
  // leaderboard can list entrants even before their first submission. Fire and
  // forget — a failure just means they appear once they submit.
  useEffect(() => {
    void enterContest(contest.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const active = problems[activeIdx]
  const keyFor = useCallback(
    (problemId: string, lang: Language) => `${problemId}:${lang}`,
    [],
  )
  const activeKey = keyFor(active.id, language)
  const activeCode =
    codeByKey[activeKey] ?? starterFor(active, language)

  const setActiveCode = useCallback(
    (value: string) => {
      setCodeByKey((prev) => ({ ...prev, [activeKey]: value }))
    },
    [activeKey],
  )

  // Flash the "paste blocked" hint for a moment whenever a paste is caught.
  const flashPasteBlocked = useCallback(() => {
    setPasteBlocked(true)
    window.setTimeout(() => setPasteBlocked(false), 1800)
  }, [])

  // Monaco mount: wire paste/drop blocking. We attach native listeners in the
  // capture phase on the editor's DOM node so nothing downstream (including
  // Monaco's own paste handler) ever sees the event, and we also neuter the
  // paste keybinding + context-menu action for good measure.
  const handleMount = useCallback(
    (editor: MonacoEditorNS.IStandaloneCodeEditor, monaco: Monaco) => {
      const dom = editor.getDomNode()
      if (dom) {
        const block = (e: Event) => {
          e.preventDefault()
          e.stopPropagation()
          flashPasteBlocked()
        }
        dom.addEventListener("paste", block, true)
        dom.addEventListener("drop", block, true)
        dom.addEventListener("dragover", (e) => e.preventDefault(), true)
      }
      // Override Ctrl/Cmd+V and Shift+Insert so the keyboard paste path is a
      // no-op too (some browsers fire the command without a paste event).
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyV, () =>
        flashPasteBlocked(),
      )
      editor.addCommand(monaco.KeyMod.Shift | monaco.KeyCode.Insert, () =>
        flashPasteBlocked(),
      )
    },
    [flashPasteBlocked],
  )

  const submit = useCallback(async () => {
    if (ended || runningId) return
    const problem = active
    setRunningId(problem.id)
    setResultById((prev) => ({ ...prev, [problem.id]: null }))
    setStatusById((prev) => ({ ...prev, [problem.id]: "Queued..." }))
    try {
      // Enqueue: the route validates the contest window + membership and
      // returns immediately. createdAt (set at enqueue) is what the leaderboard
      // penalty/timing math uses, so judging a beat later stays fair.
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problemId: problem.id,
          code: activeCode,
          language,
          contestId: contest.id,
        }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }))
        throw new Error(err.error || "Request failed")
      }
      const { submissionId }: EnqueueResponse = await res.json()

      const data = await pollSubmission(submissionId, {
        onStatus: (st) =>
          setStatusById((prev) => ({
            ...prev,
            [problem.id]: st === "RUNNING" ? "Judging..." : "Queued...",
          })),
      })
      setResultById((prev) => ({ ...prev, [problem.id]: data }))
      if (data.verdict === "ACCEPTED") {
        setSolved((prev) => new Set(prev).add(problem.id))
        // The accepted solve also counts for normal practice progress + XP on
        // the server; refresh so profile/topics reflect it on next navigation.
        router.refresh()
      }
    } catch (error) {
      setResultById((prev) => ({
        ...prev,
        [problem.id]: {
          status: "ERROR",
          verdict: "RUNTIME_ERROR",
          testResults: [
            {
              input: "",
              expected: "",
              actual: error instanceof Error ? error.message : "Unknown error",
              passed: false,
              isSample: false,
            },
          ],
          runtimeMs: null,
        },
      }))
    } finally {
      setRunningId(null)
      setStatusById((prev) => {
        const next = { ...prev }
        delete next[problem.id]
        return next
      })
    }
  }, [active, activeCode, contest.id, ended, language, router, runningId])

  const activeResult = resultById[active.id] ?? null
  const isRunningActive = runningId === active.id
  const activeStatus = statusById[active.id]
  const solvedCount = solved.size

  const endRound = useCallback(async () => {
    setEndingPending(true)
    setEndError(null)
    try {
      const res = await endContest(contest.id)
      if (!res.ok) {
        setEndError(res.error)
        setEndingPending(false)
        return
      }
      // The server recorded finishedAt; refreshing flips the page (a server
      // component) into the results view, since it now sees this user finished.
      router.refresh()
    } catch {
      setEndError("Could not end the contest. Try again.")
      setEndingPending(false)
    }
  }, [contest.id, router])

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-ink">
      {/* Header bar: title, progress, live timer */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-edge px-4">
        <div className="flex items-center gap-3">
          <Link
            href="/contests"
            className="text-sm text-fg-muted transition-colors hover:text-white"
          >
            ← Contests
          </Link>
          <div className="flex items-center gap-2">
            <Trophy size={16} className="text-brand" />
            <span className="text-sm font-semibold text-white">
              {contest.title}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-fg-muted">
            Solved{" "}
            <span className="font-mono text-ac">{solvedCount}</span>
            <span className="text-fg-faint"> / {problems.length}</span>
          </span>
          {!ended && (
            <button
              onClick={() => setConfirmingEnd(true)}
              className="inline-flex items-center gap-1.5 rounded-md border border-edge px-3 py-1.5 text-xs text-fg-muted transition-colors hover:border-wa/60 hover:text-wa"
            >
              <Flag size={13} />
              End contest
            </button>
          )}
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wide text-brand">
              {ended ? "Ended" : "Ends in"}
            </div>
            {ended ? (
              <span className="font-mono text-sm text-wa">00h 00m 00s</span>
            ) : (
              <ContestCountdown
                target={contest.endsAt}
                className="font-mono text-sm text-white"
              />
            )}
          </div>
        </div>
      </header>

      {/* Problem tabs A / B / C */}
      <div className="flex h-10 shrink-0 items-center gap-1 border-b border-edge px-4">
        {problems.map((p, i) => {
          const isActive = i === activeIdx
          const isSolved = solved.has(p.id)
          return (
            <button
              key={p.id}
              onClick={() => setActiveIdx(i)}
              className={`flex items-center gap-1.5 rounded-md px-3 py-1 text-sm transition-colors ${
                isActive
                  ? "bg-edge/60 text-white"
                  : "text-fg-muted hover:text-white"
              }`}
            >
              <span className="font-mono text-xs text-fg-faint">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="max-w-[160px] truncate">{p.title}</span>
              {isSolved && (
                <CheckCircle2 size={13} className="shrink-0 text-ac" />
              )}
            </button>
          )
        })}
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {/* Statement panel */}
        <div className="w-[420px] shrink-0 overflow-auto border-r border-edge px-6 py-6">
          <div className="mb-4 flex items-center gap-3">
            <h1 className="text-lg font-semibold text-white">{active.title}</h1>
            <DifficultyTag difficulty={active.difficulty} />
          </div>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-fg-dim">
            {active.statement}
          </p>

          {active.constraints && (
            <div className="mt-6">
              <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-fg-muted">
                Constraints
              </h2>
              <p className="whitespace-pre-wrap font-mono text-sm text-fg-muted">
                {active.constraints}
              </p>
            </div>
          )}

          {active.sampleTestCases.length > 0 && (
            <div className="mt-6">
              <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-fg-muted">
                Examples
              </h2>
              <div className="flex flex-col gap-3">
                {active.sampleTestCases.map((tc, i) => (
                  <div
                    key={i}
                    className="rounded-md border border-edge p-3 font-mono text-xs"
                  >
                    <p className="mb-1 text-fg-faint">Input</p>
                    <pre className="mb-2 whitespace-pre-wrap text-fg">
                      {tc.input}
                    </pre>
                    <p className="mb-1 text-fg-faint">Output</p>
                    <pre className="whitespace-pre-wrap text-ac">
                      {tc.expected}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Editor + output */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {/* Editor toolbar */}
          <div className="flex h-10 shrink-0 items-center justify-between border-b border-edge px-4">
            <div className="flex items-center gap-2">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="rounded-md border border-edge bg-ink-deep px-2 py-1 text-xs text-fg-muted outline-none"
              >
                {LANGUAGES.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wide text-fg-faint">
                <ClipboardX size={11} />
                Paste disabled
              </span>
              {pasteBlocked && (
                <span className="rounded bg-wa/15 px-2 py-0.5 text-[11px] text-wa">
                  Pasting is disabled during the contest
                </span>
              )}
            </div>
          </div>

          {/* Editor */}
          <div className="min-h-0 flex-1 overflow-hidden">
            <MonacoEditor
              key={active.id}
              height="100%"
              language={language === "cpp" ? "cpp" : language}
              value={activeCode}
              onChange={(v) => setActiveCode(v ?? "")}
              beforeMount={defineCodeForgeTheme}
              onMount={handleMount}
              theme="codeforge-dark"
              options={{
                fontSize: 14,
                fontFamily:
                  "var(--font-jetbrains-mono), 'JetBrains Mono', Consolas, monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                wordWrap: "off",
                lineHeight: 1.7,
                padding: { top: 16, bottom: 16 },
                cursorStyle: "block",
                smoothScrolling: true,
                automaticLayout: true,
                readOnly: ended,
              }}
            />
          </div>

          {/* Output / submit */}
          <div className="flex h-56 flex-col border-t border-edge bg-ink-deep">
            <div className="flex h-10 items-center justify-between px-4">
              <span className="text-xs font-medium uppercase tracking-[0.15em] text-fg-muted">
                Output
              </span>
              <button
                onClick={submit}
                disabled={ended || isRunningActive}
                className="flex items-center gap-2 rounded-lg bg-brand px-4 py-1.5 text-sm text-white transition-colors hover:bg-brand-bright disabled:cursor-not-allowed disabled:opacity-50"
              >
                {ended ? (
                  <>
                    <Ban size={14} />
                    Contest ended
                  </>
                ) : (
                  <>
                    <Play size={14} />
                    {isRunningActive ? "Running..." : "Submit"}
                  </>
                )}
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4 font-mono text-sm">
              {!activeResult && !isRunningActive && (
                <p className="text-fg-faint">
                  {ended
                    ? "This contest has ended. Submissions are closed."
                    : "Press Submit to run your code against the test cases..."}
                </p>
              )}
              {isRunningActive && (
                <p className="animate-pulse text-fg-muted">
                  {activeStatus ?? "Running test cases..."}
                </p>
              )}
              {activeResult && (
                <div className="space-y-3">
                  {activeResult.verdict === "ACCEPTED" ? (
                    <div className="flex items-center gap-2 text-ac">
                      <CheckCircle2 size={16} />
                      <span className="font-medium">
                        Accepted — all test cases passed
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-wa">
                      <XCircle size={16} />
                      <span className="font-medium">
                        {activeResult.verdict.replace(/_/g, " ")}
                      </span>
                    </div>
                  )}
                  {activeResult.testResults.map((test, i) => (
                    <div key={i} className="rounded-md border border-edge p-3">
                      <div className="mb-2 flex items-center gap-2">
                        {test.passed ? (
                          <CheckCircle2 size={14} className="text-ac" />
                        ) : (
                          <XCircle size={14} className="text-wa" />
                        )}
                        <span className="text-xs text-fg-muted">
                          Test case {i + 1}
                          {test.isSample ? " (sample)" : ""}
                        </span>
                      </div>
                      {(test.isSample || !test.passed) && (
                        <div className="grid grid-cols-3 gap-3 text-xs">
                          <div>
                            <p className="mb-1 text-fg-faint">Input</p>
                            <pre className="whitespace-pre-wrap text-fg">
                              {test.input}
                            </pre>
                          </div>
                          <div>
                            <p className="mb-1 text-fg-faint">Expected</p>
                            <pre className="whitespace-pre-wrap text-ac">
                              {test.expected}
                            </pre>
                          </div>
                          <div>
                            <p className="mb-1 text-fg-faint">Your output</p>
                            <pre
                              className={`whitespace-pre-wrap ${
                                test.passed ? "text-ac" : "text-wa"
                              }`}
                            >
                              {test.actual}
                            </pre>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  {activeResult.runtimeMs !== null && (
                    <p className="text-xs text-[#55556A]">
                      Runtime: {activeResult.runtimeMs}ms
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* End-contest confirmation overlay */}
      {confirmingEnd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-sm rounded-xl border border-edge bg-ink-deep p-5">
            <div className="mb-2 flex items-center gap-2">
              <Flag size={16} className="text-wa" />
              <h2 className="text-sm font-semibold text-white">
                End the contest now?
              </h2>
            </div>
            <p className="text-sm text-fg-muted">
              You&apos;ve solved{" "}
              <span className="font-mono text-ac">{solvedCount}</span> of{" "}
              {problems.length}. Ending now locks in your time and score — you
              won&apos;t be able to submit again, even if the timer is still
              running. Your final rank and XP appear next.
            </p>
            {endError && (
              <p className="mt-2 text-xs text-wa">{endError}</p>
            )}
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setConfirmingEnd(false)}
                disabled={endingPending}
                className="rounded-md px-3 py-1.5 text-sm text-fg-muted transition-colors hover:text-white disabled:opacity-50"
              >
                Keep solving
              </button>
              <button
                onClick={endRound}
                disabled={endingPending}
                className="inline-flex items-center gap-1.5 rounded-md bg-wa px-4 py-1.5 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
              >
                {endingPending ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Ending...
                  </>
                ) : (
                  <>
                    <Flag size={14} />
                    End &amp; see results
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
