
type PageProps = {
  sectionName: string,
  children: React.ReactNode
}
const Page = ({ sectionName, children }: PageProps) => {
  return (
    // id is the SideNav scroll target; scroll-mt keeps it clear of the fixed nav
    <section id={sectionName} className={`${sectionName} scroll-mt-[74px] flex w-full items-center justify-center border-b border-border last:border-b-0`}>
      {children}
    </section>
  )
}

export default Page
