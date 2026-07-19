// Standalone judge worker for the async submission pipeline.
//
// Run it as a third dev process, alongside `next dev` and the Piston container:
//
//   PowerShell:  npm run judge
//   bash:        npm run judge
//
// It pulls QUEUED submissions off the Postgres-backed queue (see
// src/lib/queue.ts) and judges them through Piston (src/lib/judge.ts),
// N at a time. Concurrency is the backpressure knob: the API can enqueue as
// fast as it likes, but only JUDGE_CONCURRENCY jobs ever hit Piston at once.
//
// dotenv must load before anything pulls in @/lib/prisma, which reads
// DATABASE_URL at import time.
import "dotenv/config"
import { claimNextJob, requeueStale, queuedCount } from "@/lib/queue"
import { judgeSubmission } from "@/lib/judge"

const CONCURRENCY = Math.max(1, Number(process.env.JUDGE_CONCURRENCY ?? "4"))
// How long a job may sit in RUNNING before it's assumed abandoned (worker
// killed mid-judge) and returned to the queue.
const STALE_MS = Number(process.env.JUDGE_STALE_MS ?? String(2 * 60_000))
// Idle poll interval when the queue is empty.
const IDLE_MS = Number(process.env.JUDGE_IDLE_MS ?? "500")

// A stable-ish id so RUNNING rows show which worker/lane holds them.
const WORKER_ID = `${process.pid}`

let shuttingDown = false

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

// One lane: claim a job, judge it, repeat. When the queue is dry it idles
// rather than spinning. Errors in judging are swallowed here (judgeSubmission
// already persists ERROR/REQUEUED state) so one bad job never kills the lane.
async function lane(laneId: number): Promise<void> {
  while (!shuttingDown) {
    let submissionId: string | null = null
    try {
      submissionId = await claimNextJob(`${WORKER_ID}:${laneId}`)
    } catch (err) {
      console.error(`[lane ${laneId}] claim failed:`, err)
      await sleep(IDLE_MS)
      continue
    }

    if (!submissionId) {
      await sleep(IDLE_MS)
      continue
    }

    const startedAt = Date.now()
    try {
      const outcome = await judgeSubmission(submissionId)
      const ms = Date.now() - startedAt
      if (outcome.status === "DONE") {
        console.log(`[lane ${laneId}] ${submissionId} -> ${outcome.verdict} (${ms}ms)`)
      } else if (outcome.status === "REQUEUED") {
        console.warn(
          `[lane ${laneId}] ${submissionId} requeued (attempt ${outcome.attempts}): ${outcome.error}`
        )
      } else {
        console.error(`[lane ${laneId}] ${submissionId} ERROR: ${outcome.error}`)
      }
    } catch (err) {
      // judgeSubmission is defensive, but never let an unexpected throw take
      // down the lane -- log and move on to the next job.
      console.error(`[lane ${laneId}] unexpected failure on ${submissionId}:`, err)
    }
  }
}

// Periodically reclaim jobs stuck in RUNNING from a worker that died.
async function staleSweeper(): Promise<void> {
  while (!shuttingDown) {
    try {
      const n = await requeueStale(STALE_MS)
      if (n > 0) console.warn(`[sweeper] requeued ${n} stale RUNNING job(s)`)
    } catch (err) {
      console.error("[sweeper] failed:", err)
    }
    // Sweep at roughly the stale threshold; not time-critical.
    await sleep(STALE_MS)
  }
}

async function main(): Promise<void> {
  console.log(
    `judge worker ${WORKER_ID} starting: concurrency=${CONCURRENCY}, staleMs=${STALE_MS}`
  )
  try {
    const pending = await queuedCount()
    if (pending > 0) console.log(`${pending} job(s) already queued`)
  } catch {
    // Non-fatal: just an informational count at boot.
  }

  const stop = (sig: string) => {
    if (shuttingDown) return
    shuttingDown = true
    console.log(`\n${sig} received -- draining, finishing in-flight jobs...`)
  }
  process.on("SIGINT", () => stop("SIGINT"))
  process.on("SIGTERM", () => stop("SIGTERM"))

  const lanes = Array.from({ length: CONCURRENCY }, (_, i) => lane(i))
  await Promise.all([...lanes, staleSweeper()])
  console.log("judge worker stopped.")
  process.exit(0)
}

main().catch((err) => {
  console.error("judge worker crashed:", err)
  process.exit(1)
})
