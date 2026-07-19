-- Convert every timestamp column to timestamptz(3).
--
-- Why: with plain TIMESTAMP (no timezone), the Neon HTTP driver serializes JS
-- Dates using the app machine's local wall-clock; Postgres stores that bare
-- value and reads interpret it as UTC. On any machine not running in UTC this
-- shifts every stored instant by the UTC offset (+05:30 on IST) per round trip.
-- timestamptz keeps the offset at write time and always returns the true instant.
--
-- USING "col" AT TIME ZONE 'UTC' pins the existing bare values as UTC (matching
-- how reads have interpreted them until now), so no stored instant changes
-- meaning during the conversion.

ALTER TABLE "users"
  ALTER COLUMN "emailVerified" TYPE timestamptz(3) USING "emailVerified" AT TIME ZONE 'UTC',
  ALTER COLUMN "bannedAt"      TYPE timestamptz(3) USING "bannedAt"      AT TIME ZONE 'UTC',
  ALTER COLUMN "bannedUntil"   TYPE timestamptz(3) USING "bannedUntil"   AT TIME ZONE 'UTC',
  ALTER COLUMN "createdAt"     TYPE timestamptz(3) USING "createdAt"     AT TIME ZONE 'UTC',
  ALTER COLUMN "updatedAt"     TYPE timestamptz(3) USING "updatedAt"     AT TIME ZONE 'UTC';

ALTER TABLE "task_claims"
  ALTER COLUMN "claimedAt" TYPE timestamptz(3) USING "claimedAt" AT TIME ZONE 'UTC';

ALTER TABLE "user_badges"
  ALTER COLUMN "earnedAt" TYPE timestamptz(3) USING "earnedAt" AT TIME ZONE 'UTC';

ALTER TABLE "warnings"
  ALTER COLUMN "acknowledgedAt" TYPE timestamptz(3) USING "acknowledgedAt" AT TIME ZONE 'UTC',
  ALTER COLUMN "createdAt"      TYPE timestamptz(3) USING "createdAt"      AT TIME ZONE 'UTC';

ALTER TABLE "audit_logs"
  ALTER COLUMN "createdAt" TYPE timestamptz(3) USING "createdAt" AT TIME ZONE 'UTC';

ALTER TABLE "password_reset_tokens"
  ALTER COLUMN "expiresAt" TYPE timestamptz(3) USING "expiresAt" AT TIME ZONE 'UTC',
  ALTER COLUMN "usedAt"    TYPE timestamptz(3) USING "usedAt"    AT TIME ZONE 'UTC',
  ALTER COLUMN "createdAt" TYPE timestamptz(3) USING "createdAt" AT TIME ZONE 'UTC';

ALTER TABLE "sessions"
  ALTER COLUMN "expires" TYPE timestamptz(3) USING "expires" AT TIME ZONE 'UTC';

ALTER TABLE "topics"
  ALTER COLUMN "createdAt" TYPE timestamptz(3) USING "createdAt" AT TIME ZONE 'UTC';

ALTER TABLE "problems"
  ALTER COLUMN "createdAt" TYPE timestamptz(3) USING "createdAt" AT TIME ZONE 'UTC',
  ALTER COLUMN "updatedAt" TYPE timestamptz(3) USING "updatedAt" AT TIME ZONE 'UTC';

ALTER TABLE "submissions"
  ALTER COLUMN "revokedAt" TYPE timestamptz(3) USING "revokedAt" AT TIME ZONE 'UTC',
  ALTER COLUMN "createdAt" TYPE timestamptz(3) USING "createdAt" AT TIME ZONE 'UTC';

ALTER TABLE "user_progress"
  ALTER COLUMN "lastAttemptAt" TYPE timestamptz(3) USING "lastAttemptAt" AT TIME ZONE 'UTC',
  ALTER COLUMN "solvedAt"      TYPE timestamptz(3) USING "solvedAt"      AT TIME ZONE 'UTC';

ALTER TABLE "contests"
  ALTER COLUMN "startsAt"  TYPE timestamptz(3) USING "startsAt"  AT TIME ZONE 'UTC',
  ALTER COLUMN "endsAt"    TYPE timestamptz(3) USING "endsAt"    AT TIME ZONE 'UTC',
  ALTER COLUMN "createdAt" TYPE timestamptz(3) USING "createdAt" AT TIME ZONE 'UTC';
