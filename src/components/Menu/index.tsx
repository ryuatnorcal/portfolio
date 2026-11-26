'use client'
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale } from "@/hooks/useLocale"
import { useEffect, useRef, useState } from "react"
import logo from '../../../public/icons/barcode.gif'
import menu from '../../../public/icons/icons8-menu.svg'
import close from '../../../public/icons/icons8-close.svg'
import './styles.css'

// Element the nav stays light over; once scrolled past it the nav inverts.
const BANNER_ID = 'hero-banner'

const Menu = () => {
  const { locale, setLocale } = useLocale()
  const [open, setOpen] = useState<boolean>(false)
  const [inverted, setInverted] = useState<boolean>(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  // Invert once the banner's bottom edge has scrolled up under the nav, and
  // go back to normal when scrolling up into the banner again. Pages without
  // a banner keep the normal colours.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const banner = document.getElementById(BANNER_ID)
      const navHeight = navRef.current?.offsetHeight ?? 0
      setInverted(!!banner && banner.getBoundingClientRect().bottom <= navHeight)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }

    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    // the banner mounts after content loads, so re-check when the DOM changes
    const observer = new MutationObserver(schedule)
    observer.observe(document.body, { childList: true, subtree: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      observer.disconnect()
    }
  }, [pathname])

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

  // Colours for a nav item; `active` is the current page.
  const itemColors = (active = false) => {
    if (inverted) return active ? 'text-black bg-white' : 'text-white bg-black hover:text-black hover:bg-white'
    return active ? 'text-white bg-black' : 'text-black bg-white hover:text-white hover:bg-black'
  }
  const surface = inverted ? 'bg-black' : 'bg-white'
  // logo and icons are black artwork: invert them on the dark nav
  const iconFilter = `transition-[filter] duration-300 ${inverted ? 'invert' : ''}`

  return (
    <div className='w-screen overflow-hidden'>
      <nav ref={navRef} className={`flex w-screen overflow-x-hidden justify-between items-center pt-3 pb-3 px-10 fixed w-full z-50 transition-colors duration-300 ${surface}`}>
        <div className="flex items-center">
            <Image src={logo} alt="logo" className={iconFilter} />
        </div>
        {/* desktop menu */}
        <div className="hidden lg:flex items-center">
          <Link href={{ pathname: '/', query: {selectedLocale:locale}}} className={`inline-block px-4 mr-4 py-2 rounded-md ${itemColors(pathname === '/')} transition-colors duration-300`}>Home</Link>
          <Link href={{ pathname: '/about', query: {selectedLocale:locale}}} className={`inline-block mr-4 px-4 rounded-md py-2 ${itemColors(pathname === '/about')} transition-colors duration-300`}>About</Link>
          <Link href={{ pathname: '/contact', query: { selectedLocale: locale } }} className={`inline-block mr-4 rounded-md px-4 py-2 ${itemColors(pathname === '/contact')} transition-colors duration-300`}>Contact</Link>
          <button className={`inline-block px-4 py-2 rounded-md ${itemColors()} transition-colors duration-300`} onClick={handleLocale}>{locale !== 'en' ? 'English' : '日本語'}</button>
        </div>
        <div onClick={handleMenu} className="lg:hidden">
          {open ?
            <Image src={close} alt="close" className={`cursor-pointer ${iconFilter}`} />
            : <Image src={menu} alt="menu" className={`cursor-pointer ${iconFilter}`} />
          }
        </div>
      </nav>
      {/* Mobile menu below */}
      <div className={`lg:hidden fixed h-[92vh] w-[250px] top-[74px] right-[-250px] z-50 transition-colors duration-300 ${surface} ${open ? 'slideIn': 'slideOut'}`}>
        <Link onClick={handleMenu} href={{ pathname: '/', query: {selectedLocale:locale}}} className={`inline-block px-4 py-2 w-full ${itemColors(pathname === '/')} transition-colors duration-300`}>Home</Link>
        <Link onClick={handleMenu} href={{ pathname: '/about', query: {selectedLocale:locale}}} className={`inline-block px-4 py-2 w-full ${itemColors(pathname === '/about')} transition-colors duration-300`}>About</Link>
        <Link onClick={handleMenu} href={{ pathname: '/contact', query: { selectedLocale: locale } }} className={`inline-block px-4 py-2 w-full ${itemColors(pathname === '/contact')} transition-colors duration-300`}>Contact</Link>
        <button className={`inline-block w-full ${itemColors()} transition-colors duration-300  px-4 py-2 text-left`} onClick={handleLocale}>{locale !== 'en' ? 'English' : '日本語'}</button>
      </div>
    </div>
  )
}
export default Menu
