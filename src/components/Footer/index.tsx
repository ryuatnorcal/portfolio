'use client'
import Image from "next/image"
import linkedinWhite from '../../../public/icons/icons8-linkedin-white.svg'

const Footer = () => {
  return (
    <footer className="bg-black px-8 py-10 text-white">
      <div className="mx-auto flex max-w-[74rem] flex-wrap items-center justify-between gap-4">
        <a href={process.env.LINKEDIN_LINK} target='_blank' className="p-2 hover:no-underline">
          <Image src={linkedinWhite} alt="linkedin" width={24} height={24} />
        </a>
        <div className="font-mono text-xs text-white sm:text-right">
          <div>© {new Date().getFullYear()}. All rights reserved.</div>
          <div>Site icons by <a target="_blank" href="https://icons8.com" className="text-white underline">Icons8</a></div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
