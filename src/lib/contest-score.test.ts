import { describe, it, expect } from "vitest"
import type { Difficulty } from "@prisma/client"
import {
  scoreParticipant,
  compareScores,
  rankParticipants,
  contestXpFor,
  formatPenaltyTime,
  PENALTY_MINUTES,
  type ScoredSubmission,
  type ScoredProblem,
  type ParticipantScore,
} from "@/lib/contest-score"

const START = new Date("2026-07-27T10:00:00Z")
const minutesAfterStart = (m: number) => new Date(START.getTime() + m * 60_000)

describe("scoreParticipant", () => {
  const problems: ScoredProblem[] = [
    { problemId: "p1", difficulty: "EASY" },
    { problemId: "p2", difficulty: "HARD" },
  ]

  it("gives an unsolved problem zero penalty and a null solve time", () => {
    const subs: ScoredSubmission[] = [
      { problemId: "p2", verdict: "WRONG_ANSWER", createdAt: minutesAfterStart(5) },
    ]
    const score = scoreParticipant("u1", subs, problems, START)
    const p2 = score.perProblem.find((p) => p.problemId === "p2")!
    expect(p2.solved).toBe(false)
    expect(p2.solveMinutes).toBeNull()
    expect(p2.penaltyMinutes).toBe(0)
    expect(score.solvedCount).toBe(0)
  })

  it("charges PENALTY_MINUTES per wrong attempt before the accepted solve", () => {
    const subs: ScoredSubmission[] = [
      { problemId: "p1", verdict: "WRONG_ANSWER", createdAt: minutesAfterStart(5) },
      { problemId: "p1", verdict: "WRONG_ANSWER", createdAt: minutesAfterStart(10) },
      { problemId: "p1", verdict: "ACCEPTED", createdAt: minutesAfterStart(20) },
    ]
    const score = scoreParticipant("u1", subs, problems, START)
    const p1 = score.perProblem.find((p) => p.problemId === "p1")!
    expect(p1.solved).toBe(true)
    expect(p1.wrongBeforeSolve).toBe(2)
    expect(p1.solveMinutes).toBe(20)
    expect(p1.penaltyMinutes).toBe(20 + 2 * PENALTY_MINUTES)
    expect(score.solvedCount).toBe(1)
    expect(score.penaltyTime).toBe(30)
    expect(score.lastAcceptedAt).toEqual(minutesAfterStart(20))
  })

  it("stops counting at the first accept — later submissions on the same problem are ignored", () => {
    const subs: ScoredSubmission[] = [
      { problemId: "p1", verdict: "ACCEPTED", createdAt: minutesAfterStart(10) },
      { problemId: "p1", verdict: "WRONG_ANSWER", createdAt: minutesAfterStart(15) },
    ]
    const score = scoreParticipant("u1", subs, problems, START)
    const p1 = score.perProblem.find((p) => p.problemId === "p1")!
    expect(p1.wrongBeforeSolve).toBe(0)
    expect(p1.penaltyMinutes).toBe(10)
  })

  it("never lets solveMinutes go negative for a submission timestamped before contest start", () => {
    const subs: ScoredSubmission[] = [
      { problemId: "p1", verdict: "ACCEPTED", createdAt: minutesAfterStart(-5) },
    ]
    const score = scoreParticipant("u1", subs, problems, START)
    const p1 = score.perProblem.find((p) => p.problemId === "p1")!
    expect(p1.solveMinutes).toBe(0)
  })
})

describe("compareScores", () => {
  const base: ParticipantScore = {
    userId: "a",
    solvedCount: 1,
    penaltyTime: 10,
    perProblem: [],
    lastAcceptedAt: null,
  }

  it("ranks more solves ahead of fewer, regardless of penalty", () => {
    const more = { ...base, solvedCount: 2, penaltyTime: 1000 }
    const fewer = { ...base, solvedCount: 1, penaltyTime: 0 }
    expect(compareScores(more, fewer)).toBeLessThan(0)
  })

  it("breaks a solved-count tie on lower penalty time", () => {
    const lowPenalty = { ...base, penaltyTime: 5 }
    const highPenalty = { ...base, penaltyTime: 20 }
    expect(compareScores(lowPenalty, highPenalty)).toBeLessThan(0)
  })

  it("breaks a full tie on the earlier last-accepted timestamp", () => {
    const earlier = { ...base, lastAcceptedAt: minutesAfterStart(10) }
    const later = { ...base, lastAcceptedAt: minutesAfterStart(20) }
    expect(compareScores(earlier, later)).toBeLessThan(0)
  })

  it("is exactly 0 for identical scores", () => {
    expect(compareScores(base, { ...base })).toBe(0)
  })
})

