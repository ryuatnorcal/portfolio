import { ExperienceType } from "@/const"
const Experience = ({ data }: { data: ExperienceType[] }) => {

  if(!data) return null
  const renderExperience = (data: ExperienceType[]) => data.map((exp, i) => {
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
      <div key={exp.id} className={`w-full lg:w-1/2 xl:w-1/3 ${borderClass}`}>
        <span className="underline font-bold text-2xl">{ exp.title }</span>
          <p>{ exp.years }</p>
          <p className="font-semibold text-gray-500">{ exp.company }</p>
          <p className="mt-3">
            { exp.description }
          </p>
        </div>
    )
  }) || []

  return (
    <div className="flex flex-wrap tracking-wider text-xl">
      {renderExperience(data)}
    </div>
  )

}

export default Experience