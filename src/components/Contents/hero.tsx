'use client'
import Image from "next/image"
import { useLocale } from "@/hooks/useLocale"
import { useContent } from "@/hooks/useContent"
import me from "../../../public/icons/me.jpg"

type HeroProps = {
  
}
export const Hero = ({ }: HeroProps) => {
  const {locale} = useLocale()
  const { hero } = useContent()
  const { catchphrase, location, subtitle, title } = hero && hero[locale] || {}
  return (
    <div className="w-10/12 md:w-8/12 xl:w-6/12 py-[var(--section-padding-y)]">
      <Image
        src={me}
        alt="Ryu"
        width={56}
        height={56}
        className="mb-7 h-14 w-14 rounded-full border border-border object-cover"
      />
      <h1
        className="mb-5 max-w-[20ch] font-display text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-tight tracking-tight"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p className="mb-7 max-w-[40ch] font-body text-xl leading-relaxed text-fg-muted">
        { subtitle }
      </p>
      {catchphrase ? (
        <span className="mb-2 block font-display text-2xl font-semibold tracking-tight">
          { catchphrase }
        </span>
      ) : null}
      <span className="block font-mono text-sm text-fg-muted">
        {location}
      </span>
    </div>
  )
}
