interface BioType {
  name: string,
  title: string,
  description: string,
  locale: ['en', 'jp']
}
export interface BioFullType {
  en: BioType,
  jp: BioType
}

interface ExperienceType {
  title: string,
  years: string,
  company: string,
  description: string,
  locale: ['en', 'jp']
}
export interface ExperienceFullType {
  en: ExperienceType[],
  jp: ExperienceType[]
}

interface ProjectType {
  title: string,
  year: string,
  description: string,
  link: string,
  locale: ['en', 'jp']
}

export interface ProjectFullType {
  en: ProjectType[],
  jp: ProjectType[]
}

interface TechStackType {
  id: string,
  label: ['Frontend', 'Backend', 'DevOps', 'Tools'],
  name: string,
  icon: string,
  locale: ['en', 'jp']
}
export interface TechStackFullType {
  frontend: {
    [en:string]: TechStackType[],
    [jp:string]: TechStackType[]
  },
  backend: {
    [en:string]: TechStackType[],
    [jp:string]: TechStackType[]
  },
  devops: {
    [en:string]: TechStackType[],
    [jp:string]: TechStackType[]
  },
  tools: {
    [en:string]: TechStackType[],
    [jp:string]: TechStackType[]
  }
}

interface heroType {
  catchphrase: string,
  location: string,
  subtitle: string, 
  title: string
}
export interface heroFullType {
  en: heroType,
  jp: heroType
}

export interface ServiceFullType {
  en: string[],
  jp: string[]
}

interface EmailLabelsType {
  name: string,
  email: string,
  message: string
}

export interface EmailLabelsFullType {
  en: EmailLabelsType,
  jp: EmailLabelsType
}

export interface SelectedLocaleProps {
  selectedLocale?: 'en' | 'jp'
}

export interface techStackLabelType {
  [en: string]: {
    frontend: string,
    backend: string,
    devops: string,
    tools: string
  },
  [jp: string]: {
    frontend: string,
    backend: string,
    devops: string,
    tools: string
  }
}

export interface sectionLabelsType {
  service: {
    [en: string]: string,
    [jp: string]: string
  },
  tech: {
    [en: string]: string,
    [jp: string]: string
  },
  experience: {
    [en: string]: string,
    [jp: string]: string
  },
  project: {
    [en: string]: string,
    [jp: string]: string
  },
  hire: {
    [en: string]: string,
    [jp: string]: string
  }
}

export interface serviceType {
  [en: string]: string[],
  [jp: string]: string[]
}