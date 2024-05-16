'use client'

import Image from "next/image"
import { useLocale } from "@/hooks/useLocale"
import logo from '../../../public/icons/barcode.gif'
const Menu = () => {
  const { locale, setLocale } = useLocale()

  const handleLocale = () => {
    if (locale === 'en') {
      setLocale('jp')
    } else {
      setLocale('en')
    }
  }

  return (
    <nav className="flex justify-between items-center mt-3">
      <div className="flex items-center ml-5">
          <Image src={logo} alt="logo" />
      </div>
      <div className="flex items-center">
        <a href='/' className="inline-block px-4 mr-4 py-2 rounded-md text-black bg-white hover:text-white hover:bg-black transition-colors duration-300">Home</a>
        <a href='/about' className="inline-block mr-4 px-4 rounded-md py-2 text-black bg-white hover:text-white hover:bg-black transition-colors duration-300">About</a>
        <a href='/contact' className="inline-block mr-4 rounded-md px-4 py-2 text-black bg-white hover:text-white hover:bg-black transition-colors duration-300">Contact</a>
        <button className="inline-block px-4 py-2 rounded-md text-black bg-white hover:text-white hover:bg-black transition-colors duration-300" onClick={handleLocale}>{locale !== 'en' ? 'English' : '日本語'}</button>
      </div>
    </nav>
  )
}
export default Menu