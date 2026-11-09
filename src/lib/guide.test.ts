import { describe, it, expect } from "vitest"
import { GUIDE_STEPS, guideStorageKey, shouldAutoOpenOn } from "./guide"

describe("shouldAutoOpenOn", () => {
  it("opens on the main product pages", () => {
    for (const p of [
      "/topics",
      "/topics/arrays",
      "/problems/two-sum",
      "/editor",
      "/profile",
      "/contests",
      "/contests/history",
    ]) {
      expect(shouldAutoOpenOn(p), p).toBe(true)
    }
  })

  it("never opens over a contest arena, admin, auth or the landing page", () => {
    for (const p of [
      "/",
      "/contests/weekly-1",
      "/admin",
      "/admin/users",
      "/login",
      "/signup",
      "/verify",
      "/reset-password",
    ]) {
      expect(shouldAutoOpenOn(p), p).toBe(false)
    }
  })
})

describe("guide content", () => {
  it("has unique step ids and every step has copy", () => {
    const ids = GUIDE_STEPS.map((s) => s.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const s of GUIDE_STEPS) {
      expect(s.title.length).toBeGreaterThan(0)
      expect(s.body.length).toBeGreaterThan(0)
    }
  })

  it("only deep-links to real in-app routes", () => {
    for (const s of GUIDE_STEPS) {
      if (s.link) expect(s.link.href.startsWith("/")).toBe(true)
    }
  })
})

describe("guideStorageKey", () => {
  it("is scoped per user", () => {
    expect(guideStorageKey("a")).not.toBe(guideStorageKey("b"))
  })
})
