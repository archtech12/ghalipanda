'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label="Toggle Dark Mode"
    >
      {theme === 'light' ? (
       <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">dark_mode</span>
      ) : (
        <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">light_mode</span>
      )}
    </button>
  )
}
