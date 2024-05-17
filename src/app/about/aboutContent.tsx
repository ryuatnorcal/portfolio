'use client'
import Page from '@/components/Pages'
import { Bio, Experience, Project, Hire } from '@/components/Contents'
import { useContent } from "@/hooks/useContent";
import Loading from '../loading'
const AboutContent = () => {
  const { isLoadig } = useContent()
  return !isLoadig ? (
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
  ) : (
      <Loading />
  )
}

export default AboutContent