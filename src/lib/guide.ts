/* ---------------------------------------------------------------------------
   Page guides — every page has its own short walkthrough.

   Each step can point at a real element on the page through `target`, which is
   the value of that element's `data-guide="..."` attribute. When the element
   is on screen the guide highlights it and puts a small card next to it; when
   it is not (hidden on a small screen, or only present in some states) the
   step is shown as a plain centred card, so a guide never breaks.

   "Seen" is remembered per account, per browser and per page (localStorage),
   so the guide for a page opens by itself once, then only when asked for. A
   storage failure just means a guide may offer itself again, never an error.
--------------------------------------------------------------------------- */

export type GuideId =
  | "topics"
  | "topic"
  | "problem"
  | "editor"
  | "contests"
  | "contest"
  | "history"
  | "profile"

export interface GuideStep {
  title: string
  /** One short sentence. */
  body: string
  /** Up to three very short lines. */
  points?: string[]
  /** `data-guide` value of the element to highlight on the page. */
  target?: string
}

export interface PageGuide {
  /** Small label shown on the card, e.g. "Problem page". */
  name: string
  /** Whether it may open by itself the first time. Off for timed screens. */
  autoOpen: boolean
  steps: GuideStep[]
}

export const GUIDES: Record<GuideId, PageGuide> = {
  topics: {
    name: "Topics",
    autoOpen: true,
    steps: [
      {
        title: "Welcome",
        body: "Pick what to practise. Everything here adapts to what you have solved.",
        points: [
          "Left: rank, badges and tasks",
          "Middle: skill meter, recommendation, topics",
          "Right: solve calendar and streak",
        ],
      },
      {
        title: "Navigation",
        body: "This bar is on every page.",
        points: [
          "Problems and Editor (free scratchpad)",
          "Contests and Profile",
          "Guide opens help for the page you are on",
        ],
        target: "product-nav",
      },
      {
        title: "Calibration",
        body: "Where your skill sits between Easy and Hard.",
        points: [
          "It moves as you solve or fail",
          "The highlighted word is your current target difficulty",
        ],
        target: "calibration",
      },
      {
        title: "Recommended",
        body: "The next problem picked for your level. Click it to open.",
        target: "recommended",
      },
      {
        title: "Topics",
        body: "Each card is a topic. The counter and bar show your progress; click to see its problems.",
        target: "topics-list",
      },
      {
        title: "Rank and XP",
        body: "Accepted problems earn XP, and harder ones earn more.",
        points: ["Iron, Bronze, Silver, Gold, Platinum, Diamond, Master"],
        target: "rank-card",
      },
      {
        title: "Badges and tasks",
        body: "Badges mark milestones. Tasks are small daily and weekly goals.",
        target: "tasks-card",
      },
      {
        title: "Calendar and streak",
        body: "Days you solved something are marked. Your streak counts consecutive days.",
        target: "solve-calendar",
      },
    ],
  },

  topic: {
    name: "Topic",
    autoOpen: true,
    steps: [
      {
        title: "Problems",
        body: "Sorted to save you time.",
        points: [
          "The sparkle marks your best match right now",
          "Solved problems sink to the bottom with a tick",
          "Click a row to open it",
        ],
        target: "topic-problems",
      },
      {
        title: "Difficulty",
        body: "Easy, Medium or Hard. Harder problems earn more XP.",
      },
      {
        title: "Back",
        body: "Return to the full topic list.",
        target: "topic-back",
      },
    ],
  },

  problem: {
    name: "Problem",
    autoOpen: true,
    steps: [
      {
        title: "Layout",
        body: "Problem on the left, editor on the right, results below.",
        points: ["Drag the dividers to resize panels"],
      },
      {
        title: "Statement",
        body: "The task, constraints and examples. Read it first.",
        target: "statement",
      },
      {
        title: "Language",
        body: "Pick a language. Reset restores the starter code and asks you to confirm.",
        target: "language-select",
      },
      {
        title: "Editor",
        body: "Read the input and print the answer, exactly as the examples show.",
        target: "editor",
      },
      {
        title: "Save",
        body: "Saves a draft in this browser.",
        points: ["The arrow sets when: manual, auto, on submit or on switch"],
        target: "save-btn",
      },
      {
        title: "Share",
        body: "Copies your code to the clipboard.",
        target: "share-btn",
      },
      {
        title: "AI tutor",
        body: "A tutor that sees your code. It nudges you and never hands over the answer.",
        points: ["Hint, Explain, Fix and Rate buttons, or ask your own question"],
        target: "ai-toggle",
      },
      {
        title: "Run",
        body: "Tries your code on the example tests only. Instant, and nothing is recorded.",
        points: ["Passing here is not Accepted. Hidden tests are not checked"],
        target: "run-btn",
      },
      {
        title: "Submit",
        body: "Judges your code against every test, including hidden ones.",
        points: [
          "Queued, then Judging, then a verdict",
          "Accepted updates your XP, streak and tasks",
          "A hidden failure tells you the type, never the test",
        ],
        target: "submit-btn",
      },
      {
        title: "Output",
        body: "Results for Run and Submit appear here.",
        points: [
          "AC accepted, WA wrong answer, RE runtime error, TLE too slow, CE compile error",
          "After a failure, Explain with AI opens the tutor",
        ],
        target: "output-panel",
      },
      {
        title: "Guide",
        body: "Reopen this walkthrough any time.",
        target: "guide-btn",
      },
    ],
  },

  editor: {
    name: "Scratchpad",
    autoOpen: true,
    steps: [
      {
        title: "Scratchpad",
        body: "A free editor with no problem attached. Try ideas and snippets here.",
      },
      {
        title: "Language",
        body: "JavaScript, Python, C++ or Java.",
        target: "language-select",
      },
      {
        title: "Editor",
        body: "Programs read from standard input and print to standard output.",
        target: "editor",
      },
      {
        title: "Input",
        body: "What your program reads. Leave it empty if it reads nothing.",
        target: "stdin-box",
      },
      {
        title: "Run",
        body: "Runs your code once with that input and shows the raw output.",
        points: ["Stopped after 5 seconds"],
        target: "run-btn",
      },
      {
        title: "Output",
        body: "stdout, stderr and the exit code. After an error, Review with AI sends your code to the assistant.",
        target: "output-panel",
      },
      {
        title: "AI reviewer",
        body: "Opens an assistant that can Review, Explain, Find bugs and Rate your code.",
        target: "ai-toggle",
      },
    ],
  },

  contests: {
    name: "Contests",
    autoOpen: true,
    steps: [
      {
        title: "Weekly contests",
        body: "Every Sunday at 10 PM: one hour, three problems of the same difficulty.",
      },
      {
        title: "Rounds",
        body: "Grouped by when they happen.",
        points: [
          "Live: running now, with Enter arena",
          "Upcoming: countdown, problems hidden until the start",
          "Past: finished, with View results",
        ],
        target: "contest-list",
      },
      {
        title: "History",
        body: "Your past contests are in Profile, under Contests, then All.",
      },
    ],
  },

  contest: {
    name: "Contest",
    autoOpen: false,
    steps: [
      {
        title: "Arena",
        body: "Solve as many of the three problems as you can before time runs out.",
        points: [
          "Most solved wins, less penalty time breaks ties",
          "Wrong submissions add penalty time",
        ],
      },
      {
        title: "Timer",
        body: "The clock and your solved count. End contest finishes early and asks you to confirm.",
      },
      {
        title: "Problems",
        body: "The A, B and C tabs switch problems. A mark shows which you have solved.",
      },
      {
        title: "Submit",
        body: "Judges against every test, hidden ones included.",
        points: ["Pasting is disabled in contests", "There is no Run button here"],
      },
      {
        title: "Leaderboard",
        body: "Ranks by problems solved, then penalty time. Final results and XP appear after the round.",
      },
    ],
  },

  history: {
    name: "Contest history",
    autoOpen: true,
    steps: [
      {
        title: "Your contests",
        body: "Every round you took part in, newest first.",
        points: ["Rank, problems solved, time and XP for each", "Click a contest for its results"],
        target: "history-table",
      },
    ],
  },

  profile: {
    name: "Profile",
    autoOpen: true,
    steps: [
      {
        title: "Profile",
        body: "Your details. The tag on your avatar is your current rank.",
        target: "profile-header",
      },
      {
        title: "Edit profile",
        body: "Change your name, avatar, bio, location, GitHub and website.",
        target: "edit-profile",
      },
      {
        title: "Rank and tasks",
        body: "Your XP and tier, badges, and daily and weekly tasks.",
        target: "rank-card",
      },
      {
        title: "Recent solves",
        body: "Your latest accepted problems.",
        target: "recent-solves",
      },
      {
        title: "Security",
        body: "Add two-factor sign-in so a stolen password is not enough.",
        points: [
          "Authenticator app or email codes",
          "Backup codes if you lose access",
          "Switch method or turn it off here",
        ],
        target: "security-card",
      },
      {
        title: "Streak",
        body: "Your current and best run of solving days.",
        target: "streak-card",
      },
      {
        title: "Contest stats",
        body: "How you have done in contests. All opens your full history.",
        target: "contest-stats",
      },
    ],
  },
}

