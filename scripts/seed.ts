// Fills the Postgres database: copies bio, experience, projects and tech stack
// from MongoDB (MONGOOSE_URI), and services from src/consts.ts. Tables that
// already have rows are skipped, so it is safe to run again; pass --reset to
// empty the content tables first.
//
//   npx prisma db seed            (or: npx tsx scripts/seed.ts [--reset])
import 'dotenv/config'
import mongoose from 'mongoose'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../src/generated/prisma/client'
import { service } from '../src/consts'

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) })
const reset = process.argv.includes('--reset')

type MongoDoc = Record<string, unknown>
const str = (value: unknown) => (value == null ? '' : String(value))
const LOCALES = ['en', 'jp']

const readMongo = async () => {
  const uri = process.env.MONGOOSE_URI
  if (!uri) {
    console.log('MONGOOSE_URI not set: skipping the MongoDB import')
    return null
  }
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 10000 })
  const db = mongoose.connection.db!
  const read = (name: string) => db.collection(name).find().toArray() as Promise<MongoDoc[]>
  const data = {
    bios: await read('bios'),
    experiences: await read('experiences'),
    projects: await read('projects'),
    techstacks: await read('techstacks'),
  }
  await mongoose.disconnect()
  return data
}

// Runs `fill` only when the table is empty.
const seedTable = async (name: string, count: () => Promise<number>, fill: () => Promise<number>) => {
  const existing = await count()
  if (existing) return console.log(`${name}: ${existing} rows already, skipped`)
  console.log(`${name}: added ${await fill()} rows`)
}

const main = async () => {
  if (reset) {
    await prisma.$transaction([
      prisma.bio.deleteMany(),
      prisma.experience.deleteMany(),
      prisma.project.deleteMany(),
      prisma.techStack.deleteMany(),
      prisma.service.deleteMany(),
    ])
    console.log('Emptied bio, experience, project, tech_stack and service')
  }

  const mongo = await readMongo()
  if (mongo) {
    await seedTable('bio', () => prisma.bio.count(), async () => {
      const rows = LOCALES.flatMap((locale) => {
        const doc = mongo.bios.find((d) => d.locale === locale)
        return doc ? [{ locale, name: str(doc.name), title: str(doc.title), description: str(doc.description) }] : []
      })
      return (await prisma.bio.createMany({ data: rows })).count
    })

    // the site showed experience highest `seq` first
    await seedTable('experience', () => prisma.experience.count(), async () => {
      const rows = LOCALES.flatMap((locale) => mongo.experiences
        .filter((d) => d.locale === locale)
        .sort((a, b) => Number(b.seq) - Number(a.seq))
        .map((d, position) => ({
          locale,
          position,
          title: str(d.title),
          years: str(d.years),
          company: str(d.company),
          description: str(d.description),
        })))
      return (await prisma.experience.createMany({ data: rows })).count
    })

    await seedTable('project', () => prisma.project.count(), async () => {
      const rows = LOCALES.flatMap((locale) => mongo.projects
        .filter((d) => d.locale === locale)
        .map((d, position) => {
          const modal = (d.modal || {}) as MongoDoc
          return {
            locale,
            position,
            title: str(d.title),
            year: str(d.year),
            description: str(d.description),
            link: str(d.link),
            modalTitle: str(modal.title) || null,
            modalYear: str(modal.year) || null,
            modalImg: str(modal.img) || null,
            modalDescription: str(modal.description) || null,
            modalUrl: str(modal.url) || null,
          }
        }))
      return (await prisma.project.createMany({ data: rows })).count
    })

    await seedTable('tech_stack', () => prisma.techStack.count(), async () => {
      const rows = LOCALES.flatMap((locale) => {
        const docs = mongo.techstacks.filter((d) => d.locale === locale)
        // position counts within each category
        const seen: Record<string, number> = {}
        return docs.map((d) => {
          const category = str(d.label)
          seen[category] = (seen[category] ?? -1) + 1
          return { locale, category, position: seen[category], name: str(d.name), icon: str(d.icon) }
        })
      })
      return (await prisma.techStack.createMany({ data: rows })).count
    })
  }

  await seedTable('service', () => prisma.service.count(), async () => {
    const rows = LOCALES.flatMap((locale) => (service[locale] || []).map((name, position) => ({ locale, name, position })))
    return (await prisma.service.createMany({ data: rows })).count
  })

  // Site text needs no seeding: src/content/siteText.ts defaults apply until
  // a value is saved in the dashboard.
}

main()
  .catch((error) => {
    console.error(error)
    process.exitCode = 1
  })
  .finally(() => prisma.$disconnect())
