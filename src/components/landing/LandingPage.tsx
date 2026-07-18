"use client"

import type { ComponentType, ReactNode } from "react"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { motion, useReducedMotion, AnimatePresence } from "motion/react"
import { useEffect, useState } from "react"
import {
  ListChecks,
  Gauge,
  Sparkles,
  ShieldCheck,
  Play,
  Save,
  Share2,
  RotateCcw,
  ChevronDown,
  Trash2,
  ArrowRight,
  Check,
  Terminal,
  Cpu,
  Zap,
  Trophy,
  LogOut,
  Mail,
} from "lucide-react"
import { Newsletter } from "./Newsletter"
import { AuthModal } from "./AuthModal"

/**
 * Landing page ported from the approved Lovable design. Marketing-only: it
 * carries the warm Instrument-Serif theme via the `.landing` scope in
 * globals.css, so the product UI keeps its true-black all-mono identity.
 *
 * `isLoggedIn` decides where the primary CTAs point (auth vs. topics).
 * `initialAuthMode` (from /login or /signup redirecting to /?auth=...) auto-opens
 * the AuthModal; `callbackUrl` is where a successful auth should land.
 */
export function LandingPage({
  isLoggedIn,
  initialAuthMode = null,
  callbackUrl,
}: {
  isLoggedIn: boolean
  initialAuthMode?: "login" | "signup" | null
  callbackUrl?: string
}) {
  const startHref = isLoggedIn ? "/topics" : "/signup"
  const startLabel = isLoggedIn ? "Continue" : "Get Started"

  // Open the modal immediately when arriving via /login or /signup (which
  // redirect here with ?auth=login|signup). Ignored for logged-in visitors.
  const [authOpen, setAuthOpen] = useState(
    !isLoggedIn && initialAuthMode !== null,
  )
  const [authMode, setAuthMode] = useState<"login" | "signup">(
    initialAuthMode ?? "login",
  )

  const openAuth = (mode: "login" | "signup") => {
    setAuthMode(mode)
    setAuthOpen(true)
  }

  // If the auth query param changes after mount (client nav to /login etc.),
  // reflect it. Also clean the ?auth= param from the URL once handled so a
  // refresh or back-nav doesn't re-pop the modal unexpectedly.
  useEffect(() => {
    if (!isLoggedIn && initialAuthMode) {
      setAuthMode(initialAuthMode)
      setAuthOpen(true)
      const url = new URL(window.location.href)
      if (url.searchParams.has("auth")) {
        url.searchParams.delete("auth")
        window.history.replaceState(null, "", url.pathname + url.search)
      }
    }
  }, [isLoggedIn, initialAuthMode])

  return (
    <div className="landing min-h-screen overflow-x-clip">
      <BackgroundGrid />
      <Nav isLoggedIn={isLoggedIn} onAuth={openAuth} />
      <main className="relative">
        <Hero
          startHref={startHref}
          startLabel={startLabel}
          isLoggedIn={isLoggedIn}
          onGetStarted={() => openAuth("signup")}
        />
        <TrustedBy />
        <MidPitch />
        <Features />
        <Pricing isLoggedIn={isLoggedIn} onGetStarted={() => openAuth("signup")} />
        <Faq />
      </main>
      <Footer />
      <AuthModal
        open={authOpen}
        mode={authMode}
        callbackUrl={callbackUrl}
        onClose={() => setAuthOpen(false)}
        onModeChange={setAuthMode}
      />
    </div>
  )
}

function BackgroundGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 30% at 50% 0%, oklch(0.72 0.22 40 / 0.12), transparent 70%)",
        }}
      />
    </div>
  )
}

function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative grid h-7 w-7 place-items-center rounded-md bg-primary">
        <Terminal className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
      </div>
      <span className="font-sans text-[15px] font-medium tracking-tight">
        Codeforge
      </span>
    </div>
  )
}

