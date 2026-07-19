"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useEditorStore } from "@/stores/editorStore"
import { useAIStore } from "@/stores/aiStore"
import {
  Play,
  Trash2,
  Sparkles,
  CheckCircle2,
  XCircle,
  Terminal,
} from "lucide-react"
import { EnqueueResponse, RunResponse } from "@/types"
import { writeDraft } from "@/lib/draft"
import { pollSubmission } from "@/lib/poll"
import { VerdictStamp, AcceptedStamp } from "@/components/Verdict"

export function OutputPanel() {
  const {
    result,
    isRunning,
    clearResult,
    problemId,
    code,
    language,
    setResult,
    setIsRunning,
    saveMode,
    problemStarterCode,
  } = useEditorStore()
  const { isPanelOpen, togglePanel } = useAIStore()
  const router = useRouter()
  // Transient pipeline status ("Queued..." / "Judging...") shown while polling.
  const [statusText, setStatusText] = useState<string | null>(null)
  // Scratchpad mode (no problem loaded): custom stdin + raw run output.
  const [stdin, setStdin] = useState("")
  const [runOutput, setRunOutput] = useState<RunResponse | null>(null)
  const [runError, setRunError] = useState<string | null>(null)
  const isScratchpad = !problemId

  const handleRun = async () => {
    if (!problemId) return
    // "Save after each submission": persist the exact code we're about to run,
    // so the last submitted version is always kept. The pristine guard skips a
    // save when the code is still the untouched starter.
    if (saveMode === "submit") {
      writeDraft(problemId, language, code, problemStarterCode?.[language])
    }
    setIsRunning(true)
    setResult(null)
    setStatusText("Queued...")
    try {
      // Enqueue the submission; the route returns immediately with an id.
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId, code, language }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }))
        throw new Error(err.error || "Request failed")
      }
      const { submissionId }: EnqueueResponse = await res.json()

      // Poll until the worker judges it. onStatus drives the "Queued.../
      // Judging..." text; pollSubmission resolves on DONE or ERROR.
      const data = await pollSubmission(submissionId, {
        onStatus: (st) =>
          setStatusText(st === "RUNNING" ? "Judging..." : "Queued..."),
      })
      setResult(data)
      // An accepted run just changed solved-status / streak / XP / tasks on the
      // server. Refresh so this tab reflects it too, without a hard reload.
      if (data.verdict === "ACCEPTED") {
        router.refresh()
      }
    } catch (error) {
      setResult({
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
      })
    } finally {
      setIsRunning(false)
      setStatusText(null)
    }
  }

  // Scratchpad run: no problem, no test cases. Execute the code once against
  // the custom stdin box and show raw stdout/stderr. Uses the synchronous
  // /api/run endpoint (nothing to queue).
  const handleScratchRun = async () => {
    if (!code.trim()) return
    setIsRunning(true)
    setRunOutput(null)
    setRunError(null)
    setStatusText("Running...")
    try {
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language, stdin }),
      })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data.error || "Run failed")
      }
      setRunOutput(data as RunResponse)
    } catch (error) {
      setRunError(
        error instanceof Error ? error.message : "Run failed"
      )
    } finally {
      setIsRunning(false)
      setStatusText(null)
    }
  }

  const handleClear = () => {
    if (isScratchpad) {
      setRunOutput(null)
      setRunError(null)
    } else {
      clearResult()
    }
  }

  const scratchHasError =
    isScratchpad &&
    (runError !== null ||
      (runOutput !== null &&
        (runOutput.compileFailed ||
          runOutput.timedOut ||
          runOutput.exitCode !== 0 ||
          runOutput.stderr.trim() !== "")))

  const hasFailure =
    result && result.verdict !== "PENDING" && result.verdict !== "ACCEPTED"

  return (
    <div className="h-full bg-ink-deep flex flex-col">
      {/* Header */}
      <div className="h-10 border-t border-edge flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Terminal size={13} className="text-fg-faint" aria-hidden />
          <span className="text-fg-muted text-xs font-medium uppercase tracking-[0.15em]">
            Output
          </span>
          {result && <VerdictStamp verdict={result.verdict} />}
        </div>
        <div className="flex items-center gap-2">
          {(hasFailure || scratchHasError) && (
            <button
              onClick={() => {
                if (!isPanelOpen) togglePanel()
              }}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-brand/10 text-brand hover:bg-brand/25 transition-colors"
            >
              <Sparkles size={12} />
              {isScratchpad ? "Review with AI" : "Explain with AI"}
            </button>
          )}
          <button
            onClick={handleClear}
            className="text-fg-faint hover:text-fg-muted transition-colors"
          >
            <Trash2 size={14} />
          </button>
          <button
            onClick={isScratchpad ? handleScratchRun : handleRun}
            disabled={isRunning || (isScratchpad ? !code.trim() : !problemId)}
            className="flex items-center gap-2 text-sm px-4 py-1.5 rounded-lg bg-brand hover:bg-brand-bright text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={14} />
            {isRunning ? "Running..." : isScratchpad ? "Run" : "Submit"}
          </button>
        </div>
      </div>

      {/* Scratchpad: stdin box (no problem loaded) */}
      {isScratchpad && (
        <div className="shrink-0 px-4 pt-3">
          <label className="block text-[10px] font-medium uppercase tracking-[0.15em] text-fg-faint mb-1.5">
            Standard input (stdin)
          </label>
          <textarea
            value={stdin}
            onChange={(e) => setStdin(e.target.value)}
            placeholder="Type input your program reads from stdin..."
            rows={2}
            spellCheck={false}
            className="w-full resize-y bg-raised text-fg text-xs font-mono border border-edge rounded-lg px-3 py-2 focus:outline-none focus:border-brand placeholder:text-fg-faint max-h-32"
          />
        </div>
      )}

      {/* Output content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {/* --- Scratchpad output --- */}
        {isScratchpad ? (
          <>
            {!runOutput && !runError && !isRunning && (
              <p className="text-fg-faint">
                Press Run to execute your code with the input above.
              </p>
            )}
            {isRunning && (
              <p className="text-fg-muted animate-pulse">
                {statusText ?? "Running..."}
              </p>
            )}
            {runError && (
              <div className="border border-wa/40 rounded-md p-3">
                <p className="text-wa text-xs mb-1">Execution service error</p>
                <pre className="text-fg-dim whitespace-pre-wrap">{runError}</pre>
              </div>
            )}
            {runOutput && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-fg-faint">
                  <span>
                    Exit code:{" "}
                    <span
                      className={
                        runOutput.exitCode === 0 ? "text-ac" : "text-wa"
                      }
                    >
                      {runOutput.exitCode}
                    </span>
                  </span>
                  <span>Runtime: {runOutput.runtimeMs}ms</span>
                  {runOutput.timedOut && (
                    <span className="text-wa">Timed out (5s limit)</span>
                  )}
                  {runOutput.compileFailed && (
                    <span className="text-wa">Compile error</span>
                  )}
                </div>
                {runOutput.stdout.trim() !== "" && (
                  <div>
                    <p className="text-fg-faint text-xs mb-1">stdout</p>
                    <pre className="text-fg whitespace-pre-wrap">
                      {runOutput.stdout}
                    </pre>
                  </div>
                )}
                {runOutput.stderr.trim() !== "" && (
                  <div>
                    <p className="text-fg-faint text-xs mb-1">stderr</p>
                    <pre className="text-wa whitespace-pre-wrap">
                      {runOutput.stderr}
                    </pre>
                  </div>
                )}
                {runOutput.stdout.trim() === "" &&
                  runOutput.stderr.trim() === "" && (
                    <p className="text-fg-faint text-xs">
                      (no output)
                    </p>
                  )}
              </div>
            )}
          </>
        ) : (
        <>
        {!result && !isRunning && (
          <p className="text-fg-faint">
            {problemId
              ? "Press Submit to run your code against the test cases..."
              : "Select a problem to start solving."}
          </p>
        )}
        {isRunning && (
          <p className="text-fg-muted animate-pulse">
            {statusText ?? "Running test cases..."}
          </p>
        )}
        {result && (
          <div className="space-y-3">
            {/* The Accepted moment: the judge stamps the submission.
                Re-mounts on every submit (result is cleared first), so the
                thunk replays; reduced-motion pins the final frame. */}
            {result.verdict === "ACCEPTED" && (
              <div className="py-3 flex justify-center">
                <AcceptedStamp
                  passedCount={result.testResults.filter((t) => t.passed).length}
                  totalCount={result.testResults.length}
                  runtimeMs={result.runtimeMs}
                />
              </div>
            )}
            {result.testResults.map((test, i) => (
              <div
                key={i}
                className="border border-edge rounded-md p-3"
              >
                <div className="flex items-center gap-2 mb-2">
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
                      <p className="text-fg-faint mb-1">Input</p>
                      <pre className="text-fg whitespace-pre-wrap">
                        {test.input}
                      </pre>
                    </div>
                    <div>
                      <p className="text-fg-faint mb-1">Expected</p>
                      <pre className="text-ac whitespace-pre-wrap">
                        {test.expected}
                      </pre>
                    </div>
                    <div>
                      <p className="text-fg-faint mb-1">Your output</p>
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
            {result.runtimeMs !== null && (
              <p className="text-[#55556A] text-xs">
                Runtime: {result.runtimeMs}ms
              </p>
            )}
          </div>
        )}
        </>
        )}
      </div>
    </div>
  )
}
