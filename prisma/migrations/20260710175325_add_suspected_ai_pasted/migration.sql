-- AlterTable
ALTER TABLE "problems" ADD COLUMN     "copyProtected" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "submissions" ADD COLUMN     "suspectedAiPasted" BOOLEAN NOT NULL DEFAULT false;
