'use server'
import { revalidatePath } from "next/cache"
import { prisma } from "@/utils/prisma"
import { requireAdmin } from "@/utils/admin"
import { collections, CollectionName, isCollectionName, MAX_FIELD_LENGTH } from "@/content/collections"
import { LOCALES, Locale, siteTextFields } from "@/content/siteText"
import { isSectionKey } from "@/content/sections"

export type ActionResult = { ok: true } | { ok: false, error: string }

type Row = Record<string, unknown> & { id: number, position: number, locale: string }

// The four list models share the operations used here; the field whitelist
// in `collections` is what keeps writes to known columns.
type ListDelegate = {
  findMany(args: object): Promise<Row[]>,
  findUnique(args: object): Promise<Row | null>,
  create(args: object): Promise<Row>,
  update(args: object): Promise<Row>,
  delete(args: object): Promise<Row>,
}
// `client` is a transaction client inside prisma.$transaction
const delegate = (name: CollectionName, client: Pick<typeof prisma, CollectionName> = prisma) =>
  client[name] as unknown as ListDelegate

class InputError extends Error {}

// Runs an action as an admin, turning failures into a message for the form.
const run = async (fn: () => Promise<void>): Promise<ActionResult> => {
  try {
    await requireAdmin()
    await fn()
    revalidatePath('/admin', 'layout')
    return { ok: true }
  } catch (error) {
    if (error instanceof InputError) return { ok: false, error: error.message }
    if (error instanceof Error && error.message === 'Not authorised') return { ok: false, error: 'Not authorised' }
    console.error('Admin action failed:', error)
    return { ok: false, error: 'Something went wrong. Please try again.' }
  }
}

const checkLocale = (locale: string): Locale => {
  if (!LOCALES.includes(locale as Locale)) throw new InputError('Unknown language')
  return locale as Locale
}

const checkLength = (label: string, value: string) => {
  if (value.length > MAX_FIELD_LENGTH) throw new InputError(`${label} is too long`)
}

// Keeps only the collection's fields, trimmed and validated.
const cleanFields = (name: CollectionName, data: Record<string, string>) => {
  const out: Record<string, string | null> = {}
  for (const field of collections[name].fields) {
    const value = (data[field.name] ?? '').trim()
    if (field.required && !value) throw new InputError(`${field.label} is required`)
    checkLength(field.label, value)
    if (field.options && value && !field.options.includes(value)) throw new InputError(`Pick a valid ${field.label.toLowerCase()}`)
    // only web links, so a saved value can't become a javascript: link
    if (field.type === 'url' && value && !/^https?:\/\//i.test(value)) throw new InputError(`${field.label} must start with http:// or https://`)
    out[field.name] = value || (field.required ? value : null)
  }
  return out
}

// Rows that are ordered together: same locale, and same group (tech category).
const siblingsWhere = (name: CollectionName, row: Record<string, unknown>) => {
  const groupBy = collections[name].groupBy
  return { locale: row.locale, ...(groupBy ? { [groupBy]: row[groupBy] } : {}) }
}

export const saveItem = async (
  name: string,
  locale: string,
  data: Record<string, string>,
  id?: number,
): Promise<ActionResult> => run(async () => {
  if (!isCollectionName(name)) throw new InputError('Unknown list')
  const fields = cleanFields(name, data)
  const db = delegate(name)

  if (id) {
    const existing = await db.findUnique({ where: { id } })
    if (!existing) throw new InputError('This item no longer exists')
    const regrouped = collections[name].groupBy && existing[collections[name].groupBy!] !== fields[collections[name].groupBy!]
    // moving to another group puts it at the end of that group
    const position = regrouped ? await nextPosition(name, { ...existing, ...fields }) : existing.position
    await db.update({ where: { id }, data: { ...fields, position } })
  } else {
    const row = { ...fields, locale: checkLocale(locale) }
    await db.create({ data: { ...row, position: await nextPosition(name, row) } })
  }
})

const nextPosition = async (name: CollectionName, row: Record<string, unknown>) => {
  const last = await delegate(name).findMany({
    where: siblingsWhere(name, row),
    orderBy: { position: 'desc' },
    take: 1,
  })
  return last.length ? last[0].position + 1 : 0
}

export const deleteItem = async (name: string, id: number): Promise<ActionResult> => run(async () => {
  if (!isCollectionName(name)) throw new InputError('Unknown list')
  await delegate(name).delete({ where: { id } })
})

// Swaps an item with its neighbour above (-1) or below (1).
export const moveItem = async (name: string, id: number, direction: -1 | 1): Promise<ActionResult> => run(async () => {
  if (!isCollectionName(name)) throw new InputError('Unknown list')
  const db = delegate(name)
  const row = await db.findUnique({ where: { id } })
  if (!row) throw new InputError('This item no longer exists')

  const siblings = await db.findMany({
    where: siblingsWhere(name, row),
    orderBy: [{ position: 'asc' }, { id: 'asc' }],
  })
  const from = siblings.findIndex((s) => s.id === id)
  const to = from + direction
  if (to < 0 || to >= siblings.length) return
  ;[siblings[from], siblings[to]] = [siblings[to], siblings[from]]

  // renumber the whole group so positions stay 0..n-1
  await prisma.$transaction(async (tx) => {
    for (const [position, s] of siblings.entries()) {
      await delegate(name, tx).update({ where: { id: s.id }, data: { position } })
    }
  })
})

export const saveBio = async (locale: string, data: Record<string, string>): Promise<ActionResult> => run(async () => {
  const lang = checkLocale(locale)
  const fields = {
    name: (data.name ?? '').trim(),
    title: (data.title ?? '').trim(),
    description: (data.description ?? '').trim(),
  }
  if (!fields.name || !fields.title || !fields.description) throw new InputError('Name, title and description are required')
  Object.entries(fields).forEach(([key, value]) => checkLength(key, value))
  await prisma.bio.upsert({ where: { locale: lang }, create: { locale: lang, ...fields }, update: fields })
})

export const saveSiteText = async (entries: { key: string, locale: string, value: string }[]): Promise<ActionResult> => run(async () => {
  const known = new Set(siteTextFields.map(({ key }) => key))
  const rows = entries.map(({ key, locale, value }) => {
    if (!known.has(key)) throw new InputError('Unknown text field')
    checkLength(key, value)
    return { key, locale: checkLocale(locale), value }
  })
  await prisma.$transaction(rows.map(({ key, locale, value }) =>
    prisma.siteText.upsert({
      where: { key_locale: { key, locale } },
      create: { key, locale, value },
      update: { value },
    })
  ))
})

// Saves the show/hide switch of every section on the Sections page.
export const saveSectionFlags = async (flags: Record<string, boolean>): Promise<ActionResult> => run(async () => {
  const entries = Object.entries(flags)
  entries.forEach(([section, visible]) => {
    if (!isSectionKey(section)) throw new InputError('Unknown section')
    if (typeof visible !== 'boolean') throw new InputError('Invalid value')
  })
  await prisma.$transaction(entries.map(([section, visible]) =>
    prisma.sectionVisibility.upsert({
      where: { section },
      create: { section, visible },
      update: { visible },
    })
  ))
})
