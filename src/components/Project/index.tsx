import { useState } from "react"
import { ProjectType,ProjectModalType } from "@/const"
import Modal from "../Modal"
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
        className="cursor-pointer rounded-lg border border-border bg-surface p-6"
        onClick={()=>onClickCard(prj)}
      >
        <div className="mb-2.5 flex items-baseline justify-between gap-3">
          <span className="font-display text-xl font-semibold text-fg">{ prj.title }</span>
          <span className="whitespace-nowrap font-mono text-[11px] text-fg-muted">{ prj.year }</span>
        </div>
        <p className="m-0 leading-relaxed text-fg-muted">
          { prj.description }
        </p>
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
