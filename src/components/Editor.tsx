"use client"

import MonacoEditor from "@monaco-editor/react"
import { useEditorStore } from "@/stores/editorStore"

export function Editor() {
  const { code, language, fontSize, setCode } = useEditorStore()

  return (
    <div className="h-full w-full">
      <MonacoEditor
        height="100%"
        language={language === "cpp" ? "cpp" : language}
        value={code}
        onChange={(value) => setCode(value ?? "")}
        theme="vs-dark"
        options={{
          fontSize,
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