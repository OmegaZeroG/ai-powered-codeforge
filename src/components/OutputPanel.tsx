"use client"

import { useEditorStore } from "@/stores/editorStore"
import { Play, Trash2, Sparkles, CheckCircle2, XCircle } from "lucide-react"
import { Verdict } from "@/types"

const VERDICT_LABEL: Record<Verdict, string> = {
  PENDING: "Pending",
  ACCEPTED: "Accepted",
  WRONG_ANSWER: "Wrong Answer",
  RUNTIME_ERROR: "Runtime Error",
  TIME_LIMIT_EXCEEDED: "Time Limit Exceeded",
  COMPILE_ERROR: "Compile Error",
}

const VERDICT_COLOR: Record<Verdict, string> = {
  PENDING: "text-[#8888A8]",
  ACCEPTED: "text-[#34D399]",
  WRONG_ANSWER: "text-[#F87171]",
  RUNTIME_ERROR: "text-[#F87171]",
  TIME_LIMIT_EXCEEDED: "text-[#FBBF24]",
  COMPILE_ERROR: "text-[#F87171]",
}

export function OutputPanel() {
  const { result, isRunning, clearResult, problemId } = useEditorStore()

  const handleRun = async () => {
    // wiring this in the next step (/api/execute)
  }

  const hasFailure =
    result && result.verdict !== "PENDING" && result.verdict !== "ACCEPTED"

  return (
    <div className="h-full bg-[#0D0D14] flex flex-col">
      {/* Header */}
      <div className="h-10 border-t border-[#2A2A38] flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-[#8888A8] text-xs font-medium uppercase tracking-wider">
            Output
          </span>
          {result && (
            <span
              className={`text-xs font-medium ${VERDICT_COLOR[result.verdict]}`}
            >
              · {VERDICT_LABEL[result.verdict]}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasFailure && (
            <button className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-[#7C6AF720] text-[#7C6AF7] hover:bg-[#7C6AF740] transition-colors">
              <Sparkles size={12} />
              Explain with AI
            </button>
          )}
          <button
            onClick={clearResult}
            className="text-[#55556A] hover:text-[#8888A8] transition-colors"
          >
            <Trash2 size={14} />
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning || !problemId}
            className="flex items-center gap-2 text-sm px-4 py-1.5 rounded-md bg-[#7C6AF7] hover:bg-[#9580FF] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={14} />
            {isRunning ? "Running..." : "Submit"}
          </button>
        </div>
      </div>

      {/* Output content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {!result && !isRunning && (
          <p className="text-[#55556A]">
            {problemId
              ? "Press Submit to run your code against the test cases..."
              : "Select a problem to start solving."}
          </p>
        )}
        {isRunning && (
          <p className="text-[#8888A8] animate-pulse">Running test cases...</p>
        )}
        {result && (
          <div className="space-y-3">
            {result.testResults.map((test, i) => (
              <div
                key={i}
                className="border border-[#2A2A38] rounded-md p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  {test.passed ? (
                    <CheckCircle2 size={14} className="text-[#34D399]" />
                  ) : (
                    <XCircle size={14} className="text-[#F87171]" />
                  )}
                  <span className="text-xs text-[#8888A8]">
                    Test case {i + 1}
                    {test.isSample ? " (sample)" : ""}
                  </span>
                </div>
                {(test.isSample || !test.passed) && (
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div>
                      <p className="text-[#55556A] mb-1">Input</p>
                      <pre className="text-[#F0F0FF] whitespace-pre-wrap">
                        {test.input}
                      </pre>
                    </div>
                    <div>
                      <p className="text-[#55556A] mb-1">Expected</p>
                      <pre className="text-[#34D399] whitespace-pre-wrap">
                        {test.expected}
                      </pre>
                    </div>
                    <div>
                      <p className="text-[#55556A] mb-1">Your output</p>
                      <pre
                        className={`whitespace-pre-wrap ${
                          test.passed ? "text-[#34D399]" : "text-[#F87171]"
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