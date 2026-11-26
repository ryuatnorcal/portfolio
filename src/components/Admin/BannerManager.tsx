'use client'
import { useRef, useState, useTransition } from "react"
import { deleteBanner, moveBanner, uploadBanner } from "@/app/(dashboard)/admin/banner/actions"
import { ActionResult } from "@/app/(dashboard)/admin/actions"
import { buttonClass, FormError } from "./ui"

type BannerImage = { key: string, url: string }

// Same limit as the banner and the image route; larger is never shown.
const MAX_SIDE = 2048

// Shrinks a photo in the browser before upload, so phone photos fit in the
// request size limit. Falls back to JPEG where the browser can't make WebP.
const resizeImage = (file: File): Promise<Blob> => new Promise((resolve, reject) => {
  const url = URL.createObjectURL(file)
  const img = new Image()
  img.onload = () => {
    URL.revokeObjectURL(url)
    const scale = Math.min(1, MAX_SIDE / Math.max(img.naturalWidth, img.naturalHeight))
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(img.naturalWidth * scale)
    canvas.height = Math.round(img.naturalHeight * scale)
    canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
    canvas.toBlob((webp) => {
      if (webp?.type === 'image/webp') return resolve(webp)
      canvas.toBlob((jpeg) => jpeg ? resolve(jpeg) : reject(new Error('Could not encode image')), 'image/jpeg', 0.85)
    }, 'image/webp', 0.85)
  }
  img.onerror = () => {
    URL.revokeObjectURL(url)
    reject(new Error(`Could not read ${file.name}`))
  }
  img.src = url
})

const BannerManager = ({ images }: { images: BannerImage[] }) => {
  const [error, setError] = useState<string | null>(null)
  const [progress, setProgress] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const fileInput = useRef<HTMLInputElement>(null)

  const act = (action: () => Promise<ActionResult>) => {
    setError(null)
    startTransition(async () => {
      const result = await action()
      if (!result.ok) setError(result.error)
    })
  }

  const upload = (files: FileList) => {
    setError(null)
    startTransition(async () => {
      const list = [...files]
      for (const [i, file] of list.entries()) {
        setProgress(`Uploading ${i + 1} of ${list.length}…`)
        try {
          const blob = await resizeImage(file)
          const data = new FormData()
          data.append('file', blob, file.name)
          data.append('name', file.name)
          const result = await uploadBanner(data)
          if (!result.ok) {
            setError(`${file.name}: ${result.error}`)
            break
          }
        } catch (e) {
          setError(e instanceof Error ? e.message : `Could not upload ${file.name}`)
          break
        }
      }
      setProgress(null)
      if (fileInput.current) fileInput.current.value = ''
    })
  }

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <label className={`${buttonClass.primary} cursor-pointer ${pending ? 'pointer-events-none opacity-50' : ''}`}>
          Upload images
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="sr-only"
            disabled={pending}
            onChange={(e) => e.target.files?.length && upload(e.target.files)}
          />
        </label>
        <span className="text-sm text-fg-muted">{progress ?? 'Photos are resized to 2048px before upload.'}</span>
      </div>
      <FormError error={error} />

      {images.length === 0 && <p className="rounded-md border border-dashed border-border p-6 text-sm text-fg-muted">No banner images yet.</p>}
      <ol className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {images.map((image, index) => (
          <li key={image.key} className="overflow-hidden rounded-md border border-border bg-surface">
            {/* eslint-disable-next-line @next/next/no-img-element -- already resized by the image route */}
            <img src={image.url} alt="" className="aspect-video w-full object-cover" loading="lazy" />
            <div className="flex items-center gap-2 p-3">
              <span className="mr-auto font-mono text-xs text-fg-muted">#{index + 1}</span>
              <button type="button" className={buttonClass.icon} aria-label="Move earlier" disabled={pending || index === 0} onClick={() => act(() => moveBanner(image.key, -1))}>←</button>
              <button type="button" className={buttonClass.icon} aria-label="Move later" disabled={pending || index === images.length - 1} onClick={() => act(() => moveBanner(image.key, 1))}>→</button>
              <button
                type="button"
                className={buttonClass.danger}
                disabled={pending}
                onClick={() => { if (confirm('Delete this image from the banner and the bucket?')) act(() => deleteBanner(image.key)) }}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default BannerManager
