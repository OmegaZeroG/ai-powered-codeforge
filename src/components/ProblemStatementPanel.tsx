"use client"

import { ReactNode } from "react"
import { ResizeHandle } from "@/components/ResizeHandle"
import { useDragResize } from "@/hooks/useDragResize"
import { useIsDesktop } from "@/hooks/useIsDesktop"

const STATEMENT_MIN = 300
const STATEMENT_MAX = 720
const STATEMENT_DEFAULT = 420 // matches the old fixed w-[420px]

/** Wraps the (server-rendered) problem statement content with a drag handle
 *  on its right edge so its width is user-adjustable. Below md the drag
 *  resize is disabled and the panel stacks full-width, capped in height so
 *  the editor/output split below it stays reachable without scrolling far. */
export function ProblemStatementPanel({ children }: { children: ReactNode }) {
  const isDesktop = useIsDesktop()
  const statement = useDragResize(STATEMENT_DEFAULT, {
    min: STATEMENT_MIN,
    max: STATEMENT_MAX,
    axis: "x",
    storageKey: "codeforge:statementWidth",
  })

  return (
    <>
      <div
        style={isDesktop ? { width: statement.size } : undefined}
        className="w-full max-h-[40vh] shrink-0 overflow-auto border-b border-edge px-4 py-5 min-h-0 sm:px-6 sm:py-6 md:max-h-none md:w-auto md:border-b-0 md:border-r"
      >
        {children}
      </div>
      {isDesktop && (
        <ResizeHandle axis="x" onPointerDown={statement.onPointerDown} />
      )}
    </>
  )
}
