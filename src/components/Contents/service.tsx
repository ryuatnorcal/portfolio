import { useLocale } from '@/hooks/useLocale'
import { useContent, useText } from '@/hooks/useContent'
import SectionHeading from '@/components/SectionHeading'

export const Service = () => {
  const { locale } = useLocale()
  const { service } = useContent()
  const t = useText()
  const list = service[locale] || []
  // split into two columns
  const half = Math.ceil(list.length / 2)
  const left = list.slice(0, half)
  const right = list.slice(half)
  const label = t('section.service')

  const renderService = (data: string[]) => data.map((name, i) => (
    <p key={i} className="border-b border-border py-3 text-lg text-fg">{name}</p>
  ))
  return (
    <div className="flex flex-col justify-start w-10/12 md:w-8/12 xl:w-6/12 pb-10p pt-5p">
      <h1 className="text-4xl font-bold tracking-md mb-5 underline">{ label }</h1>
      <div className="grid sm:grid-cols-2 text-xl items-center flex sm:justify-end tracking-sm leading-relaxed">
        <div className="col-span-1 xs:pl-2 lg:pl-5">
          {renderService(left)}
        </div>
        <div className="col-span-1">
          {renderService(right)}
        </div>
      </div>
    </div>
  )
}
