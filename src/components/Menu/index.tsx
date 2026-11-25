'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale } from "@/hooks/useLocale"
import { useTheme } from "@/hooks/useTheme"
import { useState } from "react"
import menu from '../../../public/icons/icons8-menu.svg'
import close from '../../../public/icons/icons8-close.svg'
import './styles.css'

const navClass = (active: boolean) =>
  `inline-block px-4 py-2 rounded-pill text-sm font-medium no-underline transition-colors duration-150 ${
    active
      ? "bg-accent text-accent-fg hover:no-underline"
      : "text-fg-muted hover:bg-surface-2 hover:no-underline"
  }`

const Menu = () => {
  const { locale, setLocale } = useLocale()
  const { theme, toggleTheme } = useTheme()
  const [open, setOpen] = useState<boolean>(false)
  const pathname = usePathname()

  const handleLocale = () => {
    if (locale === 'en') {
      setLocale('jp')
    } else {
      setLocale('en')
    }
    handleMenu()
  }

  const handleMenu = () => {
    setOpen(!open)
  }

  const themeLabel = theme === "dark" ? "● DARK" : "○ LIGHT"

  return (
    <div className='w-screen overflow-hidden'>
      <nav className="flex w-screen overflow-x-hidden justify-between items-center pt-3 pb-3 px-10 fixed w-full bg-white z-50">
        <div className="flex items-center">
            <Image src={logo} alt="logo" />
        </div>
        {/* desktop menu */}
        <div className="hidden lg:flex items-center">
          <Link href={{ pathname: '/', query: {selectedLocale:locale}}} className={`inline-block px-4 mr-4 py-2 rounded-md ${pathname === '/'? 'text-white bg-black' : 'text-black bg-white hover:text-white hover:bg-black'} transition-colors duration-300`}>Home</Link>
          <Link href={{ pathname: '/about', query: {selectedLocale:locale}}} className={`inline-block mr-4 px-4 rounded-md py-2 ${pathname === '/about'? 'text-white bg-black':'text-black bg-white hover:text-white hover:bg-black'} transition-colors duration-300`}>About</Link>
          <Link href={{ pathname: '/contact', query: { selectedLocale: locale } }} className={`inline-block mr-4 rounded-md px-4 py-2 ${pathname==='/contact'? 'text-white bg-black':'text-black bg-white hover:text-white hover:bg-black'} transition-colors duration-300`}>Contact</Link>
          <button className="inline-block px-4 py-2 rounded-md text-black bg-white hover:text-white hover:bg-black transition-colors duration-300" onClick={handleLocale}>{locale !== 'en' ? 'English' : '日本語'}</button>
        </div>
        <div onClick={handleMenu} className="lg:hidden">
          {open ?
            <Image src={close} alt="close" className="menu-icon cursor-pointer" />
            : <Image src={menu} alt="menu" className="menu-icon cursor-pointer" />
          }
        </div>
      </nav>
      {/* Mobile menu below */}
      <div className={`lg:hidden fixed h-[92vh] w-[250px] top-[74px] right-[-250px] bg-white ${open ? 'slideIn': 'slideOut'}`}>
        <Link onClick={handleMenu} href={{ pathname: '/', query: {selectedLocale:locale}}} className={`inline-block px-4 py-2 w-full ${pathname === '/'? 'text-white bg-black' : 'text-black bg-white hover:text-white hover:bg-black'} transition-colors duration-300`}>Home</Link>
        <Link onClick={handleMenu} href={{ pathname: '/about', query: {selectedLocale:locale}}} className={`inline-block px-4 py-2 w-full ${pathname === '/about'? 'text-white bg-black':'text-black bg-white hover:text-white hover:bg-black'} transition-colors duration-300`}>About</Link>
        <Link onClick={handleMenu} href={{ pathname: '/contact', query: { selectedLocale: locale } }} className={`inline-block px-4 py-2 w-full ${pathname==='/contact'? 'text-white bg-black':'text-black bg-white hover:text-white hover:bg-black'} transition-colors duration-300`}>Contact</Link>
        <button className="inline-block w-full text-black bg-white hover:text-white hover:bg-black transition-colors duration-300  px-4 py-2 text-left" onClick={handleLocale}>{locale !== 'en' ? 'English' : '日本語'}</button>
      </div>
    </div>
  )
}
export default Menu
