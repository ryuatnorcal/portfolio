'use client'
import { useLocale } from "@/hooks/useLocale";
import { useContent, useText } from "@/hooks/useContent";
import ExperienceItem from "../Experience";
import SectionHeading from "@/components/SectionHeading";
import Window from "@/components/Window";

export const Experience = () => {
  const { locale } = useLocale()
  const { experience } = useContent()
  const data = experience && experience[locale]
  const label = useText()('section.experience')
  return (
    <div className="flex w-11/12 flex-col justify-start py-[var(--section-padding-y)] md:w-8/12">
      <SectionHeading index={`03 — ${label}`} title={label} />
      <Window title="experience.log" bodyClassName="px-5 sm:px-6">
        <ExperienceItem data={data}/>
      </Window>
    </div>
  )
}
