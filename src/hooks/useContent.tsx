'use client'

import { createContext, useContext, useState, useEffect, useReducer } from "react";
import {
  bioReducer,
  experienceReducer,
  projectReducer,
  techStackReducer
} from "@/reducer";
import {
  heroFullType,
  ProjectFullType,
  BioFullType,
  ExperienceFullType,
  TechStackFullType,
  ServiceFullType,
  EmailLabelsFullType,
  BioType,
  ExperienceType,
  ProjectType,
  TechStackType
} from "@/const";
import { hero, service, email_labels, initialContentProps } from "@/consts";
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
  isLoading: boolean,
  hasError: boolean
}

// Fetch an API list endpoint; reject on HTTP errors or a non-array body so
// callers never run array methods on an `{ error }` response.
const fetchList = async <T,>(url: string): Promise<T[]> => {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${url} responded ${res.status}`)
  const data = await res.json()
  if (!Array.isArray(data)) throw new Error(`${url} returned unexpected data`)
  return data
}

export const ContentContext = createContext<ContentProps>(initialContentProps);
export const ContentProvider = ({ children, locale } : ContentProviderProps) => {

  const [bio, bioDispatch] = useReducer(bioReducer, {})
  const [experience, experienceDispatch] = useReducer(experienceReducer, {})
  const [project, projectDispatch] = useReducer(projectReducer, {})
  const [techStack, techStackDispatch] = useReducer(techStackReducer, {})
  const [isLoading, setLoading] = useState<boolean>(true)
  const [hasError, setError] = useState<boolean>(false)
  const onError = (error: unknown) => {
    console.error('Failed to load content:', error)
    setError(true)
  }

  useEffect(() => {
    if (Object.keys(bio).length != 0
      && Object.keys(experience).length != 0
      && Object.keys(project).length != 0
      && Object.keys(techStack).length != 0) {
        setTimeout(() => setLoading(false), 350)
      }
  }, [bio, experience, project, techStack])
  
  useEffect(() => {
    fetchList<BioType>('/api/bio')
      .then((data) => {
        const en = data.find((d) => d.locale === 'en')
        const jp = data.find((d) => d.locale === 'jp')
        bioDispatch({ type: 'SET_CONTENT', content: { en, jp } })
      })
      .catch(onError)
  }, [locale])

  useEffect(() => {
    fetchList<ProjectType>('/api/project')
      .then((data) => {
        const en = data.filter((d) => d.locale === 'en')
        const jp = data.filter((d) => d.locale === 'jp')
        projectDispatch({ type: 'SET_CONTENT', content: { en, jp } })
      })
      .catch(onError)
  }, [locale])

  useEffect(() => {
    fetchList<TechStackType>('/api/techstack')
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
      .catch(onError)
  }, [locale])

  useEffect(() => {
    fetchList<ExperienceType>('/api/experience')
      .then((data) => {
        const sortedData = data.sort((a, b) => Number(b.seq) - Number(a.seq))
        const en = sortedData.filter((d) => d.locale === 'en')
        const jp = sortedData.filter((d) => d.locale === 'jp')
        experienceDispatch({ type: 'SET_CONTENT', content: { en, jp } })
      })
      .catch(onError)
  }, [locale])

  
 
  const contentProps:ContentProps = {
    ...bio,
    ...experience,
    ...project,
    ...techStack,
    hero,
    service,
    email_labels,
    isLoading,
    hasError
  }

  return (
    <ContentContext.Provider value={contentProps}>
      {children}
    </ContentContext.Provider>
  )
}

export const useContent = () => useContext(ContentContext)