/** Which guide belongs to the page at `pathname`, or null if it has none. */
export function guideIdForPath(pathname: string): GuideId | null {
  if (pathname === "/topics") return "topics"
  if (/^\/topics\/[^/]+$/.test(pathname)) return "topic"
  if (/^\/problems\/[^/]+$/.test(pathname)) return "problem"
  if (pathname === "/editor") return "editor"
  if (pathname === "/contests") return "contests"
  if (pathname === "/contests/history") return "history"
  if (/^\/contests\/[^/]+$/.test(pathname)) return "contest"
  if (pathname === "/profile") return "profile"
  return null
}

/* ----------------------------- remembering -------------------------------- */

export function guideStorageKey(userId: string, guideId: GuideId): string {
  return `codeforge:guide:seen:${userId}:${guideId}`
}

export const AUTO_OFF_KEY = "codeforge:guide:auto-off"

export function hasSeenGuide(userId: string, guideId: GuideId): boolean {
  try {
    return window.localStorage.getItem(guideStorageKey(userId, guideId)) === "1"
  } catch {
    return false
  }
}

export function markGuideSeen(userId: string, guideId: GuideId): void {
  try {
    window.localStorage.setItem(guideStorageKey(userId, guideId), "1")
  } catch {
    // Storage unavailable: the guide may simply offer itself again.
  }
}

