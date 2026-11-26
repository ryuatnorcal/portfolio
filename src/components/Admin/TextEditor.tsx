'use client'
import { useState, useTransition } from "react"
import { LOCALES, SiteTextGroup, SiteTextValues } from "@/content/siteText"
import { saveSiteText } from "@/app/(dashboard)/admin/actions"
import { buttonClass, FormError, inputClass, LOCALE_NAMES } from "./ui"

// One card per group of site text, English and Japanese side by side.
const TextEditor = ({ groups, values }: { groups: SiteTextGroup[], values: SiteTextValues }) => (
  <div className="space-y-6">
    {groups.map((group) => <TextGroupForm key={group.title} group={group} values={values} />)}
  </div>
)

const TextGroupForm = ({ group, values }: { group: SiteTextGroup, values: SiteTextValues }) => {
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [pending, startTransition] = useTransition()

  return (
    <form
      className="rounded-md border border-border bg-surface p-5"
      onChange={() => setSaved(false)}
      onSubmit={(e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const entries = group.fields.flatMap(({ key }) =>
          LOCALES.map((locale) => ({ key, locale, value: data.get(`${key}:${locale}`)?.toString() ?? '' }))
        )
        setError(null)
        startTransition(async () => {
          const result = await saveSiteText(entries)
          if (result.ok) setSaved(true)
          else setError(result.error)
        })
      }}
    >
      <h2 className="mb-4 font-semibold">{group.title}</h2>
      <div className="hidden gap-4 pb-2 font-mono text-xs uppercase tracking-wide text-fg-muted md:grid md:grid-cols-[10rem_1fr_1fr]">
        <span />
        {LOCALES.map((locale) => <span key={locale}>{LOCALE_NAMES[locale]}</span>)}
      </div>
      <div className="space-y-4">
        {group.fields.map((field) => (
          <div key={field.key} className="grid gap-2 md:grid-cols-[10rem_1fr_1fr] md:gap-4">
            <div className="pt-2 text-sm font-medium">
              {field.label}
              {field.html && <span className="block text-xs font-normal text-fg-muted">HTML allowed</span>}
            </div>
            {LOCALES.map((locale) => {
              const props = {
                name: `${field.key}:${locale}`,
                defaultValue: values[field.key]?.[locale] ?? '',
                'aria-label': `${field.label} (${LOCALE_NAMES[locale]})`,
                className: inputClass,
              }
              return field.multiline
                ? <textarea key={locale} rows={3} {...props} />
                : <input key={locale} type="text" {...props} />
            })}
          </div>
        ))}
      </div>
      <div className="mt-5 flex items-center gap-3">
        <button type="submit" className={buttonClass.primary} disabled={pending}>{pending ? 'Saving…' : 'Save'}</button>
        {saved && <span className="text-sm text-fg-muted">Saved</span>}
        <FormError error={error} />
      </div>
    </form>
  )
}

export default TextEditor
