'use client'
import { useLocale } from "@/hooks/useLocale";
import { useContent } from "@/hooks/useContent";
import ExperienceItem from "../Experience";
import {sectionLabels} from "../../consts";
import SectionHeading from "@/components/SectionHeading";

export const Experience = () => {
  const { locale } = useLocale()
  const { experience } = useContent()
  const data = experience && experience[locale]
  const label = sectionLabels.experience[locale] || ''
  return (
    <div className="flex w-10/12 flex-col justify-start py-[var(--section-padding-y)] md:w-8/12">
      <SectionHeading index={`04 — ${label}`} title={label} />
      <ExperienceItem data={data}/>
    </div>
  )
}