function Nav({
  isLoggedIn,
  onAuth,
}: {
  isLoggedIn: boolean
  onAuth: (mode: "login" | "signup") => void
}) {
  return (
    <motion.header
      initial={{ y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-4 z-50 mx-auto mt-4 flex max-w-6xl items-center justify-between rounded-full border border-border/70 bg-card/60 px-4 py-2.5 backdrop-blur"
    >
      <Logo />
      <nav className="hidden items-center gap-1 md:flex">
        {isLoggedIn
          ? [
              { label: "Problems", href: "/topics" },
              { label: "Editor", href: "/editor" },
              { label: "Contests", href: "/contests" },
              { label: "Profile", href: "/profile" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="rounded-full px-3.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {l.label}
              </Link>
            ))
          : ["Features", "Pricing", "FAQ"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="rounded-full px-3.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {l}
              </a>
            ))}
      </nav>
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <>
            <Link
              href="/topics"
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-[13px] font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              Continue
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-[13px] text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Log out</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => onAuth("login")}
              className="hidden rounded-full px-3.5 py-1.5 text-[13px] text-muted-foreground hover:text-foreground sm:block"
            >
              Log in
            </button>
            <button
              onClick={() => onAuth("signup")}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-[13px] font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              Sign up
            </button>
          </>
        )}
      </div>
    </motion.header>
  )
}

function Beam() {
  const reduce = useReducedMotion()
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-0 mx-auto h-[720px] w-full max-w-6xl overflow-hidden">
      <div
        className={`absolute left-1/2 top-0 h-[560px] w-[3px] -translate-x-1/2 rounded-full bg-primary shadow-[0_0_60px_20px_oklch(0.72_0.22_40/0.55)] ${
          reduce ? "" : "animate-beam"
        }`}
      />
      <div className="absolute left-1/2 top-0 h-[520px] w-[420px] -translate-x-1/2 beam-glow opacity-70 blur-2xl" />
      <div
        className="absolute left-1/2 top-[420px] h-[220px] w-[820px] -translate-x-1/2 rounded-[50%] opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, oklch(0.72 0.22 40 / 0.5), transparent 70%)",
        }}
      />
    </div>
  )
}

