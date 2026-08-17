'use client'
import Image from "next/image"
import { useTheme } from "@/hooks/useTheme"
import linkedin from '../../../public/icons/icons8-linkedin.svg'
import linkedinWhite from '../../../public/icons/icons8-linkedin-white.svg'

const Footer = () => {
  const { theme } = useTheme()
  return (
    <footer className="bg-surface px-8 py-10 text-fg-muted">
      <div className="mx-auto flex max-w-[74rem] flex-wrap items-center justify-between gap-4">
        <a href={process.env.LINKEDIN_LINK} target='_blank' className="p-2 hover:no-underline">
          <Image src={theme === "dark" ? linkedinWhite : linkedin} alt="linkedin" width={24} height={24} />
        </a>
        <div className="font-mono text-xs text-fg-muted sm:text-right">
          <div>© {new Date().getFullYear()}. All rights reserved.</div>
          <div>Site icons by <a target="_blank" href="https://icons8.com">Icons8</a></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
