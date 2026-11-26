import { useText } from "@/hooks/useContent"
import SectionHeading from "@/components/SectionHeading"
import Window from "@/components/Window"

export const Hire = () => {
  const t = useText()
  const label = t('section.hire')
  const paragraph = t('hire.content')
  const buttonLabel = t('hire.button')
  return (
    <div className="w-11/12 py-[var(--section-padding-y)] md:w-8/12">
      <SectionHeading index={`06 — ${label}`} title={label} />
      <Window title="hire_me.exe" className="max-w-[46rem]" bodyClassName="p-6 sm:p-8">
        <div className="mb-8 text-xl leading-relaxed text-fg-muted" dangerouslySetInnerHTML={{ __html: paragraph }}></div>
        <a href="/contact" className="win-btn px-7 py-3 text-lg">{buttonLabel}</a>
      </Window>
    </div>
  )
}
