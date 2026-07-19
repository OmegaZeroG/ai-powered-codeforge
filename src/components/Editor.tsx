"use client"

import { useEffect, useRef } from "react"
import MonacoEditor, { type Monaco } from "@monaco-editor/react"
import { useEditorStore, DEFAULT_CODE } from "@/stores/editorStore"
import { readDraft, writeDraft } from "@/lib/draft"
import type { Language } from "@/types"

// Monaco theme derived from the CodeForge palette (globals.css tokens),
// so the editor reads as part of the app instead of stock vs-dark.
export function defineCodeForgeTheme(monaco: Monaco) {
  monaco.editor.defineTheme("codeforge-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [
      { token: "comment", foreground: "6A6A6A", fontStyle: "italic" },
      { token: "keyword", foreground: "C792EA" },
      { token: "string", foreground: "ECA65D" },
      { token: "number", foreground: "F78C6C" },
      { token: "type", foreground: "82AAFF" },
      { token: "identifier", foreground: "E8E8E8" },
      { token: "delimiter", foreground: "8A8A8A" },
      { token: "operator", foreground: "8A8A8A" },
    ],
    colors: {
      "editor.background": "#0B0B0B",
      "editor.foreground": "#EDEDED",
      "editor.lineHighlightBackground": "#121212",
      "editor.selectionBackground": "#E5532A33",
      "editor.inactiveSelectionBackground": "#E5532A1F",
      "editorCursor.foreground": "#E5532A",
      "editorLineNumber.foreground": "#5A5A5A",
      "editorLineNumber.activeForeground": "#8A8A8A",
      "editorIndentGuide.background": "#1A1A1A",
      "editorIndentGuide.activeBackground": "#262626",
      "editorGutter.background": "#0B0B0B",
      "editorWidget.background": "#121212",
      "editorWidget.border": "#262626",
      "editorSuggestWidget.background": "#121212",
      "editorSuggestWidget.border": "#262626",
      "editorSuggestWidget.selectedBackground": "#1A1A1A",
      "editorHoverWidget.background": "#121212",
      "editorHoverWidget.border": "#262626",
      "editorBracketMatch.border": "#E5532A",
      "scrollbarSlider.background": "#26262666",
      "scrollbarSlider.hoverBackground": "#262626AA",
      "scrollbarSlider.activeBackground": "#262626",
    },
  })
}

export function Editor() {
  const {
    code,
    language,
    fontSize,
    setCode,
    problemId,
    saveMode,
    problemStarterCode,
  } = useEditorStore()

  // The untouched starter code for the CURRENT bucket. A draft equal to this
  // carries no information, so we never persist it and treat it as "no draft"
  // on read. `DEFAULT_CODE` is the fallback template shown before a problem's
  // starter code loads (or in the scratch editor) — we guard against saving it
  // too, since that transient value used to corrupt drafts during mount.
  const pristine = problemStarterCode?.[language] ?? DEFAULT_CODE[language]
  const isPristine = (c: string) =>
    c === pristine || c === DEFAULT_CODE[language]

  // Restore a saved draft (if any) whenever the problem or language changes.
  // The store has just set starter code for this problem+language, so we only
  // override it when the user has a real saved draft for that exact bucket.
  //
  // "Save on switch" also lives here: before we move to the new bucket we flush
  // the OUTGOING bucket's code, so nothing is lost when you change language or
  // problem. The refs track what the previous bucket was.
  const prevBucket = useRef<{
    problemId: string | null
    language: Language
    code: string
    pristine: string
  } | null>(null)
  const codeRef = useRef(code)
  const saveModeRef = useRef(saveMode)
  codeRef.current = code
  saveModeRef.current = saveMode

  useEffect(() => {
    // Flush the outgoing bucket first (save-on-switch), but only if it held
    // real edits — never persist the untouched starter/default.
    const prev = prevBucket.current
    if (
      prev &&
      saveModeRef.current === "switch" &&
      (prev.problemId !== problemId || prev.language !== language)
    ) {
      writeDraft(prev.problemId, prev.language, prev.code, prev.pristine)
    }

    const saved = readDraft(problemId, language, pristine)
    // Self-heal drafts corrupted before the write-guard existed: an old draft
    // may hold the default template (which differs from this problem's real
    // starter). Discard it so the real starter code shows through.
    const restored =
      saved !== null && saved !== DEFAULT_CODE[language] ? saved : null
    if (restored !== null) setCode(restored)

    prevBucket.current = {
      problemId,
      language,
      code: restored ?? codeRef.current,
      pristine,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId, language])

  // Keep the current bucket's code fresh on the ref so a later switch flushes
  // the latest edits.
  useEffect(() => {
    if (prevBucket.current) prevBucket.current.code = code
  }, [code])

  // Auto-save: debounced write while typing, only in "auto" mode. Skips the
  // pristine starter/default so the mount race can't persist a bogus draft.
  useEffect(() => {
    if (saveMode !== "auto") return
    if (isPristine(code)) return
    const t = setTimeout(() => {
      writeDraft(problemId, language, code, pristine)
    }, 800)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code, saveMode, problemId, language])

  return (
    <div className="h-full w-full">
      <MonacoEditor
        height="100%"
        language={language === "cpp" ? "cpp" : language}
        value={code}
        onChange={(value) => setCode(value ?? "")}
        beforeMount={defineCodeForgeTheme}
        theme="codeforge-dark"
        options={{
          fontSize,
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
          contextmenu: true,
          selectOnLineNumbers: true,
          automaticLayout: true,
        }}
      />
    </div>
  )
}
