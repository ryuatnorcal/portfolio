
'use client'
import Page from '@/components/Pages'
import { ContentProvider } from '@/hooks/useContent'
import { useLocale } from '@/hooks/useLocale'
import { SelectedLocaleProps } from "../../const";
const Contact = ({selectedLocale}: SelectedLocaleProps) => {
  const locales = useLocale()
  const locale = selectedLocale? selectedLocale : locales.locale
  return (
    <ContentProvider locale={locale}>
      <main className="flex flex-row items-center justify-center ">
        <Page sectionName="contact">
          <div className="pt-10p">
            <span className="text-4xl sm:text-7xl block font-bold tracking-wider mb-5">
              {`Let\'s Talk`}
            </span>
            <p className='tracking-wider'>I will get back to you ASAP!</p>
          </div>
        </Page>
      </main>
    </ContentProvider>
  )
}

export default Contact