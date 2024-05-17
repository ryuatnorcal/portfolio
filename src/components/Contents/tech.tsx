'use client'
import Image from "next/image";
import html from '../../../public/icons/icons8-html.svg'
import css from '../../../public/icons/icons8-css.svg'
import react from '../../../public/icons/icons8-react-native.svg'
import ts from '../../../public/icons/icons8-typescript.svg'
import js from '../../../public/icons/icons8-javascript.svg'
import { useLocale } from "@/hooks/useLocale";
import { useContent } from "@/hooks/useContent";
import { sectionLabels, techStackLabels } from "../../consts";
import TechIcons from '../TechIcons'
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

  // console.log(techStack)
  
  return (
    <div className="flex flex-col justify-start w-10/12 md:w-8/12 xl:w-6/12 pb-5p">
      <h1 className="text-4xl font-bold tracking-md mb-5 underline">{labels}</h1>
      <TechIcons label={techLabel.frontend} data={frontend && frontend[locale]} />
      <TechIcons label={techLabel.backend} data={backend && backend[locale]} />
      <TechIcons label={techLabel.devops} data={devops && devops[locale]} />
      <TechIcons label={techLabel.tools} data={tools && tools[locale]} />
    </div>
  )
}