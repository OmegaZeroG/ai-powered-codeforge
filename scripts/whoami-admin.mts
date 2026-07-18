import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = (process.env.EMAIL ?? "ompathrabe10@gmail.com").toLowerCase();
  const user = await prisma.user.findUnique({
    where: { email },
    include: { accounts: { select: { provider: true } } },
  });
  if (!user) {
    console.log(`No user with email ${email} -- you have not signed in yet.`);
    return;
  }
  console.log({
    email: user.email,
    hasPassword: !!user.password,
    oauthProviders: user.accounts.map((a) => a.provider),
    banned: user.banned,
    permissions: user.permissions,
  });
}

main().catch(console.error).finally(() => prisma.$disconnect());
