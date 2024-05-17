'use client'

import { createContext, useContext, useState, useEffect } from "react";

type LocaleProps = {
  locale: string,
  setLocale: (locale: string) => void
}
type LocaleProviderProps = {
  children: React.ReactNode
}

const initialLocalProps = {
  locale: 'en',
  setLocale: () => {}
}

export const LocaleContext = createContext<LocaleProps>(initialLocalProps);

export const LocaleProvider = ({ children }: LocaleProviderProps) => {
  const [init, setInit] = useState<boolean>(false)
  const [locale, setLocale] = useState<string>('en');

  useEffect(() => {
    const detectedLanguage = window && window.navigator.language === 'ja' ? 'jp' : 'en'
    setLocale(detectedLanguage)
  },[init])
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