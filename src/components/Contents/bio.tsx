
'use client'
import Image from "next/image"
import me from "../../../public/icons/me.jpg"
import { useContent } from "@/hooks/useContent"
import { useLocale } from "@/hooks/useLocale"
export const Bio = () => {
  const { locale } = useLocale()
  const { bio } = useContent()
  const {title, name, description} = bio && bio[locale] || {}
  
  return (
    <div className="flex w-10/12 flex-col justify-start py-[var(--section-padding-y)] md:w-8/12">
      <div className="grid grid-cols-1 items-center xl:grid-cols-2">
        <div className="col-span-1 flex justify-center py-5">
          <Image src={me} alt="me" className="rounded-full border border-border" width={450} height={450}/>
        </div>
        <div className="col-span-1 py-5">
          <p className="font-display text-3xl font-semibold text-fg">{ name }</p>
          <p className="mb-5 font-medium text-accent">{ title }</p>
          <p className="leading-relaxed text-fg-muted">{ description } </p>
        </div>
      </div>
    </div>

  )
}
