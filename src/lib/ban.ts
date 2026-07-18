// Single source of truth for ban state semantics, shared by the edge proxy,
// the /api/execute gate, the profile banner, and the admin panel. Keep all the
// "is this actually active / how long is left" logic here so the rules can
// never drift between enforcement points.

export type BanFields = {
  banned: boolean
  bannedUntil?: Date | string | null
}

/**
 * Is the account under an *active* ban right now?
 *
 * - banned=false            → not banned
 * - banned=true, until=null → permanent ban (active)
 * - banned=true, until>now  → timed ban, still active
 * - banned=true, until<=now → timed ban that has EXPIRED → inactive
 *
 * Note this is a pure function of the row + current time: an expired timed ban
 * reads as inactive everywhere without any background job flipping the flag.
 * (An admin can still "unban" to tidy the flag, but enforcement doesn't need
 * it.)
 */
export function isBanActive(
  user: BanFields | null | undefined,
  now: number = Date.now(),
): boolean {
  if (!user || !user.banned) return false
  if (user.bannedUntil == null) return true // permanent
  const until = new Date(user.bannedUntil).getTime()
  if (Number.isNaN(until)) return true // malformed → fail safe (treat as banned)
  return until > now
}

/** True if a ban exists but its timed window has already passed. */
export function isBanExpired(
  user: BanFields | null | undefined,
  now: number = Date.now(),
): boolean {
  if (!user || !user.banned || user.bannedUntil == null) return false
  const until = new Date(user.bannedUntil).getTime()
  if (Number.isNaN(until)) return false
  return until <= now
}

/** True if the active ban has no end date. */
export function isPermanentBan(user: BanFields | null | undefined): boolean {
  return !!user?.banned && user.bannedUntil == null
}

/**
 * Human-friendly remaining-time string, e.g. "2 days, 3 hours" or "12 minutes".
 * Returns "" when nothing meaningful remains. Coarse by design (largest two
 * units) — the live countdown component renders the precise ticking clock.
 */
export function formatRemaining(
  until: Date | string | null | undefined,
  now: number = Date.now(),
): string {
  if (until == null) return ""
  const ms = new Date(until).getTime() - now
  if (Number.isNaN(ms) || ms <= 0) return ""

  const totalMinutes = Math.floor(ms / 60_000)
  const days = Math.floor(totalMinutes / (60 * 24))
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60)
  const minutes = totalMinutes % 60

  const parts: string[] = []
  if (days > 0) parts.push(`${days} ${days === 1 ? "day" : "days"}`)
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`)
  if (days === 0 && minutes > 0)
    parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`)

  return parts.slice(0, 2).join(", ")
}

// Preset ban durations offered in the admin UI. `days: null` = permanent.
export const BAN_DURATIONS = [
  { key: "1d", label: "1 day", days: 1 },
  { key: "7d", label: "7 days", days: 7 },
  { key: "30d", label: "30 days", days: 30 },
  { key: "perm", label: "Permanent", days: null },
] as const

export type BanDurationKey = (typeof BAN_DURATIONS)[number]["key"] | "custom"

/**
 * Resolve a duration choice to a concrete `bannedUntil` value.
 * - a preset key → now + N days (or null for permanent)
 * - "custom" → parse `customUntil` (ISO / datetime-local string)
 * Returns { until } where `until` is a Date or null (permanent). Throws on an
 * unparseable/at-or-before-now custom date so the action can report it.
 */
export function resolveBannedUntil(
  durationKey: string,
  customUntil?: string | null,
  now: number = Date.now(),
): { until: Date | null } {
  if (durationKey === "custom") {
    if (!customUntil) throw new Error("Pick a date for the custom ban duration.")
    const d = new Date(customUntil)
    if (Number.isNaN(d.getTime()))
      throw new Error("That ban end date is not valid.")
    if (d.getTime() <= now)
      throw new Error("The ban end date must be in the future.")
    return { until: d }
  }
  const preset = BAN_DURATIONS.find((p) => p.key === durationKey)
  if (!preset) throw new Error("Unknown ban duration.")
  if (preset.days == null) return { until: null } // permanent
  return { until: new Date(now + preset.days * 24 * 60 * 60 * 1000) }
}