function Hero({
  startHref,
  startLabel,
  isLoggedIn,
  onGetStarted,
}: {
  startHref: string
  startLabel: string
  isLoggedIn: boolean
  onGetStarted: () => void
}) {
  const reduce = useReducedMotion()
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 pt-16 lg:pt-20">
      <Beam />
      <div className="relative z-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Adaptive coding practice
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="mt-6 font-sans text-4xl font-medium leading-[1.05] tracking-tight text-foreground sm:text-5xl lg:text-6xl"
        >
          Unlock The Power
          <br />
          Of Real Code Judging
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="mt-5 max-w-lg text-[15px] leading-relaxed text-muted-foreground"
        >
          Every submission runs through an isolated judge. Problems adapt to your
          solve history. AI helps you reason — not copy-paste your way through.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center gap-3"
          id="start"
        >
          {isLoggedIn ? (
            <Link
              href={startHref}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              {startLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          ) : (
            <button
              onClick={onGetStarted}
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:brightness-110"
            >
              {startLabel}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={`relative z-10 mt-14 ${reduce ? "" : "animate-float"}`}
      >
        <IdeMockup />
      </motion.div>
    </section>
  )
}

function IdeMockup() {
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-b from-primary/25 via-primary/5 to-transparent blur-2xl"
      />
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl glow-orange">
        <div className="flex items-center justify-between border-b border-border bg-background/50 px-4 py-2.5">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-code-string/70" />
            </div>
            <div className="ml-2 flex items-center gap-1 rounded-md px-2 py-1 font-mono text-xs text-muted-foreground hover:bg-muted">
              JavaScript <ChevronDown className="h-3 w-3" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <IconBtn icon={RotateCcw}>Reset</IconBtn>
            <span className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2.5 py-1 text-primary">
              <Sparkles className="h-3 w-3" /> AI Assistant
            </span>
            <IconBtn icon={Save}>Save</IconBtn>
            <IconBtn icon={Share2}>Share</IconBtn>
          </div>
        </div>

        <div className="grid grid-cols-[180px_minmax(0,1fr)_180px] gap-0 text-xs md:grid-cols-[210px_minmax(0,1fr)_210px]">
          <div className="hidden border-r border-border p-4 md:block">
            <div className="text-[10px] text-muted-foreground">← Arrays</div>
            <div className="mt-3 flex items-center gap-2">
              <h3 className="font-sans text-base font-semibold">Two Sum</h3>
              <span className="rounded bg-code-string/15 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-code-string">
                Easy
              </span>
            </div>
            <p className="mt-3 text-[11px] leading-relaxed text-muted-foreground">
              Given{" "}
              <code className="rounded bg-muted px-1 font-mono text-code-var">
                nums
              </code>{" "}
              and target, return indices of two numbers that add to target.
            </p>
            <div className="mt-4 font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              Examples
            </div>
            <pre className="mt-2 overflow-hidden rounded bg-background/50 p-2 font-mono text-[10px] text-code-var">
{`nums = [2,7,11,15]
target = 9
→ [0, 1]`}
            </pre>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 border-b border-border bg-background/40 px-4 py-2 font-mono text-[11px] text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              SOLUTION.JS
            </div>
            <div className="p-4">
              <CodeBlock />
            </div>
            <MockTabs />
          </div>

          <div className="hidden border-l border-border p-4 md:block">
            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              ForgeAI
            </div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-3 rounded-lg border border-border bg-background/40 p-3"
            >
              <p className="text-[11px] leading-relaxed text-foreground/90">
                A hash-map pass gets you{" "}
                <span className="font-mono text-primary">O(n)</span>. Want the
                shape without the answer?
              </p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <Chip>Give a hint</Chip>
                <Chip>Complexity audit</Chip>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1, duration: 0.5 }}
              className="mt-3 rounded-lg border border-dashed border-border p-3"
            >
              <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                Ghost suggestion
              </div>
              <p className="mt-1.5 text-[11px] italic text-muted-foreground">
                Consider a guard for arrays shorter than 2 elements…
              </p>
              <button className="mt-2 text-[11px] font-medium text-primary hover:underline">
                Apply check
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

function IconBtn({
  icon: Icon,
  children,
}: {
  icon: ComponentType<{ className?: string }>
  children: ReactNode
}) {
  return (
    <button className="inline-flex items-center gap-1 rounded-md px-2 py-1 transition-colors hover:bg-muted">
      <Icon className="h-3 w-3" />
      <span className="hidden sm:inline">{children}</span>
    </button>
  )
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-md border border-border bg-muted/60 px-2 py-0.5 text-[10px] text-foreground/80">
      {children}
    </span>
  )
}

const CODE_LINES: Array<Array<{ t: string; c?: string }>> = [
  [
    { t: "function", c: "text-code-keyword" },
    { t: " " },
    { t: "twoSum", c: "text-code-fn" },
    { t: "(nums, target) {" },
  ],
  [{ t: "  // hash-map pass", c: "text-code-comment" }],
  [
    { t: "  const", c: "text-code-keyword" },
    { t: " seen = " },
    { t: "new", c: "text-code-keyword" },
    { t: " " },
    { t: "Map", c: "text-code-fn" },
    { t: "()" },
  ],
  [
    { t: "  for", c: "text-code-keyword" },
    { t: " (" },
    { t: "let", c: "text-code-keyword" },
    { t: " i = " },
    { t: "0", c: "text-code-number" },
    { t: "; i < nums.length; i++) {" },
  ],
  [
    { t: "    const", c: "text-code-keyword" },
    { t: " need = target - nums[i]" },
  ],
  [
    { t: "    if", c: "text-code-keyword" },
    { t: " (seen." },
    { t: "has", c: "text-code-fn" },
    { t: "(need)) " },
    { t: "return", c: "text-code-keyword" },
    { t: " [seen." },
    { t: "get", c: "text-code-fn" },
    { t: "(need), i]" },
  ],
  [
    { t: "    seen." },
    { t: "set", c: "text-code-fn" },
    { t: "(nums[i], i)" },
  ],
  [{ t: "  }" }],
  [{ t: "}" }],
]

