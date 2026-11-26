'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { adminSections } from "@/content/adminSections"

const AdminNav = () => {
  const pathname = usePathname()
  return (
    <nav aria-label="Dashboard" className="flex gap-1 overflow-x-auto px-2 pb-2 md:flex-col md:pb-0">
      {adminSections.map(({ href, label }) => {
        const active = pathname === href
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? 'page' : undefined}
            className={`whitespace-nowrap rounded-md px-3 py-2 text-sm no-underline hover:no-underline ${active ? 'bg-fg text-bg' : 'text-fg hover:bg-surface-2'}`}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}

export default AdminNav
