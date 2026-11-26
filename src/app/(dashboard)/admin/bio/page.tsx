import { prisma } from "@/utils/prisma";
import { guardAdminPage } from "@/utils/admin";
import BioEditor from "@/components/Admin/BioEditor";
import { LocaleTabs, PageHeader, pickLocale } from "@/components/Admin/ui";

export default async function BioPage({ searchParams }: { searchParams: { locale?: string } }) {
  await guardAdminPage()
  const locale = pickLocale(searchParams.locale)
  const bio = await prisma.bio.findUnique({ where: { locale } })
  return (
    <>
      <PageHeader title="Bio" description="The introduction on the About page." />
      <LocaleTabs basePath="/admin/bio" locale={locale} />
      {/* remount per locale so the fields show that locale's values */}
      <BioEditor key={locale} locale={locale} bio={bio} />
    </>
  )
}
