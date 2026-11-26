import { useLocale } from '@/hooks/useLocale'
import { useContent, useText } from '@/hooks/useContent'
import { ListSection } from './listSection'

// About page: tools built for internal use, styled like Services.
export const InternalTools = () => {
  const { locale } = useLocale()
  const { internalTools } = useContent()
  const t = useText()
  const label = t('section.internalTools')
  return (
    <ListSection
      index={`05 — ${label}`}
      title={label}
      description={t('internalTools.description')}
      items={internalTools[locale] || []}
      // About page sections are wider than the home page ones
      widthClass="w-11/12 md:w-8/12"
    />
  )
}
