import { describe, it, expect } from "vitest"
import type { Difficulty, Verdict } from "@prisma/client"
import { computeSkillFromData, pickRecommended, type RecommendedProblem, type UserSkill } from "@/lib/adaptive"

const topic = { name: "Arrays", slug: "arrays" }

describe("computeSkillFromData", () => {
  it("defaults a brand-new user to EASY with no recent accuracy", () => {
    const skill = computeSkillFromData([], [])
    expect(skill.score).toBe(1)
    expect(skill.targetDifficulty).toBe("EASY")
    expect(skill.recentAccuracy).toBeNull()
    expect(skill.solvedCount).toBe(0)
  })

  it("maps an all-HARD solve history to HARD (clamped at the top of the scale)", () => {
    const skill = computeSkillFromData(["HARD", "HARD"], [])
    expect(skill.score).toBe(3)
    expect(skill.targetDifficulty).toBe("HARD")
  })

  it("classifies a mixed solve history by weighted average difficulty", () => {
    // (EASY=1 + MEDIUM=2) / 2 = 1.5, below the 1.67 EASY/MEDIUM boundary
    const low = computeSkillFromData(["EASY", "MEDIUM"], [])
    expect(low.targetDifficulty).toBe("EASY")

    // (MEDIUM=2 + MEDIUM=2) / 2 = 2, within the MEDIUM band
    const mid = computeSkillFromData(["MEDIUM", "MEDIUM"], [])
    expect(mid.targetDifficulty).toBe("MEDIUM")

    // (HARD=3 + HARD=3 + MEDIUM=2) / 3 = 2.67, above the 2.34 MEDIUM/HARD boundary
    const high = computeSkillFromData(["HARD", "HARD", "MEDIUM"], [])
    expect(high.targetDifficulty).toBe("HARD")
  })

  it("requires at least 3 recent submissions before accuracy affects the score", () => {
    const skill = computeSkillFromData(
      ["EASY"],
      ["ACCEPTED", "ACCEPTED"] as Verdict[] // length 2, would qualify (100%) but too few
    )
    expect(skill.score).toBe(1) // unchanged from the base EASY score
    expect(skill.recentAccuracy).toBe(1) // accuracy is still reported...
  })

  it("bumps the score up when recent accuracy is >= 70% over >= 3 submissions, even across a tier boundary", () => {
    // 4 EASY + 1 MEDIUM -> base = (4*1 + 2) / 5 = 1.2
    const skill = computeSkillFromData(
      ["EASY", "EASY", "EASY", "EASY", "MEDIUM"],
      ["ACCEPTED", "ACCEPTED", "ACCEPTED", "WRONG_ANSWER"] as Verdict[] // 75% accuracy
    )
    expect(skill.score).toBe(1.7) // 1.2 + 0.5, crosses the 1.67 boundary
    expect(skill.targetDifficulty).toBe("MEDIUM")
  })

  it("drops the score when recent accuracy is <= 30% over >= 3 submissions, clamped at a floor of 1", () => {
    const skill = computeSkillFromData(
      ["EASY"], // base score 1
      ["WRONG_ANSWER", "WRONG_ANSWER", "WRONG_ANSWER", "ACCEPTED"] as Verdict[] // 25% accuracy
    )
    expect(skill.score).toBe(1) // 1 - 0.5 = 0.5, clamped back up to the floor of 1
  })

  it("clamps a HARD-heavy score plus a good-accuracy bump at a ceiling of 3", () => {
    const skill = computeSkillFromData(
      ["HARD", "HARD"], // base score 3
      ["ACCEPTED", "ACCEPTED", "ACCEPTED"] as Verdict[] // 100% accuracy, would push to 3.5
    )
    expect(skill.score).toBe(3)
  })
})

describe("pickRecommended", () => {
  const problem = (id: string, difficulty: Difficulty): RecommendedProblem => ({
    id,
    title: id,
    slug: id,
    difficulty,
    topic,
  })

  const baseSkill: UserSkill = { score: 1, targetDifficulty: "EASY", recentAccuracy: null, solvedCount: 0 }

  it("returns null when there are no candidates left", () => {
    expect(pickRecommended([], baseSkill)).toBeNull()
  })

  it("prefers a candidate matching the target difficulty exactly", () => {
    const candidates = [problem("hard-1", "HARD"), problem("easy-1", "EASY"), problem("easy-2", "EASY")]
    const pick = pickRecommended(candidates, baseSkill)
    expect(pick?.id).toBe("easy-1") // first exact match, in list order
  })

  it("falls back to the closest difficulty by weight when nothing matches exactly", () => {
    // target is MEDIUM but no MEDIUM candidate exists; score 1.9 is closer to HARD(3) than EASY(1)... actually closer to EASY
    const candidates = [problem("easy-1", "EASY"), problem("hard-1", "HARD")]
    const skill: UserSkill = { score: 1.9, targetDifficulty: "MEDIUM", recentAccuracy: null, solvedCount: 5 }
    const pick = pickRecommended(candidates, skill)
    // |1 - 1.9| = 0.9 vs |3 - 1.9| = 1.1 -> EASY is closer
    expect(pick?.id).toBe("easy-1")
  })
})
