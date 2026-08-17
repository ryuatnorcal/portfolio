import { useLocale } from "@/hooks/useLocale"
import { useContent } from "@/hooks/useContent"
import ProjectItem from "../Project"
import { sectionLabels } from "../../consts"
import SectionHeading from "@/components/SectionHeading"

export const Project = () => {
  const { locale } = useLocale()
  const { project } = useContent()
  const data = project && project[locale]
  const label = sectionLabels.project[locale] || ''
  return (
    <div className="flex w-10/12 flex-col justify-start py-[var(--section-padding-y)] md:w-8/12">
      <SectionHeading index={`03 — ${label}`} title={label} />
      <ProjectItem data={data} />
    </div>
  )
}
