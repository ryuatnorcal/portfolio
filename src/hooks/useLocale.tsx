'use client'

import { createContext, useContext, useState } from "react";

type LocaleProps = {
  locale: string,
  setLocale: (locale: string) => void
}
type LocaleProviderProps = {
  children: React.ReactNode
}

const initialLocalProps = {
  locale: "en",
  setLocale: () => {}
}

export const LocaleContext = createContext<LocaleProps>(initialLocalProps);

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const [locale, setLocale] = useState<string>("en");

  const localeProps = {
    locale,
    setLocale
  }
  return (
    <LocaleContext.Provider value={localeProps}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocale = () => useContext(LocaleContext)