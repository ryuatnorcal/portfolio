'use client'

import { createContext, useContext, useState, useEffect, useReducer } from "react";
import {
  bioReducer,
  experienceReducer,
  projectReducer,
  techStackReducer
} from "@/reducer";
import {
  ProjectFullType,
  BioFullType,
  ExperienceFullType,
  TechStackFullType,
  ServiceFullType,
  BioType,
  ExperienceType,
  ProjectType,
  TechStackType
} from "@/const";
import { initialContentProps } from "@/consts";
import { siteTextDefaults, SiteTextValues, Locale } from "@/content/siteText";
import { useLocale } from "@/hooks/useLocale";
import { defaultSectionFlags, SectionFlags, SectionKey } from "@/content/sections";

// Internal tools use the same card shape as projects.
export type InternalToolsFullType = { [locale: string]: ProjectType[] }
interface ContentProviderProps {
  children: React.ReactNode,
  locale: string
}
interface ContentProps {
  bio: BioFullType,
  experience: ExperienceFullType,
  project: ProjectFullType,
  techStack: TechStackFullType,
  service: ServiceFullType,
  internalTools: InternalToolsFullType,
  sections: SectionFlags,
  text: SiteTextValues,
  isLoading: boolean,
  hasError: boolean
}

// Fetch JSON, retrying a couple of times on server or network errors: a busy
// database can refuse a request now and then, and a second try succeeds.
const RETRY_DELAYS_MS = [400, 1200]
const fetchJson = async (url: string): Promise<unknown> => {
  for (let attempt = 0; ; attempt++) {
    try {
      const res = await fetch(url)
      if (res.ok) return await res.json()
      // 4xx won't get better by retrying
      if (res.status < 500 || attempt >= RETRY_DELAYS_MS.length) throw new Error(`${url} responded ${res.status}`)
    } catch (error) {
      if (attempt >= RETRY_DELAYS_MS.length) throw error
    }
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAYS_MS[attempt]))
  }
}

// Fetch an API list endpoint; reject on HTTP errors or a non-array body so
// callers never run array methods on an `{ error }` response.
const fetchList = async <T,>(url: string): Promise<T[]> => {
  const data = await fetchJson(url)
  if (!Array.isArray(data)) throw new Error(`${url} returned unexpected data`)
  return data
}

export const ContentContext = createContext<ContentProps>(initialContentProps);
export const ContentProvider = ({ children, locale } : ContentProviderProps) => {

  const [bio, bioDispatch] = useReducer(bioReducer, {})
  const [experience, experienceDispatch] = useReducer(experienceReducer, {})
  const [project, projectDispatch] = useReducer(projectReducer, {})
  const [techStack, techStackDispatch] = useReducer(techStackReducer, {})
  const [site, setSite] = useState<{ text: SiteTextValues, services: ServiceFullType, internalTools: InternalToolsFullType, sections: SectionFlags } | null>(null)
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
      && Object.keys(techStack).length != 0
      && site) {
        setTimeout(() => setLoading(false), 350)
      }
  }, [bio, experience, project, techStack, site])

  useEffect(() => {
    fetchJson('/api/site')
      .then((data) => setSite(data as NonNullable<typeof site>))
      .catch(onError)
  }, [locale])
  
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
        // already in display order
        const en = data.filter((d) => d.locale === 'en')
        const jp = data.filter((d) => d.locale === 'jp')
        experienceDispatch({ type: 'SET_CONTENT', content: { en, jp } })
      })
      .catch(onError)
  }, [locale])

  
 
  const contentProps:ContentProps = {
    ...bio,
    ...experience,
    ...project,
    ...techStack,
    service: site?.services || { en: [], jp: [] },
    internalTools: site?.internalTools || { en: [], jp: [] },
    sections: { ...defaultSectionFlags, ...site?.sections },
    text: site?.text || siteTextDefaults,
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

// Returns a lookup for editable site text (keys in src/content/siteText.ts) in
// the current locale.
export const useText = () => {
  const { text } = useContext(ContentContext)
  const { locale } = useLocale()
  return (key: string) => text[key]?.[locale as Locale] ?? siteTextDefaults[key]?.[locale as Locale] ?? ''
}

// Whether a section is switched on in the dashboard (Sections page).
export const useSectionVisible = () => {
  const { sections } = useContext(ContentContext)
  return (key: SectionKey) => sections?.[key] !== false
}
