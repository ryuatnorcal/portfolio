import Link from "next/link";
import { prisma } from "@/utils/prisma";
import { guardAdminPage } from "@/utils/admin";
import { adminSections } from "@/components/Admin/AdminNav";
import { PageHeader } from "@/components/Admin/ui";

export default async function AdminHome() {
  await guardAdminPage()
  const [experience, project, techStack, service, bio, text] = await Promise.all([
    prisma.experience.count(),
    prisma.project.count(),
    prisma.techStack.count(),
    prisma.service.count(),
    prisma.bio.count(),
    prisma.siteText.count(),
  ])
  const counts: Record<string, string> = {
    '/admin/text': `${text} saved values`,
    '/admin/bio': `${bio} of 2 languages`,
    '/admin/services': `${service} entries`,
    '/admin/experience': `${experience} entries`,
    '/admin/projects': `${project} entries`,
    '/admin/tech': `${techStack} entries`,
    '/admin/banner': 'Hero photos in R2',
  }

  return (
    <>
      <PageHeader title="Dashboard" description="Edit the content of your portfolio. Changes show on the site right away." />
      <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {adminSections.map(({ href, label }) => (
          <li key={href}>
            <Link href={href} className="block rounded-md border border-border bg-surface p-5 text-fg no-underline transition-colors hover:border-fg hover:no-underline">
              <span className="block font-semibold">{label}</span>
              <span className="text-sm text-fg-muted">{counts[href]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
