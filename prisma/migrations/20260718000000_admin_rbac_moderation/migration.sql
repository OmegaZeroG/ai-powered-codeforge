-- Admin panel foundation: RBAC + soft/reversible moderation + audit trail.
-- Additive and non-destructive: new enums, new columns with safe defaults,
-- and new tables. Existing rows get permissions='{}', banned=false, revoked=false.

-- CreateEnum
CREATE TYPE "Permission" AS ENUM (
  'VIEW_ADMIN',
  'VIEW_USERS',
  'VIEW_PII',
  'VIEW_SUBMISSIONS',
  'VIEW_ANTICHEAT',
  'VIEW_AUDIT',
  'BAN_USER',
  'REVOKE_SUBMISSION',
  'WARN_USER',
  'MANAGE_ADMINS'
);

-- CreateEnum
CREATE TYPE "AuditAction" AS ENUM (
  'BAN_USER',
  'UNBAN_USER',
  'REVOKE_SUBMISSION',
  'RESTORE_SUBMISSION',
  'WARN_USER',
  'GRANT_PERMISSIONS',
  'REVOKE_PERMISSIONS'
);

-- AlterTable: users -- RBAC + moderation state
ALTER TABLE "users" ADD COLUMN "permissions" "Permission"[] DEFAULT ARRAY[]::"Permission"[];
ALTER TABLE "users" ADD COLUMN "banned" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "users" ADD COLUMN "bannedAt" TIMESTAMP(3);
ALTER TABLE "users" ADD COLUMN "bannedReason" TEXT;

-- AlterTable: submissions -- soft revoke
ALTER TABLE "submissions" ADD COLUMN "revoked" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "submissions" ADD COLUMN "revokedAt" TIMESTAMP(3);
ALTER TABLE "submissions" ADD COLUMN "revokedReason" TEXT;

-- CreateIndex: fast anti-cheat queue filtering
CREATE INDEX "submissions_suspectedAiPasted_idx" ON "submissions"("suspectedAiPasted");

-- CreateTable: warnings
CREATE TABLE "warnings" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "issuedByUserId" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "acknowledgedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "warnings_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "warnings_userId_idx" ON "warnings"("userId");
ALTER TABLE "warnings" ADD CONSTRAINT "warnings_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "warnings" ADD CONSTRAINT "warnings_issuedByUserId_fkey"
  FOREIGN KEY ("issuedByUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateTable: audit_logs
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "actorUserId" TEXT NOT NULL,
    "action" "AuditAction" NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT NOT NULL,
    "reason" TEXT,
    "metadata" JSONB,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "audit_logs_actorUserId_idx" ON "audit_logs"("actorUserId");
CREATE INDEX "audit_logs_targetType_targetId_idx" ON "audit_logs"("targetType", "targetId");
CREATE INDEX "audit_logs_createdAt_idx" ON "audit_logs"("createdAt");
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_actorUserId_fkey"
  FOREIGN KEY ("actorUserId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
