'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

interface NeumorphCardProps {
  children: React.ReactNode
  className?: string
  depth?: 'low' | 'medium' | 'high'
  interactive?: boolean
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  color?: string
}

export function NeumorphCard({
  children,
  className = '',
  depth = 'medium',
  interactive = true,
  rounded = 'lg',
  color
}: NeumorphCardProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  // Border radius styles
  const roundedStyles = {
    sm: 'rounded-md',
    md: 'rounded-xl',
    lg: 'rounded-2xl',
    full: 'rounded-full'
  }
  
  // Shadow depth styles
  const shadowDepth = {
    low: isDark ? '6px 6px 12px #0c111b, -6px -6px 12px #161e33' : '6px 6px 12px #d1d5db, -6px -6px 12px #ffffff',
    medium: isDark ? '8px 8px 16px #0c111b, -8px -8px 16px #161e33' : '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff',
    high: isDark ? '12px 12px 24px #0c111b, -12px -12px 24px #161e33' : '12px 12px 24px #d1d5db, -12px -12px 24px #ffffff'
  }
  
  // Background color
  const bgColor = color || (isDark ? '#111827' : '#f9fafb')
  
  // Handle mouse movement for interactive effect
  const handleMouseMove = interactive ? (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / 20
    const y = (e.clientY - rect.top - rect.height / 2) / 20
    setPosition({ x, y })
  } : undefined
  
  return (
    <motion.div 
      className={cn(
        `relative p-0.5 ${roundedStyles[rounded]}`,
        className
      )}
      style={{
        background: bgColor,
        boxShadow: shadowDepth[depth]
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseMove={handleMouseMove}
      whileHover={interactive ? { 
        scale: 1.02,
        boxShadow: isDark 
          ? '15px 15px 30px #0c111b, -15px -15px 30px #161e33'
          : '15px 15px 30px #d1d5db, -15px -15px 30px #ffffff'
      } : {}}
      onMouseLeave={() => interactive && setPosition({ x: 0, y: 0 })}
      style={{
        transform: interactive ? `rotateX(${-position.y}deg) rotateY(${position.x}deg)` : undefined,
        transformStyle: 'preserve-3d'
      }}
    >
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.div>
  )
}
