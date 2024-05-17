'use client'
import { ContentProvider } from '@/hooks/useContent'
import { useLocale } from '@/hooks/useLocale'
// import { SelectedLocaleProps } from "../../const";
import AboutContent from "./aboutContent"

const About = ({selectedLocale}: any) => {
  const locales = useLocale()
  const locale = selectedLocale? selectedLocale : locales.locale
  return (
    <ContentProvider locale={locale}>
      <AboutContent />
    </ContentProvider>
  )
}

export default About