// Lightweight fixed-window rate limiter.
//
// Scope & honesty: this is an in-process, in-memory limiter. It is per-instance
// (each serverless lambda / node process keeps its own counters), so it does not
// give you a globally exact limit across a horizontally-scaled deployment. What
// it DOES do well: stop a single client from hammering an endpoint within one
// warm instance, cheaply and with zero external dependencies — enough to blunt
// brute-force and email-bomb attempts on auth endpoints. For hard global limits,
// swap the Map for Redis/Upstash behind the same `rateLimit()` signature.
type Bucket = { count: number; resetAt: number }

const store = new Map<string, Bucket>()

// Opportunistic cleanup so the Map can't grow unbounded on a long-lived
// instance. Runs at most once per sweep interval, on access.
let lastSweep = 0
const SWEEP_INTERVAL_MS = 60_000

function sweep(now: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return
  lastSweep = now
  for (const [key, b] of store) {
    if (b.resetAt <= now) store.delete(key)
  }
}

export type RateLimitResult = {
  ok: boolean
  remaining: number
  limit: number
  resetAt: number
  retryAfterSec: number
}

/**
 * Record a hit for `key` and report whether it is within `limit` per
 * `windowMs`. Call once per request you want to meter.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now()
  sweep(now)

  const existing = store.get(key)
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs
    store.set(key, { count: 1, resetAt })
    return { ok: true, remaining: limit - 1, limit, resetAt, retryAfterSec: 0 }
  }

  existing.count += 1
  const ok = existing.count <= limit
  return {
    ok,
    remaining: Math.max(0, limit - existing.count),
    limit,
    resetAt: existing.resetAt,
    retryAfterSec: ok ? 0 : Math.ceil((existing.resetAt - now) / 1000),
  }
}

/** Best-effort client IP from a Request's forwarding headers. */
export function ipFromRequest(request: Request): string {
  const xff = request.headers.get("x-forwarded-for")
  if (xff) return xff.split(",")[0]!.trim()
  return request.headers.get("x-real-ip") ?? "unknown"
}

/** Standard 429 response with a Retry-After header. */
export function tooManyRequests(result: RateLimitResult): Response {
  return new Response(
    JSON.stringify({ error: "Too many requests. Please try again shortly." }),
    {
      status: 429,
      headers: {
        "content-type": "application/json",
        "retry-after": String(result.retryAfterSec),
      },
    },
  )
}
