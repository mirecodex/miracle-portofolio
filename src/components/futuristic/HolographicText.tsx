'use client'

import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface HolographicTextProps {
  text: string;
  className?: string;
  color?: string;
  holographicIntensity?: number;
  scanlineOpacity?: number;
  glitchIntensity?: number;
}

export default function HolographicText({
  text,
  className = '',
  color = 'primary-500',
  holographicIntensity = 0.3,
  scanlineOpacity = 0.1,
  glitchIntensity = 0.05
}: HolographicTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [glitchText, setGlitchText] = useState(text)
  
  // Measure container
  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      })
    }
    
    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [text])
  
  // Handle mouse movement for holographic effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      
      setOffset({ x, y })
    }
  }
  
  // Apply occasional glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      if (Math.random() < glitchIntensity) {
        // Create glitched version of text
        const glitched = text
          .split('')
          .map(char => Math.random() < 0.1 ? String.fromCharCode(Math.floor(Math.random() * 26) + 65) : char)
          .join('')
        
        setGlitchText(glitched)
        
        // Reset after a short delay
        setTimeout(() => {
          setGlitchText(text)
        }, 100)
      }
    }, 2000)
    
    return () => clearInterval(glitchInterval)
  }, [text, glitchIntensity])

  return (
    <motion.div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      {/* Base text */}
      <motion.span
        className={`relative block text-${color}`}
        animate={{
          textShadow: `
            ${offset.x * 10}px ${offset.y * 10}px 6px rgba(255, 126, 48, ${holographicIntensity}),
            ${-offset.x * 5}px ${-offset.y * 5}px 6px rgba(255, 255, 255, ${holographicIntensity * 0.7})
          `
        }}
      >
        {glitchText}
      </motion.span>
      
      {/* Holographic reflection */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            ${90 + offset.y * 40}deg,
            transparent,
            rgba(255, 126, 48, ${0.05 + Math.abs(offset.x) * 0.1}),
            transparent
          )`,
        }}
      />
      
      {/* Scanlines */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            rgba(255, 255, 255, ${scanlineOpacity}),
            rgba(255, 255, 255, ${scanlineOpacity}) 1px,
            transparent 1px,
            transparent 4px
          )`,
          mixBlendMode: 'overlay'
        }}
      />
    </motion.div>
  )
}
