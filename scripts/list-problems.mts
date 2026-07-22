import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

// Quick lookup: prints problem id + slug + title so you can copy a real
// PROBLEM_ID for scripts/load-test-judge.mjs without opening Prisma Studio.
//
//   npm exec tsx scripts/list-problems.mts
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const problems = await prisma.problem.findMany({
    select: { id: true, slug: true, title: true },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  if (problems.length === 0) {
    console.log("No problems found in the database.");
    return;
  }

  console.log(`${problems.length} problem(s):\n`);
  for (const p of problems) {
    console.log(`  id: ${p.id}`);
    console.log(`  slug: ${p.slug}`);
    console.log(`  title: ${p.title}`);
    console.log("");
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
