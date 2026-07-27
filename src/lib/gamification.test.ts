import { describe, it, expect } from "vitest"
import {
  computeRank,
  dayKey,
  computeStreak,
  computeBestStreak,
  currentlyEarnedBadgeKeys,
  computeBadges,
  computeTaskWindows,
  weekKey,
  computeTasks,
} from "@/lib/gamification"

describe("computeRank", () => {
  it("starts everyone at Iron division I with zero XP", () => {
    const rank = computeRank(0)
    expect(rank.tier).toBe("Iron")
    expect(rank.division).toBe(1)
    expect(rank.progress).toBe(0)
    expect(rank.xpToNext).toBe(1000)
  })

  it("computes progress and division partway through a tier", () => {
    // Bronze spans 1000..2500 (span 1500). 1500 xp = 500 into the tier = 1/3,
    // and floor((1/3) * 3) + 1 = 2 (floating-point rounds 1/3 * 3 up to 1).
    const rank = computeRank(1500)
    expect(rank.tier).toBe("Bronze")
    expect(rank.xpIntoTier).toBe(500)
    expect(rank.progress).toBeCloseTo(1 / 3)
    expect(rank.division).toBe(2)

    // 2000 xp = 1000 into the tier = 2/3 -> division 3.
    const later = computeRank(2000)
    expect(later.division).toBe(3)
  })

  it("has no ceiling or next tier at the top band", () => {
    const rank = computeRank(30000)
    expect(rank.tier).toBe("Master")
    expect(rank.tierCeil).toBeNull()
    expect(rank.nextTier).toBeNull()
    expect(rank.xpToNext).toBeNull()
    expect(rank.progress).toBe(1)
    expect(rank.division).toBe(3)
  })
})

describe("dayKey", () => {
  it("buckets to the UTC calendar day regardless of time-of-day", () => {
    expect(dayKey(new Date("2026-07-27T00:00:00Z"))).toBe("2026-07-27")
    expect(dayKey(new Date("2026-07-27T23:59:59Z"))).toBe("2026-07-27")
  })
})

describe("computeStreak", () => {
  const now = new Date("2026-07-27T15:00:00Z") // a Monday

  it("counts consecutive days ending today", () => {
    const days = new Set(["2026-07-25", "2026-07-26", "2026-07-27"])
    expect(computeStreak(days, now)).toBe(3)
  })

  it("stays alive through today if the last solve was yesterday", () => {
    const days = new Set(["2026-07-26"])
    expect(computeStreak(days, now)).toBe(1)
  })

  it("breaks on any gap before today or yesterday", () => {
    const days = new Set(["2026-07-25", "2026-07-27"]) // missing the 26th
    expect(computeStreak(days, now)).toBe(1) // only today counts, the run before the gap doesn't reach it
  })

  it("is zero when nothing was solved today or yesterday", () => {
    const days = new Set(["2026-07-20"])
    expect(computeStreak(days, now)).toBe(0)
  })
})

describe("computeBestStreak", () => {
  it("is zero for no history", () => {
    expect(computeBestStreak(new Set())).toBe(0)
  })

  it("is 1 for a single isolated day", () => {
    expect(computeBestStreak(new Set(["2026-07-01"]))).toBe(1)
  })

  it("finds the longest run anywhere in scattered history, not just the most recent", () => {
    const days = new Set(["2026-07-01", "2026-07-02", "2026-07-03", "2026-07-10"])
    expect(computeBestStreak(days)).toBe(3)
  })
})

describe("badges", () => {
  const baseInput = {
    solvedCount: 0,
    recentAccuracy: null as number | null,
    recentSampleSize: 0,
    anyTopicComplete: false,
    streak: 0,
    fastSolve: false,
  }

  it("unlocks first-solve as soon as one problem is solved", () => {
    expect(currentlyEarnedBadgeKeys({ ...baseInput, solvedCount: 1 })).toContain("first-solve")
  })

  it("requires a 5-submission sample before unlocking accurate", () => {
    const tooFew = currentlyEarnedBadgeKeys({ ...baseInput, recentAccuracy: 1, recentSampleSize: 3 })
    expect(tooFew).not.toContain("accurate")

    const enough = currentlyEarnedBadgeKeys({ ...baseInput, recentAccuracy: 0.8, recentSampleSize: 5 })
    expect(enough).toContain("accurate")
  })

  it("unlocks week-streak only at 7+ consecutive days", () => {
    expect(currentlyEarnedBadgeKeys({ ...baseInput, streak: 6 })).not.toContain("week-streak")
    expect(currentlyEarnedBadgeKeys({ ...baseInput, streak: 7 })).toContain("week-streak")
  })

  it("keeps a badge earned even after its live predicate stops being true", () => {
    // Streak has since broken (0), but the badge was persisted as earned before.
    const badges = computeBadges(
      { ...baseInput, streak: 0 },
      new Map([["week-streak", new Date("2026-01-01T00:00:00Z")]])
    )
    const weekStreak = badges.find((b) => b.key === "week-streak")!
    expect(weekStreak.earned).toBe(true)
    expect(weekStreak.earnedAt).toEqual(new Date("2026-01-01T00:00:00Z"))
  })

  it("shows a badge as not-yet-earned when neither persisted nor currently true", () => {
    const badges = computeBadges({ ...baseInput })
    const firstSolve = badges.find((b) => b.key === "first-solve")!
    expect(firstSolve.earned).toBe(false)
    expect(firstSolve.earnedAt).toBeNull()
  })
})

