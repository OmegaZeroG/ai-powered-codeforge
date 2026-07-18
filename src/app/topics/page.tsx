import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"
import {
  computeSkillFromData,
  pickRecommended,
  type RecommendedProblem,
  type UserSkill,
} from "@/lib/adaptive"
import { loadGamification, type GamificationView } from "@/lib/gamification"
import { Sparkles } from "lucide-react"
import { ProductNav } from "@/components/ProductNav"
import {
  RankCard,
  BadgesCard,
  StreakCard,
} from "@/components/gamification/GamificationCards"
import { TasksCard } from "@/components/gamification/TasksCard"
import { SolveCalendar } from "@/components/gamification/SolveCalendar"
import type { Difficulty } from "@/types"

/* Warm-ember difficulty pill (easy/medium/hard tokens), scoped to this page so
   the shared product DifficultyTag keeps its true-black identity elsewhere. */
const DIFF_PILL: Record<Difficulty, string> = {
  EASY: "text-easy border-easy/40",
  MEDIUM: "text-medium border-medium/40",
  HARD: "text-hard border-hard/40",
}
function DifficultyPill({ difficulty }: { difficulty: Difficulty }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em] ${DIFF_PILL[difficulty]}`}
    >
      {difficulty.charAt(0) + difficulty.slice(1).toLowerCase()}
    </span>
  )
}

/* Warm calibration meter — Easy→Hard bands with the score notch. */
function Calibration({ skill }: { skill: UserSkill }) {
  const position = ((skill.score - 1) / 2) * 100
  const targetColor =
    skill.targetDifficulty === "EASY"
      ? "text-easy"
      : skill.targetDifficulty === "MEDIUM"
        ? "text-medium"
        : "text-hard"
  return (
    <div className="rounded-2xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          Your calibration
        </span>
        <span className="font-mono text-[11px] text-muted-foreground/70">
          {skill.solvedCount} solved
          {skill.recentAccuracy !== null &&
            ` · ${Math.round(skill.recentAccuracy * 100)}% recent accuracy`}
        </span>
      </div>
      <div className="relative">
        <div className="flex h-2 gap-px overflow-hidden rounded-full">
          <div className="flex-1 bg-easy/40" />
          <div className="flex-1 bg-medium/40" />
          <div className="flex-1 bg-hard/40" />
        </div>
        <div
          aria-hidden
          className="absolute -top-[3px] h-3.5 w-[3px] rounded-full bg-primary shadow-[0_0_6px_var(--ember)]"
          style={{ left: `calc(${position}% - 1.5px)` }}
        />
      </div>
      <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-wider">
        <span className={skill.targetDifficulty === "EASY" ? "text-easy" : "text-muted-foreground/50"}>
          Easy
        </span>
        <span className={skill.targetDifficulty === "MEDIUM" ? "text-medium" : "text-muted-foreground/50"}>
          Medium
        </span>
        <span className={skill.targetDifficulty === "HARD" ? "text-hard" : "text-muted-foreground/50"}>
          Hard
        </span>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        The judge is currently targeting{" "}
        <span className={`font-medium ${targetColor}`}>
          {skill.targetDifficulty.charAt(0) +
            skill.targetDifficulty.slice(1).toLowerCase()}
        </span>{" "}
        problems for you — solve more, and the target moves.
      </p>
    </div>
  )
}

export default async function TopicsPage() {
  const session = await auth()
  const userId = session?.user?.id

  // All independent reads fire in parallel (one round trip's worth of latency
  // instead of a chain). The solved-progress query returns both the solved set
  // AND each solved problem's difficulty, so skill is derived without a second
  // fetch; recommendation candidates come from the topics list already loaded.
  // Gamification (rank/badges/tasks/streak/calendar) is loaded alongside for
  // logged-in users so the rails render from the same request.
  const [topics, progress, recentSubmissions, game] = await Promise.all([
    prisma.topic.findMany({
      orderBy: { order: "asc" },
      include: {
        problems: {
          orderBy: { order: "asc" },
          select: { id: true, title: true, slug: true, difficulty: true },
        },
      },
    }),
    userId
      ? prisma.userProgress.findMany({
          where: { userId, status: "SOLVED" },
          select: { problemId: true, problem: { select: { difficulty: true } } },
        })
      : Promise.resolve([]),
    userId
      ? prisma.submission.findMany({
          where: { userId },
          orderBy: { createdAt: "desc" },
          take: 10,
          select: { verdict: true },
        })
      : Promise.resolve([]),
    userId
      ? loadGamification(userId)
      : Promise.resolve<GamificationView | null>(null),
  ])

  const solvedByProblemId = new Set(progress.map((p) => p.problemId))

  let recommendation: RecommendedProblem | null = null
  let skill: UserSkill | null = null
  if (userId) {
    skill = computeSkillFromData(
      progress.map((p) => p.problem.difficulty),
      recentSubmissions.map((s) => s.verdict)
    )
    const candidates: RecommendedProblem[] = topics.flatMap((t) =>
      t.problems
        .filter((p) => !solvedByProblemId.has(p.id))
        .map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
          difficulty: p.difficulty,
          topic: { name: t.name, slug: t.slug },
        }))
    )
    recommendation = pickRecommended(candidates, skill)
  }

  const center = (
    <div>
      <h1 className="mb-1 font-display text-3xl text-foreground">Topics</h1>
      <p className="mb-8 text-sm text-muted-foreground">
        Work through each topic in order to build a structured foundation.
      </p>

      {skill && (
        <div className="mb-4">
          <Calibration skill={skill} />
        </div>
      )}

      {recommendation && (
        <Link
          href={`/problems/${recommendation.slug}`}
          className="mb-6 block rounded-2xl border border-primary/50 bg-primary/10 p-4 backdrop-blur-sm transition-colors hover:border-primary"
        >
          <div className="mb-2 flex items-center gap-2">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs font-medium uppercase tracking-wider text-primary">
              Recommended for you
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-medium text-foreground">
                {recommendation.title}
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {recommendation.topic.name}
              </p>
            </div>
            <DifficultyPill difficulty={recommendation.difficulty} />
          </div>
        </Link>
      )}

      <div className="flex flex-col gap-3">
        {topics.map((topic) => {
          const solvedCount = topic.problems.filter((p) =>
            solvedByProblemId.has(p.id)
          ).length
          const total = topic.problems.length
          const complete = total > 0 && solvedCount === total
          return (
            <Link
              key={topic.id}
              href={`/topics/${topic.slug}`}
              className="block rounded-2xl border border-border/70 bg-card/60 p-4 backdrop-blur-sm transition-colors hover:border-primary/60"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-medium text-foreground">{topic.name}</h2>
                <span
                  className={`font-mono text-[11px] ${
                    complete ? "text-easy" : "text-muted-foreground"
                  }`}
                >
                  {solvedCount}/{total} solved
                </span>
              </div>
              {topic.description && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {topic.description}
                </p>
              )}
              {total > 0 && (
                <div
                  className="mt-3 h-[3px] overflow-hidden rounded-full bg-secondary"
                  role="progressbar"
                  aria-valuenow={solvedCount}
                  aria-valuemin={0}
                  aria-valuemax={total}
                  aria-label={`${solvedCount} of ${total} problems solved`}
                >
                  <div
                    className={`h-full rounded-full ${
                      complete ? "bg-easy" : "bg-primary"
                    }`}
                    style={{ width: `${(solvedCount / total) * 100}%` }}
                  />
                </div>
              )}
            </Link>
          )
        })}
        {topics.length === 0 && (
          <p className="text-sm text-muted-foreground/60">
            No topics yet — check back soon.
          </p>
        )}
      </div>
    </div>
  )

  return (
    <div className="forge relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-ember-radial opacity-40" />

      <div className="relative z-10">
        <ProductNav />
        <main className="mx-auto max-w-7xl px-6 py-10">
          {game ? (
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_minmax(0,1fr)_300px]">
              {/* LEFT rail — rank, badges, tasks */}
              <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                <RankCard rank={game.rank} />
                <BadgesCard badges={game.badges} />
                <TasksCard daily={game.tasks.daily} weekly={game.tasks.weekly} />
              </aside>

              {/* CENTER — topics */}
              {center}

              {/* RIGHT rail — calendar, streak */}
              <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
                <SolveCalendar solvedDays={game.solvedDays} />
                <StreakCard streak={game.streak} bestStreak={game.bestStreak} />
              </aside>
            </div>
          ) : (
            <div className="mx-auto max-w-3xl">{center}</div>
          )}
        </main>
      </div>
    </div>
  )
}
