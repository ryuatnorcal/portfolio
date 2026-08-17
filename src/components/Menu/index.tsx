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
      <nav className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-border bg-[color-mix(in_oklch,var(--bg)_82%,transparent)] px-8 py-4 backdrop-blur-[10px]">
        <Link href={{ pathname: '/', query: { selectedLocale: locale } }} className="font-display text-xl font-bold tracking-tight text-fg no-underline hover:no-underline">
          Ryu
        </Link>
        <div className="hidden lg:flex items-center gap-1.5">
          <Link href={{ pathname: '/', query: {selectedLocale:locale}}} className={navClass(pathname === '/')}>Home</Link>
          <Link href={{ pathname: '/about', query: {selectedLocale:locale}}} className={navClass(pathname === '/about')}>About</Link>
          <Link href={{ pathname: '/contact', query: { selectedLocale: locale } }} className={navClass(pathname==='/contact')}>Contact</Link>
          <button className={navClass(false)} onClick={handleLocale}>{locale !== 'en' ? 'English' : '日本語'}</button>
          <button
            type="button"
            onClick={toggleTheme}
            className="ml-2 inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1.5 font-mono text-[11px] tracking-wide text-fg-muted"
          >
            {themeLabel}
          </button>
        </div>
        <div onClick={handleMenu} className="lg:hidden">
          {open ?
            <Image src={close} alt="close" className="menu-icon cursor-pointer" />
            : <Image src={menu} alt="menu" className="menu-icon cursor-pointer" />
          }
        </div>
      </nav>
      <div className={`lg:hidden fixed h-[92vh] w-[250px] top-[73px] right-[-250px] bg-surface border-l border-border z-20 ${open ? 'slideIn': 'slideOut'}`}>
        <Link onClick={handleMenu} href={{ pathname: '/', query: {selectedLocale:locale}}} className={`inline-block px-4 py-2 w-full no-underline ${pathname === '/'? 'bg-accent text-accent-fg' : 'text-fg-muted hover:bg-surface-2'}`}>Home</Link>
        <Link onClick={handleMenu} href={{ pathname: '/about', query: {selectedLocale:locale}}} className={`inline-block px-4 py-2 w-full no-underline ${pathname === '/about'? 'bg-accent text-accent-fg':'text-fg-muted hover:bg-surface-2'}`}>About</Link>
        <Link onClick={handleMenu} href={{ pathname: '/contact', query: { selectedLocale: locale } }} className={`inline-block px-4 py-2 w-full no-underline ${pathname==='/contact'? 'bg-accent text-accent-fg':'text-fg-muted hover:bg-surface-2'}`}>Contact</Link>
        <button className="inline-block w-full text-fg-muted hover:bg-surface-2 px-4 py-2 text-left" onClick={handleLocale}>{locale !== 'en' ? 'English' : '日本語'}</button>
        <button type="button" className="mx-4 mt-3 inline-flex items-center gap-2 rounded-pill border border-border bg-surface px-3 py-1.5 font-mono text-[11px] tracking-wide text-fg-muted" onClick={toggleTheme}>{themeLabel}</button>
      </div>
    </div>
  )
}
export default Menu
