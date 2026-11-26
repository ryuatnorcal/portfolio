import { useLocale } from '@/hooks/useLocale'
import { useContent, useText } from '@/hooks/useContent'
import SectionHeading from '@/components/SectionHeading'
import ProjectItem from '../Project'

// About page: tools built for my own use. Same cards (and popups) as Projects.
export const InternalTools = () => {
  const { locale } = useLocale()
  const { internalTools } = useContent()
  const t = useText()
  const label = t('section.internalTools')
  const description = t('internalTools.description')

  return (
    <div className="flex w-11/12 flex-col justify-start py-[var(--section-padding-y)] md:w-8/12">
      <SectionHeading index={`05 — ${label}`} title={label} />
      {description ? (
        <p className="-mt-5 mb-8 max-w-[46rem] leading-relaxed text-fg-muted">{description}</p>
      ) : null}
      <ProjectItem data={internalTools[locale] || []} />
    </div>
  )
}
