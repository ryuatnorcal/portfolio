'use client'
import { useLocale } from "@/hooks/useLocale";
import { useContent } from "@/hooks/useContent";
import { sectionLabels, techStackLabels } from "../../consts";
import TechIcons from '../TechIcons'
import SectionHeading from '@/components/SectionHeading'

export const Tech = () => {
  const { locale } = useLocale()
  const {techStack} = useContent()

  const { tech } = sectionLabels
  const {
    frontend,
    backend,
    devops,
    tools
  } = techStack || {}
  const labels = tech && tech[locale] || ''
  const techLabel = techStackLabels && techStackLabels[locale] || {}
  
  return (
    <div className="flex w-10/12 flex-col justify-start py-[var(--section-padding-y)] md:w-8/12 xl:w-6/12">
      <SectionHeading index={`02 — ${labels}`} title={labels} />
      <TechIcons label={techLabel.frontend} data={frontend && frontend[locale]} />
      <TechIcons label={techLabel.backend} data={backend && backend[locale]} />
      <TechIcons label={techLabel.devops} data={devops && devops[locale]} />
      <TechIcons label={techLabel.tools} data={tools && tools[locale]} />
    </div>
  )
}
