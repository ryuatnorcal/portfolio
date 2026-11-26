'use client'
import Window from "../Window"
import { resolveMedia } from "@/utils/media"

// The popup's image or video: any image URL, a video file URL, a Cloudflare
// Stream link, or (older entries) a file name in public/screenshot.
const ModalMedia = ({ value, title }) => {
  const media = resolveMedia(value)
  if (!media) return null
  const frame = "mt-5 w-full border-2 border-fg"
  if (media.kind === 'stream') {
    return (
      <div className={`${frame} relative aspect-video`}>
        <iframe
          src={media.src}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      </div>
    )
  }
  if (media.kind === 'video') {
    return <video src={media.src} className={frame} controls playsInline preload="metadata" />
  }
  // a plain <img>: the URL can be on any host, which next/image would need configured
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={media.src} alt={title || "screenshot"} className={frame} loading="lazy" />
}

const Modal = ({ showModal, setIsModalOpen, data }) => {
  const {title, year, img, description, url} = data
  return showModal && (
    <div className="fixed inset-0 z-[60] h-full w-full overflow-y-auto bg-black/40">
      <div className="flex min-h-screen min-w-full items-center justify-center p-4">
        <Window
          title={title}
          className="w-full tracking-wide md:w-2/3 xl:w-1/3"
          onClose={() => setIsModalOpen(false)}
        >
          <p className="font-mono text-xs text-fg-muted">{ year }</p>
          <ModalMedia value={img} title={title} />
          <p className="mb-6 mt-5 leading-relaxed text-fg-muted">{ description }</p>
          {url ? <a href={ url } target="_blank" rel="noreferrer" className="win-btn px-4 py-2">See Live Demo</a> : null}
        </Window>
      </div>
    </div>
  )
}

export default Modal
