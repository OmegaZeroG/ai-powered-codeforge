import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// Mark a test account's email as verified directly in the DB, skipping the
// email-delivery step. For local dev/test accounts only (e.g. throwaway
// addresses like testsec@testsec.com that can't receive real mail) — never
// point this at a real user's account.
//
//   PowerShell:
//     $env:EMAIL="testsec@testsec.com"; npm exec tsx scripts/dev-verify-email.mts
//   bash:
//     EMAIL="testsec@testsec.com" npm exec tsx scripts/dev-verify-email.mts
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = (process.env.EMAIL ?? "").trim().toLowerCase();

  if (!email) {
    console.error(
      'Set EMAIL, e.g.\n' +
        '  $env:EMAIL="testsec@testsec.com"; npm exec tsx scripts/dev-verify-email.mts',
    );
    process.exit(1);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    console.error(`No user with email ${email}.`);
    process.exit(1);
  }

  if (user.emailVerified) {
    console.log(`  ok    ${email} is already verified.`);
    return;
  }

  await prisma.user.update({ where: { email }, data: { emailVerified: new Date() } });
  console.log(`  ok    ${email} marked verified. You can now log in.`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
