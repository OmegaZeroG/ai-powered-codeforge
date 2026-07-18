// Grant full admin permissions to the users listed in ADMIN_EMAILS.
//
// Idempotent: run it as many times as you like. It only ever *adds* the full
// permission set to existing users whose email is listed -- it never creates
// users, never removes permissions, and never touches anyone else.
//
//   PowerShell:  $env:ADMIN_EMAILS="you@example.com"; npm run admin:bootstrap
//   bash:        ADMIN_EMAILS="you@example.com" npm run admin:bootstrap
//
// This is the intended way to mint the first admin (who then holds
// MANAGE_ADMINS and can grant/revoke permissions to others from the panel).
import "dotenv/config";
import { PrismaClient, Permission } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Every capability. Bootstrap grants the full set so the seeded account can
// self-serve everything, including managing other admins.
const ALL_PERMISSIONS: Permission[] = Object.values(Permission);

async function main() {
  const emails = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  if (emails.length === 0) {
    console.error(
      'ADMIN_EMAILS is empty. Set it, e.g.\n  ADMIN_EMAILS="you@example.com" npm run admin:bootstrap',
    );
    process.exit(1);
  }

  for (const email of emails) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.warn(`  skip  ${email} -- no such user (sign in once first)`);
      continue;
    }
    await prisma.user.update({
      where: { email },
      data: { permissions: { set: ALL_PERMISSIONS } },
    });
    console.log(`  ok    ${email} -- granted ${ALL_PERMISSIONS.length} permissions`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
