"use client"

import { useAIStore } from "@/stores/aiStore"
import { AIPanel } from "@/components/AIPanel"
import { ResizeHandle } from "@/components/ResizeHandle"
import { useDragResize } from "@/hooks/useDragResize"

const AI_MIN = 280
const AI_MAX = 600
const AI_DEFAULT = 360 // matches the old fixed w-[360px]

/**
 * Client wrapper so the (server-rendered) problem page can conditionally mount
 * the AI panel based on the client-only isPanelOpen store flag, and gives it
 * a drag handle on its left edge so its width is user-adjustable.
 */
export function AIPanelMount() {
  const isPanelOpen = useAIStore((s) => s.isPanelOpen)
  const ai = useDragResize(AI_DEFAULT, {
    min: AI_MIN,
    max: AI_MAX,
    axis: "x",
    // The handle sits on the panel's left edge, anchored to the right —
    // dragging left (smaller clientX) should grow it.
    direction: -1,
    storageKey: "codeforge:aiPanelWidth",
  })

  if (!isPanelOpen) return null

  return (
    <>
      <ResizeHandle axis="x" onPointerDown={ai.onPointerDown} />
      <div style={{ width: ai.size }} className="shrink-0 min-h-0">
        <AIPanel />
      </div>
    </>
  )
}
