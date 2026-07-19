-- Per-user contest entry. finishedAt records an early "End Contest" click,
-- which locks that user's scoring clock; NULL means they ran to the contest end.
CREATE TABLE "contest_participants" (
    "id" TEXT NOT NULL,
    "contestId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "finishedAt" TIMESTAMPTZ(3),
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contest_participants_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "contest_participants_contestId_userId_key"
    ON "contest_participants"("contestId", "userId");

CREATE INDEX "contest_participants_contestId_idx"
    ON "contest_participants"("contestId");

ALTER TABLE "contest_participants"
    ADD CONSTRAINT "contest_participants_contestId_fkey"
    FOREIGN KEY ("contestId") REFERENCES "contests"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "contest_participants"
    ADD CONSTRAINT "contest_participants_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "users"("id")
    ON DELETE CASCADE ON UPDATE CASCADE;