function CodeBlock() {
  return (
    <pre className="font-mono text-[12px] leading-[1.7]">
      {CODE_LINES.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 + i * 0.08, duration: 0.35 }}
          className="flex"
        >
          <span className="mr-4 w-5 select-none text-right text-muted-foreground/50">
            {i + 1}
          </span>
          <span className="text-foreground/85">
            {line.map((tok, j) => (
              <span key={j} className={tok.c}>
                {tok.t}
              </span>
            ))}
            {i === CODE_LINES.length - 1 && (
              <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-primary animate-caret" />
            )}
          </span>
        </motion.div>
      ))}
    </pre>
  )
}

function MockTabs() {
  return (
    <div className="border-t border-border">
      <div className="flex items-center justify-between border-b border-border px-4 text-xs">
        <div className="flex gap-4">
          <button className="relative py-2.5 font-medium text-foreground">
            OUTPUT
            <span className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />
          </button>
          <button className="py-2.5 text-muted-foreground hover:text-foreground">
            TEST CASES
          </button>
          <button className="py-2.5 text-muted-foreground hover:text-foreground">
            AI HINTS
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-muted-foreground hover:text-foreground">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground transition-all hover:brightness-110">
            <Play className="h-3 w-3 fill-current" /> Submit
          </button>
        </div>
      </div>
      <div className="relative overflow-hidden px-4 py-4 font-mono text-[11px] text-muted-foreground">
        <span className="text-primary">$</span>{" "}
        <span className="text-code-string">✓ Accepted</span> · 9ms · 2.1mb ·{" "}
        <span className="text-foreground">10/10</span> test cases
        <div className="pointer-events-none absolute inset-y-0 -inset-x-4">
          <div className="animate-shimmer h-full w-1/3 bg-gradient-to-r from-transparent via-primary/15 to-transparent" />
        </div>
      </div>
    </div>
  )
}

