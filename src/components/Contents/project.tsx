import { useLocale } from "@/hooks/useLocale"
import { useContent } from "@/hooks/useContent"
import ProjectItem from "../Project"
import { sectionLabels } from "../../consts"
export const Project = () => {
  const { locale } = useLocale()
  const { project } = useContent()
  const data = project && project[locale]
  const label = sectionLabels.project[locale] || ''
  return (
    <div className="flex flex-col justify-start w-10/12 md:w-8/12 pb-10p">
      <h1 className="text-4xl font-bold tracking-md mb-5 underline">{label}</h1>
      <ProjectItem data={data} />
    </div>
  )
}