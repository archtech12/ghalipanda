import React from 'react'

interface FitTextProps {
  text: string
  maxFontSizeCqw: number
  optimalLength?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * FitText automatically scales down font size using cqw units if the text length
 * exceeds the optimal length. This guarantees long names fit inside their containers
 * deterministically without requiring DOM measurements (which avoids html-to-image bugs).
 */
export const FitText = ({ 
  text, 
  maxFontSizeCqw, 
  optimalLength = 15, 
  className = '', 
  style = {} 
}: FitTextProps) => {
  const safeText = text || ''
  let scaleFactor = 1
  
  if (safeText.length > optimalLength) {
    scaleFactor = optimalLength / safeText.length
    
    // Add a slight buff to the scale factor because characters aren't perfectly square
    // (e.g. 30 chars usually don't take exactly 2x the width of 15 chars)
    scaleFactor = scaleFactor * 1.2
    
    // Cap minimum scale to 45% of original to maintain readability
    scaleFactor = Math.max(0.45, scaleFactor)
    // Cap max scale to 1 (don't scale up)
    scaleFactor = Math.min(1, scaleFactor)
  }

  const fontSize = maxFontSizeCqw * scaleFactor

  return (
    <span 
      className={`break-words block ${className}`} 
      style={{ 
        ...style,
        fontSize: `${fontSize}cqw`,
        lineHeight: 1.1
      }}
    >
      {text}
    </span>
  )
}
