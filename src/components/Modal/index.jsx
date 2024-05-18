'use client'
import Image from "next/image"
import close from '../../../public/icons/icons8-close.svg'
import screenshot from '../../../public/screenshot/weatherPage.png'
const Modal = ({ showModal, setIsModalOpen, data }) => {
  const {title, year, img, description, url} = data
  return showModal && (
    <div className="fixed h-full w-full z-10 inset-0 overflow-y-auto backdrop-blur bg-black/30">
      <div className="flex items-center justify-center min-h-screen min-w-full">
        <div className="bg-white rounded-lg h-full md:w-2/3 xl:w-1/3 tracking-wider p-5 relative">
          <Image
            src={close}
            alt="close"
            width={50}
            height={50}
            className="absolute right-5 top-5 cursor-pointer"
            onClick={() => setIsModalOpen(!showModal)}
          />
          <h2 className="underline text-3xl font-bold">{ title }</h2>
          <p>{ year }</p>
          <Image src={`/screenshot/${img}`} alt="screenshot" className="w-full mt-5" width={ 700 } height={400} />
          <p className="mt-5 mb-5">{ description }</p>
          <a href={ url } target="_blank" className="bg-black text-white px-4 py-2 rounded mt-5">See Live Demo</a>
        </div>
      </div>
    </div>
  )
}

export default Modal