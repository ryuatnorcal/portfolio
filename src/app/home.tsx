'use client'
import Page from "@/components/Pages";
import { Hero, Service, Tech } from "@/components/Contents";
import { useContent } from "@/hooks/useContent";
import Loading from './loading'
import LiquidBanner from "@/components/LiquidBanner";
const Home = () => {
  const { isLoading } = useContent()
  
  return !isLoading ? (
    <main className="flex-row min-h-screen items-center justify-center ">
      <div className="relative overflow-hidden text-white">
        <LiquidBanner className="absolute inset-0" />
        <div className="relative z-10">
          <Page sectionName="hero">
            <Hero />
          </Page>
        </div>
      </div>
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