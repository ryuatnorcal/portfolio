'use client'
import Page from '@/components/Pages'
import { useContent, useText } from "@/hooks/useContent";
import Loading from '../loading'
const ContactContent = ({locale}: {locale: string}) => {
  const { isLoading } = useContent()
  const t = useText()
  const catchphrase = t('contact.catchphrase')
  const msg = t('contact.message')
  return !isLoading ? (
    <main className="flex flex-row items-center justify-center ">
      <Page sectionName="contact">
        <div className="w-11/12 py-[var(--section-padding-y)] md:w-8/12 xl:w-6/12">
          <h1 className="mb-5 font-display text-4xl font-semibold tracking-tight sm:text-6xl">
            {catchphrase}
          </h1>
          <p className='leading-relaxed text-fg-muted'>{ msg }</p>
        </div>
      </Page>
    </main>
  ) : (
      <Loading />
  )
}

export default ContactContent
