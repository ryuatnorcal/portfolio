'use client'

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale } from "@/hooks/useLocale"
import logo from '../../../public/icons/barcode.gif'
const Menu = () => {
  const { locale, setLocale } = useLocale()
  const pathname = usePathname()
  console.log(pathname)

  const handleLocale = () => {
    if (locale === 'en') {
      setLocale('jp')
    } else {
      setLocale('en')
    }
  }

  return (
    <nav className="flex justify-between items-center pt-3 pb-3 fixed w-full bg-white">
      <div className="flex items-center ml-5">
          <Image src={logo} alt="logo" />
      </div>
      <div className="flex items-center">
        <Link href={{ pathname: '/', query: {selectedLocale:locale}}} className={`inline-block px-4 mr-4 py-2 rounded-md ${pathname === '/'? 'text-white bg-black' : 'text-black bg-white hover:text-white hover:bg-black'} transition-colors duration-300`}>Home</Link>
        <Link href={{ pathname: '/about', query: {selectedLocale:locale}}} className={`inline-block mr-4 px-4 rounded-md py-2 ${pathname === '/about'? 'text-white bg-black':'text-black bg-white hover:text-white hover:bg-black'} transition-colors duration-300`}>About</Link>
        <Link href={{ pathname: '/contact', query: { selectedLocale: locale } }} className={`inline-block mr-4 rounded-md px-4 py-2 ${pathname==='/contact'? 'text-white bg-black':'text-black bg-white hover:text-white hover:bg-black'} transition-colors duration-300`}>Contact</Link>
        <button className="inline-block px-4 py-2 rounded-md text-black bg-white hover:text-white hover:bg-black transition-colors duration-300" onClick={handleLocale}>{locale !== 'en' ? 'English' : '日本語'}</button>
      </div>
    </nav>
  )
}
export default Menu