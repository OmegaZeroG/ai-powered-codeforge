// Replaces `#include <bits/stdc++.h>` in the C++ starter templates with
// <iostream> plus only the headers each starter actually uses. bits/stdc++.h
// pulls in the whole standard library and costs about a second of compile time
// on every run, on top of the per-test-case recompiles the judge does.
//
//   npx tsx scripts/trim-cpp-includes.mts            dry run: show what would change
//   npx tsx scripts/trim-cpp-includes.mts --check    ... and compile every new starter on Piston
//   npx tsx scripts/trim-cpp-includes.mts --apply    check, then update the database and prisma/seed.ts
//
// --apply refuses to write anything if a rewritten starter fails to compile.
// Needs DATABASE_URL, PISTON_URL (and PISTON_API_KEY for the Azure instance)
// in .env. Run it from your own machine.
import "dotenv/config"
import { readFileSync, writeFileSync } from "node:fs"
import { prisma } from "@/lib/prisma"
import { runCode } from "@/lib/piston"
import { rewriteStarter } from "@/lib/cpp-headers"

const APPLY = process.argv.includes("--apply")
const CHECK = APPLY || process.argv.includes("--check")

type Change = { id: string; slug: string; starter: Record<string, string>; newCpp: string; headers: string[] }

async function compiles(code: string): Promise<string | null> {
  try {
    const res = await runCode("cpp", code, "")
    if (res.compile && res.compile.code !== 0) {
      return (res.compile.stderr || res.compile.stdout || "compile failed").split("\n").slice(0, 4).join(" | ")
    }
    return null
  } catch (err) {
    return `piston error: ${err instanceof Error ? err.message : String(err)}`
  }
}

async function main() {
  const problems = await prisma.problem.findMany({ select: { id: true, slug: true, starterCode: true } })
  const changes: Change[] = []
  for (const p of problems) {
    const starter = p.starterCode as Record<string, string> | null
    if (!starter?.cpp) continue
    const r = rewriteStarter(starter.cpp, "\n")
    if (!r) continue
    changes.push({ id: p.id, slug: p.slug, starter, newCpp: r.code, headers: r.headers })
  }
  console.log(`${changes.length} of ${problems.length} problems have a bits/stdc++.h C++ starter.\n`)
  for (const c of changes) console.log(`  ${c.slug.padEnd(40)} ${c.headers.join(" ")}`)

  if (!CHECK) {
    console.log("\nDry run only. Re-run with --check to compile them on Piston, or --apply to write.")
    return
  }

  console.log("\nCompiling every rewritten starter on Piston...")
  const failures: { slug: string; error: string }[] = []
  for (const c of changes) {
    const err = await compiles(c.newCpp)
    if (err) {
      failures.push({ slug: c.slug, error: err })
      console.log(`  FAIL ${c.slug}: ${err}`)
    }
  }
  if (failures.length > 0) {
    console.log(`\n${failures.length} starter(s) failed to compile; nothing was written.`)
    process.exitCode = 1
    return
  }
  console.log(`All ${changes.length} rewritten starters compile.`)

  if (!APPLY) {
    console.log("Re-run with --apply to write the changes.")
    return
  }

  for (const c of changes) {
    await prisma.problem.update({
      where: { id: c.id },
      data: { starterCode: { ...c.starter, cpp: c.newCpp } },
    })
  }
  console.log(`Updated ${changes.length} problems in the database.`)

  // Keep prisma/seed.ts in step so a future re-seed doesn't bring bits back.
  const seedPath = "prisma/seed.ts"
  const lines = readFileSync(seedPath, "utf8").split("\n")
  let rewritten = 0
  const out = lines.map((line) => {
    const m = line.match(/^(\s*)"(#include <bits\/stdc\+\+\.h>.*)"(,?)\s*$/)
    if (!m) return line
    let real: string
    try {
      real = JSON.parse(`"${m[2]}"`)
    } catch {
      return line
    }
    const r = rewriteStarter(real, "\\n")
    if (!r) return line
    rewritten++
    // r.code is built from the real-newline text, so re-escape via the same
    // literal form: only the include line changes, so swap it in place.
    const block = r.headers.map((h) => `#include <${h}>`).join("\\n")
    return `${m[1]}"${m[2].replace("#include <bits/stdc++.h>", block)}"${m[3]}`
  })
  writeFileSync(seedPath, out.join("\n"))
  console.log(`Rewrote ${rewritten} starter literal(s) in ${seedPath}.`)
}

main()
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
