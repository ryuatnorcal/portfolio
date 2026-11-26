'use client'
import { useState, useTransition } from "react"
import { saveBio } from "@/app/(dashboard)/admin/actions"
import { buttonClass, FormError, inputClass } from "./ui"

type Bio = { name: string, title: string, description: string }

const BioEditor = ({ locale, bio }: { locale: string, bio: Bio | null }) => {
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [pending, startTransition] = useTransition()

  return (
    <form
      className="max-w-3xl space-y-4 rounded-md border border-border bg-surface p-5"
      onChange={() => setSaved(false)}
      onSubmit={(e) => {
        e.preventDefault()
        const data = Object.fromEntries([...new FormData(e.currentTarget).entries()].map(([k, v]) => [k, v.toString()]))
        setError(null)
        startTransition(async () => {
          const result = await saveBio(locale, data)
          if (result.ok) setSaved(true)
          else setError(result.error)
        })
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Name</span>
          <input name="name" defaultValue={bio?.name ?? ''} required className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium">Title</span>
          <input name="title" defaultValue={bio?.title ?? ''} required className={inputClass} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-sm font-medium">Description</span>
        <textarea name="description" defaultValue={bio?.description ?? ''} required rows={12} className={inputClass} />
      </label>
      <div className="flex items-center gap-3">
        <button type="submit" className={buttonClass.primary} disabled={pending}>{pending ? 'Saving…' : 'Save'}</button>
        {saved && <span className="text-sm text-fg-muted">Saved</span>}
        <FormError error={error} />
      </div>
    </form>
  )
}

export default BioEditor
