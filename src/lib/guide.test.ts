import { describe, it, expect } from "vitest"
import fs from "node:fs"
import path from "node:path"
import {
  GUIDES,
  guideIdForPath,
  guideStorageKey,
  placePopover,
  cardWidth,
  type Box,
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

describe("placePopover", () => {
  const desktop = { width: 1280, height: 800 }
  const phone = { width: 375, height: 812 }
  const card = { width: 300, height: 180 }
  const pad = 6

  const overlaps = (p: { top: number; left: number }, t: Box, size = card) => {
    const a = { top: t.top - pad, left: t.left - pad, width: t.width + pad * 2, height: t.height + pad * 2 }
    return (
      Math.min(p.left + size.width, a.left + a.width) > Math.max(p.left, a.left) &&
      Math.min(p.top + size.height, a.top + a.height) > Math.max(p.top, a.top)
    )
  }
  const inside = (p: { top: number; left: number }, vp = desktop, size = card) =>
    p.left >= 0 && p.top >= 0 && p.left + size.width <= vp.width && p.top + size.height <= vp.height

  it("centres the card when nothing is highlighted, and sheets it on phones", () => {
    const c = placePopover(null, card, desktop)
    expect(c.left).toBe((desktop.width - card.width) / 2)
    expect(c.top).toBe((desktop.height - card.height) / 2)
    const p = placePopover(null, { width: 351, height: 200 }, phone)
    expect(p.top + 200).toBeLessThanOrEqual(phone.height)
    expect(p.top).toBeGreaterThan(phone.height / 2)
  })

  it("puts the card below a target near the top", () => {
    const t = { top: 60, left: 500, width: 200, height: 40 }
    const p = placePopover(t, card, desktop)
    expect(p.top).toBeGreaterThan(t.top + t.height)
    expect(overlaps(p, t)).toBe(false)
  })

  it("puts the card above a target near the bottom", () => {
    const t = { top: 700, left: 500, width: 200, height: 40 }
    const p = placePopover(t, card, desktop)
    expect(p.top + card.height).toBeLessThan(t.top)
    expect(overlaps(p, t)).toBe(false)
  })

  it("moves beside a tall panel instead of over it", () => {
    const left = { top: 56, left: 0, width: 420, height: 740 }
    const right = { top: 56, left: 860, width: 420, height: 740 }
    const pl = placePopover(left, card, desktop)
    const pr = placePopover(right, card, desktop)
    expect(pl.left).toBeGreaterThanOrEqual(left.width)
    expect(pr.left + card.width).toBeLessThanOrEqual(right.left)
    expect(overlaps(pl, left)).toBe(false)
    expect(overlaps(pr, right)).toBe(false)
  })

  it("never covers the target when there is room, wherever it is", () => {
    const sizes = [
      { width: 120, height: 36 },
      { width: 400, height: 90 },
      { width: 300, height: 300 },
      { width: 612, height: 235 },
    ]
    for (const s of sizes) {
      for (let top = 0; top <= desktop.height - s.height; top += 90) {
        for (let left = 0; left <= desktop.width - s.width; left += 160) {
          const t = { top, left, ...s }
          const p = placePopover(t, card, desktop)
          expect(overlaps(p, t), JSON.stringify(t)).toBe(false)
          expect(inside(p), JSON.stringify(t)).toBe(true)
        }
      }
    }
  })

  it("uses a full-width card above or below the target on phones", () => {
    const w = cardWidth(phone.width)
    expect(w).toBe(phone.width - 24)
    const size = { width: w, height: 220 }
    const nearTop = { top: 80, left: 20, width: 335, height: 60 }
    const nearBottom = { top: 700, left: 20, width: 335, height: 60 }
    const a = placePopover(nearTop, size, phone)
    const b = placePopover(nearBottom, size, phone)
    expect(overlaps(a, nearTop, size)).toBe(false)
    expect(overlaps(b, nearBottom, size)).toBe(false)
    expect(inside(a, phone, size) && inside(b, phone, size)).toBe(true)
  })

  it("keeps the card on screen even for a target as big as the screen", () => {
    const huge = { top: 0, left: 0, width: 1280, height: 800 }
    expect(inside(placePopover(huge, card, desktop))).toBe(true)
  })
})
