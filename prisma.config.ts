import 'dotenv/config'
import { defineConfig } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx scripts/seed.ts',
  },
  // Not env(): `prisma generate` runs at build time and doesn't need a URL.
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
})
