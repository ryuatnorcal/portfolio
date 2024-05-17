
'use client'

import { ContentProvider } from '@/hooks/useContent'
import { useLocale } from '@/hooks/useLocale'
// import { SelectedLocaleProps } from "../../const";
import ContactContent from './contactContent'

const Contact = ({selectedLocale}: any) => {
  const locales = useLocale()
  const locale = selectedLocale ? selectedLocale : locales.locale
  
  return (
    <ContentProvider locale={locale}>
      <ContactContent locale={locale} />
    </ContentProvider>
  )
}

export default Contact