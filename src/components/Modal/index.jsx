'use client'
import Image from "next/image"
import {useState} from "react"
import close from '../../../public/icons/icons8-close.svg'
import screenshot from '../../../public/screenshot/weatherPage.png'
const Modal = ({ showModal=true }) => {
  const [isOpen, setIsOpen] = useState(true)
  return isOpen && (
    <div className="fixed h-full w-full z-10 inset-0 overflow-y-auto backdrop-blur bg-black/30">
      <div className="flex items-center justify-center min-h-screen min-w-full">
        <div className="bg-white rounded-lg h-full lg:w-2/3 tracking-wider p-5 relative">
          <Image
            src={close}
            alt="close"
            width={50}
            height={50}
            className="absolute right-5 top-5 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
          />
          <h2 className="underline text-3xl font-bold">Project name</h2>
          <p>2024.05</p>
          <Image src={screenshot} alt="screenshot" className="w-full mt-5" />
          <p className="mt-5 mb-5">I made the weather dashbaord using weather API (https://www.weatherapi.com).The site will retrive current location or searched location's current weather and forcast for 5 day(if it still free trial left otherwise 3days).</p>
          <a href="https://seahorse-app-al36d.ondigitalocean.app/" target="_blank" className="bg-black text-white px-4 py-2 rounded mt-5">See Live Demo</a>
        </div>
      </div>
    </div>
  )
}

export default Modal