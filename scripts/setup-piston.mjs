
const PISTON_URL = process.env.PISTON_URL || "http://localhost:2000/api/v2"

const REQUIRED_PACKAGES = [
  { language: "node", version: "18.15.0" }, // provides "javascript" alias
  { language: "python", version: "3.10.0" },
  { language: "gcc", version: "10.2.0" }, // provides "c++" alias
  { language: "java", version: "15.0.2" },
]

const WAIT_FOR_READY_TIMEOUT_MS = 60_000
const WAIT_FOR_READY_INTERVAL_MS = 2_000

async function waitUntilReady() {
  const deadline = Date.now() + WAIT_FOR_READY_TIMEOUT_MS
  while (Date.now() < deadline) {
    try {
      const res = await fetch(`${PISTON_URL}/runtimes`)
      if (res.ok) return
    } catch {
      // not up yet, keep polling
    }
    await new Promise((r) => setTimeout(r, WAIT_FOR_READY_INTERVAL_MS))
  }
  throw new Error(
    `Timed out waiting for Piston at ${PISTON_URL} to become ready. ` +
      `Is the container running? Try: docker compose -f docker-compose.piston.yml up -d`
  )
}

async function getInstalledPackages() {
  const res = await fetch(`${PISTON_URL}/packages`)
  if (!res.ok) {
    throw new Error(`Failed to list packages: ${res.status} ${await res.text()}`)
  }
  return res.json()
}


const INSTALL_TIMEOUT_MS = 15 * 60_000
const INSTALL_RETRIES = 2

async function installPackageOnce({ language, version }) {
  const res = await fetch(`${PISTON_URL}/packages`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language, version }),
    signal: AbortSignal.timeout(INSTALL_TIMEOUT_MS),
  })

  const body = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(
      `Failed to install ${language}@${version}: ${res.status} ${JSON.stringify(body)}`
    )
  }

  return body
}

async function installPackage(pkg) {
  let lastErr
  for (let attempt = 1; attempt <= INSTALL_RETRIES; attempt++) {
    try {
      return await installPackageOnce(pkg)
    } catch (err) {
      lastErr = err
      const cause = err.cause ? ` (cause: ${err.cause.message || err.cause})` : ""
      console.error(
        `  attempt ${attempt}/${INSTALL_RETRIES} for ${pkg.language}@${pkg.version} failed: ${err.message}${cause}`
      )
      if (attempt < INSTALL_RETRIES) {
        await new Promise((r) => setTimeout(r, 3000))
      }
    }
  }
  throw lastErr
}

async function main() {
  console.log(`Waiting for Piston at ${PISTON_URL} ...`)
  await waitUntilReady()
  console.log("Piston is up.")

  const installed = await getInstalledPackages()

  for (const pkg of REQUIRED_PACKAGES) {
    const alreadyInstalled = installed.some(
      (p) =>
        p.language === pkg.language &&
        p.language_version === pkg.version &&
        p.installed
    )

    if (alreadyInstalled) {
      console.log(`✓ ${pkg.language}@${pkg.version} already installed`)
      continue
    }

    console.log(`Installing ${pkg.language}@${pkg.version} ...`)
    try {
      await installPackage(pkg)
      console.log(`✓ ${pkg.language}@${pkg.version} installed`)
    } catch (err) {
      const cause = err.cause ? ` (cause: ${err.cause.message || err.cause})` : ""
      console.error(`✗ ${pkg.language}@${pkg.version}: ${err.message}${cause}`)
      process.exitCode = 1
    }
  }

  if (process.exitCode) {
    console.error("\nSome packages failed to install. See errors above.")
  } else {
    console.log("\nAll required Piston runtimes are installed.")
  }
}

main().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
