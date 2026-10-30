'use client'

import {useState} from 'react'
import Link from 'next/link'
import {ThemeToggle} from './ThemeToggle'

const links = [
  {href: '/', label: 'Home'},
  {href: '/about', label: 'About'},
  {href: '/constituency', label: 'Constituency'},
  {href: '/projects', label: 'Projects'},
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-green-800 px-4 py-3 text-white shadow-lg sm:px-6 lg:px-8">
      <Link href="/" className="flex min-w-0 items-center gap-2 font-black tracking-tight" onClick={closeMenu}>
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15 text-xs">GP</span>
        <span className="truncate text-sm sm:text-base">Hon. Dr. Ghali Panda</span>
      </Link>
      <nav className="hidden items-center gap-5 lg:flex" aria-label="Main navigation">
        {links.map((link) => <Link key={link.href} href={link.href} className="text-sm font-semibold text-white/90 transition hover:text-yellow-200">{link.label}</Link>)}
        <ThemeToggle />
      </nav>
      <button type="button" className="rounded-lg p-2 text-white hover:bg-white/10 lg:hidden" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
        <span className="material-symbols-outlined" aria-hidden="true">{isMenuOpen ? 'close' : 'menu'}</span>
      </button>
      {isMenuOpen && <nav className="absolute inset-x-0 top-full border-t border-white/10 bg-green-900 px-4 py-3 shadow-xl lg:hidden" aria-label="Mobile navigation">
        <div className="flex flex-col">
          {links.map((link) => <Link key={link.href} href={link.href} onClick={closeMenu} className="rounded-lg px-3 py-3 text-sm font-semibold hover:bg-white/10">{link.label}</Link>)}
          <div className="px-3 py-2"><ThemeToggle /></div>
        </div>
      </nav>}
    </header>
  )
}
