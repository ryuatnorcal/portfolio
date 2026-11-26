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

export const getServices = async () => {
  const rows = await prisma.service.findMany({ orderBy: [{ position: 'asc' }, { id: 'asc' }] })
  return {
    en: rows.filter((r) => r.locale === 'en').map((r) => r.name),
    jp: rows.filter((r) => r.locale === 'jp').map((r) => r.name),
  }
}
