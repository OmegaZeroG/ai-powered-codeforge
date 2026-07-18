"use client"

import { useRef, useState, useEffect } from "react"
import { useEditorStore } from "@/stores/editorStore"
import { useAIStore } from "@/stores/aiStore"
import { AIAction } from "@/types"
import { Sparkles, X, Send, Trash2 } from "lucide-react"

const ACTION_BUTTONS: { action: AIAction; label: string }[] = [
  { action: "hint", label: "Hint" },
  { action: "explain", label: "Explain" },
  { action: "fix", label: "Fix" },
  { action: "rate", label: "Rate" },
]

export function AIPanel() {
  const { togglePanel, messages, addMessage, isStreaming, setIsStreaming } =
    useAIStore()
  const clearMessages = useAIStore((s) => s.clearMessages)
  const {
    code,
    language,
    problemStatement,
    problemConstraints,
    result,
  } = useEditorStore()

  const [input, setInput] = useState("")
  const [streamingText, setStreamingText] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
  }, [messages, streamingText])

  const send = async (action: AIAction, userMessage?: string) => {
    if (isStreaming) return

    // A visible user bubble describing what they asked for.
    const label =
      userMessage ??
      (action === "hint"
        ? "Give me a hint."
        : action === "explain"
          ? "Explain this."
          : action === "rate"
            ? "Rate my code."
            : "Help me find the bug.")

    const history = messages.map((m) => ({ role: m.role, content: m.content }))

    addMessage({
      id: crypto.randomUUID(),
      role: "user",
      content: label,
      createdAt: new Date(),
    })
    setInput("")
    setIsStreaming(true)
    setStreamingText("")

    // If there's a failing test case in the current result, attach the first one.
    const failingTestCase =
      result?.testResults.find((t) => !t.passed) ?? undefined

    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action,
          code,
          language,
          problemStatement,
          constraints: problemConstraints,
          failingTestCase,
          message: userMessage,
          history,
        }),
      })

      if (!res.ok || !res.body) {
        const err = await res
          .json()
          .catch(() => ({ error: "The AI request failed." }))
        throw new Error(err.error || "The AI request failed.")
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let acc = ""

      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        acc += decoder.decode(value, { stream: true })
        setStreamingText(acc)
      }

      addMessage({
        id: crypto.randomUUID(),
        role: "assistant",
        content: acc || "(no response)",
        createdAt: new Date(),
      })
    } catch (error) {
      addMessage({
        id: crypto.randomUUID(),
        role: "assistant",
        content:
          error instanceof Error
            ? `⚠️ ${error.message}`
            : "⚠️ Something went wrong.",
        createdAt: new Date(),
      })
    } finally {
      setStreamingText("")
      setIsStreaming(false)
    }
  }

  return (
    <div className="w-[360px] shrink-0 border-l border-edge bg-ink-deep flex flex-col min-h-0">
      {/* Header */}
      <div className="h-12 shrink-0 border-b border-edge flex items-center justify-between px-4">
        <div className="flex items-center gap-2.5">
          <span className="w-7 h-7 rounded-lg bg-brand grid place-items-center">
            <Sparkles size={14} className="text-white" />
          </span>
          <span className="leading-tight">
            <span className="block text-white text-sm font-bold">ForgeAI</span>
            <span className="block text-fg-faint text-[10px] tracking-wide">
              socratic · context-aware
            </span>
          </span>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              disabled={isStreaming}
              title="Clear conversation"
              className="text-fg-faint hover:text-fg-muted transition-colors p-1 disabled:opacity-40"
            >
              <Trash2 size={14} />
            </button>
          )}
          <button
            onClick={togglePanel}
            title="Close"
            className="text-fg-faint hover:text-white transition-colors p-1"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-auto px-4 py-4 min-h-0">
        {messages.length === 0 && !streamingText && (
          <div className="text-fg-faint text-sm leading-relaxed">
            <p className="mb-3">
              I&apos;m your Socratic tutor. I won&apos;t write the solution for
              you — I&apos;ll help you get there yourself.
            </p>
            <p>Pick an action below or ask a question.</p>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className={`max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap leading-relaxed ${
                  m.role === "user"
                    ? "bg-brand text-white"
                    : "bg-raised text-fg-dim"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {streamingText && (
            <div className="flex justify-start">
              <div className="max-w-[85%] rounded-lg px-3 py-2 text-sm whitespace-pre-wrap leading-relaxed bg-raised text-fg-dim">
                {streamingText}
                <span className="inline-block w-1.5 h-3.5 ml-0.5 bg-brand animate-pulse align-middle" />
              </div>
            </div>
          )}

          {isStreaming && !streamingText && (
            <div className="flex justify-start">
              <div className="rounded-lg px-3 py-2 text-sm bg-raised text-fg-muted animate-pulse">
                Thinking…
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick action chips */}
      <div className="shrink-0 px-4 pt-3 border-t border-edge flex gap-2">
        {ACTION_BUTTONS.map(({ action, label }) => (
          <button
            key={action}
            onClick={() => send(action)}
            disabled={isStreaming}
            className="flex-1 text-[10px] font-medium uppercase tracking-[0.12em] px-2 py-1.5 rounded-full border border-edge bg-raised text-fg-muted hover:text-white hover:border-fg-faint transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (input.trim()) send("hint", input.trim())
        }}
        className="shrink-0 p-4 flex items-end gap-2"
      >
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              if (input.trim()) send("hint", input.trim())
            }
          }}
          placeholder="Ask about your code — enter to send"
          rows={1}
          disabled={isStreaming}
          className="flex-1 resize-none bg-raised text-fg text-sm border border-edge rounded-lg px-3 py-2 focus:outline-none focus:border-brand placeholder:text-fg-faint disabled:opacity-50 max-h-28"
        />
        <button
          type="submit"
          disabled={isStreaming || !input.trim()}
          className="shrink-0 flex items-center justify-center w-9 h-9 rounded-lg bg-brand hover:bg-brand-bright text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={15} />
        </button>
      </form>

      {/* Context footer */}
      <div className="shrink-0 px-4 pb-3 -mt-2 text-[10px] text-fg-faint">
        Context: <span className="text-fg-muted">{language}</span>
        {result && (
          <>
            {" · "}
            <span className="text-fg-muted">last verdict attached</span>
          </>
        )}
      </div>
    </div>
  )
}
