"use client"

import { useAIStore } from "@/stores/aiStore"
import { AIPanel } from "@/components/AIPanel"
import { ResizeHandle } from "@/components/ResizeHandle"
import { useDragResize } from "@/hooks/useDragResize"
import { useIsDesktop } from "@/hooks/useIsDesktop"

const AI_MIN = 280
const AI_MAX = 600
const AI_DEFAULT = 360 // matches the old fixed w-[360px]

/**
 * Client wrapper so the (server-rendered) problem page can conditionally mount
 * the AI panel based on the client-only isPanelOpen store flag, and gives it
 * a drag handle on its left edge so its width is user-adjustable. Below md
 * the drag resize is disabled and the panel stacks full-width instead.
 */
export function AIPanelMount() {
  const isPanelOpen = useAIStore((s) => s.isPanelOpen)
  const isDesktop = useIsDesktop()
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
      {isDesktop && <ResizeHandle axis="x" onPointerDown={ai.onPointerDown} />}
      <div
        style={isDesktop ? { width: ai.size } : undefined}
        className="w-full max-h-[45vh] min-h-0 shrink-0 border-t border-edge md:max-h-none md:w-auto md:border-t-0"
      >
        <AIPanel />
      </div>
    </>
  )
}
