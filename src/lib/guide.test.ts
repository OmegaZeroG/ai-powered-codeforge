import { describe, it, expect } from "vitest"
import fs from "node:fs"
import path from "node:path"
import {
  GUIDES,
  guideIdForPath,
  guideStorageKey,
  placeCard,
  type GuideId,
} from "./guide"

const SRC = path.resolve(__dirname, "..")

function sourceFiles(dir: string): string[] {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) return sourceFiles(full)
    return /\.(tsx?|jsx?)$/.test(e.name) && !e.name.includes(".test.") ? [full] : []
  })
}

describe("guideIdForPath", () => {
  it("maps each product page to its own guide", () => {
    const cases: [string, GuideId][] = [
      ["/topics", "topics"],
      ["/topics/arrays", "topic"],
      ["/problems/two-sum", "problem"],
      ["/editor", "editor"],
      ["/contests", "contests"],
      ["/contests/history", "history"],
      ["/contests/weekly-12", "contest"],
      ["/profile", "profile"],
    ]
    for (const [p, id] of cases) expect(guideIdForPath(p), p).toBe(id)
  })

  it("has no guide for the landing page, auth pages or admin", () => {
    for (const p of ["/", "/login", "/signup", "/verify", "/reset-password", "/admin", "/admin/users", "/topics/a/b"]) {
      expect(guideIdForPath(p), p).toBeNull()
    }
  })

  it("keeps /contests/history from being read as a contest slug", () => {
    expect(guideIdForPath("/contests/history")).toBe("history")
  })
})

describe("guide content", () => {
  it("every page guide has steps with a title and body", () => {
    for (const [id, g] of Object.entries(GUIDES)) {
      expect(g.steps.length, id).toBeGreaterThan(0)
      for (const s of g.steps) {
        expect(s.title.length, `${id}: title`).toBeGreaterThan(0)
        expect(s.body.length, `${id}: ${s.title}`).toBeGreaterThan(0)
      }
    }
  })

  it("has unique step titles within a guide", () => {
    for (const [id, g] of Object.entries(GUIDES)) {
      const titles = g.steps.map((s) => s.title)
      expect(new Set(titles).size, id).toBe(titles.length)
    }
  })

  it("never opens by itself during a timed contest", () => {
    expect(GUIDES.contest.autoOpen).toBe(false)
  })

  it("explains both Run and Submit on the problem page", () => {
    const titles = GUIDES.problem.steps.map((s) => s.title.toLowerCase()).join("|")
    expect(titles).toContain("run")
    expect(titles).toContain("submit")
  })

  it("points only at elements that exist in the source (data-guide anchors)", () => {
    const all = sourceFiles(SRC)
      .map((f) => fs.readFileSync(f, "utf8"))
      .join("\n")
    const missing: string[] = []
    for (const [id, g] of Object.entries(GUIDES)) {
      for (const s of g.steps) {
        if (s.target && !all.includes(`data-guide="${s.target}"`)) {
          missing.push(`${id} → ${s.target}`)
        }
      }
    }
    expect(missing).toEqual([])
  })
})

describe("guideStorageKey", () => {
  it("is scoped per user and per page", () => {
    expect(guideStorageKey("a", "topics")).not.toBe(guideStorageKey("b", "topics"))
    expect(guideStorageKey("a", "topics")).not.toBe(guideStorageKey("a", "profile"))
  })
})

describe("placeCard", () => {
  const desktop = { width: 1280, height: 800 }
  const phone = { width: 375, height: 812 }

  it("centres the card when nothing is highlighted", () => {
    expect(placeCard(null, desktop)).toEqual({ vertical: "bottom", horizontal: "center" })
  })

  it("puts the card away from the highlighted element vertically", () => {
    const top = { top: 20, left: 100, width: 400, height: 60 }
    const bottom = { top: 700, left: 100, width: 400, height: 60 }
    expect(placeCard(top, desktop).vertical).toBe("bottom")
    expect(placeCard(bottom, desktop).vertical).toBe("top")
  })

  it("moves the card sideways when the target is a tall panel", () => {
    const leftPanel = { top: 56, left: 0, width: 420, height: 740 }
    const rightPanel = { top: 56, left: 860, width: 420, height: 740 }
    expect(placeCard(leftPanel, desktop).horizontal).toBe("right")
    expect(placeCard(rightPanel, desktop).horizontal).toBe("left")
  })

  it("always uses a full-width sheet on phones", () => {
    const tall = { top: 56, left: 0, width: 375, height: 700 }
    expect(placeCard(tall, phone).horizontal).toBe("center")
  })
})
