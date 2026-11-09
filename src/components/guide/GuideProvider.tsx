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
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession } from "next-auth/react"
import { AnimatePresence, motion } from "motion/react"
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Check,
  Code2,
  Compass,
  FlaskConical,
  Gauge,
  Layers,
  Swords,
  TerminalSquare,
  Trophy,
  UserCog,
  X,
  type LucideIcon,
} from "lucide-react"
import {
  GUIDE_STEPS,
  hasSeenGuide,
  markGuideSeen,
  shouldAutoOpenOn,
  type GuideIcon,
} from "@/lib/guide"

/* ---------------------------------------------------------------------------
   Product guide — a step-by-step walkthrough of everything in CodeForge.

   - Opens by itself ONCE per account (per browser) on the first product page
     a signed-in user lands on.
   - Can be reopened at any time via useGuide().open(), wired to the "Guide"
     buttons in the navigation bar and the editor toolbar.
   - Centered card on desktop, bottom sheet on phones. Keyboard: arrows move,
     Esc closes. Respects reduced-motion via the motion library defaults.
--------------------------------------------------------------------------- */

const ICONS: Record<GuideIcon, LucideIcon> = {
  welcome: Compass,
  topics: Layers,
  editor: Code2,
  judge: Gauge,
  ai: Bot,
  scratchpad: TerminalSquare,
  progress: Trophy,
  contests: Swords,
  profile: UserCog,
}

type GuideApi = { open: () => void }

const GuideContext = createContext<GuideApi | null>(null)

// A no-op outside the provider so a component rendered in isolation never
// crashes just because it offers a Guide button.
const NOOP: GuideApi = { open: () => {} }

export function useGuide(): GuideApi {
  return useContext(GuideContext) ?? NOOP
}

const AUTO_OPEN_DELAY_MS = 900

export function GuideProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const userId = session?.user?.id
  const [isOpen, setIsOpen] = useState(false)
  const [index, setIndex] = useState(0)
  const dialogRef = useRef<HTMLDivElement>(null)
  const returnFocusRef = useRef<HTMLElement | null>(null)

  const open = useCallback(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null
    setIndex(0)
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
    returnFocusRef.current?.focus?.()
  }, [])

  const api = useMemo<GuideApi>(() => ({ open }), [open])

  // First-run: open once for a signed-in user on an eligible page. The flag is
  // written as soon as it opens, so a refresh mid-tour does not nag again.
  useEffect(() => {
    if (status !== "authenticated" || !userId) return
    if (!shouldAutoOpenOn(pathname) || hasSeenGuide(userId)) return
    const timer = setTimeout(() => {
      markGuideSeen(userId)
      setIndex(0)
      setIsOpen(true)
    }, AUTO_OPEN_DELAY_MS)
    return () => clearTimeout(timer)
  }, [status, userId, pathname])

  // Dialog behavior: lock page scroll, move focus in, and handle the keyboard.
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    dialogRef.current?.focus()

    const last = GUIDE_STEPS.length - 1
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close()
      } else if (e.key === "ArrowRight") {
        setIndex((i) => Math.min(i + 1, last))
      } else if (e.key === "ArrowLeft") {
        setIndex((i) => Math.max(i - 1, 0))
      } else if (e.key === "Tab") {
        // Keep focus inside the dialog while it is open.
        const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(
          "a[href], button:not([disabled])",
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
  }, [isOpen, close])

  const step = GUIDE_STEPS[index]
  const Icon = ICONS[step.icon]
  const isFirst = index === 0
  const isLast = index === GUIDE_STEPS.length - 1

  return (
    <GuideContext.Provider value={api}>
      {children}
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            key="guide"
            className="fixed inset-0 z-[100] flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) close()
            }}
          >
            <motion.div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="guide-title"
              tabIndex={-1}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              transition={{ duration: 0.2 }}
              className="flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-border/70 bg-card text-foreground shadow-2xl outline-none sm:max-w-lg sm:rounded-3xl"
            >
              {/* Header: step counter + close */}
              <div className="flex items-center justify-between px-5 pt-4 sm:px-6">
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  Guide · {index + 1} of {GUIDE_STEPS.length}
                </span>
                <button
                  onClick={close}
                  aria-label="Close guide"
                  className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Progress bar */}
              <div className="mx-5 mt-3 h-1 overflow-hidden rounded-full bg-secondary sm:mx-6">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-300"
                  style={{ width: `${((index + 1) / GUIDE_STEPS.length) * 100}%` }}
                />
              </div>

              {/* Step content */}
              <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
                <div key={step.id} aria-live="polite">
                  <span className="mb-4 grid h-11 w-11 place-items-center rounded-2xl bg-primary/15 text-primary">
                    <Icon size={22} />
                  </span>
                  <h2
                    id="guide-title"
                    className="font-display text-2xl tracking-tight"
                  >
                    {step.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                  {step.points ? (
                    <ul className="mt-4 space-y-2.5">
                      {step.points.map((p) => (
                        <li key={p} className="flex gap-2.5 text-sm leading-relaxed">
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
                  {step.link ? (
                    <Link
                      href={step.link.href}
                      onClick={close}
                      className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-primary/40 px-4 py-1.5 text-[13px] text-primary transition-colors hover:bg-primary/10"
                    >
                      <FlaskConical size={13} aria-hidden />
                      {step.link.label}
                    </Link>
                  ) : null}
                </div>
              </div>

              {/* Footer: dots + navigation */}
              <div className="flex items-center justify-between gap-3 border-t border-border/70 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-1.5" aria-hidden>
                  {GUIDE_STEPS.map((s, i) => (
                    <span
                      key={s.id}
                      className={`h-1.5 rounded-full transition-all ${
                        i === index ? "w-4 bg-primary" : "w-1.5 bg-border"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {isFirst ? (
                    <button
                      onClick={close}
                      className="rounded-full px-4 py-1.5 text-[13px] text-muted-foreground transition-colors hover:text-foreground"
                    >
                      Skip
                    </button>
                  ) : (
                    <button
                      onClick={() => setIndex((i) => i - 1)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-4 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
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
