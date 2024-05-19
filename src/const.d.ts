
export interface BioType {
  name: string,
  title: string,
  description: string,
  locale: string
}
export interface BioFullType {
  [en:string]: BioType,
  [jp:string]: BioType
}

export interface ExperienceType {
  _id: string,
  title: string,
  years: string,
  company: string,
  description: string,
  locale: string
}
export interface ExperienceFullType {
  [en: string]: ExperienceType[],
  [jp: string]: ExperienceType[]
}
export interface ProjectModalType {
  title: string, 
  year: string, 
  img: string, 
  description: string, 
  url: string
}

export interface ProjectType {
  _id: string,
  title: string,
  year: string,
  description: string,
  link: string,
  locale: string,
  modal?: ProjectModalType
}

export interface ProjectFullType {
  [en: string]: ProjectType[],
  [jp: string]: ProjectType[]
}

export interface TechStackType {
  _id: string,
  label: string,
  name: string,
  icon: string,
  locale: string
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

export interface emailSuccessMessageType {
  [en:string]: string,
  [jp:string]: string
}

interface heroType {
  catchphrase: string,
  location: string,
  subtitle: string, 
  title: string
}
export interface heroFullType {
  [en:string]: heroType,
  [jp:string]: heroType
}

export interface ServiceFullType {
  [en:string]: string[],
  [jp:string]: string[]
}

interface EmailLabelsType {
  name: string,
  email: string,
  message: string,
  submit: string
}

export interface EmailLabelsFullType {
  [en:string]: EmailLabelsType,
  [jp:string]: EmailLabelsType
}

export interface SelectedLocaleProps {
  selectedLocale?: any
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

export interface hireContentType {
  [en: string]: string,
  [jp: string]: string
}

export interface contactContentType {
  [en: string]: {
    catchphrase:string,
    msg: string
  },
  [jp:string]: {
    catchphrase:string,
    msg: string
  }
}