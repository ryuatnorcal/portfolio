import { useLocale } from "@/hooks/useLocale"
import { useContent, useText } from "@/hooks/useContent"
import ProjectItem from "../Project"
import SectionHeading from "@/components/SectionHeading"

export const Project = () => {
  const { locale } = useLocale()
  const { project } = useContent()
  const data = project && project[locale]
  const label = useText()('section.project')
  return (
    <div className="flex w-11/12 flex-col justify-start py-[var(--section-padding-y)] md:w-8/12">
      <SectionHeading index={`04 — ${label}`} title={label} />
      <ProjectItem data={data} />
    </div>
  )
}
