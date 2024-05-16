import Modal from "../Modal";
export const Experience = () => {
  return (
    <div className="flex flex-col justify-start w-10/12 md:w-8/12 pb-10p">
      <h1 className="text-4xl font-bold tracking-md mb-5 underline">EXPERIENCES</h1>
      <div className="flex flex-wrap tracking-wider text-xl">
        <div className="w-full lg:w-1/2 xl:w-1/3 p-3 xl:p-5">
          <span className="underline font-semibold">FullStack Developer</span>
          <p>2021 - Present</p>
          <p>Telus</p>
          <p className="mt-3">
            I am a full-stack developer who works in Japan. I have developed various projects; such as Web,  Mobile, and API development.
          </p>
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/3 p-2 lg:p-5 lg:border-l  border-black">
          <span className="underline font-semibold">FullStack Developer</span>
          <p>Telus</p>
          <p>2021 - Present</p>
          <p className="mt-3">
            I am a full-stack developer who works in Japan. I have developed various projects; such as Web,  Mobile, and API development.
          </p>
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/3 p-2 xl:p-5 lg:p-5 xl:border-l  border-black">
          <span className="underline font-semibold">FullStack Developer</span>
          <p>Telus</p>
          <p>2021 - Present</p>
          <p className="mt-3">
            I am a full-stack developer who works in Japan. I have developed various projects; such as Web,  Mobile, and API development.
          </p>
        </div>
        <div className="w-full lg:w-1/2 xl:w-1/3 p-2 xl:p-5 lg:p-5 lg:border-l xl:border-none border-black">
          <span className="underline font-semibold">FullStack Developer</span>
          <p>Telus</p>
          <p>2021 - Present</p>
          <p className="mt-3">
            I am a full-stack developer who works in Japan. I have developed various projects; such as Web,  Mobile, and API development.
          </p>
        </div>
      </div>
      <Modal />
    </div>
  )
}