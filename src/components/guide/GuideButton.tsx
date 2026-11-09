"use client"

import { CircleHelp } from "lucide-react"
import { useGuide } from "@/components/guide/GuideProvider"

/* The manual way back into the product guide. Two looks so it fits both UI
   themes: "pill" for the warm marketing-style nav, "toolbar" for the editor's
   true-black toolbar. */
export function GuideButton({
  variant = "pill",
  onOpen,
}: {
  variant?: "pill" | "toolbar" | "menu"
  /** Runs just before the guide opens (e.g. to close a mobile menu). */
  onOpen?: () => void
}) {
  const { open, available } = useGuide()
  // Pages without a guide get no button rather than one that does nothing.
  if (!available) return null
  const handle = () => {
    onOpen?.()
    open()
  }

  if (variant === "toolbar") {
    return (
      <button
        onClick={handle}
        title="Open the guide"
        aria-label="Open the guide"
        data-guide="guide-btn"
        className="flex items-center gap-1.5 rounded-lg border border-edge bg-raised px-2.5 py-1.5 text-sm text-fg-dim transition-colors hover:bg-raised-bright hover:text-white sm:px-3.5"
      >
        <CircleHelp size={14} />
        <span className="hidden sm:inline">Guide</span>
      </button>
    )
  }

  if (variant === "menu") {
    return (
      <button
        onClick={handle}
        className="flex items-center gap-1.5 rounded-2xl px-4 py-2.5 text-left text-sm text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
      >
        <CircleHelp size={14} />
        Guide
      </button>
    )
  }

  return (
    <button
      onClick={handle}
      title="Open the guide"
      className="inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-secondary/60 hover:text-foreground"
    >
      <CircleHelp size={14} />
      Guide
    </button>
  )
}
