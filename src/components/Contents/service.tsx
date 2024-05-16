
export const Service = () => {
  return (
    <div className="flex flex-col justify-start w-10/12 md:w-8/12 lg:w-6/12 pb-10p">
      <h1 className="text-4xl font-bold tracking-md mb-5 underline">SERVICES</h1>
      <div className="grid sm:grid-cols-2 text-xl items-center flex justify-end tracking-sm leading-relaxed">
        <div className="col-span-1 xs:pl-2 lg:pl-5">
          <p>+ Web Development</p>
          <p>+ Mobile Development</p>
          <p>+ API Development</p>
        </div>
        <div className="col-span-1 xs:pl-2 lg:pl-5">
          <p>+ Jest Testing</p>
          <p>+ CI/CD</p>
          <p>+ Consulting</p>
          <p>+ Scrum Master</p>
        </div>
      </div>
    </div>
  )
}