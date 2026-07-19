-- Tag submissions made from a live contest page. Basis for the contest
-- leaderboard: solves, then time with wrong-submission penalties.
ALTER TABLE "submissions" ADD COLUMN "contestId" TEXT;

ALTER TABLE "submissions"
  ADD CONSTRAINT "submissions_contestId_fkey"
  FOREIGN KEY ("contestId") REFERENCES "contests"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

CREATE INDEX "submissions_contestId_userId_idx" ON "submissions"("contestId", "userId");
