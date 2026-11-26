import { prisma } from "@/utils/prisma"
import { siteTextDefaults, SiteTextValues, Locale } from "@/content/siteText"
import type { ProjectType } from "@/const"
import { defaultSectionFlags, isSectionKey, SectionFlags } from "@/content/sections"

// Read-side helpers shared by the public API routes and the dashboard.

export const getSiteText = async (): Promise<SiteTextValues> => {
  const rows = await prisma.siteText.findMany()
  const values: SiteTextValues = structuredClone(siteTextDefaults)
  rows.forEach(({ key, locale, value }) => {
    if (values[key]) values[key][locale as Locale] = value
  })
  return values
}

// Which sections the site shows; sections without a saved switch are shown.
export const getSectionFlags = async (): Promise<SectionFlags> => {
  const rows = await prisma.sectionVisibility.findMany()
  const flags = { ...defaultSectionFlags }
  rows.forEach(({ section, visible }) => { if (isSectionKey(section)) flags[section] = visible })
  return flags
}

// Name lists split by locale, in display order.
type NameRow = { locale: string, name: string }
const byLocale = (rows: NameRow[]) => ({
  en: rows.filter((r) => r.locale === 'en').map((r) => r.name),
  jp: rows.filter((r) => r.locale === 'jp').map((r) => r.name),
})

// A project or internal tool row, as stored.
type CardRow = {
  id: number, locale: string, title: string, position: number,
  year: string | null, subtitle: string | null, description: string | null, link: string | null,
  modalTitle: string | null, modalYear: string | null, modalImg: string | null,
  modalDescription: string | null, modalUrl: string | null,
}

// The card shape the site renders for projects and internal tools.
export const toCard = ({ id, modalTitle, modalYear, modalImg, modalDescription, modalUrl, ...rest }: CardRow): ProjectType => ({
  _id: String(id),
  locale: rest.locale,
  title: rest.title,
  year: rest.year ?? '',
  subtitle: rest.subtitle,
  description: rest.description ?? '',
  link: rest.link ?? '',
  // the site opens a detail popup only for items that have one
  ...(modalTitle ? {
    modal: {
      title: modalTitle,
      year: modalYear || '',
      img: modalImg || '',
      description: modalDescription || '',
      url: modalUrl || '',
    },
  } : {}),
})

export const getInternalTools = async (): Promise<Record<Locale, ProjectType[]>> => {
  const rows = await prisma.internalTool.findMany({ orderBy: [{ position: 'asc' }, { id: 'asc' }] })
  const cards = rows.map(toCard)
  return { en: cards.filter((c) => c.locale === 'en'), jp: cards.filter((c) => c.locale === 'jp') }
}

export const getServices = async () =>
  byLocale(await prisma.service.findMany({ orderBy: [{ position: 'asc' }, { id: 'asc' }] }))
