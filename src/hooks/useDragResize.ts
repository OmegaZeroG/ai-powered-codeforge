import { useCallback, useEffect, useRef, useState } from "react"

interface DragResizeOptions {
  min: number
  max: number
  axis: "x" | "y"
  // -1 when the handle sits on the "far" edge of the panel being resized (the
  // panel grows as the pointer moves toward its own content, e.g. a panel
  // anchored to the right edge that grows as you drag left).
  direction?: 1 | -1
  storageKey?: string
}

function readStored(key: string | undefined, fallback: number): number {
  if (!key || typeof window === "undefined") return fallback
  const raw = window.localStorage.getItem(key)
  const parsed = raw ? Number(raw) : NaN
  return Number.isFinite(parsed) ? parsed : fallback
}

/** Drag-to-resize a single panel dimension (width or height), clamped to
 *  [min, max] and optionally persisted to localStorage across reloads. */
export function useDragResize(initial: number, options: DragResizeOptions) {
  const { min, max, axis, direction = 1, storageKey } = options
  const [size, setSize] = useState(() => readStored(storageKey, initial))
  const dragging = useRef(false)
  const start = useRef({ pos: 0, size: 0 })

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true
      start.current = { pos: axis === "x" ? e.clientX : e.clientY, size }
      document.body.style.cursor = axis === "x" ? "col-resize" : "row-resize"
      document.body.style.userSelect = "none"
    },
    [axis, size]
  )

  useEffect(() => {
    function onMove(e: PointerEvent) {
      if (!dragging.current) return
      const pos = axis === "x" ? e.clientX : e.clientY
      const delta = (pos - start.current.pos) * direction
      setSize(Math.min(max, Math.max(min, start.current.size + delta)))
    }
    function onUp() {
      if (!dragging.current) return
      dragging.current = false
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
    window.addEventListener("pointermove", onMove)
    window.addEventListener("pointerup", onUp)
    return () => {
      window.removeEventListener("pointermove", onMove)
      window.removeEventListener("pointerup", onUp)
    }
  }, [axis, direction, min, max])

  useEffect(() => {
    if (storageKey) window.localStorage.setItem(storageKey, String(size))
  }, [storageKey, size])

  return { size, onPointerDown }
}