describe("weekKey", () => {
  it("produces a stable ISO week key that matches across the same week", () => {
    expect(weekKey(new Date("2026-07-27T00:00:00Z"))).toBe("2026-W31") // Monday
    expect(weekKey(new Date("2026-08-02T23:00:00Z"))).toBe("2026-W31") // following Sunday, same ISO week
  })
})

describe("computeTaskWindows", () => {
  // 2026-07-27 is a Monday, so the week starts exactly at this instant.
  const now = new Date("2026-07-27T12:00:00Z")

  const solves = [
    { difficulty: "EASY" as const, solvedAt: new Date("2026-07-27T08:00:00Z") }, // today
    { difficulty: "HARD" as const, solvedAt: new Date("2026-07-27T09:00:00Z") }, // today, non-easy
    { difficulty: "HARD" as const, solvedAt: new Date("2026-07-26T09:00:00Z") }, // yesterday -> last week
    { difficulty: "MEDIUM" as const, solvedAt: new Date("2026-07-20T09:00:00Z") }, // last week
  ]
  const submissions = [
    { createdAt: new Date("2026-07-27T08:00:00Z") },
    { createdAt: new Date("2026-07-27T09:00:00Z") },
    { createdAt: new Date("2026-07-27T10:00:00Z") },
    { createdAt: new Date("2026-07-26T09:00:00Z") }, // yesterday, not counted in submissionsToday
  ]
  const solvedDaySet = new Set(["2026-07-25", "2026-07-26", "2026-07-27"])

  it("derives today/this-week counters correctly at a week boundary", () => {
    const windows = computeTaskWindows(solves, submissions, solvedDaySet, now)
    expect(windows.solvedToday).toBe(2)
    expect(windows.mediumPlusToday).toBe(1) // only the HARD solve today, EASY excluded
    expect(windows.submissionsToday).toBe(3)
    expect(windows.solvedThisWeek).toBe(2) // yesterday's HARD solve is excluded, it's last week
    expect(windows.hardThisWeek).toBe(1)
    expect(windows.activeDaysThisWeek).toBe(1) // only 07-27 falls within this week's window
  })
})

describe("computeTasks", () => {
  const now = new Date("2026-07-27T12:00:00Z")
  const windows = {
    solvedToday: 1,
    mediumPlusToday: 0,
    submissionsToday: 3,
    solvedThisWeek: 5,
    hardThisWeek: 0,
    activeDaysThisWeek: 3,
  }

  it("marks tasks done exactly at their threshold", () => {
    const { daily, weekly } = computeTasks(windows, now)
    expect(daily.find((t) => t.key === "daily-solve-1")!.done).toBe(true)
    expect(daily.find((t) => t.key === "daily-medium-plus")!.done).toBe(false)
    expect(daily.find((t) => t.key === "daily-submit-3")!.done).toBe(true)
    expect(weekly.find((t) => t.key === "weekly-solve-5")!.done).toBe(true)
    expect(weekly.find((t) => t.key === "weekly-clear-hard")!.done).toBe(false)
    expect(weekly.find((t) => t.key === "weekly-active-3")!.done).toBe(true)
  })

  it("reflects claimed state per (task, period) and re-opens the task next period", () => {
    const todayKey = dayKey(now)
    const claimed = new Set([`daily-solve-1:${todayKey}`])
    const { daily } = computeTasks(windows, now, claimed)
    expect(daily.find((t) => t.key === "daily-solve-1")!.claimed).toBe(true)
    expect(daily.find((t) => t.key === "daily-submit-3")!.claimed).toBe(false)

    // A claim tagged for a different day must not carry over.
    const staleClaim = new Set(["daily-solve-1:2026-01-01"])
    const { daily: reopened } = computeTasks(windows, now, staleClaim)
    expect(reopened.find((t) => t.key === "daily-solve-1")!.claimed).toBe(false)
  })
})
