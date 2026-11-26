'use client'
import Image from "next/image"
import Window from "../Window"
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
          <Image src={`/screenshot/${img}`} alt="screenshot" className="mt-5 w-full border-2 border-fg" width={ 700 } height={400} />
          <p className="mb-6 mt-5 leading-relaxed text-fg-muted">{ description }</p>
          <a href={ url } target="_blank" rel="noreferrer" className="win-btn px-4 py-2">See Live Demo</a>
        </Window>
      </div>
    </div>
  )
}

export default Modal
