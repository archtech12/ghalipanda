'use client'

import { usePathname } from 'next/navigation'
import { SiteFooter } from '@/components/SiteFooter'

// Pages where the footer should be hidden (full-screen app-like pages)
const HIDDEN_FOOTER_PATHS = [
  '/supporter-card',
  '/sticker-generator',
]

export function FooterWrapper() {
  const pathname = usePathname()
  const shouldHide = HIDDEN_FOOTER_PATHS.some((path) => pathname?.includes(path))

  if (shouldHide) return null

  return <SiteFooter />
}
