/* ---------------------------------------------------------------------------
   Page guides — every page has its own short walkthrough.

   Each step can point at a real element on the page through `target`, which is
   the value of that element's `data-guide="..."` attribute. When the element
   is on screen the guide highlights it and explains what it is and what its
   buttons do; when it is not (hidden on a small screen, or only present in
   some states) the step is simply shown as a card, so a guide never breaks.

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
  body: string
  /** One line per control, written as "Name: what it does". */
  points?: string[]
  /** `data-guide` value of the element to highlight on the page. */
  target?: string
}

export interface PageGuide {
  /** Shown in the dialog header, e.g. "Problem page guide". */
  name: string
  /** Whether it may open by itself the first time. Off for timed/staff screens. */
  autoOpen: boolean
  steps: GuideStep[]
}

export const GUIDES: Record<GuideId, PageGuide> = {
  topics: {
    name: "Topics page",
    autoOpen: true,
    steps: [
      {
        title: "Your home page",
        body: "Topics is where you choose what to practise. Everything here adapts to the problems you have solved.",
        points: [
          "Left column: your rank, badges and tasks",
          "Middle: your skill meter, a recommended problem and every topic",
          "Right column: your solve calendar and streak",
        ],
      },
      {
        title: "Navigation bar",
        body: "The bar across the top works on every page.",
        points: [
          "Problems: back to this topic list",
          "Editor: a free scratchpad, no problem attached",
          "Contests: timed rounds against other users",
          "Profile: your stats and account settings",
          "Guide: opens the walkthrough for whichever page you are on",
          "Bell: your notifications. Log out: ends your session",
        ],
        target: "product-nav",
      },
      {
        title: "Your calibration meter",
        body: "This bar shows where your skill sits between Easy and Hard, worked out from the problems you solved and your recent results.",
        points: [
          "The marker moves as you solve more or fail more",
          "The highlighted word is the difficulty the judge is targeting for you right now",
        ],
        target: "calibration",
      },
      {
        title: "Recommended for you",
        body: "One click takes you to the next problem picked for your current level, so you never have to guess what to try.",
        points: ["Click the card to open the problem in the editor"],
        target: "recommended",
      },
      {
        title: "Topic cards",
        body: "Each card is one topic, from Arrays to Dynamic Programming, shown in a sensible learning order.",
        points: [
          "x/y solved: how many of its problems you have accepted",
          "Progress bar under each card fills as you solve, and turns green when the topic is complete",
          "Click a card to see that topic's problems",
        ],
        target: "topics-list",
      },
      {
        title: "Rank and XP",
        body: "Every accepted problem earns XP, and harder problems earn more. XP moves you up the tiers.",
        points: ["Tiers run Iron, Bronze, Silver, Gold, Platinum, Diamond, Master"],
        target: "rank-card",
      },
      {
        title: "Badges and tasks",
        body: "Badges are unlocked by milestones. Tasks are small daily and weekly goals that give you a reason to come back.",
        target: "tasks-card",
      },
      {
        title: "Solve calendar and streak",
        body: "The calendar marks every day you solved something. Your streak counts consecutive days, and it survives until the end of today if you solved yesterday.",
        points: [
          "Arrow buttons on the calendar switch between months",
          "The streak card also shows your best streak ever",
        ],
        target: "solve-calendar",
      },
    ],
  },

  topic: {
    name: "Topic page",
    autoOpen: true,
    steps: [
      {
        title: "Problems in this topic",
        body: "Every problem in the topic is listed with its difficulty. They are sorted to save you time.",
        points: [
          "Unsolved problems closest to your level come first. The glowing one with a sparkle is the best match for you right now",
          "A green tick means you have already solved it, and those sink to the bottom",
          "Click any row to open the problem",
        ],
        target: "topic-problems",
      },
      {
        title: "Difficulty tags",
        body: "Each problem is tagged Easy, Medium or Hard. Hard problems earn more XP when accepted.",
      },
      {
        title: "Back to all topics",
        body: "This link returns you to the full topic list.",
        target: "topic-back",
      },
    ],
  },

  problem: {
    name: "Problem page",
    autoOpen: true,
    steps: [
      {
        title: "How this page is laid out",
        body: "The problem is on the left, your code editor is on the right, and results appear under the editor.",
        points: [
          "Drag the dividers between panels to resize them",
          "On a phone the panels stack on top of each other",
        ],
      },
      {
        title: "Problem statement",
        body: "Read this first. It holds the task, the constraints and worked examples.",
        points: [
          "Constraints tell you the input sizes, which hints at the speed you need",
          "Examples show real inputs and the exact output expected",
          "The link at the top goes back to this problem's topic",
        ],
        target: "statement",
      },
      {
        title: "Language and Reset",
        body: "Choose the language you want to code in. Your code and starter template switch with it.",
        points: [
          "Language list: JavaScript, Python, C++ or Java",
          "Reset: restores the starter code. It asks you to confirm first so you cannot wipe your work by accident",
        ],
        target: "language-select",
      },
      {
        title: "Code editor",
        body: "A full code editor with syntax colouring, auto-indent and bracket matching. Your solution reads its input and prints its answer, exactly as the examples show.",
        target: "editor",
      },
      {
        title: "Save",
        body: "Saves a draft of your code in this browser so you can come back later.",
        points: [
          "Save: saves right now",
          "Arrow beside it: choose when saving happens. Manual, Auto-save as you type, On submit, or On switch",
        ],
        target: "save-btn",
      },
      {
        title: "Share",
        body: "Copies your current code to the clipboard so you can paste it somewhere else.",
        target: "share-btn",
      },
      {
        title: "AI tutor",
        body: "Turns the AI side panel on or off. It can see your code and the problem, and it is built to nudge you rather than hand over the answer.",
        points: [
          "Hint: the smallest push forward",
          "Explain: what your code does, without solving it",
          "Fix: helps you find why it fails",
          "Rate: scores your code out of 10 on correctness, speed, memory, optimality and style",
          "You can also type a question in the box. The bin icon clears the chat and X closes the panel",
        ],
        target: "ai-toggle",
      },
      {
        title: "Run: try the examples",
        body: "Runs your code on the example test cases only, the ones shown in the statement. It is instant and records nothing.",
        points: [
          "Use it as often as you like to check your logic",
          "It does not count as a submission and does not change your XP, streak or progress",
          "Passing here does not mean accepted. Hidden tests are not checked",
        ],
        target: "run-btn",
      },
      {
        title: "Submit: the real judge",
        body: "Sends your code to the judge, which runs it against every test case, including hidden ones you cannot see.",
        points: [
          "You will see Queued, then Judging, then a verdict",
          "Accepted means every test passed. It updates your rank, streak and tasks",
          "If it fails on a hidden test you are told so, with the type of failure, but not the test itself",
        ],
        target: "submit-btn",
      },
      {
        title: "Output and verdicts",
        body: "Results for Run and Submit show here.",
        points: [
          "AC Accepted, WA Wrong Answer, RE Runtime Error, TLE Time Limit Exceeded, CE Compile Error",
          "Each example shows the input, the expected output and your output",
          "Explain with AI appears after a failure and opens the tutor, which can see the failing test",
          "Bin icon: clears the output",
        ],
        target: "output-panel",
      },
      {
        title: "Notifications and the Guide button",
        body: "The bell shows alerts from the platform. This Guide button reopens this walkthrough whenever you want it.",
        target: "guide-btn",
      },
    ],
  },

  editor: {
    name: "Scratchpad",
    autoOpen: true,
    steps: [
      {
        title: "A free scratchpad",
        body: "This editor has no problem attached. Use it to try an idea, test a snippet or practise a language.",
      },
      {
        title: "Language",
        body: "Pick JavaScript, Python, C++ or Java. The starter code changes to match.",
        target: "language-select",
      },
      {
        title: "Code editor",
        body: "Write anything here. Programs read from standard input and print to standard output.",
        target: "editor",
      },
      {
        title: "Standard input",
        body: "Type what your program should read as input. Leave it empty if your program takes none.",
        target: "stdin-box",
      },
      {
        title: "Run",
        body: "Runs your code once with the input above and shows the raw output.",
        points: [
          "Exit code 0 means it finished normally",
          "stdout is what it printed; stderr is its error output",
          "Programs that run longer than 5 seconds are stopped",
        ],
        target: "run-btn",
      },
      {
        title: "Output and AI review",
        body: "Results appear here. If something goes wrong, Review with AI sends your code to the assistant.",
        points: [
          "In the scratchpad the AI acts as a code reviewer: Review, Explain, Find bugs and Rate",
          "Bin icon: clears the output",
        ],
        target: "output-panel",
      },
      {
        title: "AI, Save and Share",
        body: "AI opens the reviewer panel. Save keeps a draft in this browser, with the arrow to choose when. Share copies your code.",
        target: "ai-toggle",
      },
    ],
  },

  contests: {
    name: "Contests page",
    autoOpen: true,
    steps: [
      {
        title: "Weekly contests",
        body: "A new round every Sunday at 10 PM. Each lasts one hour and has three problems of the same difficulty.",
      },
      {
        title: "Contest cards",
        body: "Rounds are grouped by when they happen.",
        points: [
          "Live now: running at this moment",
          "Upcoming: shows a countdown. Problems stay hidden until the start",
          "Past rounds: finished, with results available",
        ],
        target: "contest-list",
      },
      {
        title: "Enter arena and View results",
        body: "Enter arena appears while a round is live and takes you to the contest. View results opens the final leaderboard of a finished round.",
      },
      {
        title: "Your contest history",
        body: "Your past contests, ranks and XP are kept in your contest history. Open your Profile and press All in the Contests card to see it.",
      },
    ],
  },

  contest: {
    name: "Contest page",
    autoOpen: false,
    steps: [
      {
        title: "The contest arena",
        body: "A timed round. Solve as many of the three problems as you can before the clock reaches zero.",
        points: [
          "Scoring is ICPC style: most problems solved wins, ties are broken by less penalty time",
          "A wrong submission adds penalty time, so check carefully before you submit",
        ],
      },
      {
        title: "Timer and End contest",
        body: "The clock counts down to the end of the round.",
        points: [
          "Solved: how many problems you have accepted so far",
          "End contest: finish early. It asks you to confirm and cannot be undone",
        ],
      },
      {
        title: "Problem tabs",
        body: "A, B and C switch between the three problems. A mark shows which ones you have solved.",
      },
      {
        title: "Editor, paste and Submit",
        body: "Write your solution in the editor.",
        points: [
          "Pasting into the editor is disabled during a contest, so type your own code",
          "Submit: judges your code against every test case, hidden ones included",
          "There is no Run button here. Test with the examples in the statement yourself",
        ],
      },
      {
        title: "Leaderboard and results",
        body: "The leaderboard ranks everyone by problems solved and penalty time. After the round ends it shows final results and the XP you earned.",
      },
    ],
  },

  history: {
    name: "Contest history",
    autoOpen: true,
    steps: [
      {
        title: "Your contest record",
        body: "Every round you took part in, newest first.",
        points: [
          "Contest: the round. Click it to see its results",
          "Rank: where you finished among all participants",
          "Solved: problems you got accepted",
          "Time: your total time including penalties",
          "XP: what the round earned you",
        ],
        target: "history-table",
      },
    ],
  },

  profile: {
    name: "Profile page",
    autoOpen: true,
    steps: [
      {
        title: "Your profile",
        body: "Your public details and your progress in one place.",
        points: [
          "The small tag on your avatar is your current rank",
          "Name, handle, join date, bio and links appear under it",
        ],
        target: "profile-header",
      },
      {
        title: "Edit profile",
        body: "Opens a form where you can change how you appear.",
        points: [
          "Display name, avatar URL, bio, location, GitHub handle and website",
          "Save changes applies them. Closing the form without saving discards them",
        ],
        target: "edit-profile",
      },
      {
        title: "Rank, badges and tasks",
        body: "Your XP and tier, the badges you have unlocked, and your daily and weekly tasks.",
        target: "rank-card",
      },
      {
        title: "Recent solves",
        body: "The latest problems you got accepted, with their topic and difficulty. View all goes to the topic list.",
        target: "recent-solves",
      },
      {
        title: "Security",
        body: "Protect your account with two-factor sign-in, so a stolen password alone is not enough.",
        points: [
          "Authenticator app: a code from an app on your phone",
          "Email code: a one-time code sent to your inbox",
          "Backup codes: one-time codes for when you lose access. Store them somewhere safe",
          "You can switch your main method or turn it off here",
        ],
        target: "security-card",
      },
      {
        title: "Streak",
        body: "Your current and best streak of consecutive solving days.",
        target: "streak-card",
      },
      {
        title: "Contest stats",
        body: "How you have done in contests. Press All to open your full contest history.",
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

export interface CardPlacement {
  vertical: "top" | "bottom"
  horizontal: "left" | "center" | "right"
}

/** Where to put the explanation card so it does not sit on top of the
 *  highlighted element. Phones always use a full-width sheet. With no target
 *  the card is centred on desktop and a bottom sheet on phones. */
export function placeCard(
  target: Box | null,
  viewport: { width: number; height: number }
): CardPlacement {
  const phone = viewport.width < 640
  if (!target) return { vertical: "bottom", horizontal: "center" }

  const centerY = target.top + target.height / 2
  const vertical = centerY < viewport.height / 2 ? "bottom" : "top"
  if (phone) return { vertical, horizontal: "center" }

  // A tall target (a whole panel) leaves no free band above or below it, so
  // move the card to the opposite side horizontally instead.
  if (target.height > viewport.height * 0.55) {
    const centerX = target.left + target.width / 2
    return {
      vertical: "bottom",
      horizontal: centerX < viewport.width / 2 ? "right" : "left",
    }
  }
  return { vertical, horizontal: "center" }
}
