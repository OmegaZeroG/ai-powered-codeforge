import { prisma } from "@/lib/prisma"

// Atomically claim the oldest QUEUED submission for this worker and return its
// id, or null if the queue is empty. This is the heart of the Postgres-backed
// job queue: the inner SELECT ... FOR UPDATE SKIP LOCKED lets many workers (or
// a concurrency pool within one worker) pull distinct jobs without ever
// handing the same row to two claimants -- rows another worker has locked are
// skipped rather than blocked on.
//
// It is deliberately a SINGLE statement (a CTE feeding an UPDATE) so it runs
// over Prisma's Neon HTTP adapter, which rejects multi-statement interactive
// transactions. attempts is incremented here, at claim time, so a worker that
// dies mid-judge still leaves the row with an accurate attempt count for the
// retry/give-up accounting in judgeSubmission().
export async function claimNextJob(workerId: string): Promise<string | null> {
  const rows = await prisma.$queryRaw<{ id: string }[]>`
    UPDATE "submissions"
    SET "status" = 'RUNNING',
        "workerId" = ${workerId},
        "startedAt" = NOW(),
        "attempts" = "attempts" + 1
    WHERE "id" = (
      SELECT "id" FROM "submissions"
      WHERE "status" = 'QUEUED'
      ORDER BY "createdAt" ASC
      FOR UPDATE SKIP LOCKED
      LIMIT 1
    )
    RETURNING "id"
  `
  return rows[0]?.id ?? null
}

// Reclaim submissions stuck in RUNNING past a threshold -- e.g. a worker was
// killed (Ctrl-C, crash, deploy) mid-judge and never wrote a terminal status.
// Putting them back to QUEUED lets another worker pick them up. attempts is
// left as-is (it was already incremented at claim), so a repeatedly-stuck job
// still converges on MAX_ATTEMPTS and becomes ERROR instead of looping forever.
export async function requeueStale(olderThanMs: number): Promise<number> {
  const cutoff = new Date(Date.now() - olderThanMs)
  // Raw single UPDATE rather than prisma.updateMany: Prisma 7's client engine
  // wraps updateMany/createMany/deleteMany in an internal transaction, which
  // the Neon HTTP adapter rejects ("Transactions are not supported in HTTP
  // mode"). $executeRaw returns the affected-row count.
  const count = await prisma.$executeRaw`
    UPDATE "submissions"
    SET "status" = 'QUEUED', "workerId" = NULL, "startedAt" = NULL
    WHERE "status" = 'RUNNING' AND "startedAt" < ${cutoff}
  `
  return count
}

// Count of jobs waiting to be picked up -- handy for worker idle logging.
export async function queuedCount(): Promise<number> {
  return prisma.submission.count({ where: { status: "QUEUED" } })
}
