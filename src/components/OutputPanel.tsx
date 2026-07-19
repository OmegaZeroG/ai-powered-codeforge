"use client"

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
import { SubmitResponse } from "@/types"
import { writeDraft } from "@/lib/draft"
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
    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemId, code, language }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: "Request failed" }))
        throw new Error(err.error || "Request failed")
      }
      const data: SubmitResponse = await res.json()
      setResult(data)
      // An accepted run just changed solved-status / streak / XP / tasks on the
      // server (the route revalidated those pages). Refresh so this tab reflects
      // it too, without the user needing a hard reload.
      if (data.verdict === "ACCEPTED") {
        router.refresh()
      }
    } catch (error) {
      setResult({
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
    }
  }

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
          {hasFailure && (
            <button
              onClick={() => {
                if (!isPanelOpen) togglePanel()
              }}
              className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-brand/10 text-brand hover:bg-brand/25 transition-colors"
            >
              <Sparkles size={12} />
              Explain with AI
            </button>
          )}
          <button
            onClick={clearResult}
            className="text-fg-faint hover:text-fg-muted transition-colors"
          >
            <Trash2 size={14} />
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning || !problemId}
            className="flex items-center gap-2 text-sm px-4 py-1.5 rounded-lg bg-brand hover:bg-brand-bright text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={14} />
            {isRunning ? "Running..." : "Submit"}
          </button>
        </div>
      </div>

      {/* Output content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {!result && !isRunning && (
          <p className="text-fg-faint">
            {problemId
              ? "Press Submit to run your code against the test cases..."
              : "Select a problem to start solving."}
          </p>
        )}
        {isRunning && (
          <p className="text-fg-muted animate-pulse">Running test cases...</p>
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
      </div>
    </div>
  )
}
