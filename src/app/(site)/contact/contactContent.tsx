'use client'
import Page from '@/components/Pages'
import { useContent } from "@/hooks/useContent";
import Loading from '../loading'
import {contactContent} from "../../consts";
const ContactContent = ({locale}: {locale: string}) => {
  const { isLoading } = useContent()
  const { catchphrase, msg } = contactContent[locale] || {}
  return !isLoading ? (
    <main className="flex flex-row items-center justify-center ">
      <Page sectionName="contact">
        <div className="w-10/12 py-[var(--section-padding-y)] md:w-8/12 xl:w-6/12">
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
