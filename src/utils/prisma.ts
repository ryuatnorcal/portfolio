import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/generated/prisma/client"

// One client per server instance; dev hot reloads would otherwise open a new
// connection pool on every change.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

// The database allows 45 connections in total, shared by every Vercel
// instance (and local dev servers). pg's default pool of 10 per instance, kept
// open while idle, used them up and new requests were refused. Keep each
// instance's pool small and let idle connections go quickly.
export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
    max: 2,
    idleTimeoutMillis: 5_000,
    connectionTimeoutMillis: 10_000,
  }),
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
