'use client'
import Page from "@/components/Pages";
import { Hero, Service, Tech } from "@/components/Contents";
import { ContentProvider } from "@/hooks/useContent";
import { useLocale } from "@/hooks/useLocale";
import { SelectedLocaleProps } from "../const";

export default function Home({ selectedLocale }:SelectedLocaleProps) {
  const locales = useLocale();
  const locale = selectedLocale? selectedLocale : locales.locale
  
  return (
    <ContentProvider locale={locale}>
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
    </ContentProvider>
  );
}