describe("rankParticipants", () => {
  const problems: ScoredProblem[] = [{ problemId: "p1", difficulty: "EASY" }]

  it("gives tied participants the same rank and jumps the next distinct rank past the tie", () => {
    const a: ParticipantScore = { userId: "a", solvedCount: 2, penaltyTime: 10, perProblem: [], lastAcceptedAt: null }
    const b: ParticipantScore = { userId: "b", solvedCount: 2, penaltyTime: 10, perProblem: [], lastAcceptedAt: null }
    const c: ParticipantScore = { userId: "c", solvedCount: 1, penaltyTime: 5, perProblem: [], lastAcceptedAt: null }

    const ranked = rankParticipants([a, b, c], problems)
    const rankOf = (id: string) => ranked.find((r) => r.userId === id)!.rank

    expect(rankOf("a")).toBe(1)
    expect(rankOf("b")).toBe(1)
    expect(rankOf("c")).toBe(3) // "1, 1, 3" competition ranking, not "1, 1, 2"
  })
})

describe("contestXpFor", () => {
  const diffById = new Map<string, Difficulty>([
    ["p1", "EASY"],
    ["p2", "HARD"],
  ])

  it("awards nothing for a participant who never submitted", () => {
    const score: ParticipantScore = {
      userId: "u",
      solvedCount: 0,
      penaltyTime: 0,
      perProblem: [{ problemId: "p1", solved: false, solveMinutes: null, wrongBeforeSolve: 0, penaltyMinutes: 0 }],
      lastAcceptedAt: null,
    }
    expect(contestXpFor(score, 5, diffById)).toBe(0)
  })

  it("still pays participation + rank bonus for a participant who only submitted wrong answers", () => {
    const score: ParticipantScore = {
      userId: "u",
      solvedCount: 0,
      penaltyTime: 0,
      perProblem: [{ problemId: "p1", solved: false, solveMinutes: null, wrongBeforeSolve: 2, penaltyMinutes: 0 }],
      lastAcceptedAt: null,
    }
    // rank 5 -> decayed = round(150/5) = 30, floor is max(10, 30) = 30
    expect(contestXpFor(score, 5, diffById)).toBe(25 + 30)
  })

  it("adds a difficulty-weighted per-solve bonus on top of participation + rank bonus", () => {
    const score: ParticipantScore = {
      userId: "u",
      solvedCount: 1,
      penaltyTime: 10,
      perProblem: [{ problemId: "p1", solved: true, solveMinutes: 10, wrongBeforeSolve: 0, penaltyMinutes: 10 }],
      lastAcceptedAt: minutesAfterStart(10),
    }
    // rank 1 -> decayed = 150. EASY xp 50 * 0.5 multiplier = 25.
    expect(contestXpFor(score, 1, diffById)).toBe(25 + 150 + 25)
  })

  it("never lets the rank bonus decay below the floor of 10", () => {
    const score: ParticipantScore = {
      userId: "u",
      solvedCount: 0,
      penaltyTime: 0,
      perProblem: [{ problemId: "p1", solved: false, solveMinutes: null, wrongBeforeSolve: 1, penaltyMinutes: 0 }],
      lastAcceptedAt: null,
    }
    // rank 100 -> decayed = round(150/100) = 2, floored to 10.
    expect(contestXpFor(score, 100, diffById)).toBe(25 + 10)
  })

  it("skips the per-solve bonus for a problem missing from the difficulty map instead of throwing", () => {
    const score: ParticipantScore = {
      userId: "u",
      solvedCount: 1,
      penaltyTime: 0,
      perProblem: [{ problemId: "unknown-problem", solved: true, solveMinutes: 0, wrongBeforeSolve: 0, penaltyMinutes: 0 }],
      lastAcceptedAt: minutesAfterStart(0),
    }
    expect(() => contestXpFor(score, 1, diffById)).not.toThrow()
    expect(contestXpFor(score, 1, diffById)).toBe(25 + 150) // no solve bonus added
  })
})

describe("formatPenaltyTime", () => {
  it.each([
    [0, "0m"],
    [45, "45m"],
    [60, "1h 0m"],
    [83, "1h 23m"],
    [125, "2h 5m"],
  ])("formats %i minutes as %s", (minutes, expected) => {
    expect(formatPenaltyTime(minutes)).toBe(expected)
  })
})
