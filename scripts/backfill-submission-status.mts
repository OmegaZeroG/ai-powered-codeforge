// One-time data migration for the async judging pipeline.
//
// After `prisma db push` adds Submission.status, every pre-existing row gets
// the column default (QUEUED). Those submissions were already judged under the
// old synchronous system and have real verdicts -- if left QUEUED the new
// worker would re-judge them all. This marks every already-judged row DONE so
// the worker ignores them and only picks up genuinely new submissions.
//
// Idempotent. Run once, on the host, right after db push and before starting
// the worker:  npm run judge:backfill
import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import { PrismaNeon } from "@prisma/adapter-neon"

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
  // Anything whose verdict is already decided (i.e. not the PENDING default)
  // has been judged; flip it to DONE regardless of the new column default.
  const decided = await prisma.submission.updateMany({
    where: { verdict: { not: "PENDING" } },
    data: { status: "DONE" },
  })
  console.log(`Marked ${decided.count} already-judged submission(s) DONE.`)

  // A PENDING row that predates the pipeline was never actually judged (there
  // was no async path before). Leave those QUEUED so the worker judges them.
  const stillQueued = await prisma.submission.count({ where: { status: "QUEUED" } })
  console.log(`${stillQueued} submission(s) remain QUEUED for the worker.`)
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Backfill failed:", err)
    process.exit(1)
  })