/** True when the user chose "don't open guides automatically". */
export function isAutoOpenOff(): boolean {
  try {
    return window.localStorage.getItem(AUTO_OFF_KEY) === "1"
  } catch {
    return false
  }
}

export function setAutoOpenOff(off: boolean): void {
  try {
    if (off) window.localStorage.setItem(AUTO_OFF_KEY, "1")
    else window.localStorage.removeItem(AUTO_OFF_KEY)
  } catch {
    // ignore
  }
}

/* ------------------------------- placement -------------------------------- */

export interface Box {
  top: number
  left: number
  width: number
  height: number
}

export interface Size {
  width: number
  height: number
}

export interface Point {
  top: number
  left: number
}

/** Width of the guide card: a fixed small card on wider screens, nearly full
 *  width on phones. */
export function cardWidth(viewportWidth: number): number {
  return viewportWidth < 640 ? viewportWidth - 24 : 300
}

function overlapArea(a: Box, b: Box): number {
  const w = Math.min(a.left + a.width, b.left + b.width) - Math.max(a.left, b.left)
  const h = Math.min(a.top + a.height, b.top + b.height) - Math.max(a.top, b.top)
  return w > 0 && h > 0 ? w * h : 0
}

/** Where to put the card so it does not cover the highlighted element.
 *
 *  Tries the spots next to the target (below, above, right, left) and then the
 *  screen corners, keeps each one inside the viewport, and takes the first one
 *  that overlaps the target least, so the card is only ever on top of what it
 *  explains when there is genuinely no room (a target as big as the screen).
 *  With no target the card is centred (a bottom sheet on phones). */
export function placePopover(
  target: Box | null,
  card: Size,
  viewport: Size,
  { gap = 14, margin = 12, pad = 6 }: { gap?: number; margin?: number; pad?: number } = {}
): Point {
  const maxLeft = Math.max(margin, viewport.width - card.width - margin)
  const maxTop = Math.max(margin, viewport.height - card.height - margin)
  const clamp = (p: Point): Point => ({
    top: Math.min(Math.max(p.top, margin), maxTop),
    left: Math.min(Math.max(p.left, margin), maxLeft),
  })
  const phone = viewport.width < 640

  if (!target) {
    return phone
      ? clamp({ top: maxTop, left: (viewport.width - card.width) / 2 })
      : clamp({
          top: (viewport.height - card.height) / 2,
          left: (viewport.width - card.width) / 2,
        })
  }

  // The area to keep clear: the target plus the spotlight ring around it.
  const area: Box = {
    top: target.top - pad,
    left: target.left - pad,
    width: target.width + pad * 2,
    height: target.height + pad * 2,
  }
  const centerX = target.left + target.width / 2 - card.width / 2
  const centerY = target.top + target.height / 2 - card.height / 2
  const below = area.top + area.height + gap
  const above = area.top - gap - card.height
  const right = area.left + area.width + gap
  const leftOf = area.left - gap - card.width

  const candidates: Point[] = phone
    ? [
        { top: below, left: margin },
        { top: above, left: margin },
        { top: maxTop, left: margin },
        { top: margin, left: margin },
      ]
    : [
        { top: below, left: centerX },
        { top: above, left: centerX },
        { top: centerY, left: right },
        { top: centerY, left: leftOf },
        { top: maxTop, left: maxLeft },
        { top: maxTop, left: margin },
        { top: margin, left: maxLeft },
        { top: margin, left: margin },
      ]

  let best: Point | null = null
  let bestOverlap = Infinity
  for (const raw of candidates) {
    const p = clamp(raw)
    const overlap = overlapArea({ ...p, width: card.width, height: card.height }, area)
    if (overlap < bestOverlap) {
      best = p
      bestOverlap = overlap
      if (overlap === 0) break
    }
  }
  return best ?? clamp({ top: margin, left: margin })
}
