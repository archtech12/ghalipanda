'use client'

import { useState, useEffect } from 'react'

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled up to 300px
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  // Set the top scroll handling
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className={`fixed bottom-8 right-8 z-[9999] transition-all duration-300 transform ${
      isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'
    }`}>
      <button
        onClick={scrollToTop}
        className="group relative flex items-center justify-center w-14 h-14 bg-green-700 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 text-white rounded-2xl shadow-[0_10px_25px_-5px_rgba(22,163,74,0.4)] hover:shadow-[0_20px_35px_-5px_rgba(22,163,74,0.5)] active:scale-95 transition-all duration-300"
        aria-label="Back to Top"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-green-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        {/* Icon */}
        <span className="material-symbols-outlined text-3xl transform group-hover:-translate-y-1 transition-transform duration-300">
          arrow_upward
        </span>
      </button>
    </div>
  )
}
