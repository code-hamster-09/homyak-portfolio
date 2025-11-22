import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const nav = [
  { name: "Проекты", href: "/admin/projects"},
  { name: "Сообщения", href: "/admin/messages"}
]

const AdminNavigation = () => {
  const activeLink = usePathname()
  return (
    <nav className='inline-flex gap-1 p-[3px] rounded-2xl bg-white/5 border border-white/10'>
      {nav.map((link) => {
        return (
          <Link className={`px-2 py-1 rounded-xl ${link.href === activeLink ? "bg-white/10" : "bg-tansparent opacity-50"}`} key={link.name} href={link.href}>{link.name}</Link>
        )
      })}
    </nav>
  )
}

export default AdminNavigation
