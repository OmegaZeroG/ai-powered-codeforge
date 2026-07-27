import { defineConfig } from "vitest/config"
import path from "path"

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "node",
    // These pure-function suites only touch src/lib modules that import the
    // Prisma singleton at module load time (src/lib/prisma.ts constructs the
    // Neon adapter on import). No query ever runs in these tests, but the
    // constructor needs a non-empty string to avoid throwing on import.
    env: {
      DATABASE_URL: "postgresql://user:pass@localhost:5432/codeforge?sslmode=disable",
    },
  },
})
