import type { Language } from "@/types"

// Draft persistence + save-mode preference, shared by the Toolbar (the Save
// split-button), the Editor (restore + auto-save + save-on-switch) and the
// OutputPanel (save-after-submission). Keeping the storage keys and the write
// logic in one place avoids the three call sites drifting apart.

// localStorage key for a draft, scoped per problem + language. The scratch
// editor (no problem loaded) gets its own "scratch" bucket per language.
export function draftKey(problemId: string | null, language: Language): string {
  return `codeforge:draft:${problemId ?? "scratch"}:${language}`
}

// Write a draft. Returns true if it actually persisted (false if storage is
// unavailable — private mode / quota / SSR).
//
// `pristine` is the untouched starter code for this bucket. If the code equals
// it (i.e. the user hasn't really edited anything — common during the brief
// mount race where the store still holds the default template), we DON'T store
// a draft, and we clear any stale one. This prevents a bogus draft from later
// overriding the real starter code.
export function writeDraft(
  problemId: string | null,
  language: Language,
  code: string,
  pristine?: string,
): boolean {
  try {
    if (pristine !== undefined && code === pristine) {
      localStorage.removeItem(draftKey(problemId, language))
      return false
    }
    localStorage.setItem(draftKey(problemId, language), code)
    return true
  } catch {
    return false
  }
}

// Read a draft back, or null if none / storage unavailable. If a stored draft
// is identical to the pristine starter code, it carries no information and is
// treated as absent (and cleaned up) — this self-heals drafts corrupted before
// the write-guard existed.
export function readDraft(
  problemId: string | null,
  language: Language,
  pristine?: string,
): string | null {
  try {
    const v = localStorage.getItem(draftKey(problemId, language))
    if (v !== null && pristine !== undefined && v === pristine) {
      localStorage.removeItem(draftKey(problemId, language))
      return null
    }
    return v
  } catch {
    return null
  }
}

// ---- Save mode ------------------------------------------------------------

// When drafts get written automatically:
//   manual — only when the user clicks Save (the original behavior).
//   auto   — debounced while typing.
//   submit — after every Run/Submit (keeps your last submitted version).
//   switch — right before the editor swaps language or problem buckets.
export type SaveMode = "manual" | "auto" | "submit" | "switch"

export const SAVE_MODES: {
  value: SaveMode
  label: string
  hint: string
}[] = [
  { value: "manual", label: "Manual", hint: "Only when you click Save" },
  { value: "auto", label: "Auto-save", hint: "Continuously as you type" },
  {
    value: "submit",
    label: "After each submission",
    hint: "Saves when you run or submit",
  },
  {
    value: "switch",
    label: "On language / problem switch",
    hint: "Saves before the editor swaps",
  },
]

// Fresh users get "submit": drafts are kept at meaningful checkpoints without
// writing on every keystroke.
export const DEFAULT_SAVE_MODE: SaveMode = "submit"

const SAVE_MODE_KEY = "codeforge:save-mode"

export function readSaveMode(): SaveMode {
  try {
    const v = localStorage.getItem(SAVE_MODE_KEY)
    if (v && SAVE_MODES.some((m) => m.value === v)) return v as SaveMode
  } catch {
    // fall through to default
  }
  return DEFAULT_SAVE_MODE
}

export function writeSaveMode(mode: SaveMode): void {
  try {
    localStorage.setItem(SAVE_MODE_KEY, mode)
  } catch {
    // ignore — preference just won't persist this session
  }
}
