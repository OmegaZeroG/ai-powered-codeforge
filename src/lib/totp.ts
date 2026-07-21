import { createHash, randomBytes, randomInt } from "crypto"
import { generateSecret, generateURI, verify } from "otplib"
import { prisma } from "@/lib/prisma"

// --- TOTP (authenticator-app) two-factor + one-time backup codes ---
//
// The other 2FA method (email OTP) lives in two-factor.ts. This module owns the
// "authenticator app" method: a shared base32 secret the user scans as a QR
// code, from which their app (Google Authenticator, Authy, 1Password, …) derives
// a rolling 6-digit code. We verify that code with otplib. Because a lost phone
// would otherwise lock the user out, setup also mints one-time backup codes
// (TwoFactorBackupCode) that each work once in place of a TOTP code.
//
// Secrets: the base32 TOTP secret is stored in User.twoFactorSecret. It is a
// shared secret (both sides need the plaintext to compute codes), so unlike
// tokens it can't be hashed — it lives as-is. Backup codes, by contrast, are
// verify-only, so we store only their SHA-256 hash.

const APP_ISSUER = "CodeForge"
const BACKUP_CODE_COUNT = 10

// Accept codes from the adjacent 30s steps on either side, so one entered right
// as it rolls over (or with mild clock skew) still validates. otplib v13 takes
// this as a tolerance in seconds; 30 ≈ one full period each direction.
const EPOCH_TOLERANCE_SEC = 30

/** Generate a fresh base32 TOTP secret to store and encode into the QR. */
export function generateTotpSecret(): string {
  return generateSecret()
}

/**
 * Build the otpauth:// URI an authenticator app scans. The label carries the
 * account (the user's email) and the issuer (our app name) so the entry is
 * recognizable in the user's authenticator list.
 */
export function buildOtpAuthUrl(email: string, secret: string): string {
  return generateURI({ issuer: APP_ISSUER, label: email, secret })
}

/**
 * Verify a submitted 6-digit TOTP code against a secret. Returns false for
 * malformed input rather than throwing, so callers can treat it as a plain
 * boolean gate. Async: otplib v13's verify() returns a promise.
 */
export async function verifyTotp(
  secret: string,
  submitted: string,
): Promise<boolean> {
  const code = (submitted ?? "").trim()
  if (!/^\d{6}$/.test(code)) return false
  try {
    const result = await verify({
      secret,
      token: code,
      epochTolerance: EPOCH_TOLERANCE_SEC,
    })
    return result.valid
  } catch {
    return false
  }
}

// SHA-256 hash for backup-code storage/lookup. Backup codes are high-entropy
// (see generateBackupCodes), so a plain fast hash is fine — no per-guess cost is
// needed the way it would be for a password.
function hashBackupCode(raw: string): string {
  // Normalize before hashing so the stored hash is dash/case-insensitive and
  // matches whatever the user types back (see verifyAndConsumeBackupCode).
  return createHash("sha256").update(normalizeBackupCode(raw)).digest("hex")
}

// Codes are displayed grouped as "abcd-efgh" but compared without the dash and
// case-folded, so the user can type them however they like.
function normalizeBackupCode(raw: string): string {
  return (raw ?? "").toLowerCase().replace(/[^a-z0-9]/g, "")
}

/**
 * Generate a batch of one-time backup codes. Each is 8 hex-ish chars of crypto
 * randomness, displayed with a dash ("a1b2-c3d4") for readability. Returned in
 * plaintext ONCE for the caller to show the user; only hashes are persisted.
 */
export function generateBackupCodes(count = BACKUP_CODE_COUNT): string[] {
  const codes: string[] = []
  for (let i = 0; i < count; i++) {
    // 4 random bytes → 8 hex chars, split into two groups of four.
    const hex = randomBytes(4).toString("hex")
    codes.push(`${hex.slice(0, 4)}-${hex.slice(4, 8)}`)
  }
  return codes
}

/**
 * Replace a user's backup codes with hashes of the supplied plaintext set.
 * Deletes any prior codes first (regeneration invalidates old ones). Uses
 * per-row creates — the Neon HTTP adapter rejects createMany's implicit
 * transaction — so we insert each hash individually.
 */
export async function storeBackupCodes(
  userId: string,
  codes: string[],
): Promise<void> {
  await prisma.twoFactorBackupCode.deleteMany({ where: { userId } })
  for (const code of codes) {
    await prisma.twoFactorBackupCode.create({
      data: { userId, codeHash: hashBackupCode(code) },
    })
  }
}

/**
 * Verify a submitted backup code for a user and, if it matches an unused one,
 * consume it (single-use). Returns true on success. Single-record writes only,
 * to stay within the Neon HTTP adapter's no-transaction limits.
 */
export async function verifyAndConsumeBackupCode(
  userId: string,
  submitted: string,
): Promise<boolean> {
  const normalized = normalizeBackupCode(submitted)
  // A valid code is 8 alphanumerics after normalization; bail early otherwise.
  if (normalized.length < 6) return false

  const codeHash = hashBackupCode(submitted)
  const row = await prisma.twoFactorBackupCode.findUnique({ where: { codeHash } })
  if (!row || row.userId !== userId || row.usedAt) return false

  await prisma.twoFactorBackupCode.update({
    where: { id: row.id },
    data: { usedAt: new Date() },
  })
  return true
}

/** Count a user's still-unused backup codes (for the profile UI). */
export async function countUnusedBackupCodes(userId: string): Promise<number> {
  return prisma.twoFactorBackupCode.count({
    where: { userId, usedAt: null },
  })
}

// Re-exported for symmetry / potential future use: a random numeric fallback,
// mirroring the email OTP generator. Not currently used by the TOTP path but
// kept so both 2FA modules share one style of code generation.
export function randomNumericCode(): string {
  return String(randomInt(0, 1_000_000)).padStart(6, "0")
}
