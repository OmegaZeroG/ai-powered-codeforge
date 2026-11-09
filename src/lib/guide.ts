/* ---------------------------------------------------------------------------
   Product guide — the step content plus the small pure helpers that decide
   when it opens by itself and how "already seen" is remembered.

   "Seen" is remembered per account, per browser (localStorage, keyed by user
   id) so a shared computer doesn't hide the tour from the next person, and a
   storage failure (private window, blocked site data) just means the guide
   may show again — never an error.
--------------------------------------------------------------------------- */

export type GuideIcon =
  | "welcome"
  | "topics"
  | "editor"
  | "judge"
  | "ai"
  | "scratchpad"
  | "progress"
  | "contests"
  | "profile"

export interface GuideStep {
  id: string
  icon: GuideIcon
  title: string
  body: string
  /** Short, scannable points under the paragraph. */
  points?: string[]
  /** Optional deep link so a step can take the user straight to the feature. */
  link?: { href: string; label: string }
}

export const GUIDE_STEPS: GuideStep[] = [
  {
    id: "welcome",
    icon: "welcome",
    title: "Welcome to CodeForge",
    body: "A practice platform for data structures and algorithms: pick a problem, write code in the browser, and get judged against real test cases.",
    points: [
      "100 problems across 15 topics, from Arrays to Dynamic Programming",
      "Your code runs in JavaScript, Python, C++ or Java",
      "This tour takes about a minute. You can reopen it any time from the Guide button.",
    ],
  },
  {
    id: "topics",
    icon: "topics",
    title: "Topics and your recommended problem",
    body: "The Topics page is your home base. It reads your solve history and suggests what to try next, so you are always working at the right difficulty.",
    points: [
      "The calibration meter shows where your skill sits between Easy and Hard",
      "A recommended problem is picked for you; solving it moves the meter",
      "Open any topic to see its problems in order",
    ],
    link: { href: "/topics", label: "Open Topics" },
  },
  {
    id: "solve",
    icon: "editor",
    title: "Solving a problem",
    body: "Each problem opens a split workspace: the statement on the left, a code editor on the right, results underneath.",
    points: [
      "Pick a language from the toolbar; Reset restores the starter code",
      "Drag the dividers to resize the panels",
      "Drafts save in your browser. Use the arrow next to Save to choose manual, auto, on submit or on switch",
    ],
    link: { href: "/topics", label: "Choose a problem" },
  },
  {
    id: "judge",
    icon: "judge",
    title: "Submitting and how judging works",
    body: "Submit sends your code to a sandboxed judge. You will see Queued, then Judging, then a verdict.",
    points: [
      "Sample test cases are shown in full so you can compare outputs",
      "Hidden test cases are never revealed. If one fails you are told so, along with the kind of failure (wrong answer, runtime error or time limit)",
      "Accepted solutions update your rank, streak and tasks automatically",
    ],
  },
  {
    id: "ai",
    icon: "ai",
    title: "AI tutor",
    body: "Switch on AI in the editor toolbar for a tutor that sees your code and the problem. It is built to nudge, not to hand you the answer.",
    points: [
      "Hint, Explain, Fix and Rate are one click away",
      "After a result, use Explain with AI to understand what went wrong",
      "Once you are accepted, it can point out a better time or space complexity",
    ],
  },
  {
    id: "scratchpad",
    icon: "scratchpad",
    title: "Scratchpad editor",
    body: "Want to try an idea with no problem attached? The Editor page is a free scratchpad with its own input box.",
    points: [
      "Type custom input, press Run and see the raw output",
      "Use Review with AI to get feedback on any code you write",
    ],
    link: { href: "/editor", label: "Open the scratchpad" },
  },
  {
    id: "progress",
    icon: "progress",
    title: "Ranks, streaks and daily tasks",
    body: "Every accepted problem earns XP. Harder problems earn more.",
    points: [
      "Climb from Iron through Bronze, Silver, Gold, Platinum and Diamond to Master",
      "Keep a daily streak and watch your solve calendar fill in",
      "Complete daily and weekly tasks and collect badges",
    ],
    link: { href: "/topics", label: "See my progress" },
  },
  {
    id: "contests",
    icon: "contests",
    title: "Timed contests",
    body: "Compete on a fixed set of problems against the clock, then compare results on the leaderboard.",
    points: [
      "Scoring is ICPC style: problems solved first, time penalty to break ties",
      "Pasting into the editor is blocked during a contest, so write it yourself",
      "Your past contests and results are kept in your history",
    ],
    link: { href: "/contests", label: "Open Contests" },
  },
  {
    id: "profile",
    icon: "profile",
    title: "Your profile and security",
    body: "Your profile gathers your stats and lets you edit your details.",
    points: [
      "Update your name and profile from Edit profile",
      "Turn on two-factor sign-in with an authenticator app or email, and keep backup codes safe",
    ],
    link: { href: "/profile", label: "Open Profile" },
  },
]

/** Pages where the guide may open by itself for a first-time user. Contest
 *  arenas, the admin area and auth pages are deliberately left out so the tour
 *  never covers a timed contest or a staff screen. */
const AUTO_OPEN_PATHS = [
  /^\/topics(\/|$)/,
  /^\/problems\//,
  /^\/editor$/,
  /^\/profile$/,
  /^\/contests$/,
  /^\/contests\/history$/,
]

export function shouldAutoOpenOn(pathname: string): boolean {
  return AUTO_OPEN_PATHS.some((re) => re.test(pathname))
}

export function guideStorageKey(userId: string): string {
  return `codeforge:guide:seen:${userId}`
}

/** True if this account has already seen (or dismissed) the guide here.
 *  Any storage failure reads as "seen" being unknown, i.e. false. */
export function hasSeenGuide(userId: string): boolean {
  try {
    return window.localStorage.getItem(guideStorageKey(userId)) === "1"
  } catch {
    return false
  }
}

export function markGuideSeen(userId: string): void {
  try {
    window.localStorage.setItem(guideStorageKey(userId), "1")
  } catch {
    // Storage unavailable — worst case the guide offers itself again.
  }
}

/** Clears the flag so the guide auto-opens again on the next visit. */
export function resetGuideSeen(userId: string): void {
  try {
    window.localStorage.removeItem(guideStorageKey(userId))
  } catch {
    // ignore
  }
}
