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
        <div className="pt-10p">
          <span className="text-4xl sm:text-7xl block font-bold tracking-wider mb-5">
            {catchphrase}
          </span>
          <p className='tracking-wider'>{ msg }</p>
        </div>
      </Page>
    </main>
  ) : (
      <Loading />
  )
}

export default ContactContent