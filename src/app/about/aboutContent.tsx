'use client'
import Page from '@/components/Pages'
import { Bio, Experience, Project, Hire } from '@/components/Contents'
import { useContent } from "@/hooks/useContent";
import Loading from '../loading'
import Email from '@/components/Email'
import SideNav, { SideNavSection } from '@/components/SideNav'

const sections: SideNavSection[] = [
  { id: 'about', label: 'about' },
  { id: 'experience', label: 'experience' },
  { id: 'project', label: 'project' },
  { id: 'hire', label: 'hire' },
]

const AboutContent = () => {
  const { isLoading } = useContent()
  return !isLoading ? (
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
      <SideNav sections={sections} />
    </main>
  ) : (
      <Loading />
  )
}

export default AboutContent