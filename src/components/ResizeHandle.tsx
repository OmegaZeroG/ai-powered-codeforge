"use client"

export function ResizeHandle({
  axis,
  onPointerDown,
}: {
  axis: "x" | "y"
  onPointerDown: (e: React.PointerEvent) => void
}) {
  return (
    <div
      onPointerDown={onPointerDown}
      role="separator"
      aria-orientation={axis === "x" ? "vertical" : "horizontal"}
      className={
        axis === "x"
          ? "w-1 shrink-0 cursor-col-resize hover:bg-brand/50 active:bg-brand transition-colors"
          : "h-1 shrink-0 cursor-row-resize hover:bg-brand/50 active:bg-brand transition-colors"
      }
    />
  )
}
