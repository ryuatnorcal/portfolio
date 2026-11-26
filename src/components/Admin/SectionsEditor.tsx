'use client'
import { useState, useTransition } from "react"
import { SECTION_PAGES, SECTIONS, SectionFlags, SectionKey } from "@/content/sections"
import { saveSectionFlags } from "@/app/(dashboard)/admin/actions"
import { buttonClass, FormError } from "./ui"

// One switch per site section, grouped by page; saved together.
const SectionsEditor = ({ flags: initial }: { flags: SectionFlags }) => {
  const [flags, setFlags] = useState<SectionFlags>(initial)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [pending, startTransition] = useTransition()

  const toggle = (key: SectionKey) => {
    setSaved(false)
    setFlags((f) => ({ ...f, [key]: !f[key] }))
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault()
        setError(null)
        startTransition(async () => {
          const result = await saveSectionFlags(flags)
          if (result.ok) setSaved(true)
          else setError(result.error)
        })
      }}
    >
      {SECTION_PAGES.map((page) => (
        <fieldset key={page} className="rounded-md border border-border bg-surface p-5">
          <legend className="px-1 font-semibold">{page}</legend>
          <ul className="divide-y divide-border">
            {SECTIONS.filter((s) => s.page === page).map(({ key, label }) => (
              <li key={key} className="flex items-center justify-between gap-4 py-3">
                <label htmlFor={`section-${key}`} className="text-sm font-medium">{label}</label>
                <span className="flex items-center gap-3">
                  <span className={`text-xs ${flags[key] ? 'text-fg' : 'text-fg-muted'}`}>{flags[key] ? 'Shown' : 'Hidden'}</span>
                  <input
                    id={`section-${key}`}
                    type="checkbox"
                    role="switch"
                    checked={flags[key]}
                    onChange={() => toggle(key)}
                    className="h-5 w-5 cursor-pointer accent-fg"
                  />
                </span>
              </li>
            ))}
          </ul>
        </fieldset>
      ))}
      <div className="flex items-center gap-3">
        <button type="submit" className={buttonClass.primary} disabled={pending}>{pending ? 'Saving…' : 'Save'}</button>
        {saved && <span className="text-sm text-fg-muted">Saved. Changes show on the site right away.</span>}
        <FormError error={error} />
      </div>
    </form>
  )
}

export default SectionsEditor
