import { guardAdminPage } from "@/utils/admin";
import { getSiteText } from "@/content/load";
import { siteTextGroups } from "@/content/siteText";
import TextEditor from "@/components/Admin/TextEditor";
import { PageHeader } from "@/components/Admin/ui";

export default async function TextPage() {
  await guardAdminPage()
  const values = await getSiteText()
  return (
    <>
      <PageHeader title="Text & labels" description="Hero text, section titles and other copy across the site." />
      <TextEditor groups={siteTextGroups} values={values} />
    </>
  )
}
