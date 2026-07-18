"use client"

import { useEffect } from "react"
import MonacoEditor, { type Monaco } from "@monaco-editor/react"
import { useEditorStore } from "@/stores/editorStore"
import { draftKey } from "./Toolbar"

// Monaco theme derived from the CodeForge palette (globals.css tokens),
// so the editor reads as part of the app instead of stock vs-dark.
function defineCodeForgeTheme(monaco: Monaco) {
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
  const { code, language, fontSize, setCode, problemId } = useEditorStore()

  // Restore a saved draft (if any) whenever the problem or language changes.
  // The store has just set starter code for this problem+language, so we only
  // override it when the user has a saved draft for that exact bucket.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(draftKey(problemId, language))
      if (saved !== null) setCode(saved)
    } catch {
      // Storage unavailable — keep the starter code.
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [problemId, language])

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
