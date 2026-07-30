import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

// Fixed-window rate limiter. Backed by Upstash Redis (a single atomic script,
// correct across every serverless instance) when UPSTASH_REDIS_REST_URL /
// UPSTASH_REDIS_REST_TOKEN are set; falls back to an in-process Map otherwise,
// so local dev needs no external account.
//
// Scope & honesty (in-memory fallback only): that path is per-instance -- each
// warm serverless lambda/node process keeps its own counters, so it does not
// enforce an exact global limit across a horizontally-scaled deployment. It's
// enough to blunt casual brute-force/email-bomb attempts within one instance.
// The Upstash path removes this caveat: fixedWindow is one atomic Redis
// command, so the count is exact no matter how many instances are handling
// requests.

type Bucket = { count: number; resetAt: number }
const memoryStore = new Map<string, Bucket>()

// Opportunistic cleanup so the Map can't grow unbounded on a long-lived
// instance. Runs at most once per sweep interval, on access.
let lastSweep = 0
const SWEEP_INTERVAL_MS = 60_000

function sweep(now: number) {
  if (now - lastSweep < SWEEP_INTERVAL_MS) return
  lastSweep = now
  for (const [key, b] of memoryStore) {
    if (b.resetAt <= now) memoryStore.delete(key)
  }
}

export type RateLimitResult = {
  ok: boolean
  remaining: number
  limit: number
  resetAt: number
  retryAfterSec: number
}

function memoryRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now()
  sweep(now)

  const existing = memoryStore.get(key)
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs
    memoryStore.set(key, { count: 1, resetAt })
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

const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null

// Each Ratelimit instance is tied to one fixed (limit, window) pair, unlike
// the in-memory path which takes them per call -- cache one instance per
// distinct pair instead of constructing a new one on every request.
const upstashLimiters = new Map<string, Ratelimit>()

function getUpstashLimiter(limit: number, windowMs: number): Ratelimit {
  const cacheKey = `${limit}:${windowMs}`
  let limiter = upstashLimiters.get(cacheKey)
  if (!limiter) {
    limiter = new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.fixedWindow(limit, `${windowMs} ms`),
      analytics: false,
      prefix: "codeforge-ratelimit",
    })
    upstashLimiters.set(cacheKey, limiter)
  }
  return limiter
}

/**
 * Record a hit for `key` and report whether it is within `limit` per
 * `windowMs`. Call once per request you want to meter. Async because the
 * Upstash-backed path is a real network round trip; the in-memory fallback
 * resolves immediately.
 */
export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): Promise<RateLimitResult> {
  if (!redis) return memoryRateLimit(key, limit, windowMs)

  const limiter = getUpstashLimiter(limit, windowMs)
  const { success, remaining, reset } = await limiter.limit(key)
  return {
    ok: success,
    remaining,
    limit,
    resetAt: reset,
    retryAfterSec: success ? 0 : Math.max(0, Math.ceil((reset - Date.now()) / 1000)),
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
