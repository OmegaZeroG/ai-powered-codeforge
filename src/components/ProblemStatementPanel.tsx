"use client"

import { ReactNode } from "react"
import { ResizeHandle } from "@/components/ResizeHandle"
import { useDragResize } from "@/hooks/useDragResize"

const STATEMENT_MIN = 300
const STATEMENT_MAX = 720
const STATEMENT_DEFAULT = 420 // matches the old fixed w-[420px]

/** Wraps the (server-rendered) problem statement content with a drag handle
 *  on its right edge so its width is user-adjustable. */
export function ProblemStatementPanel({ children }: { children: ReactNode }) {
  const statement = useDragResize(STATEMENT_DEFAULT, {
    min: STATEMENT_MIN,
    max: STATEMENT_MAX,
    axis: "x",
    storageKey: "codeforge:statementWidth",
  })

  return (
    <>
      <div
        style={{ width: statement.size }}
        className="shrink-0 border-r border-edge overflow-auto px-6 py-6 min-h-0"
      >
        {children}
      </div>
      <ResizeHandle axis="x" onPointerDown={statement.onPointerDown} />
    </>
  )
}
