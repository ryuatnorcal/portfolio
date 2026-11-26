'use client'
import Page from '@/components/Pages'
import { Bio, Experience, Project, InternalTools, Hire } from '@/components/Contents'
import { useContent, useSectionVisible } from "@/hooks/useContent";
import type { SectionKey } from "@/content/sections";
import Loading from '../loading'
import SideNav, { SideNavSection } from '@/components/SideNav'

// key: the dashboard show/hide switch; id: the Page element; label: side-nav text
const sections: (SideNavSection & { key: SectionKey, render: () => React.ReactNode })[] = [
  { key: 'about', id: 'about', label: 'about', render: () => <Bio /> },
  { key: 'experience', id: 'experience', label: 'experience', render: () => <Experience /> },
  { key: 'project', id: 'project', label: 'project', render: () => <Project /> },
  { key: 'internalTools', id: 'internal-tools', label: 'internalTools', render: () => <InternalTools /> },
  { key: 'hire', id: 'hire', label: 'hire', render: () => <Hire /> },
]

const AboutContent = () => {
  const { isLoading } = useContent()
  const visible = useSectionVisible()
  const shown = sections.filter(({ key }) => visible(key))
  return !isLoading ? (
    <main className="flex-row items-center justify-center ">
      {shown.map(({ id, render }) => (
        <Page key={id} sectionName={id}>
          {render()}
        </Page>
      ))}
      <SideNav sections={shown} />
    </main>
  ) : (
      <Loading />
  )
}

export default AboutContent