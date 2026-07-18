-- AlterTable: profile fields
ALTER TABLE "users" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "githubHandle" TEXT,
ADD COLUMN     "website" TEXT;

-- CreateTable
CREATE TABLE "task_claims" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "taskKey" TEXT NOT NULL,
    "periodKey" TEXT NOT NULL,
    "xp" INTEGER NOT NULL,
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_claims_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_badges" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "badgeKey" TEXT NOT NULL,
    "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_badges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "task_claims_userId_idx" ON "task_claims"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "task_claims_userId_taskKey_periodKey_key" ON "task_claims"("userId", "taskKey", "periodKey");

-- CreateIndex
CREATE INDEX "user_badges_userId_idx" ON "user_badges"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "user_badges_userId_badgeKey_key" ON "user_badges"("userId", "badgeKey");

-- AddForeignKey
ALTER TABLE "task_claims" ADD CONSTRAINT "task_claims_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_badges" ADD CONSTRAINT "user_badges_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
