'use client'
import Image from "next/image"
import close from '../../../public/icons/icons8-close.svg'
const Modal = ({ showModal, setIsModalOpen, data }) => {
  const {title, year, img, description, url} = data
  return showModal && (
    <div className="fixed inset-0 z-10 h-full w-full overflow-y-auto bg-black/30 backdrop-blur">
      <div className="flex min-h-screen min-w-full items-center justify-center">
        <div className="relative h-full rounded-lg border border-border bg-surface p-5 tracking-wide md:w-2/3 xl:w-1/3">
          <Image
            src={close}
            alt="close"
            width={50}
            height={50}
            className="menu-icon absolute right-5 top-5 cursor-pointer"
            onClick={() => setIsModalOpen(!showModal)}
          />
          <h2 className="font-display text-3xl font-semibold text-fg">{ title }</h2>
          <p className="font-mono text-xs text-fg-muted">{ year }</p>
          <Image src={`/screenshot/${img}`} alt="screenshot" className="mt-5 w-full" width={ 700 } height={400} />
          <p className="mb-5 mt-5 leading-relaxed text-fg-muted">{ description }</p>
          <a href={ url } target="_blank" className="mt-5 rounded-md bg-accent px-4 py-2 font-semibold text-accent-fg no-underline hover:no-underline">See Live Demo</a>
        </div>
      </div>
    </div>
  )
}

export default Modal
