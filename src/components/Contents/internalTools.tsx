import { useLocale } from '@/hooks/useLocale'
import { useContent, useText } from '@/hooks/useContent'
import SectionHeading from '@/components/SectionHeading'
import Window from '@/components/Window'

// About page: tools built for my own use, one window box each (like Projects).
export const InternalTools = () => {
  const { locale } = useLocale()
  const { internalTools } = useContent()
  const t = useText()
  const label = t('section.internalTools')
  const description = t('internalTools.description')
  const tools = internalTools[locale] || []

  return (
    <div className="flex w-11/12 flex-col justify-start py-[var(--section-padding-y)] md:w-8/12">
      <SectionHeading index={`05 — ${label}`} title={label} />
      {description ? (
        <p className="-mt-5 mb-8 max-w-[46rem] leading-relaxed text-fg-muted">{description}</p>
      ) : null}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {tools.map(({ name, description: detail }, i) => (
          <Window key={i} title={name} className="h-full">
            <p className="m-0 leading-relaxed text-fg-muted">{detail}</p>
          </Window>
        ))}
      </div>
    </div>
  )
}
