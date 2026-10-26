'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/constituency', label: 'Constituency' },
  { href: '/projects', label: 'Projects' },
  { href: '/legislative', label: 'Legislative' },
  { href: '/news', label: 'News' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-green-800 text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="shrink-0 text-base font-bold tracking-tight sm:text-lg">
          Hon. Dr. Ghali Panda
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-4 lg:flex xl:gap-5">
          {links.map(({ href, label }) => (
            <Link key={href} href={href} className="text-sm font-medium text-green-50 transition hover:text-white">
              {label}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/volunteer" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-green-900 transition hover:bg-green-100">
            Get involved
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-md px-3 py-2 text-sm font-semibold hover:bg-white/10 lg:hidden"
          onClick={() => setIsMenuOpen(open => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? 'Close' : 'Menu'}
        </button>
      </div>

      {isMenuOpen && (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="border-t border-white/10 bg-green-900 px-4 py-2 lg:hidden">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className="block rounded-md px-3 py-2.5 text-sm font-medium text-green-50 hover:bg-white/10"
            >
              {label}
            </Link>
          ))}
          <div className="flex items-center justify-between gap-3 px-3 py-3">
            <ThemeToggle />
            <Link href="/volunteer" onClick={() => setIsMenuOpen(false)} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-green-900">
              Get involved
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
