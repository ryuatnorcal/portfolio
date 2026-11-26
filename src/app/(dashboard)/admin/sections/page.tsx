import { guardAdminPage } from "@/utils/admin";
import { getSectionFlags } from "@/content/load";
import SectionsEditor from "@/components/Admin/SectionsEditor";
import { PageHeader } from "@/components/Admin/ui";

export default async function SectionsPage() {
  await guardAdminPage()
  const flags = await getSectionFlags()
  return (
    <>
      <PageHeader title="Sections" description="Show or hide each section of the site. Hidden sections also leave the side navigation." />
      <SectionsEditor flags={flags} />
    </>
  )
}
