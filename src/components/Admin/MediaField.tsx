'use client'
import { useState, useTransition } from "react"
import { listMediaFiles, MediaFile } from "@/app/(dashboard)/admin/media/actions"
import { buttonClass, FormError, inputClass } from "./ui"

// Text input for a popup image / video, with a "Choose from R2" browser for
// the files under R2_MEDIA_PREFIX. A URL can still be typed or pasted.
const MediaField = ({ name, defaultValue, required }: { name: string, defaultValue: string, required?: boolean }) => {
  const [value, setValue] = useState(defaultValue)
  const [open, setOpen] = useState(false)
  const [files, setFiles] = useState<MediaFile[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('')
  const [loading, startLoading] = useTransition()

  const load = () => startLoading(async () => {
    setError(null)
    const result = await listMediaFiles()
    if (result.ok) setFiles(result.files)
    else setError(result.error)
  })

  const toggle = () => {
    if (!open && !files) load()
    setOpen(!open)
  }

  const shown = (files || []).filter((f) => f.name.toLowerCase().includes(filter.trim().toLowerCase()))

  return (
    <>
      <div className="flex gap-2">
        <input name={name} type="text" value={value} onChange={(e) => setValue(e.target.value)} required={required} className={inputClass} />
        <button type="button" className={`${buttonClass.secondary} shrink-0`} onClick={toggle} aria-expanded={open}>
          {open ? 'Close' : 'Choose from R2'}
        </button>
      </div>

      {open && (
        <div className="mt-2 rounded-md border border-border bg-bg p-3">
          <div className="mb-3 flex gap-2">
            <input type="search" placeholder="Filter files" value={filter} onChange={(e) => setFilter(e.target.value)} className={inputClass} />
            <button type="button" className={`${buttonClass.secondary} shrink-0`} onClick={load} disabled={loading}>Refresh</button>
          </div>
          <FormError error={error} />
          {loading && <p className="text-sm text-fg-muted">Loading…</p>}
          {!loading && files && shown.length === 0 && <p className="text-sm text-fg-muted">No image or video files found.</p>}
          {!loading && shown.length > 0 && (
            <ul className="grid max-h-80 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3">
              {shown.map((file) => (
                <li key={file.key}>
                  <button
                    type="button"
                    title={file.name}
                    onClick={() => { setValue(file.url); setOpen(false) }}
                    className={`block w-full overflow-hidden rounded-md border text-left transition-colors hover:border-fg ${value === file.url ? 'border-fg' : 'border-border'}`}
                  >
                    <span className="flex aspect-video items-center justify-center bg-surface-2">
                      {file.video ? (
                        <span className="font-mono text-xs uppercase text-fg-muted">Video</span>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element -- preview through the signed-redirect route
                        <img src={file.url} alt="" loading="lazy" className="h-full w-full object-cover" />
                      )}
                    </span>
                    <span className="block truncate px-2 py-1 text-xs">{file.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  )
}

export default MediaField
