import Page from "@/components/Pages";
import { Hero, Service, Tech } from "@/components/Contents";
export default function Home() {
  return (
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
      <Page sectionName="approach">
        approach
      </Page>
    </main>
  );
}
