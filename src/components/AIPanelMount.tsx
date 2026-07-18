"use client"

import { useAIStore } from "@/stores/aiStore"
import { AIPanel } from "@/components/AIPanel"

/**
 * Client wrapper so the (server-rendered) problem page can conditionally mount
 * the AI panel based on the client-only isPanelOpen store flag.
 */
export function AIPanelMount() {
  const isPanelOpen = useAIStore((s) => s.isPanelOpen)
  if (!isPanelOpen) return null
  return <AIPanel />
}
