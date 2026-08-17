import { useLocale } from '@/hooks/useLocale'
import { service, sectionLabels } from '../../consts'
import SectionHeading from '@/components/SectionHeading'

export const Service = () => {
  const { locale } = useLocale()
  const left = service[locale].slice(0, 4)
  const right = service[locale].slice(4)
  const label = sectionLabels.service[locale] || ''

  const renderService = (data: string[]) => data.map((name, i) => (
    <p key={i} className="border-b border-border py-3 text-lg text-fg">{name}</p>
  ))
  return (
    <div className="flex w-10/12 flex-col justify-start py-[var(--section-padding-y)] md:w-8/12 xl:w-6/12">
      <SectionHeading index={`01 — ${label}`} title={label} />
      <div className="grid max-w-[640px] items-center text-lg sm:grid-cols-2 sm:gap-x-10">
        <div className="col-span-1">
          {renderService(left)}
        </div>
        <div className="col-span-1">
          {renderService(right)}
        </div>
      </div>
    </div>
  )
}
