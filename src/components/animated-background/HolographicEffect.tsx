'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'

export default function HolographicEffect() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { width, height } = container.getBoundingClientRect()
      
      // Calculate angle based on mouse position
      const x = (clientX / width) - 0.5
      const y = (clientY / height) - 0.5
      
      // Update CSS variables
      container.style.setProperty('--mouse-x', x.toString())
      container.style.setProperty('--mouse-y', y.toString())
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
      style={{
        '--mouse-x': '0',
        '--mouse-y': '0',
      } as React.CSSProperties}
    >
      {/* Holographic film effect overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: isDark 
            ? 'linear-gradient(to right, rgba(59, 130, 246, 0.03), rgba(37, 99, 235, 0.05))'
            : 'linear-gradient(to right, rgba(59, 130, 246, 0.02), rgba(37, 99, 235, 0.03))',
          opacity: 0.5,
          mixBlendMode: isDark ? 'screen' : 'overlay',
        }}
      />
      
      {/* Moving light reflections */}
      <motion.div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'linear-gradient(120deg, transparent 10%, rgba(255, 255, 255, 0.1) 20%, transparent 30%)',
          backgroundSize: '200% 200%',
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          repeatType: 'mirror',
        }}
      />
      
      {/* Interactive light spot that follows cursor */}
      <div 
        className="absolute w-full h-full"
        style={{
          background: `radial-gradient(
            circle 700px at 
            calc(50% + calc(var(--mouse-x) * 800px)) 
            calc(50% + calc(var(--mouse-y) * 800px)), 
            ${isDark ? 'rgba(59, 130, 246, 0.05)' : 'rgba(59, 130, 246, 0.03)'}, 
            transparent
          )`,
        }}
      />
    </div>
  )
}
