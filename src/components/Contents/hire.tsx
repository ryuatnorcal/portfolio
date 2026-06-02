
import { sectionLabels, hireContent, hireButtonLabel } from "@/consts"
import { useLocale } from "@/hooks/useLocale"

export const Hire = () => {
  const { locale } = useLocale()
  const label = sectionLabels && sectionLabels.hire[locale] || ''
  const paragraph = hireContent && hireContent[locale] || ''
  const buttonLabel = hireButtonLabel && hireButtonLabel[locale] || ''
  return (
    <div className="w-10/12 md:w-8/12 pb-5p">
      <h1 className="text-4xl font-bold tracking-md mb-5 underline">{label}</h1>
      <div className="text-xl tracking-wider">
        <div dangerouslySetInnerHTML={{ __html: paragraph }}></div>
      </div>
      <div className="mt-10 mx-auto text-center btn btn-primary">
        <a href="/contact" className="text-lg rounded-md py-2 px-4 text-white bg-black transition-colors duration-300">{buttonLabel}</a>
      </div>
    </div>
  )
}