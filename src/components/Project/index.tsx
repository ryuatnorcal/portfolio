import { useState } from "react"
import { ProjectType,ProjectModalType } from "@/const"
import Modal from "../Modal"
import Window from "../Window"
const Project = ({ data }: {data: ProjectType[]}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelection] = useState<ProjectModalType | {}>({})
  if (!data) return null
  const onClickCard = (data: ProjectType): void => {
    const { modal = {} } = data || {}
    if(modal && Object.keys(modal).length > 0){
      setSelection(modal)
      setIsModalOpen(true)
    } else {
      if(data.link) {
        window.open(data.link, '_blank')
      }
    }
  }
  const renderExperience = (data: ProjectType[]) => data.map((prj) => {
    return (
      <div
        key={prj._id}
        role="button"
        tabIndex={0}
        className="cursor-pointer"
        onClick={()=>onClickCard(prj)}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClickCard(prj) } }}
      >
        <Window title={prj.title} className="h-full">
          {prj.subtitle ? (
            <p className="mb-1 font-semibold leading-snug text-fg">{ prj.subtitle }</p>
          ) : null}
          <span className="mb-2.5 block font-mono text-[11px] text-fg-muted">{ prj.year }</span>
          <p className="m-0 leading-relaxed text-fg-muted">
            { prj.description }
          </p>
        </Window>
      </div>
    )
  }) || []

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {renderExperience(data)}
      <Modal
        showModal={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        data={selectedData}
      />
    </div>
  )
}

export default Project
