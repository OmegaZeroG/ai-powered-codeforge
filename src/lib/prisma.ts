import { PrismaClient } from "@prisma/client"
import { PrismaNeonHttp } from "@prisma/adapter-neon"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use Neon's HTTP query path (PrismaNeonHttp) instead of the WebSocket Pool.
// Every page here runs a handful of simple, non-transactional reads, and the
// HTTP driver skips the per-query WebSocket/TLS handshake that was the main
// source of page latency. Safe because the app uses no interactive
// $transaction() calls (the /api/execute upserts are single statements).
const adapter = new PrismaNeonHttp(process.env.DATABASE_URL!, {})

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
