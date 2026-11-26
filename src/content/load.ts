import { prisma } from "@/utils/prisma"
import { siteTextDefaults, SiteTextValues, Locale } from "@/content/siteText"

// Read-side helpers shared by the public API routes and the dashboard.

export const getSiteText = async (): Promise<SiteTextValues> => {
  const rows = await prisma.siteText.findMany()
  const values: SiteTextValues = structuredClone(siteTextDefaults)
  rows.forEach(({ key, locale, value }) => {
    if (values[key]) values[key][locale as Locale] = value
  })
  return values
}

// Name lists split by locale, in display order.
type NameRow = { locale: string, name: string }
const byLocale = (rows: NameRow[]) => ({
  en: rows.filter((r) => r.locale === 'en').map((r) => r.name),
  jp: rows.filter((r) => r.locale === 'jp').map((r) => r.name),
})

export const getInternalTools = async () =>
  byLocale(await prisma.internalTool.findMany({ orderBy: [{ position: 'asc' }, { id: 'asc' }] }))

export const getServices = async () =>
  byLocale(await prisma.service.findMany({ orderBy: [{ position: 'asc' }, { id: 'asc' }] }))
