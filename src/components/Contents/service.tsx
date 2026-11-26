import { useLocale } from '@/hooks/useLocale'
import { useContent, useText } from '@/hooks/useContent'
import { ListSection } from './listSection'

export const Service = () => {
  const { locale } = useLocale()
  const { service } = useContent()
  const t = useText()
  const label = t('section.service')
  return <ListSection index={`01 — ${label}`} title={label} items={service[locale] || []} />
}
