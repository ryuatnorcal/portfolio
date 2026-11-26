import {
  hero,
  sectionLabels,
  sideNavLabels,
  techStackLabels,
  hireContent,
  hireButtonLabel,
  contactContent,
  email_labels,
  emailSuccessMessage,
} from "@/consts"

export type Locale = 'en' | 'jp'
export const LOCALES: Locale[] = ['en', 'jp']

export type SiteTextField = {
  key: string,
  label: string,
  // multi-line text; `html` fields are rendered as HTML on the site
  multiline?: boolean,
  html?: boolean,
  defaults: Record<Locale, string>,
}

export type SiteTextGroup = {
  title: string,
  fields: SiteTextField[],
}

const both = (values: { [locale: string]: string | undefined }) =>
  ({ en: values.en ?? '', jp: values.jp ?? '' })

// Every piece of editable copy on the site. Values saved in the dashboard
// override these defaults, which are the text that used to be hard-coded.
export const siteTextGroups: SiteTextGroup[] = [
  {
    title: 'Hero banner',
    fields: [
      { key: 'hero.title', label: 'Title', html: true, defaults: both({ en: hero.en.title, jp: hero.jp.title }) },
      { key: 'hero.subtitle', label: 'Subtitle', multiline: true, defaults: both({ en: hero.en.subtitle, jp: hero.jp.subtitle }) },
      { key: 'hero.catchphrase', label: 'Catchphrase', defaults: both({ en: hero.en.catchphrase, jp: hero.jp.catchphrase }) },
      { key: 'hero.location', label: 'Location', defaults: both({ en: hero.en.location, jp: hero.jp.location }) },
    ],
  },
  {
    title: 'Section titles',
    fields: [
      { key: 'section.service', label: 'Services', defaults: both(sectionLabels.service) },
      { key: 'section.tech', label: 'Tech stack', defaults: both(sectionLabels.tech) },
      { key: 'section.experience', label: 'Experience', defaults: both(sectionLabels.experience) },
      { key: 'section.project', label: 'Projects', defaults: both(sectionLabels.project) },
      { key: 'section.hire', label: 'Hire me', defaults: both(sectionLabels.hire) },
    ],
  },
  {
    title: 'Tech stack categories',
    fields: [
      { key: 'tech.frontend', label: 'Frontend', defaults: both({ en: techStackLabels.en.frontend, jp: techStackLabels.jp.frontend }) },
      { key: 'tech.backend', label: 'Backend', defaults: both({ en: techStackLabels.en.backend, jp: techStackLabels.jp.backend }) },
      { key: 'tech.devops', label: 'DevOps', defaults: both({ en: techStackLabels.en.devops, jp: techStackLabels.jp.devops }) },
      { key: 'tech.tools', label: 'Tools', defaults: both({ en: techStackLabels.en.tools, jp: techStackLabels.jp.tools }) },
    ],
  },
  {
    title: 'Side navigation',
    fields: Object.keys(sideNavLabels).map((section) => ({
      key: `sidenav.${section}`,
      label: sideNavLabels[section].en,
      defaults: both(sideNavLabels[section]),
    })),
  },
  {
    title: 'Hire me',
    fields: [
      { key: 'hire.content', label: 'Text', multiline: true, html: true, defaults: both(hireContent) },
      { key: 'hire.button', label: 'Button', defaults: both(hireButtonLabel) },
    ],
  },
  {
    title: 'Contact page',
    fields: [
      { key: 'contact.catchphrase', label: 'Heading', defaults: both({ en: contactContent.en.catchphrase, jp: contactContent.jp.catchphrase }) },
      { key: 'contact.message', label: 'Message', multiline: true, defaults: both({ en: contactContent.en.msg, jp: contactContent.jp.msg }) },
      { key: 'email.name', label: 'Form: name', defaults: both({ en: email_labels.en.name, jp: email_labels.jp.name }) },
      { key: 'email.email', label: 'Form: email', defaults: both({ en: email_labels.en.email, jp: email_labels.jp.email }) },
      { key: 'email.message', label: 'Form: message', defaults: both({ en: email_labels.en.message, jp: email_labels.jp.message }) },
      { key: 'email.submit', label: 'Form: submit', defaults: both({ en: email_labels.en.submit, jp: email_labels.jp.submit }) },
      { key: 'email.success', label: 'Sent message', multiline: true, defaults: both(emailSuccessMessage) },
    ],
  },
]

export type SiteTextValues = { [key: string]: Record<Locale, string> }

export const siteTextFields = siteTextGroups.flatMap(({ fields }) => fields)

export const siteTextDefaults: SiteTextValues = Object.fromEntries(
  siteTextFields.map(({ key, defaults }) => [key, defaults])
)

export const TECH_CATEGORIES = ['Frontend', 'Backend', 'DevOps', 'Tools'] as const
