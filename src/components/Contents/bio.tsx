
import Image from "next/image"
import me from "../../../public/icons/me.jpg"
export const Bio = () => {
  return (
    <div className="flex flex-col justify-start w-10/12 md:w-8/12 pt-5p pb-10p">
      <div className="grid grid-cols-1 xl:grid-cols-2 text-xl items-center flex flex-wrap tracking-wider">
        <div className="col-span-1 p-5 flex justify-center">
          <Image src={me} alt="me" className="rounded-full" width={450} height={450}/>
        </div>
        <div className="col-span-1 p-5">
          <p className="text-3xl font-bold underline">Ryutaro Matsuda</p>
          <p className="font-semibold mb-5">FullStack Developer</p>
          <p>My name is Ryutaro Matsuda. I am a full-stack developer who works internationally originating from Japan. I earned my Bachelor of Science in computer science at California State University, East Bay in 2015. Since graduating, I have developed various projects; such as Web,  Mobile, and API development. Since the tech industry is moving fast, I like to keep up my technical stack at the latest as much as possible by taking courses. </p>
        </div>
      </div>
    </div>

  )
}
