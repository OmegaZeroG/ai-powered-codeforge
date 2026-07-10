import Link from "next/link"
import { auth } from "@/auth"
import {
  Flame,
  Gauge,
  Sparkles,
  ShieldCheck,
  ListChecks,
  Play,
  CheckCircle2,
  XCircle,
} from "lucide-react"

const PILLARS = [
  {
    icon: ListChecks,
    title: "Structured progression",
    body:
      "Topics build on each other in order — not three thousand unranked problems with no path through them.",
  },
  {
    icon: Gauge,
    title: "Adaptive difficulty",
    body:
      "Your recommended problem shifts with your real solve accuracy, not a fixed track everyone follows the same way.",
  },
  {
    icon: Sparkles,
    title: "AI that teaches, not solves",
    body:
      "Ask for a hint or an explanation of a failing test. It's built to help you reason, not to hand you the answer.",
  },
  {
    icon: ShieldCheck,
    title: "A judge you can trust",
    body:
      "Every submission runs in an isolated, self-hosted execution environment — the same path every time, for everyone.",
  },
]

const STEPS = [
  {
    n: "01",
    title: "Pick a problem",
    body: "Matched to your current skill level, inside a topic you're building toward.",
  },
  {
    n: "02",
    title: "Submit",
    body: "Your code runs against real test cases in an isolated sandbox — not a string match on stdout guesses.",
  },
  {
    n: "03",
    title: "Get a verdict",
    body: "Accepted, or a specific failing case to reason about. Either way, you know exactly where you stand.",
  },
]

export default async function Home() {
  const session = await auth()
  const isLoggedIn = !!session?.user

  return (
    <div className="min-h-screen bg-[#0A0A0F] text-[#F0F0FF]">
      {/* Nav */}
      <header className="border-b border-[#2A2A38]">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-white font-semibold text-base">CodeForge</span>
          <nav className="flex items-center gap-3">
            {isLoggedIn ? (
              <Link
                href="/topics"
                className="text-sm px-4 py-1.5 rounded-md bg-[#7C6AF7] hover:bg-[#9580FF] text-white transition-colors"
              >
                Continue to Topics
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-[#8888A8] hover:text-white transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="text-sm px-4 py-1.5 rounded-md bg-[#7C6AF7] hover:bg-[#9580FF] text-white transition-colors"
                >
                  Start solving
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
          style={{ background: "#7C6AF7" }}
        />
        <div className="max-w-5xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center relative">
          <div>
            <div className="flex items-center gap-2 mb-5 text-[#7C6AF7]">
              <Flame size={14} />
              <span className="font-mono text-xs uppercase tracking-wider">
                The judge is always on
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold leading-[1.1] tracking-tight text-white">
              Solve. Get judged.
              <br />
              Actually improve.
            </h1>
            <p className="mt-5 text-[#8888A8] text-base leading-relaxed max-w-md">
              CodeForge runs every submission through a real code judge,
              adapts problem difficulty to your solve history, and only
              offers AI help you can&apos;t just copy-paste.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Link
                href={isLoggedIn ? "/topics" : "/signup"}
                className="text-sm px-5 py-2.5 rounded-md bg-[#7C6AF7] hover:bg-[#9580FF] text-white transition-colors font-medium"
              >
                {isLoggedIn ? "Continue to Topics" : "Start solving"}
              </Link>
              {!isLoggedIn && (
                <Link
                  href="/login"
                  className="text-sm px-5 py-2.5 rounded-md border border-[#2A2A38] hover:border-[#7C6AF7] text-[#D0D0E0] transition-colors"
                >
                  I have an account
                </Link>
              )}
            </div>
          </div>

          {/* Signature element: live judge replay */}
          <div className="relative h-[220px] rounded-lg border border-[#2A2A38] bg-[#111118] overflow-hidden">
            <div className="h-10 border-b border-[#2A2A38] flex items-center justify-between px-4">
              <span className="text-[#8888A8] text-xs font-medium uppercase tracking-wider">
                Output
              </span>
              <span className="text-[#55556A] text-xs font-mono">
                two_sum.py
              </span>
            </div>
            <div className="relative h-[calc(100%-2.5rem)] p-4 font-mono text-sm">
              {/* Panel A: running */}
              <div className="judge-panel-a absolute inset-0 p-4">
                <p className="text-[#8888A8] animate-pulse">
                  Running test cases...
                </p>
              </div>

              {/* Panel B: wrong answer */}
              <div className="judge-panel-b absolute inset-0 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <XCircle size={14} className="text-[#F87171]" />
                  <span className="text-xs text-[#F87171] font-medium">
                    Wrong Answer — test case 2
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <p className="text-[#55556A] mb-1">Expected</p>
                    <pre className="text-[#34D399]">1 2</pre>
                  </div>
                  <div>
                    <p className="text-[#55556A] mb-1">Your output</p>
                    <pre className="text-[#F87171]">2 1</pre>
                  </div>
                </div>
              </div>

              {/* Panel C: accepted */}
              <div className="judge-panel-c absolute inset-0 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 size={14} className="text-[#34D399]" />
                  <span className="text-xs text-[#34D399] font-medium">
                    Accepted — 3/3 test cases
                  </span>
                </div>
                <p className="text-[#55556A] text-xs">Runtime: 41ms</p>
                <div className="mt-3 flex items-center gap-2 text-[#7C6AF7] text-xs">
                  <Sparkles size={12} />
                  <span>Recommended next: Maximum Subarray (Medium)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-[#2A2A38]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-[#8888A8] text-xs font-medium uppercase tracking-wider mb-8">
            What's different here
          </h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.title}
                className="border border-[#2A2A38] rounded-lg p-5 bg-[#111118]"
              >
                <pillar.icon size={18} className="text-[#7C6AF7] mb-3" />
                <h3 className="text-white font-medium mb-1.5">
                  {pillar.title}
                </h3>
                <p className="text-[#8888A8] text-sm leading-relaxed">
                  {pillar.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[#2A2A38]">
        <div className="max-w-5xl mx-auto px-6 py-16">
          <h2 className="text-[#8888A8] text-xs font-medium uppercase tracking-wider mb-8">
            How it works
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {STEPS.map((step) => (
              <div key={step.n}>
                <span className="text-[#55556A] font-mono text-sm">
                  {step.n}
                </span>
                <h3 className="text-white font-medium mt-2 mb-1.5">
                  {step.title}
                </h3>
                <p className="text-[#8888A8] text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA footer */}
      <section className="border-t border-[#2A2A38]">
        <div className="max-w-5xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Ready to submit your first solve?
          </h2>
          <p className="text-[#8888A8] text-sm mb-6">
            No setup — the judge is already warmed up.
          </p>
          <Link
            href={isLoggedIn ? "/topics" : "/signup"}
            className="inline-flex items-center gap-2 text-sm px-5 py-2.5 rounded-md bg-[#7C6AF7] hover:bg-[#9580FF] text-white transition-colors font-medium"
          >
            <Play size={14} />
            {isLoggedIn ? "Continue to Topics" : "Start solving"}
          </Link>
        </div>
      </section>

      <footer className="border-t border-[#2A2A38]">
        <div className="max-w-5xl mx-auto px-6 py-8 flex items-center justify-between">
          <span className="text-[#55556A] text-sm">CodeForge</span>
          <div className="flex items-center gap-4 text-[#55556A] text-sm">
            <Link href="/login" className="hover:text-[#8888A8] transition-colors">
              Log in
            </Link>
            <Link href="/signup" className="hover:text-[#8888A8] transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
