import { useState } from "react"
import { ProjectType,ProjectModalType } from "@/const"
import Modal from "../Modal"
import Window from "../Window"

// Clickable cards lift a little and their shadow deepens on hover / keyboard focus.
const hoverClass = "transition-[transform,box-shadow] duration-150 ease-out group-hover:shadow-[6px_6px_0_0_var(--fg)] group-focus-visible:shadow-[6px_6px_0_0_var(--fg)] motion-safe:group-hover:-translate-x-0.5 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-focus-visible:-translate-x-0.5 motion-safe:group-focus-visible:-translate-y-0.5"

// Cards for Projects and Internal Tools. A card opens its detail popup if it
// has one, otherwise its link; with neither it is just a box.
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
    const clickable = !!prj.modal || !!prj.link
    return (
      <div
        key={prj._id}
        {...(clickable ? {
          role: "button",
          tabIndex: 0,
          className: "group cursor-pointer outline-none",
          onClick: () => onClickCard(prj),
          onKeyDown: (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClickCard(prj) } },
        } : {})}
      >
        <Window title={prj.title} className={clickable ? `h-full ${hoverClass}` : "h-full"}>
          {prj.subtitle ? (
            <p className="mb-1 font-semibold leading-snug text-fg">{ prj.subtitle }</p>
          ) : null}
          {prj.year ? (
            <span className="mb-2.5 block font-mono text-[11px] text-fg-muted">{ prj.year }</span>
          ) : null}
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
