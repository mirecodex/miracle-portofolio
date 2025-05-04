'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  intensity?: 'low' | 'medium' | 'high'
  interactive?: boolean
}

export function GlassCard({ 
  children, 
  className = '',
  glowColor = 'rgba(59, 130, 246, 0.5)',
  intensity = 'medium',
  interactive = true
}: GlassCardProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  // Set the intensity of the glass effect
  const glassOpacity = {
    low: isDark ? 0.05 : 0.1,
    medium: isDark ? 0.1 : 0.2,
    high: isDark ? 0.15 : 0.3,
  }[intensity]
  
  // Handle mouse movement for interactive effect
  const handleMouseMove = interactive ? (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setPosition({ x, y })
  } : undefined
  
  return (
    <motion.div 
      className={cn(
        "relative overflow-hidden rounded-2xl backdrop-blur-md",
        isDark 
          ? "bg-dark-800/30 border border-dark-700/50" 
          : "bg-light-200/40 border border-light-300/50",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => interactive && setPosition({ x: 0, y: 0 })}
    >
      {/* Glass effect with reflection */}
      <div 
        className="absolute inset-0 opacity-30" 
        style={{
          background: isDark 
            ? `linear-gradient(130deg, rgba(255, 255, 255, 0.05), transparent)`
            : `linear-gradient(130deg, rgba(255, 255, 255, 0.3), transparent)`,
        }}
      />
      
      {/* Interactive spotlight effect */}
      {interactive && (
        <div 
          className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle 100px at ${position.x}px ${position.y}px, ${glowColor}, transparent)`,
            opacity: position.x ? glassOpacity : 0,
          }}
        />
      )}
      
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
