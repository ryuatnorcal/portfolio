import { ExperienceType } from "@/const"
const Experience = ({ data }: { data: ExperienceType[] }) => {

  if(!data) return null
  const renderExperience = (data: ExperienceType[]) => data.map((exp, i) => {
    return (
      <div
        key={exp._id}
        className={`grid grid-cols-1 gap-6 py-6 sm:grid-cols-[7rem_1fr] ${i === data.length - 1 ? "" : "border-b border-border"}`}
      >
        <div className="pt-1 font-mono text-xs text-fg-muted">{ exp.years }</div>
        <div>
          <div className="mb-1 font-display text-lg font-semibold text-fg">{ exp.title }</div>
          <div className="mb-2 text-sm text-accent">{ exp.company }</div>
          <p className="m-0 leading-relaxed text-fg-muted">
            { exp.description }
          </p>
        </div>
      </div>
    )
  }) || []

  return (
    <div>
      {renderExperience(data)}
    </div>
  )

}

export default Experience
