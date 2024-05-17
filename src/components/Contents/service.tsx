
import { useLocale } from '@/hooks/useLocale'
import { service, sectionLabels } from '../../consts'

export const Service = () => {
  const { locale } = useLocale()
  const left = service[locale].slice(0, 3)
  const right = service[locale].slice(3)
  const label = sectionLabels.service[locale] || ''

  const renderService = (data: string[]) => data.map((name, i) => <p key={i}>{`+ ${name}`}</p>)
  return (
    <div className="flex flex-col justify-start w-10/12 md:w-8/12 xl:w-6/12 pb-10p">
      <h1 className="text-4xl font-bold tracking-md mb-5 underline">{ label }</h1>
      <div className="grid sm:grid-cols-2 text-xl items-center flex sm:justify-end tracking-sm leading-relaxed">
        <div className="col-span-1 xs:pl-2 lg:pl-5">
          {renderService(left)}
        </div>
        <div className="col-span-1 xs:pl-2 lg:pl-5">
          {renderService(right)}
        </div>
      </div>
    </div>
  )
}