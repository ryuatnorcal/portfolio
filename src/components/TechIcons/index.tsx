import Image from "next/image"
import { TechStackType } from "@/const"
interface TechIconsProps {
  label: string,
  data: TechStackType[]
}
const TechIcons = ({ label, data }: TechIconsProps) => {
  if(!data || !data.length) return null
  const techIcons = data.map((d) => (
    <div key={d._id} className="flex flex-col items-center gap-2.5 px-2 py-4">
      <div className="icon-chip">
        <Image src={`/icons/${d.icon}`} alt={d.name} width={36} height={36} />
      </div>
      <span className="text-center font-mono text-[11px] text-fg-muted">{d.name}</span>
    </div>
  ))

  return (
    <div className="mb-10">
      <h3 className="mb-[18px] font-body text-lg font-semibold text-fg">{label}</h3>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4">
        { techIcons }
      </div>
    </div>
  )
}

export default TechIcons
