-- Timed bans: when a ban lifts. NULL (while banned=true) = permanent.
ALTER TABLE "users" ADD COLUMN "bannedUntil" TIMESTAMP(3);
