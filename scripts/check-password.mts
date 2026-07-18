import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import bcrypt from "bcryptjs";

// Diagnostic: does CANDIDATE match the stored password hash for EMAIL?
// Mirrors exactly what src/auth.ts does on login (bcrypt.compare).
//
//   $env:EMAIL="you@example.com"; $env:CANDIDATE="whatever"; npm run admin:check-password
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = (process.env.EMAIL ?? "").trim();
  const candidate = process.env.CANDIDATE ?? "";
  if (!email || !candidate) {
    console.error("Set EMAIL and CANDIDATE.");
    process.exit(1);
  }

  // Try the email as typed AND lowercased -- login uses it verbatim, so a
  // case mismatch between the stored row and what you type would fail.
  const exact = await prisma.user.findUnique({ where: { email } });
  const lower =
    exact ?? (await prisma.user.findUnique({ where: { email: email.toLowerCase() } }));

  console.log("candidate length:", candidate.length);
  console.log("found by exact email:", !!exact);
  if (!lower) {
    console.log("No user found for that email (exact or lowercased).");
    return;
  }
  console.log("stored email:", lower.email);
  console.log("has password hash:", !!lower.password);
  if (lower.password) {
    console.log("bcrypt.compare result:", await bcrypt.compare(candidate, lower.password));
  }
}

main().catch(console.error).finally(() => prisma.$disconnect());
