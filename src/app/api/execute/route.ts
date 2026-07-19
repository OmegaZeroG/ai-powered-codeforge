import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { detectCanary } from "@/lib/anticheat"
import { isBanActive } from "@/lib/ban"

// Enqueue a submission for asynchronous judging. This route no longer runs the
// code: it validates the request, creates the submission as QUEUED (verdict
// PENDING), and returns the id immediately. A standalone worker (npm run judge)
// claims the job off the Postgres-backed queue and judges it; the client polls
// GET /api/submissions/[id] for the verdict. See src/lib/judge.ts / queue.ts.
export async function POST(request: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // A banned user is locked out of solving. Re-read the ban state from the DB
  // rather than trusting the (up-to-60s-stale) JWT, so a just-issued ban blocks
  // the very next submission. isBanActive() also makes an expired timed ban a
  // no-op here without any flag flipping.
  const me = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { banned: true, bannedUntil: true },
  })
  if (isBanActive(me)) {
    return NextResponse.json(
      { error: "Your account is suspended. You cannot submit solutions." },
      { status: 403 }
    )
  }

  const { problemId, code, language, contestId } = await request.json()

  if (!problemId || !code || !language) {
    return NextResponse.json(
      { error: "problemId, code, and language are required" },
      { status: 400 }
    )
  }

  const problem = await prisma.problem.findUnique({
    where: { id: problemId },
    select: { id: true },
  })

  if (!problem) {
    return NextResponse.json({ error: "Problem not found" }, { status: 404 })
  }

  // Contest submissions are tagged with contestId. Validate the round is live
  // and that this problem is actually part of it, so a stale/forged contestId
  // can't attribute an out-of-window or unrelated solve to a contest. A missing
  // contestId is a normal practice submission and skips all of this.
  if (contestId) {
    const contest = await prisma.contest.findUnique({
      where: { id: contestId },
      select: { id: true, startsAt: true, endsAt: true },
    })
    if (!contest) {
      return NextResponse.json({ error: "Contest not found" }, { status: 404 })
    }
    const now = Date.now()
    if (now < contest.startsAt.getTime() || now >= contest.endsAt.getTime()) {
      return NextResponse.json(
        { error: "This contest is not currently accepting submissions." },
        { status: 403 }
      )
    }
    const inContest = await prisma.contestProblem.findUnique({
      where: { contestId_problemId: { contestId, problemId } },
      select: { problemId: true },
    })
    if (!inContest) {
      return NextResponse.json(
        { error: "This problem is not part of the contest." },
        { status: 400 }
      )
    }
  }

  // The canary check is a cheap pure-string test on the submitted code, so we
  // record it at enqueue time; judging never needs to recompute it.
  const suspectedAiPasted = detectCanary(code, problemId)

  // createdAt (set here, at enqueue) is the submission's official timestamp --
  // the contest leaderboard's solve-time + penalty math keys off it. Judging
  // happening a beat later on the worker does not move it, so contest fairness
  // is preserved regardless of queue depth.
  const submission = await prisma.submission.create({
    data: {
      userId: session.user.id,
      problemId,
      code,
      language,
      status: "QUEUED",
      verdict: "PENDING",
      suspectedAiPasted,
      contestId: contestId ?? null,
    },
    select: { id: true },
  })

  return NextResponse.json({ submissionId: submission.id, status: "QUEUED" })
}
