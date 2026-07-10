"use client"

import { useCallback, useRef } from "react"
import { poisonClipboardText } from "@/lib/anticheat"

/**
 * Wraps problem-statement content and, when `copyProtected` is on,
 * intercepts copy/cut so the clipboard receives a poisoned version of the
 * text instead of the raw statement. See src/lib/anticheat.ts for why this
 * poisons rather than blocks copying outright.
 *
 * Text stays selectable (no user-select:none) so students can still
 * highlight things to read carefully -- only the clipboard payload changes.
 */
export function ProtectedStatement({
  problemId,
  copyProtected,
  children,
}: {
  problemId: string
  copyProtected: boolean
  children: React.ReactNode
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleCopy = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      if (!copyProtected) return

      const selected = window.getSelection()?.toString()
      const fallback = containerRef.current?.innerText ?? ""
      const original = selected && selected.length > 0 ? selected : fallback

      e.preventDefault()
      e.clipboardData.setData("text/plain", poisonClipboardText(original, problemId))
    },
    [copyProtected, problemId]
  )

  return (
    <div ref={containerRef} onCopy={handleCopy} onCut={handleCopy}>
      {children}
    </div>
  )
}
