import Image from "next/image"
import { TechStackType } from "@/const"
interface TechIconsProps {
  label: string,
  data: TechStackType[]
}
const TechIcons = ({ label, data }: TechIconsProps) => {
  console.log(data, label)
  if(!data || !data.length) return null
  const techIcons = data.map((d) => (
    <div key={d.id} className="flex flex-col items-center justify-center pt-5 pb-5">
      <Image src={`/icons/${d.icon}`} alt={d.name} width={50} height={50 } />
      <p className="text-sm text-center">{d.name}</p>
    </div>
  ))

  return (
    <div className="grid grid-cols-1 text-xl items-center flex tracking-sm leading-relaxed mt-5 mb-5">
      <h3 className="text-2xl font-bold">{label}</h3>
      <div className="flex grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 justify-around flex-wrap items-center mt-5 mb-5">
        { techIcons }
      </div>
    </div>
  )
}

export default TechIcons