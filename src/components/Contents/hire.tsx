
import { sectionLabels, hireContent } from "@/consts"
import { useLocale } from "@/hooks/useLocale"

export const Hire = () => {
  const { locale } = useLocale()
  const label = sectionLabels && sectionLabels.hire[locale] || ''
  const paragraph = hireContent && hireContent[locale] || ''
  return (
    <div className="w-10/12 md:w-8/12 pb-5p">
      <h1 className="text-4xl font-bold tracking-md mb-5 underline">{label}</h1>
      <div className="text-xl tracking-wider">
        <div dangerouslySetInnerHTML={{ __html: paragraph }}></div>
      </div>
    </div>
  )
}