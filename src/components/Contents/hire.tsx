import { useText } from "@/hooks/useContent"
import SectionHeading from "@/components/SectionHeading"

export const Hire = () => {
  const t = useText()
  const label = t('section.hire')
  const paragraph = t('hire.content')
  const buttonLabel = t('hire.button')
  return (
    <div className="w-10/12 py-[var(--section-padding-y)] md:w-8/12">
      <SectionHeading index={`05 — ${label}`} title={label} />
      <div className="max-w-[46rem]">
        <div className="mb-8 text-xl leading-relaxed text-fg-muted" dangerouslySetInnerHTML={{ __html: paragraph }}></div>
        <a href="/contact" className="inline-flex items-center rounded-md bg-accent px-7 py-3.5 text-lg font-semibold text-accent-fg no-underline hover:no-underline">{buttonLabel}</a>
      </div>
    </div>
  )
}
