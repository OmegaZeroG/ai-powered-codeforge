"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { useSession, signOut } from "next-auth/react"
import { useEditorStore } from "@/stores/editorStore"
import { useAIStore } from "@/stores/aiStore"
import { Language } from "@/types"
import { NotificationBell } from "@/components/NotificationBell"
import {
  writeDraft,
  readSaveMode,
  SAVE_MODES,
  type SaveMode,
} from "@/lib/draft"
import {
  Sparkles,
  Share2,
  Save,
  LogOut,
  RotateCcw,
  Check,
  ChevronDown,
  List,
} from "lucide-react"

const LANGUAGES: { value: Language; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "python", label: "Python" },
  { value: "cpp", label: "C++" },
  { value: "java", label: "Java" },
]

// A short label shown on the Save button per active mode, so the current
// behavior is visible at a glance without opening the dropdown.
const MODE_BADGE: Record<SaveMode, string> = {
  manual: "Manual",
  auto: "Auto",
  submit: "On submit",
  switch: "On switch",
}

export function Toolbar() {
  const { language, setLanguage, resetCode, code, problemId, saveMode, setSaveMode } =
    useEditorStore()
  const { togglePanel, isPanelOpen } = useAIStore()
  const { data: session, status } = useSession()
  const [confirmingReset, setConfirmingReset] = useState(false)
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Hydrate the persisted save-mode preference on mount (localStorage isn't
  // available when the store initializes during SSR).
  useEffect(() => {
    setSaveMode(readSaveMode())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Close the mode dropdown on an outside click / Escape.
  useEffect(() => {
    if (!menuOpen) return
    const onDown = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false)
    }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [menuOpen])

  const handleSave = () => {
    if (writeDraft(problemId, language, code)) {
      setSaved(true)
      setTimeout(() => setSaved(false), 1500)
    }
  }

  const pickMode = (mode: SaveMode) => {
    setSaveMode(mode)
    setMenuOpen(false)
    // Saving right now feels right when you flip to an automatic mode.
    if (mode !== "manual") handleSave()
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

        {/* Problems — back to the topic/problem browser */}
        <Link
          href="/topics"
          className="flex items-center gap-1.5 text-sm px-3.5 py-1.5 rounded-lg bg-raised text-fg-dim hover:text-white hover:bg-raised-bright border border-edge transition-colors"
          title="Browse all problems"
        >
          <List size={14} />
          Problems
        </Link>

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

        {/* Save split-button: click to save now, chevron to pick when drafts
            persist automatically. The active mode shows as a small badge. */}
        <div className="relative flex items-center" ref={menuRef}>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 text-sm pl-3.5 pr-3 py-1.5 rounded-l-lg border transition-colors ${
              saved
                ? "border-ac/50 bg-ac/10 text-ac"
                : "bg-raised text-fg-dim hover:text-white hover:bg-raised-bright border-edge"
            }`}
            title="Save draft to this browser now"
          >
            {saved ? <Check size={14} /> : <Save size={14} />}
            {saved ? "Saved" : "Save"}
            {!saved && (
              <span className="text-[10px] font-medium uppercase tracking-wide text-fg-muted">
                {MODE_BADGE[saveMode]}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            className={`flex items-center px-1.5 py-1.5 rounded-r-lg border border-l-0 transition-colors ${
              menuOpen
                ? "border-brand/60 bg-brand/10 text-white"
                : "bg-raised text-fg-dim hover:text-white hover:bg-raised-bright border-edge"
            }`}
            title="Choose when drafts save"
          >
            <ChevronDown
              size={14}
              className={`transition-transform ${menuOpen ? "rotate-180" : ""}`}
            />
          </button>

          {menuOpen && (
            <div
              role="menu"
              className="absolute right-0 top-full z-50 mt-1.5 w-64 overflow-hidden rounded-xl border border-edge bg-ink shadow-xl"
            >
              <div className="px-3 py-2 text-[10px] font-medium uppercase tracking-wide text-fg-muted border-b border-edge">
                Save timing
              </div>
              {SAVE_MODES.map((m) => {
                const active = m.value === saveMode
                return (
                  <button
                    key={m.value}
                    role="menuitemradio"
                    aria-checked={active}
                    onClick={() => pickMode(m.value)}
                    className={`flex w-full items-start gap-2.5 px-3 py-2.5 text-left transition-colors ${
                      active
                        ? "bg-brand/10"
                        : "hover:bg-raised"
                    }`}
                  >
                    <span
                      className={`mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full border ${
                        active ? "border-brand bg-brand" : "border-edge"
                      }`}
                    >
                      {active && <Check size={10} className="text-white" />}
                    </span>
                    <span className="min-w-0">
                      <span
                        className={`block text-sm ${
                          active ? "text-white" : "text-fg"
                        }`}
                      >
                        {m.label}
                      </span>
                      <span className="block text-[11px] text-fg-muted">
                        {m.hint}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>

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
            <NotificationBell />
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
