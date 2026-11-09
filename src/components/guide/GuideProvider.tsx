"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { AnimatePresence, motion } from "motion/react"
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react"
import {
  GUIDES,
  guideIdForPath,
  hasSeenGuide,
  isAutoOpenOff,
  markGuideSeen,
  placeCard,
  setAutoOpenOff,
  type Box,
  type GuideId,
} from "@/lib/guide"

/* ---------------------------------------------------------------------------
   Page guides. Each page has its own walkthrough (see src/lib/guide.ts).

   - A guide opens by itself ONCE per account, per browser, per page, unless the
     user turned automatic guides off.
   - useGuide().open() reopens the guide for the page you are on; it backs the
     "Guide" buttons in the nav bar and the editor toolbar.
   - A step with a `target` highlights that element (data-guide="...") and
     scrolls it into view; if the element is not on screen the step still shows
     as a plain card.
   - Keyboard: arrows move, Escape closes. Phones get a bottom/top sheet.
--------------------------------------------------------------------------- */

type GuideApi = {
  /** Open the guide for the current page. No-op on pages without one. */
  open: () => void
  /** Whether the current page has a guide (used to hide Guide buttons). */
  available: boolean
}

const GuideContext = createContext<GuideApi | null>(null)

// A no-op outside the provider so a component rendered in isolation never
// crashes just because it offers a Guide button.
const NOOP: GuideApi = { open: () => {}, available: false }

export function useGuide(): GuideApi {
  return useContext(GuideContext) ?? NOOP
}

const AUTO_OPEN_DELAY_MS = 900
const SPOT_PAD = 6

function findTarget(name: string | undefined): HTMLElement | null {
  if (!name) return null
  const el = document.querySelector<HTMLElement>(`[data-guide="${name}"]`)
  // display:none (or detached) elements have no boxes: treat as not present.
  if (!el || el.getClientRects().length === 0) return null
  return el
}

