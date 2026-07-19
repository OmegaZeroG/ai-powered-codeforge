-- Add the MANAGE_CONTESTS capability to the Permission enum.
ALTER TYPE "Permission" ADD VALUE IF NOT EXISTS 'MANAGE_CONTESTS';

-- Add contest audit actions to the AuditAction enum.
ALTER TYPE "AuditAction" ADD VALUE IF NOT EXISTS 'CREATE_CONTEST';
ALTER TYPE "AuditAction" ADD VALUE IF NOT EXISTS 'CANCEL_CONTEST';

-- CreateTable: contests
CREATE TABLE "contests" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "startsAt" TIMESTAMP(3) NOT NULL,
    "endsAt" TIMESTAMP(3) NOT NULL,
    "createdByUserId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contests_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "contests_slug_key" ON "contests"("slug");
CREATE INDEX "contests_startsAt_idx" ON "contests"("startsAt");
ALTER TABLE "contests" ADD CONSTRAINT "contests_createdByUserId_fkey"
  FOREIGN KEY ("createdByUserId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable: contest_problems (join)
CREATE TABLE "contest_problems" (
    "id" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "problemId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "contest_problems_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "contest_problems_contestId_problemId_key" ON "contest_problems"("contestId", "problemId");
CREATE INDEX "contest_problems_contestId_idx" ON "contest_problems"("contestId");
ALTER TABLE "contest_problems" ADD CONSTRAINT "contest_problems_contestId_fkey"
  FOREIGN KEY ("contestId") REFERENCES "contests"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "contest_problems" ADD CONSTRAINT "contest_problems_problemId_fkey"
  FOREIGN KEY ("problemId") REFERENCES "problems"("id") ON DELETE CASCADE ON UPDATE CASCADE;
