'use client'
import { useLocale } from "@/hooks/useLocale"
import { useContent } from "@/hooks/useContent"
type HeroProps = {
  
}
export const Hero = ({ }: HeroProps) => {
  const {locale} = useLocale()
  const { hero } = useContent()
  const { catchphrase, location, subtitle, title } = hero && hero[locale] || {}
  return (
    <div className="w-10/12 md:w-8/12 xl:w-6/12 pt-10p pb-10p">
      <span
        className="text-4xl sm:text-8xl lg:text-9xl block font-bold tracking-wider mb-5"
        dangerouslySetInnerHTML={{ __html: title }}
      >

      </span>
      <span className="text-xl sm:text-4xl block font-500 tracking-wider leading-12 xs:mb-5 sm:mb-5">
        { subtitle }
      </span>
      <span className="text-2xl sm:text-5xl block font-bold tracking-wider leading-loose">
       { catchphrase }
      </span>
      <span className="text-md block md:font-bold tracking-wider leading-loose">
        {location}
      </span>
    </div>
  )
}

