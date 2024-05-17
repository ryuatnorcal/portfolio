'use client'

import { createContext, useContext, useState, useEffect, useReducer } from "react";
import { bioReducer, experienceReducer, projectReducer, techStackReducer } from "@/reducer";
import {
  heroFullType,
  ProjectFullType,
  BioFullType,
  ExperienceFullType,
  TechStackFullType,
  ServiceFullType,
  EmailLabelsFullType
} from "@/const";
import { hero, service, email_labels } from "@/consts";
interface ContentProviderProps {
  children: React.ReactNode,
  locale: string
}
interface ContentProps {
  bio: BioFullType,
  experience: ExperienceFullType,
  project: ProjectFullType,
  techStack: TechStackFullType,
  hero: heroFullType,
  service:ServiceFullType,
  email_labels: EmailLabelsFullType,
  isLoadig: boolean
}
const initialContentProps = {
  bio: {
    en: {},
    jp: {}
  },
  experience: {},
  project: {},
  techStack: {},
  hero: {},
  service: {},
  email_labels: {}
}
export const ContentContext = createContext<ContentProps>(initialContentProps);
export const ContentProvider = ({ children, locale } : ContentProviderProps) => {

  const [bio, bioDispatch] = useReducer(bioReducer, {})
  const [experience, experienceDispatch] = useReducer(experienceReducer, {})
  const [project, projectDispatch] = useReducer(projectReducer, {})
  const [techStack, techStackDispatch] = useReducer(techStackReducer, {})
  const [isLoadig, setLoading] = useState<boolean>(true)
  useEffect(() => {
    if (Object.keys(bio).length != 0
      && Object.keys(experience).length != 0
      && Object.keys(project).length != 0
      && Object.keys(techStack).length != 0) {
       setLoading(false)
      }
  },[bio, experience, project, techStack])
  useEffect(() => {
    fetch('/api/bio')
      .then((res) => res.json())
      .then((data) => {
        const en = data.find((d) => d.locale === 'en')
        const jp = data.find((d) => d.locale === 'jp')
        bioDispatch({ type: 'SET_CONTENT', content: { en, jp } })
      })
  }, [locale])

  useEffect(() => {
    fetch('/api/project')
      .then((res) => res.json())
      .then((data) => {
        const en = data.filter((d) => d.locale === 'en')
        const jp = data.filter((d) => d.locale === 'jp')
        projectDispatch({ type: 'SET_CONTENT', content: { en, jp } })
      })
  }, [locale])

  useEffect(() => {
    fetch('/api/techstack')
      .then((res) => res.json())
      .then((data) => {
        const frontend = {
          en: data.filter((d) => d.label === 'Frontend' && d.locale === 'en'),
          jp: data.filter((d) => d.label === 'Frontend' && d.locale === 'jp')
        }
        const backend = {
          en: data.filter((d) => d.label === 'Backend' && d.locale === 'en'),
          jp: data.filter((d) => d.label === 'Backend' && d.locale === 'jp')
        }
        const devops = {
          en: data.filter((d) => d.label === 'DevOps' && d.locale === 'en'),
          jp: data.filter((d) => d.label === 'DevOps' && d.locale === 'jp')
        }
        const tools = {
          en: data.filter((d) => d.label === 'Tools' && d.locale === 'en'),
          jp: data.filter((d) => d.label === 'Tools' && d.locale === 'jp')
        }
        techStackDispatch({
          type: 'SET_CONTENT', content: {
            frontend,
            backend,
            devops,
            tools
          }
        })
      })
  }, [locale])

  useEffect(() => {
    fetch('/api/experience')
      .then((res) => res.json())
      .then((data) => {
        const en = data.filter((d) => d.locale === 'en')
        const jp = data.filter((d) => d.locale === 'jp')
        experienceDispatch({ type: 'SET_CONTENT', content: { en, jp } })
      })
  }, [locale])

  
 
  const contentProps:ContentProps = {
    ...bio,
    ...experience,
    ...project,
    ...techStack,
    hero,
    service,
    email_labels,
    isLoadig
  }

  return (
    <ContentContext.Provider value={contentProps}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)