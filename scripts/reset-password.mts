import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

// Set a new password for an existing user.
//
//   PowerShell:
//     $env:EMAIL="you@example.com"; $env:NEW_PASSWORD="whatever"; npm exec tsx scripts/reset-password.mts
//   bash:
//     EMAIL="you@example.com" NEW_PASSWORD="whatever" npm exec tsx scripts/reset-password.mts
//
// Hashes with bcrypt (cost 10) to match the credentials provider in src/auth.ts.
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = (process.env.EMAIL ?? "").trim().toLowerCase();
  const newPassword = process.env.NEW_PASSWORD ?? "";

  if (!email || !newPassword) {
    console.error(
      'Set both EMAIL and NEW_PASSWORD, e.g.\n' +
        '  $env:EMAIL="you@example.com"; $env:NEW_PASSWORD="secret"; npm exec tsx scripts/reset-password.mts',
    );
    process.exit(1);
  }
  if (newPassword.length < 8) {
    console.error("NEW_PASSWORD must be at least 8 characters.");
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`No user with email ${email}.`);
    process.exit(1);
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { email }, data: { password: hashed } });
  console.log(`  ok    password reset for ${email}. You can now log in with it.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
