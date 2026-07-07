"use client"

import { useEditorStore } from "@/stores/editorStore"
import { Play, Trash2, Sparkles } from "lucide-react"

export function OutputPanel() {
  const { output, isRunning, clearOutput, code, language } = useEditorStore()

  const handleRun = async () => {
    // wiring this in next step
  }

  return (
    <div className="h-full bg-[#0D0D14] flex flex-col">
      {/* Header */}
      <div className="h-10 border-t border-[#2A2A38] flex items-center justify-between px-4">
        <span className="text-[#8888A8] text-xs font-medium uppercase tracking-wider">
          Output
        </span>
        <div className="flex items-center gap-2">
          {output?.stderr && (
            <button className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-md bg-[#7C6AF720] text-[#7C6AF7] hover:bg-[#7C6AF740] transition-colors">
              <Sparkles size={12} />
              Fix with AI
            </button>
          )}
          <button
            onClick={clearOutput}
            className="text-[#55556A] hover:text-[#8888A8] transition-colors"
          >
            <Trash2 size={14} />
          </button>
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="flex items-center gap-2 text-sm px-4 py-1.5 rounded-md bg-[#7C6AF7] hover:bg-[#9580FF] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play size={14} />
            {isRunning ? "Running..." : "Run"}
          </button>
        </div>
      </div>

      {/* Output content */}
      <div className="flex-1 overflow-auto p-4 font-mono text-sm">
        {!output && !isRunning && (
          <p className="text-[#55556A]">
            Press Run to execute your code...
          </p>
        )}
        {isRunning && (
          <p className="text-[#8888A8] animate-pulse">Executing...</p>
        )}
        {output && (
          <>
            {output.stdout && (
              <pre className="text-[#34D399] whitespace-pre-wrap">
                {output.stdout}
              </pre>
            )}
            {output.stderr && (
              <pre className="text-[#F87171] whitespace-pre-wrap">
                {output.stderr}
              </pre>
            )}
            <p className="text-[#55556A] text-xs mt-3">
              Exited with code {output.exitCode} · {output.executionTime}ms
            </p>
          </>
        )}
      </div>
    </div>
  )
}