export function GuideProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const userId = session?.user?.id
  const pageGuideId = guideIdForPath(pathname)

  // The guide that is open. Held in state (not derived from the route) so
  // navigating away while it is open cannot swap its content mid-read.
  const [openId, setOpenId] = useState<GuideId | null>(null)
  const [index, setIndex] = useState(0)
  const [box, setBox] = useState<Box | null>(null)
  const [autoOff, setAutoOff] = useState(false)
  const [viewport, setViewport] = useState({ width: 1024, height: 768 })
  const dialogRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const guide = openId ? GUIDES[openId] : null
  const step = guide ? guide.steps[Math.min(index, guide.steps.length - 1)] : null
  const isOpen = guide !== null

  const open = useCallback(() => {
    if (!pageGuideId) return
    returnFocusRef.current = document.activeElement as HTMLElement | null
    setAutoOff(isAutoOpenOff())
    setIndex(0)
    setOpenId(pageGuideId)
  }, [pageGuideId])

  const close = useCallback(() => {
    setOpenId(null)
    returnFocusRef.current?.focus?.()
  }, [])

  const api = useMemo<GuideApi>(
    () => ({ open, available: pageGuideId !== null }),
    [open, pageGuideId]
  )

  // First visit to a page: open its guide once, unless automatic guides are off
  // or the page is one (a timed contest) that should never be interrupted. The
  // flag is written as it opens, so a refresh mid-tour does not nag again.
  useEffect(() => {
    if (status !== "authenticated" || !userId || !pageGuideId) return
    if (!GUIDES[pageGuideId].autoOpen) return
    if (isAutoOpenOff() || hasSeenGuide(userId, pageGuideId)) return
    const timer = setTimeout(() => {
      markGuideSeen(userId, pageGuideId)
      setAutoOff(false)
      setIndex(0)
      setOpenId(pageGuideId)
    }, AUTO_OPEN_DELAY_MS)
    return () => clearTimeout(timer)
  }, [status, userId, pageGuideId])

  // Dialog behavior: lock page scroll, move focus in, handle the keyboard.
  useEffect(() => {
    if (!isOpen || !guide) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialogRef.current?.focus()

    const last = guide.steps.length - 1
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close()
      } else if (e.key === "ArrowRight") {
        setIndex((i) => Math.min(i + 1, last))
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === "Tab") {
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])"
        )
        if (!nodes || nodes.length === 0) return
        const first = nodes[0]
        const end = nodes[nodes.length - 1]
        const active = document.activeElement
        if (e.shiftKey && (active === first || active === dialogRef.current)) {
          e.preventDefault()
          end.focus()
        } else if (!e.shiftKey && active === end) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", onKey)
    }
  }, [isOpen, guide, close])

  // Spotlight: find the step's element, scroll it into view, and keep its box
  // up to date through scrolling and resizing.
  const targetName = step?.target
  useEffect(() => {
    if (!isOpen) return
    const measure = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight })
      const el = findTarget(targetName)
      if (!el) {
        setBox(null)
        return
      }
      const r = el.getBoundingClientRect()
      setBox({ top: r.top, left: r.left, width: r.width, height: r.height })
    }
    const el = findTarget(targetName)
    el?.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" })
    measure()
    // Smooth scrolling takes a moment; re-measure once it has settled.
    const settle = setTimeout(measure, 450)
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", measure, true)
    return () => {
      clearTimeout(settle)
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", measure, true)
    }
  }, [isOpen, targetName, index, openId])

  const placement = placeCard(box, viewport)
  const last = guide ? guide.steps.length - 1 : 0
  const isFirst = index === 0
  const isLast = index === last

  const alignV = placement.vertical === "top" ? "items-start" : "items-end"
  const alignH =
    placement.horizontal === "left"
      ? "sm:justify-start"
      : placement.horizontal === "right"
        ? "sm:justify-end"
        : "sm:justify-center"
  // With no highlighted element on a wide screen the card sits in the middle.
  const alignVDesktop = box ? "" : "sm:items-center"

  const toggleAuto = () => {
    const next = !autoOff
    setAutoOff(next)
    setAutoOpenOff(next)
  }

  return (
    <GuideContext.Provider value={api}>
      {children}
      <AnimatePresence>
        {isOpen && guide && step ? (
          <motion.div
            key="guide"
            className={`fixed inset-0 z-[100] flex justify-center ${alignV} ${alignVDesktop} ${alignH} sm:p-6 ${
              box ? "" : "bg-black/70 backdrop-blur-sm"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close()
            }}
          >
            {/* Spotlight: a bright ring around the element, with a huge shadow
                dimming everything else. Clicks never reach the page behind. */}
            {box ? (
              <div
                aria-hidden
                className="pointer-events-none fixed rounded-2xl border-2 border-primary transition-all duration-300"
                style={{
                  top: box.top - SPOT_PAD,
                  left: box.left - SPOT_PAD,
                  width: box.width + SPOT_PAD * 2,
                  height: box.height + SPOT_PAD * 2,
                  boxShadow: "0 0 0 9999px rgba(0,0,0,0.72)",
                }}
              />
            ) : null}

            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="guide-title"
              tabIndex={-1}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              className={`relative flex w-full flex-col overflow-hidden ${
                placement.vertical === "top" ? "rounded-b-3xl" : "rounded-t-3xl"
              } border border-border/70 bg-card text-foreground shadow-2xl outline-none sm:max-w-md sm:rounded-3xl ${
                box ? "max-h-[55dvh] sm:max-h-[80dvh]" : "max-h-[92dvh]"
              }`}
            >
              <div className="flex items-center justify-between gap-3 px-5 pt-4 sm:px-6">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {guide.name} · {index + 1} of {guide.steps.length}
                </span>
                <button
                  onClick={close}
                  aria-label="Close guide"
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mx-5 mt-3 h-1 overflow-hidden rounded-full bg-secondary sm:mx-6">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-300"
                  style={{
                    width: `${((index + 1) / guide.steps.length) * 100}%`,
                  }}
                />
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4 sm:px-6">
                <div key={`${openId}-${index}`} aria-live="polite">
                  <h2
                    id="guide-title"
                    className="font-display text-xl tracking-tight sm:text-2xl"
                  >
                    {step.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                  {step.points ? (
                    <ul className="mt-3 space-y-2">
                      {step.points.map((p) => (
                        <li
                          key={p}
                          className="flex gap-2.5 text-sm leading-relaxed"
                        >
                          <Check
                            size={15}
                            className="mt-1 shrink-0 text-primary"
                            aria-hidden
                          />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-border/70 px-5 py-3 sm:px-6">
                <button
                  onClick={toggleAuto}
                  className="text-[11px] text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
                >
                  {autoOff
                    ? "Guides open automatically: off"
                    : "Stop opening guides automatically"}
                </button>
                <div className="ml-auto flex items-center gap-2">
                  {isFirst ? (
                    <button
                      onClick={close}
                      className="rounded-full px-3 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Skip
                    </button>
                  ) : (
                    <button
                      onClick={() => setIndex((i) => i - 1)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-3.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                    >
                      <ArrowLeft size={14} aria-hidden />
                      Back
                    </button>
                  )}
                  {isLast ? (
                    <button
                      onClick={close}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      <Check size={14} aria-hidden />
                      Done
                    </button>
                  ) : (
                    <button
                      onClick={() => setIndex((i) => i + 1)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Next
                      <ArrowRight size={14} aria-hidden />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </GuideContext.Provider>
  )
}