function TrustedBy() {
  const brands = ["Kernel", "Boltline", "Nimbus", "Modul", "Axon", "Struct"]
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-20">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
      >
        Trusted by teams building the next generation of tools
      </motion.p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-14 gap-y-6">
        {brands.map((b, i) => (
          <motion.div
            key={b}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="font-display text-2xl text-muted-foreground/70"
          >
            {b}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

function MidPitch() {
  return (
    <section className="relative z-10 mx-auto max-w-6xl px-6 py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
      >
        Practice reimagined
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-5 max-w-2xl font-sans text-3xl font-medium leading-[1.1] tracking-tight sm:text-5xl"
      >
        Step Into The World Of
        <br />
        Deliberate Practice.
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mx-auto mt-5 max-w-xl text-[15px] text-muted-foreground"
      >
        Real problems, a real judge, and feedback that actually maps to how you
        think about code.
      </motion.p>
    </section>
  )
}

const FEATURES = [
  {
    icon: ListChecks,
    title: "Structured progression",
    desc: "Topics build on each other, in order — not three thousand unranked problems.",
  },
  {
    icon: Gauge,
    title: "Adaptive difficulty",
    desc: "Your next problem shifts with your real solve accuracy.",
  },
  {
    icon: Sparkles,
    title: "AI that teaches",
    desc: "Ask for a hint or a failure explanation. Not a one-click answer.",
  },
  {
    icon: ShieldCheck,
    title: "A judge you can trust",
    desc: "Every submission runs in an isolated, self-hosted sandbox.",
  },
  {
    icon: Cpu,
    title: "Real runtime metrics",
    desc: "See true time and memory across every accepted test case.",
  },
  {
    icon: Trophy,
    title: "Contests worth entering",
    desc: "Weekly rated rounds with a leaderboard that means something.",
  },
]

function Features() {
  return (
    <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Core features
        </div>
        <h2 className="mt-4 font-sans text-3xl font-medium tracking-tight sm:text-4xl">
          Transforming your practice, effortlessly.
        </h2>
      </motion.div>

      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            whileHover={{ y: -3 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 p-6 backdrop-blur transition-colors hover:border-primary/40"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/25 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
            />
            <div className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-primary">
              <f.icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
            </div>
            <h3 className="mt-5 font-sans text-lg font-medium tracking-tight">
              {f.title}
            </h3>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const PLANS = [
  {
    name: "Starter",
    price: "Free",
    per: "",
    desc: "Everything you need to warm up.",
    features: [
      "Access to 500+ problems",
      "Basic AI hints",
      "Community leaderboard",
      "Weekly practice sets",
    ],
    highlight: false,
  },
  {
    name: "Pro",
    price: "$12",
    per: "/mo",
    desc: "For serious daily practice.",
    features: [
      "Full problem library",
      "Adaptive path & analytics",
      "Advanced AI reasoning",
      "Rated contest access",
      "Runtime & memory metrics",
    ],
    highlight: true,
  },
  {
    name: "Team",
    price: "$45",
    per: "/mo",
    desc: "For interview prep cohorts.",
    features: [
      "Everything in Pro",
      "Shared team dashboard",
      "Custom problem sets",
      "Priority judge queue",
      "Admin & billing tools",
    ],
    highlight: false,
  },
]

function Pricing({
  isLoggedIn,
  onGetStarted,
}: {
  isLoggedIn: boolean
  onGetStarted: () => void
}) {
  return (
    <section id="pricing" className="relative z-10 mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="font-sans text-3xl font-medium tracking-tight sm:text-4xl">
          Find the Plan That Works for You
        </h2>
        <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
          Start free. Upgrade when you&apos;re ready to push harder.
        </p>
      </motion.div>

      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {PLANS.map((p, i) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className={`relative overflow-hidden rounded-2xl border p-7 backdrop-blur ${
              p.highlight
                ? "border-primary/60 bg-gradient-to-b from-primary/15 via-card to-card glow-orange"
                : "border-border bg-card/60"
            }`}
          >
            {p.highlight && (
              <span className="absolute right-5 top-5 rounded-full bg-primary px-2.5 py-0.5 text-[10px] font-medium text-primary-foreground">
                Popular
              </span>
            )}
            <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {p.name}
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
            <div className="mt-6 flex items-baseline gap-1">
              <span className="font-sans text-4xl font-medium tracking-tight">
                {p.price}
              </span>
              <span className="text-sm text-muted-foreground">{p.per}</span>
            </div>
            {isLoggedIn ? (
              <Link
                href="/topics"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                  p.highlight
                    ? "bg-primary text-primary-foreground hover:brightness-110"
                    : "border border-border text-foreground hover:border-primary/40 hover:bg-muted"
                }`}
              >
                Start now
              </Link>
            ) : (
              <button
                onClick={onGetStarted}
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium transition-all ${
                  p.highlight
                    ? "bg-primary text-primary-foreground hover:brightness-110"
                    : "border border-border text-foreground hover:border-primary/40 hover:bg-muted"
                }`}
              >
                Start now
              </button>
            )}
            <ul className="mt-6 space-y-2.5">
              {p.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-[13px] text-muted-foreground"
                >
                  <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

const FAQS = [
  {
    q: "How does the code judge work?",
    a: "Every submission runs in an isolated sandbox against real test cases — the same environment every time, for everyone. You get a verdict, runtime, and memory back.",
  },
  {
    q: "Which languages are supported?",
    a: "JavaScript, Python, C++, and Java are supported out of the box, each running against the same isolated judge.",
  },
  {
    q: "Will the AI just give me the answer?",
    a: "No. The AI is tuned to explain failing tests, suggest approaches, and audit complexity. It won't hand you a working solution — that would defeat the point.",
  },
  {
    q: "Can I use it for interview prep?",
    a: "Yes. The adaptive path and topic progression are designed around common interview patterns, and Team plans support cohort-style prep.",
  },
  {
    q: "Do you support contests?",
    a: "Weekly rated contests are included with Pro. Team plans can host private contests for their members.",
  },
]

function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section id="faq" className="relative z-10 mx-auto max-w-3xl px-6 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-sans text-3xl font-medium tracking-tight sm:text-4xl"
      >
        Frequently Asked Questions
      </motion.h2>
      <p className="mt-3 text-center text-sm text-muted-foreground">
        Answers to what people ask before signing up.
      </p>

      <div className="mt-10 space-y-2.5">
        {FAQS.map((f, i) => {
          const isOpen = open === i
          return (
            <motion.div
              key={f.q}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`overflow-hidden rounded-xl border transition-colors ${
                isOpen
                  ? "border-primary/50 bg-gradient-to-b from-primary/10 to-card"
                  : "border-border bg-card/60"
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              >
                <span className="flex items-center gap-3 text-[14px] font-medium">
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {f.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform ${
                    isOpen ? "rotate-180 text-primary" : ""
                  }`}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    <p className="px-5 pb-5 text-[13.5px] leading-relaxed text-muted-foreground">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative z-10 mt-16 border-t border-border/70">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Join our newsletter. Get new problem sets, judge upgrades, and
              adaptive path releases first.
            </p>
            <Newsletter />
            <div className="mt-6 flex items-center gap-2.5">
              {/* Your socials — set the hrefs below. */}
              <SocialLink href="https://github.com/OmegaZeroG" label="GitHub" icon={GithubIcon} />
              <SocialLink href="#" label="LinkedIn" icon={LinkedinIcon} />
              <SocialLink href="mailto:you@example.com" label="Contact" icon={Mail} />
            </div>
          </div>
          <FooterCol
            title="Product"
            links={[
              { label: "Features", href: "#features" },
              { label: "Pricing", href: "#pricing" },
              { label: "Contests", href: "#" },
            ]}
          />
          <FooterCol
            title="Links"
            links={[
              // Portfolio link — set your URL here.
              { label: "Portfolio", href: "#" },
              { label: "Privacy", href: "#" },
              { label: "Terms", href: "#" },
            ]}
          />
        </div>
      </div>

      {/* Big gradient wordmark */}
      <div className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="px-4 pb-2 text-center"
        >
          <div
            className="whitespace-nowrap font-sans font-medium leading-none tracking-tighter"
            style={{
              fontSize: "clamp(2.5rem, 14.5vw, 15rem)",
              background:
                "linear-gradient(180deg, oklch(0.95 0.02 40) 0%, oklch(0.72 0.22 40) 55%, oklch(0.4 0.15 40 / 0.1) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Codeforge
          </div>
        </motion.div>
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-border/60 px-6 py-6 text-xs text-muted-foreground sm:flex-row">
          <div>© {new Date().getFullYear()} Codeforge. Judged fairly.</div>
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-primary" />
            <span>Built for people who actually want to get better.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        {title}
      </div>
      <ul className="mt-4 space-y-2">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              className="text-sm text-foreground/80 transition-colors hover:text-primary"
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A10.53 10.53 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string
  label: string
  icon: ComponentType<{ className?: string }>
}) {
  const external = href.startsWith("http")
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
    >
      <Icon className="h-4 w-4" />
    </a>
  )
}