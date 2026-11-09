"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { AnimatePresence, motion } from "motion/react"
import { X } from "lucide-react"
import {
  GUIDES,
  cardWidth,
  guideIdForPath,
  hasSeenGuide,
  isAutoOpenOff,
  markGuideSeen,
  placePopover,
  setAutoOpenOff,
  type Box,
  type GuideId,
  type Point,
} from "@/lib/guide"

/* ---------------------------------------------------------------------------
   Page guides. Each page has its own short walkthrough (src/lib/guide.ts).

   - Opens by itself ONCE per account, per browser, per page, unless the user
     turned automatic guides off.
   - useGuide().open() reopens the guide for the page you are on (the "Guide"
     buttons in the nav bar and editor toolbar).
   - A step with a `target` rings that element (data-guide="...") and puts a
     small card beside it, never on top of it. The card measures itself, so the
     spot is right whatever the step's text length or the screen size.
   - Keyboard: arrows move, Escape closes.
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

const AUTO_OPEN_DELAY_MS = 700
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
  const [pos, setPos] = useState<Point | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const guide = openId ? GUIDES[openId] : null
  const step = guide ? guide.steps[Math.min(index, guide.steps.length - 1)] : null
  const isOpen = guide !== null
  const last = guide ? guide.steps.length - 1 : 0

  const open = useCallback(() => {
    if (!pageGuideId) return
    returnFocusRef.current = document.activeElement as HTMLElement | null
    setAutoOff(isAutoOpenOff())
    setIndex(0)
    setPos(null)
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
      setPos(null)
      setOpenId(pageGuideId)
    }, AUTO_OPEN_DELAY_MS)
    return () => clearTimeout(timer)
  }, [status, userId, pageGuideId])

  // Keyboard: arrows move, Escape closes, Tab stays inside the card. The page
  // keeps scrolling normally (the spotlight follows it), so nothing is locked.
  useEffect(() => {
    if (!isOpen) return
    cardRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close()
      } else if (e.key === "ArrowRight") {
        setIndex((i) => Math.min(i + 1, last))
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === "Tab") {
        const nodes = cardRef.current?.querySelectorAll<HTMLElement>("button")
        if (!nodes || nodes.length === 0) return
        const first = nodes[0]
        const end = nodes[nodes.length - 1]
        const active = document.activeElement
        if (e.shiftKey && (active === first || active === cardRef.current)) {
          e.preventDefault()
          end.focus()
        } else if (!e.shiftKey && active === end) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen, last, close])

  // Spotlight: find the step's element, bring it into view, and keep its box
  // current through scrolling and resizing.
  const targetName = step?.target
  useLayoutEffect(() => {
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
    if (el) {
      // Instant, so the card never has to chase a scrolling page. A target
      // taller than most of the screen is aligned to the top instead.
      const tall = el.getBoundingClientRect().height > window.innerHeight * 0.7
      el.scrollIntoView({ block: tall ? "start" : "center", inline: "nearest" })
    }
    measure()
    window.addEventListener("resize", measure)
    window.addEventListener("scroll", measure, true)
    return () => {
      window.removeEventListener("resize", measure)
      window.removeEventListener("scroll", measure, true)
    }
  }, [isOpen, targetName, index, openId])

  // Place the card once we know its real size, before the browser paints.
  useLayoutEffect(() => {
    if (!isOpen || !cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    setPos(
      placePopover(box, { width: r.width, height: r.height }, viewport, {
        pad: SPOT_PAD,
      })
    )
  }, [isOpen, index, openId, box, viewport])

  const toggleAuto = () => {
    const next = !autoOff
    setAutoOff(next)
    setAutoOpenOff(next)
  }

  const isFirst = index === 0
  const isLast = index === last
  const width = cardWidth(viewport.width)

  return (
    <GuideContext.Provider value={api}>
      {children}
      <AnimatePresence>
        {isOpen && guide && step ? (
          <motion.div
            key="guide"
            className="fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close()
            }}
          >
            {box ? (
              // Spotlight: a ring around the element with a huge shadow dimming
              // the rest. It swallows clicks so the page behind stays inert.
              <div
                aria-hidden
                className="fixed rounded-xl border-2 border-primary transition-[top,left,width,height] duration-200 ease-out motion-reduce:transition-none"
                style={{
                  top: box.top - SPOT_PAD,
                  left: box.left - SPOT_PAD,
                  width: box.width + SPOT_PAD * 2,
                  height: box.height + SPOT_PAD * 2,
                  boxShadow: "0 0 0 9999px rgba(0,0,0,0.66)",
                }}
              />
            ) : (
              <div aria-hidden className="pointer-events-none absolute inset-0 bg-black/60" />
            )}

            <div
              ref={cardRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="guide-title"
              tabIndex={-1}
              className={`fixed left-0 top-0 rounded-xl border border-border/70 bg-card p-4 text-foreground shadow-2xl outline-none motion-reduce:transition-none ${
                pos
                  ? "opacity-100 transition-transform duration-200 ease-out"
                  : "opacity-0"
              }`}
              style={{
                width,
                transform: pos ? `translate(${pos.left}px, ${pos.top}px)` : undefined,
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {guide.name} · {index + 1}/{guide.steps.length}
                </span>
                <button
                  onClick={close}
                  aria-label="Close guide"
                  className="-mr-1 grid h-6 w-6 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <X size={14} />
                </button>
              </div>

              <h2
                id="guide-title"
                className="mt-2.5 text-[14px] font-semibold leading-snug"
              >
                {step.title}
              </h2>
              <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">
                {step.body}
              </p>
              {step.points ? (
                <ul className="mt-2 space-y-1">
                  {step.points.map((p) => (
                    <li
                      key={p}
                      className="relative pl-3 text-[12px] leading-relaxed text-foreground/80 before:absolute before:left-0 before:top-[0.6em] before:h-[3px] before:w-[3px] before:rounded-full before:bg-muted-foreground/60"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-4 flex items-center justify-between gap-2">
                {isFirst || isLast ? (
                  <button
                    onClick={toggleAuto}
                    className="text-[11px] text-muted-foreground/80 transition-colors hover:text-foreground"
                  >
                    {autoOff ? "Auto guides: off" : "Don't auto-open"}
                  </button>
                ) : (
                  <span />
                )}
                <div className="flex items-center gap-1.5">
                  {isFirst ? (
                    <button
                      onClick={close}
                      className="rounded-md px-2.5 py-1 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Skip
                    </button>
                  ) : (
                    <button
                      onClick={() => setIndex((i) => i - 1)}
                      className="rounded-md px-2.5 py-1 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Back
                    </button>
                  )}
                  <button
                    onClick={() => (isLast ? close() : setIndex((i) => i + 1))}
                    className="rounded-md bg-primary px-3 py-1 text-[12px] font-medium text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    {isLast ? "Done" : "Next"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </GuideContext.Provider>
  )
}
