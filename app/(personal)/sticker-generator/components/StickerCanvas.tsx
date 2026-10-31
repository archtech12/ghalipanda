'use client'

import { useRef, forwardRef, useState, useEffect } from 'react'
import { AspectRatio } from '../types'
import { Watermark } from './shared/Watermark'

interface StickerCanvasProps {
  children: React.ReactNode
  aspectRatio: AspectRatio
  className?: string
}

const RATIOS: Record<AspectRatio, number> = {
  square: 1 / 1,
  portrait: 4 / 5,
  story: 9 / 16,
}

export const StickerCanvas = forwardRef<HTMLDivElement, StickerCanvasProps>(
  ({ children, aspectRatio, className = '' }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const [scale, setScale] = useState(1)
    const ratio = RATIOS[aspectRatio]
    const targetWidth = 1080
    const targetHeight = Math.round(targetWidth / ratio)

    useEffect(() => {

      const updateScale = () => {
        if (containerRef.current) {
          const width = containerRef.current.clientWidth
          setScale(width / targetWidth)
        }
      }

      updateScale()
      
      // Listen to window resize
      window.addEventListener('resize', updateScale)
      
      // Setup a ResizeObserver for the container itself (handles tab swaps and column size shifts)
      let observer: ResizeObserver | null = null
      if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
        observer = new ResizeObserver(() => {
          updateScale()
        })
        if (containerRef.current) {
          observer.observe(containerRef.current)
        }
      }

      return () => {
        window.removeEventListener('resize', updateScale)
        if (observer) {
          observer.disconnect()
        }
      }
    }, [aspectRatio, targetWidth])

    return (
      <div
        ref={containerRef}
        className={`relative w-full overflow-hidden shadow-2xl rounded-sm bg-neutral-900 ${className}`}
        style={{ 
          aspectRatio: `${ratio}`,
          height: containerRef.current ? `${containerRef.current.clientWidth / ratio}px` : 'auto'
        }}
      >
        {/* Virtual fixed-resolution canvas, scaled down to fit */}
        <div
          ref={ref}
          className="absolute top-0 left-0 origin-top-left"
          data-sticker-root
          style={{
            width: `${targetWidth}px`,
            height: `${targetHeight}px`,
            transform: `scale(${scale})`,
            WebkitTransform: `scale(${scale})`,
          }}
        >
          {children}
          <Watermark />
        </div>
      </div>
    )
  }
)


StickerCanvas.displayName = 'StickerCanvas'

