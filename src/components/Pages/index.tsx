
type PageProps = {
  sectionName: string,
  children: React.ReactNode
}
const Page = ({ sectionName, children }: PageProps) => {
  return (
    <section className={`${sectionName} flex w-full item-center justify-center`}>
      {children}
    </section>
  )
}

export default Page