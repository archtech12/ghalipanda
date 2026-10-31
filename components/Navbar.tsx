'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ThemeToggle } from './ThemeToggle'

const desktopLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/constituency', label: 'Constituency' },
  { href: '/projects', label: 'Projects' },
  { href: '/legislative', label: 'Legislative' },
  { href: '/news', label: 'News' },
]

const mobileLinks = [
  { href: '/', label: 'Home', icon: 'fa-house' },
  { href: '/about', label: 'About', icon: 'fa-user' },
  { href: '/constituency', label: 'Constituency', icon: 'fa-map-location-dot' },
  { href: '/projects', label: 'Projects', icon: 'fa-briefcase' },
  { href: '/legislative', label: 'Legislative', icon: 'fa-gavel' },
  { href: '/news', label: 'News', icon: 'fa-newspaper' },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const closeMenu = () => setIsMenuOpen(false)

  // Close the drawer whenever the route changes.
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname?.startsWith(href))

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap bg-green-700 px-4 py-3 text-white shadow-lg sm:px-6 md:px-8 lg:px-10">
      <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-3" onClick={closeMenu}>
        <div className="size-7 flex-shrink-0 text-white sm:size-8">
          <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"></path>
          </svg>
        </div>
        <span className="truncate text-base font-black tracking-tight text-white sm:text-lg">Hon. Dr. Ghali Panda</span>
      </Link>

      {/* Desktop Navigation */}
      <nav aria-label="Main navigation" className="hidden items-center gap-4 lg:flex xl:gap-5">
        {desktopLinks.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            aria-current={isActive(href) ? 'page' : undefined}
            className="group relative text-sm font-medium text-white transition-colors hover:text-green-200"
          >
            {label}
            <span
              className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${
                isActive(href) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}
            ></span>
          </Link>
        ))}
        <Link
          href="/sticker-generator"
          className="rounded-lg border border-white/15 bg-green-800/70 px-3 py-2 text-sm font-bold text-white transition-all hover:bg-green-900"
        >
          Create Sticker
        </Link>
        <Link
          href="/volunteer"
          className="flex items-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-green-700 shadow-md transition-all hover:bg-green-50 hover:shadow-lg active:scale-95"
        >
          <i className="fa-solid fa-hand-holding-heart text-lg"></i>
          <span>Join Us</span>
        </Link>
        <ThemeToggle />
      </nav>

      {/* Mobile Menu Button */}
      <button
        type="button"
        className="touch-manipulation rounded-lg p-1 text-white transition-colors hover:bg-white/10 focus:outline-none lg:hidden"
        onClick={() => setIsMenuOpen(open => !open)}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-navigation"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
      >
        <i className={`fa-solid ${isMenuOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
      </button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div
          id="mobile-navigation"
          className="animate-fade-in-up absolute left-0 top-full z-50 w-full origin-top border-t border-white/10 bg-green-900/95 shadow-2xl backdrop-blur-xl lg:hidden"
        >
          <nav aria-label="Mobile navigation" className="flex max-h-[calc(100vh-4rem)] flex-col overflow-y-auto py-2">
            {mobileLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMenu}
                aria-current={isActive(href) ? 'page' : undefined}
                className={`flex items-center gap-3 border-l-4 px-5 py-3.5 text-base font-medium text-white transition-colors hover:border-white hover:bg-white/10 active:bg-white/20 ${
                  isActive(href) ? 'border-white bg-white/10' : 'border-transparent'
                }`}
              >
                <i className={`fa-solid ${icon} w-6 text-center text-xl`}></i>
                <span>{label}</span>
              </Link>
            ))}
            <div className="px-4 py-2">
              <Link
                href="/sticker-generator"
                onClick={closeMenu}
                className="mb-2 flex w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-white/30 px-5 py-3.5 text-base font-bold text-white transition-colors hover:bg-white/10"
              >
                <i className="fa-solid fa-palette text-xl"></i>
                <span>Create Sticker</span>
              </Link>
              <Link
                href="/volunteer"
                onClick={closeMenu}
                className="flex w-full touch-manipulation items-center justify-center gap-2 rounded-xl bg-white px-5 py-3.5 text-base font-bold text-green-700 shadow-lg transition-all hover:bg-green-50 active:scale-95 active:bg-green-100"
              >
                <i className="fa-solid fa-hand-holding-heart text-xl"></i>
                <span>Join Us</span>
              </Link>
            </div>
            <div className="flex items-center gap-3 px-5 py-3.5 text-white">
              <span className="text-base font-medium">Theme</span>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
