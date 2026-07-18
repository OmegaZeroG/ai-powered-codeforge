import Link from "next/link"
import { Trophy, CalendarClock } from "lucide-react"

export default function ContestsPage() {
  return (
    <div className="min-h-screen bg-ink px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="font-display text-white text-2xl font-bold mb-1">
          Contests
        </h1>
        <p className="text-fg-muted text-sm mb-8">
          Weekly rated rounds with a leaderboard that means something.
        </p>

        <div className="border border-edge rounded-lg bg-surface p-8 text-center">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-tint text-brand">
            <Trophy size={22} />
          </div>
          <h2 className="text-white font-medium mt-4">No live contests yet</h2>
          <p className="text-fg-muted text-sm mt-1.5 max-w-md mx-auto">
            Rated contests are on the way. In the meantime, keep your skills
            sharp by working through the problem set.
          </p>

          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/problems"
              className="inline-flex items-center gap-1.5 rounded-md bg-brand hover:bg-brand-bright text-white text-sm font-medium px-4 py-2 transition-colors"
            >
              Practice problems
            </Link>
            <Link
              href="/topics"
              className="inline-flex items-center gap-1.5 rounded-md border border-edge text-fg text-sm px-4 py-2 hover:border-brand transition-colors"
            >
              Browse topics
            </Link>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 text-fg-faint text-xs">
          <CalendarClock size={13} />
          <span>Contest scheduling is coming soon.</span>
        </div>
      </div>
    </div>
  )
}
