'use client'
import Modal from "../Modal";
import { useLocale } from "@/hooks/useLocale";
import { useContent } from "@/hooks/useContent";
import ExperienceItem from "../Experience";
import {sectionLabels} from "../../consts";
export const Experience = () => {
  const { locale } = useLocale()
  const { experience } = useContent()
  const data = experience && experience[locale]
  const label = sectionLabels.experience[locale] || ''
  return (
    <div className="flex flex-col justify-start w-10/12 md:w-8/12 pb-10p">
      <h1 className="text-4xl font-bold tracking-md mb-5 underline">{label}</h1>
      <ExperienceItem data={data}/>
    </div>
  )
}