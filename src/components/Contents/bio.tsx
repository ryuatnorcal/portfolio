
'use client'
import Image from "next/image"
import me from "../../../public/icons/me.jpg"
import { useContent } from "@/hooks/useContent"
import { useLocale } from "@/hooks/useLocale"
export const Bio = () => {
  const { locale } = useLocale()
  const { bio } = useContent()
  const {title, name, description} = bio && bio[locale] || {}
  console.log(title, name, description, locale)
  
  return (
    <div className="flex flex-col justify-start w-10/12 md:w-8/12 pt-5p pb-10p">
      <div className="grid grid-cols-1 xl:grid-cols-2 text-xl items-center flex flex-wrap tracking-wider">
        <div className="col-span-1 pt-5 pb-5 flex justify-center">
          <Image src={me} alt="me" className="rounded-full" width={450} height={450}/>
        </div>
        <div className="col-span-1 pt-5 pb-5">
          <p className="text-3xl font-bold underline">{ name }</p>
          <p className="font-semibold mb-5">{ title }</p>
          <p>{ description } </p>
        </div>
      </div>
    </div>

  )
}
