import Page from '@/components/Pages'
import { Bio, Experience, Project, Hire } from '@/components/Contents'
const About = () => {
  return (
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
  )
}

export default About