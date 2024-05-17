'use client'
import Page from "@/components/Pages";
import { Hero, Service, Tech } from "@/components/Contents";
import { useContent } from "@/hooks/useContent";
import Loading from './loading'
const Home = () => {
  const { isLoadig } = useContent()
  
  return !isLoadig ? (
    <main className="flex-row min-h-screen items-center justify-center ">
      <Page sectionName="hero">
        <Hero />
      </Page>
      <Page sectionName="service">
        <Service />
      </Page>
      <Page sectionName="tech">
        <Tech />
      </Page>
    </main>
  ) : (
      <Loading />
  )
}

export default Home