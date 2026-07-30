import { describe, it, expect, afterEach, vi } from "vitest"
import { rateLimit } from "@/lib/rate-limit"

// vitest.config.ts only injects a dummy DATABASE_URL, so UPSTASH_REDIS_REST_URL
// and UPSTASH_REDIS_REST_TOKEN are unset here -- rateLimit() always takes the
// in-memory fallback path in this suite, never a real network call to Upstash.
describe("rateLimit (in-memory fallback)", () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it("allows requests up to the limit, decrementing remaining each time", async () => {
    const key = "allow-up-to-limit"
    const first = await rateLimit(key, 3, 60_000)
    const second = await rateLimit(key, 3, 60_000)
    const third = await rateLimit(key, 3, 60_000)

    expect(first).toMatchObject({ ok: true, remaining: 2 })
    expect(second).toMatchObject({ ok: true, remaining: 1 })
    expect(third).toMatchObject({ ok: true, remaining: 0 })
  })

  it("rejects requests once the limit is exceeded, within the same window", async () => {
    const key = "reject-beyond-limit"
    await rateLimit(key, 2, 60_000)
    await rateLimit(key, 2, 60_000)
    const third = await rateLimit(key, 2, 60_000)

    expect(third.ok).toBe(false)
    expect(third.remaining).toBe(0)
    expect(third.retryAfterSec).toBeGreaterThan(0)
  })

  it("tracks separate keys independently", async () => {
    const a = "independent-a"
    const b = "independent-b"

    await rateLimit(a, 1, 60_000) // exhausts key a
    const aBlocked = await rateLimit(a, 1, 60_000)
    const bStillOk = await rateLimit(b, 1, 60_000) // key b untouched so far

    expect(aBlocked.ok).toBe(false)
    expect(bStillOk.ok).toBe(true)
  })

  it("resets the count once the window elapses", async () => {
    vi.useFakeTimers()
    const key = "window-reset"

    const first = await rateLimit(key, 1, 1_000)
    const blocked = await rateLimit(key, 1, 1_000)
    expect(first.ok).toBe(true)
    expect(blocked.ok).toBe(false)

    vi.advanceTimersByTime(1_100) // past the 1s window

    const afterReset = await rateLimit(key, 1, 1_000)
    expect(afterReset).toMatchObject({ ok: true, remaining: 0 })
  })

  it("computes retryAfterSec from the remaining time in the current window", async () => {
    vi.useFakeTimers()
    vi.setSystemTime(0)
    const key = "retry-after"

    await rateLimit(key, 1, 10_000) // starts a 10s window at t=0

    vi.setSystemTime(4_000) // 6s left in the window
    const blocked = await rateLimit(key, 1, 10_000)

    expect(blocked.ok).toBe(false)
    expect(blocked.retryAfterSec).toBe(6)
  })
})
