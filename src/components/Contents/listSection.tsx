import SectionHeading from '@/components/SectionHeading'

type ListSectionProps = {
  index: string,  // small label above the title, e.g. "01 — SERVICES"
  title: string,
  items: string[],
}

// A titled list of names split into two columns (Services on the home page).
export const ListSection = ({ index, title, items }: ListSectionProps) => {
  const half = Math.ceil(items.length / 2)
  const columns = [items.slice(0, half), items.slice(half)]

  return (
    <div className="flex flex-col justify-start w-11/12 md:w-8/12 xl:w-6/12 pb-10p pt-5p">
      <SectionHeading index={index} title={title} />
      <div className="grid sm:grid-cols-2 text-xl items-center flex sm:justify-end tracking-sm leading-relaxed">
        {columns.map((column, c) => (
          <div key={c} className={`col-span-1 ${c === 0 ? 'xs:pl-2 lg:pl-5' : ''}`}>
            {column.map((name, i) => (
              <p key={i} className="border-b border-border py-3 text-lg text-fg">{name}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
