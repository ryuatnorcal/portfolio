'use client'
import Page from '@/components/Pages'
import { Bio, Experience, Project, Hire } from '@/components/Contents'
import { ContentProvider } from '@/hooks/useContent'
import { useLocale } from '@/hooks/useLocale'
import {SelectedLocaleProps} from "../../const";
const About = ({selectedLocale}: SelectedLocaleProps) => {
  const locales = useLocale()
  const locale = selectedLocale? selectedLocale : locales.locale
  return (
    <ContentProvider locale={locale}>
      <main className="flex-row items-center justify-center ">
        <Page sectionName="about">
          <Bio />
        </Page>
        <Page sectionName='experience'>
          <Experience />
        </Page>
        <Page sectionName='project'>
          <Project />
        </Page>
        <Page sectionName='hire'>
          <Hire />
        </Page>
      </main>
    </ContentProvider>
  )
}

export default About