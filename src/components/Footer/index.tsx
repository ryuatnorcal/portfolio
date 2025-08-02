import Image from "next/image"
import linkedin from '../../../public/icons/icons8-linkedin-white.svg'
import upwork from '../../../public/icons/icons8-upwork-white.svg'
const Footer = () => {
  return (
    <footer className="text-center p-10 bg-black text-white grid grid-cols-1 sm:grid-cols-2">
      <div className="flex justify-center sm:justify-start">
        <a href={process.env.LINKEDIN_LINK} target='_blank' className="p-2">
          <Image src={linkedin} alt="linkedin" width={50} height={50} />
        </a>
        {/* <a href={process.env.UPWORK_LINK} target='_blank' className="p-2">
          <Image src={upwork} alt="linkedin" width={50} height={50} />
        </a> */}
      </div>
      <div className="flex items-center sm:justify-end grid grid-cols-1 sm:text-right text-sm tracking-wider">
        <span>© 2025. All rights reserved.</span>
        <span>Site icons by <a target="_blank" href="https://icons8.com">Icons8</a></span>
      </div>
    </footer>
  )
}

export default Footer