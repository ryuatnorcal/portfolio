'use client'
import { useLocale } from "@/hooks/useLocale";
import { useContent, useText } from "@/hooks/useContent";
import TechIcons from '../TechIcons'
import SectionHeading from '@/components/SectionHeading'

export const Tech = () => {
  const { locale } = useLocale()
  const {techStack} = useContent()
  const t = useText()

  const {
    frontend,
    backend,
    devops,
    tools
  } = techStack || {}
  const labels = t('section.tech')
  
  return (
    <div className="flex w-11/12 flex-col justify-start py-[var(--section-padding-y)] md:w-8/12 xl:w-6/12">
      <SectionHeading index={`02 — ${labels}`} title={labels} />
      <TechIcons label={t('tech.frontend')} data={frontend && frontend[locale]} />
      <TechIcons label={t('tech.backend')} data={backend && backend[locale]} />
      <TechIcons label={t('tech.devops')} data={devops && devops[locale]} />
      <TechIcons label={t('tech.tools')} data={tools && tools[locale]} />
    </div>
  )
}
