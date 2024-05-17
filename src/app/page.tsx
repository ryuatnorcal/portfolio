'use client'

import { ContentProvider } from "@/hooks/useContent";
import { useLocale } from "@/hooks/useLocale";
import { SelectedLocaleProps } from "../const";
import Home from "./home";

export default function HomeWrapper({ selectedLocale }:SelectedLocaleProps) {
  const locales = useLocale();
  const locale = selectedLocale? selectedLocale : locales.locale

  return (
    <ContentProvider locale={locale}>
      <Home />
    </ContentProvider>
  );
}
