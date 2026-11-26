// Sections of the public site that can be shown or hidden from the dashboard
// (Sections page). A section is shown unless it has been switched off.

export const SECTIONS = [
  { key: 'hero', page: 'Home', label: 'Hero banner' },
  { key: 'service', page: 'Home', label: 'Services' },
  { key: 'tech', page: 'Home', label: 'Tech stack' },
  { key: 'about', page: 'About', label: 'About me' },
  { key: 'experience', page: 'About', label: 'Experience' },
  { key: 'project', page: 'About', label: 'Projects' },
  { key: 'internalTools', page: 'About', label: 'Internal tools' },
  { key: 'hire', page: 'About', label: 'Hire me' },
  { key: 'contact', page: 'Contact', label: 'Heading and message' },
  { key: 'contactForm', page: 'Contact', label: 'Contact form' },
] as const

export type SectionKey = typeof SECTIONS[number]['key']
export type SectionFlags = Record<SectionKey, boolean>

export const SECTION_PAGES = ['Home', 'About', 'Contact'] as const

export const defaultSectionFlags = Object.fromEntries(
  SECTIONS.map(({ key }) => [key, true])
) as SectionFlags

export const isSectionKey = (key: string): key is SectionKey =>
  SECTIONS.some((section) => section.key === key)
