
type PageProps = {
  sectionName: string,
  children: React.ReactNode
}
const Page = ({ sectionName, children }: PageProps) => {
  return (
    <section className={`${sectionName} flex w-full items-center justify-center border-b border-border last:border-b-0`}>
      {children}
    </section>
  )
}

export default Page
