import { notFound } from "next/navigation";
import { prisma } from "@/utils/prisma";
import { guardAdminPage } from "@/utils/admin";
import { collections, CollectionName } from "@/content/collections";
import CollectionEditor, { CollectionItem } from "@/components/Admin/CollectionEditor";
import { LocaleTabs, PageHeader, pickLocale } from "@/components/Admin/ui";

// URL segment -> list
const lists: Record<string, { name: CollectionName, description: string }> = {
  services: { name: 'service', description: 'The services list on the home page.' },
  experience: { name: 'experience', description: 'Work history on the About page, top to bottom.' },
  projects: { name: 'project', description: 'Projects on the About page.' },
  tech: { name: 'techStack', description: 'Technologies on the home page, by category.' },
  'internal-tools': { name: 'internalTool', description: 'The internal tools list on the About page. Its title and description are under Text & labels.' },
}

const load = (name: CollectionName, locale: string) => {
  const args = { where: { locale }, orderBy: [{ position: 'asc' as const }, { id: 'asc' as const }] }
  switch (name) {
    case 'experience': return prisma.experience.findMany(args)
    case 'project': return prisma.project.findMany(args)
    case 'techStack': return prisma.techStack.findMany(args)
    case 'service': return prisma.service.findMany(args)
    case 'internalTool': return prisma.internalTool.findMany(args)
  }
}

export default async function ListPage({ params, searchParams }: { params: Promise<{ list: string }>, searchParams: Promise<{ locale?: string }> }) {
  const { list: slug } = await params
  const list = lists[slug]
  if (!list) notFound()
  await guardAdminPage()
  const locale = pickLocale((await searchParams).locale)
  const items = await load(list.name, locale) as CollectionItem[]

  return (
    <>
      <PageHeader title={collections[list.name].title} description={list.description} />
      <LocaleTabs basePath={`/admin/${slug}`} locale={locale} />
      <CollectionEditor key={locale} name={list.name} locale={locale} items={items} />
    </>
  )
}
