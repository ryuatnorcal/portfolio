
'use client'

import { ContentProvider } from '@/hooks/useContent'
import { useLocale } from '@/hooks/useLocale'
// import { SelectedLocaleProps } from "../../const";
import ContactContent from './contactContent'
import Email from '@/components/Email'
import { useContent, useSectionVisible } from '@/hooks/useContent'

// The form shows once content has loaded, unless switched off in the dashboard.
const ContactForm = () => {
  const { isLoading } = useContent()
  const visible = useSectionVisible()
  return !isLoading && visible('contactForm') ? <Email /> : null
}

const Contact = ({selectedLocale}: any) => {
  const locales = useLocale()
  const locale = selectedLocale ? selectedLocale : locales.locale
  
  return (
    <ContentProvider locale={locale}>
      <ContactContent locale={locale} />
      <ContactForm />
    </ContentProvider>
  )
}

export default Contact