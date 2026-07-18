"use client"

import { useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useEditorStore } from "@/stores/editorStore"
import { useAIStore } from "@/stores/aiStore"
import { Language } from "@/types"
import { Sparkles, Share2, Save, LogOut, RotateCcw, Check } from "lucide-react"

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
]

// localStorage key for a draft, scoped per problem + language. The scratch
// editor (no problem loaded) gets its own "scratch" bucket per language.
export function draftKey(problemId: string | null, language: Language) {
  return `codeforge:draft:${problemId ?? "scratch"}:${language}`
}

export function Toolbar() {
  const { language, setLanguage, resetCode, code, problemId } = useEditorStore()
  const { togglePanel, isPanelOpen } = useAIStore()
  const { data: session, status } = useSession()
  const [confirmingReset, setConfirmingReset] = useState(false)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleSave = () => {
    try {
      localStorage.setItem(draftKey(problemId, language), code)
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
    } catch {
      // Storage unavailable (private mode / quota) — fail quietly.
    }
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard blocked — nothing else to do.
    }
  }

  return (
    <div className="h-14 bg-ink border-b border-edge flex items-center justify-between px-4">
      {/* Left — Logo */}
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md transition-opacity hover:opacity-80"
          title="Go to home"
        >
          <span className="w-6 h-6 rounded-md bg-brand text-white grid place-items-center font-bold text-[10px] tracking-tight select-none">
            CF
          </span>
          <span className="text-white font-bold text-base tracking-tight">
            CodeForge
          </span>
        </Link>
        <span className="w-px h-6 bg-edge" aria-hidden />

        {/* Language selector */}
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          className="bg-raised text-fg text-sm border border-edge rounded-lg px-3.5 py-1.5 focus:outline-none focus:border-brand cursor-pointer"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>

        {/* Reset code to starter — inline two-step confirm (no blocking dialog) */}
        {confirmingReset ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                resetCode()
                setConfirmingReset(false)
              }}
              className="flex items-center gap-1.5 text-sm px-3.5 py-1.5 rounded-lg text-white bg-wa/20 hover:bg-wa/30 border border-wa/40 transition-colors"
              title="Confirm reset to starter code"
            >
              <RotateCcw size={14} />
              Confirm reset
            </button>
            <button
              onClick={() => setConfirmingReset(false)}
              className="text-sm px-3.5 py-1.5 rounded-lg text-fg-muted hover:text-white hover:bg-raised border border-edge transition-colors"
              title="Cancel"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmingReset(true)}
            className="flex items-center gap-1.5 text-sm px-3.5 py-1.5 rounded-lg bg-raised text-fg-dim hover:text-white hover:bg-raised-bright border border-edge transition-colors"
            title="Reset to starter code"
          >
            <RotateCcw size={14} />
            Reset
          </button>
        )}
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-2">
        {/* AI toggle pill — sparkles + label + on/off switch */}
        <button
          onClick={togglePanel}
          aria-pressed={isPanelOpen}
          className={`flex items-center gap-2 text-sm px-3.5 py-1.5 rounded-lg border transition-colors ${
            isPanelOpen
              ? "border-brand/60 bg-brand/10 text-white"
              : "border-edge bg-raised text-fg-dim hover:text-white hover:bg-raised-bright"
          }`}
        >
          <Sparkles size={14} className={isPanelOpen ? "text-brand" : ""} />
          AI
          <span
            aria-hidden
            className={`relative inline-block w-7 h-4 rounded-full transition-colors ${
              isPanelOpen ? "bg-brand" : "bg-edge"
            }`}
          >
            <span
              className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-[left] ${
                isPanelOpen ? "left-3.5" : "left-0.5"
              }`}
            />
          </span>
        </button>

        <button
          onClick={handleSave}
          className={`flex items-center gap-2 text-sm px-3.5 py-1.5 rounded-lg border transition-colors ${
            saved
              ? "border-ac/50 bg-ac/10 text-ac"
              : "bg-raised text-fg-dim hover:text-white hover:bg-raised-bright border-edge"
          }`}
          title="Save draft to this browser"
        >
          {saved ? <Check size={14} /> : <Save size={14} />}
          {saved ? "Saved" : "Save"}
        </button>

        <button
          onClick={handleShare}
          className={`flex items-center gap-2 text-sm px-3.5 py-1.5 rounded-lg border transition-colors ${
            copied
              ? "border-ac/50 bg-ac/10 text-ac"
              : "bg-raised text-fg-dim hover:text-white hover:bg-raised-bright border-edge"
          }`}
          title="Copy code to clipboard"
        >
          {copied ? <Check size={14} /> : <Share2 size={14} />}
          {copied ? "Copied" : "Share"}
        </button>

        {/* Session info + logout */}
        {status === "authenticated" && session?.user && (
          <div className="flex items-center gap-2 pl-3 ml-1 border-l border-edge">
            <span className="text-fg-muted text-sm max-w-[140px] truncate">
              {session.user.name || session.user.email}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-1.5 text-sm px-2.5 py-1.5 rounded-lg text-fg-muted hover:text-wa hover:bg-raised transition-colors"
              title="Log out"
            >
              <LogOut size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
