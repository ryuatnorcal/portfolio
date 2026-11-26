'use client'
import { useEffect, useState } from "react"
import { useLocale } from "@/hooks/useLocale"
import { sideNavLabels } from "@/consts"

export type SideNavSection = {
  id: string,      // element id to scroll to
  label: string,   // key in sideNavLabels
  dark?: boolean,  // section has a dark background: draw the nav in white
}

type SideNavProps = {
  sections: SideNavSection[]
}

// A section counts as current once its top passes this fraction of the viewport.
const ACTIVE_LINE = 0.4

// Fixed dot navigation on the right: one dot per section joined by a thin
// line, with the current section's dot and label slightly bigger.
const SideNav = ({ sections }: SideNavProps) => {
  const { locale } = useLocale()
  const [active, setActive] = useState<number>(0)
  const sectionsKey = sections.map(({ id }) => id).join('|')

  useEffect(() => {
    const ids = sectionsKey.split('|')
    let frame = 0
    const update = () => {
      frame = 0
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      // short last sections never reach the line, so pick them at the bottom
      if (atBottom) return setActive(ids.length - 1)
      let current = 0
      ids.forEach((id, i) => {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= window.innerHeight * ACTIVE_LINE) current = i
      })
      setActive(current)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [sectionsKey])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const tone = sections[active]?.dark ? 'text-white' : 'text-black'

  return (
    <nav aria-label="Sections" className={`hidden lg:block fixed right-8 top-1/2 -translate-y-1/2 z-40 transition-colors duration-300 ${tone}`}>
      <ol>
        {sections.map(({ id, label }, i) => {
          const isActive = i === active
          return (
            <li key={id} className="relative pb-8 last:pb-0">
              {/* line from this dot's centre to the next one's (text-sm rows are 1.25rem tall) */}
              {i < sections.length - 1 && (
                <span aria-hidden className="absolute left-[calc(0.5rem-0.5px)] top-[0.625rem] h-full w-px bg-current" />
              )}
              <button
                type="button"
                onClick={() => scrollTo(id)}
                aria-current={isActive ? 'true' : undefined}
                className="relative flex items-center gap-3 cursor-pointer"
              >
                {/* fixed-width column keeps every dot centred on the line */}
                <span className="flex w-4 justify-center">
                  <span className={`block h-2 w-2 rounded-full bg-current transition-transform duration-300 ${isActive ? 'scale-150' : 'hover:scale-125'}`} />
                </span>
                <span className={`origin-left text-sm transition-all duration-300 ${isActive ? 'scale-110 font-semibold' : 'opacity-70 hover:opacity-100'}`}>
                  {sideNavLabels[label]?.[locale] || label}
                </span>
              </button>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default SideNav
