// Shared contest logic: scheduling and status. Kept framework-free and pure so
// both server actions and UI can use it, and so it is unit-testable.
import type { Difficulty } from "@prisma/client"

// Contests run for one hour.
export const CONTEST_DURATION_MS = 60 * 60 * 1000

// The weekly slot: Sunday at 22:00 (10 PM). `getDay()` returns 0 for Sunday.
export const CONTEST_DAY = 0 // Sunday
export const CONTEST_HOUR = 22 // 10 PM

// How many problems make up a round.
export const CONTEST_PROBLEM_COUNT = 3

export type ContestStatus = "upcoming" | "live" | "past"

export function contestStatus(
  contest: { startsAt: Date | string; endsAt: Date | string },
  now: number = Date.now(),
): ContestStatus {
  const start = new Date(contest.startsAt).getTime()
  const end = new Date(contest.endsAt).getTime()
  if (now < start) return "upcoming"
  if (now >= end) return "past"
  return "live"
}

// The next Sunday 22:00 strictly after `from`. If it is already Sunday but past
// 22:00 (or exactly at it), roll to the following week — we never schedule a
// slot in the past. Computed in the server's local timezone, matching how the
// rest of the app renders times.
export function nextContestSlot(from: Date = new Date()): Date {
  const d = new Date(from)
  d.setSeconds(0, 0)
  d.setMinutes(0)
  d.setHours(CONTEST_HOUR)

  // Days until the coming Sunday (0..6). If today is Sunday this is 0.
  const delta = (CONTEST_DAY - d.getDay() + 7) % 7
  d.setDate(d.getDate() + delta)

  // If that computed slot is not strictly in the future, jump a week.
  if (d.getTime() <= from.getTime()) {
    d.setDate(d.getDate() + 7)
  }
  return d
}

// A human label for a difficulty-themed contest, e.g. "Hard Round".
export function contestTitleForDifficulty(
  difficulty: Difficulty,
  slotDate: Date,
  timeZone?: string,
): string {
  const diff =
    difficulty.charAt(0) + difficulty.slice(1).toLowerCase() // EASY -> Easy
  const date = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    timeZone,
  }).format(slotDate)
  return `${diff} Round — ${date}`
}

// URL-safe slug for a contest, unique-ish by the slot timestamp.
export function contestSlug(
  difficulty: Difficulty,
  slotDate: Date,
  timeZone?: string,
): string {
  // en-CA formats as YYYY-MM-DD; strip the dashes for a compact date. Using a
  // timeZone keeps the calendar day consistent with how the admin picked it.
  const ymd = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone,
  })
    .format(slotDate)
    .replace(/-/g, "")
  // Include HHmm so two contests of the same difficulty on the same day (but at
  // different start times) get distinct slugs and don't collide.
  const hm = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone,
  })
    .format(slotDate)
    .replace(":", "")
  return `${difficulty.toLowerCase()}-${ymd}-${hm}`
}
