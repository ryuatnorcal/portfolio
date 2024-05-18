import { useState } from "react"
import { ProjectType,ProjectModalType } from "@/const"
import Modal from "../Modal"
const Project = ({ data }: {data: ProjectType[]}) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedData, setSelection] = useState<ProjectModalType | {}>({})
  if (!data) return null
  const onClickCard = (data: ProjectType): void => {
    const { modal = {} } = data || {}
    setSelection(modal)
    setIsModalOpen(true)
  }
  const renderExperience = (data: ProjectType[]) => data.map((prj, i) => {
    let borderClass = ''
    borderClass = i == 0 ? 'p-2 lg:p-5' : 'p-3 lg:p-5 '
    if (i !== 0 && i % 2 === 0) {
      borderClass += 'xs:border-l-none xl:border-l border-black'
    } 
    if (i !== 0 && i % 2 !== 0) {
      borderClass += i % 3 === 0 ?
      'xs:border-none lg:border-l xl:border-none border-black' : 'xs:border-l-none lg:border-l border-black'
    }
   
    return (
      <div
        key={prj._id}
        className={`w-full lg:w-1/2 xl:w-1/3 cursor-pointer hover:bg-gray-100 hover:text-gray-700 ${borderClass}`}
        onClick={()=>onClickCard(prj)}
      >
        
        <span className="underline font-bold text-2xl">{ prj.title }</span>
        <p>{ prj.year }</p>
        <p className="mt-3">
          { prj.description }
        </p>
      </div>
    )
  }) || []

  return (
    <div className="flex flex-wrap tracking-wider text-xl">
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