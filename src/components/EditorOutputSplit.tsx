"use client"

import dynamic from "next/dynamic"
import { OutputPanel } from "@/components/OutputPanel"
import { ResizeHandle } from "@/components/ResizeHandle"
import { useDragResize } from "@/hooks/useDragResize"

// Monaco (via @monaco-editor/react) is a large, DOM-only dependency with
// nothing useful to server-render. Loading it through next/dynamic instead of
// a static import moves it into its own chunk that only loads once this
// component actually mounts, instead of shipping with every page that
// imports EditorOutputSplit.
const Editor = dynamic(
  () => import("@/components/Editor").then((m) => m.Editor),
  {
    ssr: false,
    loading: () => (
      <div className="h-full w-full animate-pulse bg-ink-deep" />
    ),
  }
)

const OUTPUT_MIN = 120
const OUTPUT_MAX = 640
const OUTPUT_DEFAULT = 224 // matches the old fixed h-56

/** The code editor on top, a drag handle, and the output panel below —
 *  shared by /editor and /problems/[slug], which only differed in what
 *  surrounds this split, not the split itself. */
export function EditorOutputSplit() {
  const output = useDragResize(OUTPUT_DEFAULT, {
    min: OUTPUT_MIN,
    max: OUTPUT_MAX,
    axis: "y",
    // The handle sits above the output panel, which is anchored to the
    // bottom — dragging up (smaller clientY) should grow it.
    direction: -1,
    storageKey: "codeforge:outputHeight",
  })

  return (
    <div className="flex-1 flex flex-col overflow-hidden min-h-0">
      <div className="flex-1 overflow-hidden min-h-0">
        <Editor />
      </div>
      <ResizeHandle axis="y" onPointerDown={output.onPointerDown} />
      <div style={{ height: output.size }} className="shrink-0 overflow-hidden">
        <OutputPanel />
      </div>
    </div>
  )
}
