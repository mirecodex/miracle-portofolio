'use client'

import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassmorphicCardProps {
  children: ReactNode
  className?: string
  hoverEffect?: boolean
  glowColor?: string
  borderColor?: string
  backgroundOpacity?: number
}

export default function GlassmorphicCard({
  children,
  className = '',
  hoverEffect = true,
  glowColor = 'rgba(249, 115, 22, 0.4)',
  borderColor = 'rgba(249, 115, 22, 0.3)',
  backgroundOpacity = 0.05,
}: GlassmorphicCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={cn(
        'relative rounded-xl overflow-hidden backdrop-blur-md border transition-all duration-300',
        className
      )}
      style={{
        backgroundColor: `rgba(17, 24, 39, ${backgroundOpacity})`,
        borderColor: isHovered && hoverEffect ? borderColor : 'rgba(255, 255, 255, 0.1)',
        boxShadow: isHovered && hoverEffect 
          ? `0 10px 30px -15px ${glowColor}, 0 0 30px -15px ${glowColor}`
          : '0 8px 32px rgba(0, 0, 0, 0.2)',
      }}
      onHoverStart={() => hoverEffect && setIsHovered(true)}
      onHoverEnd={() => hoverEffect && setIsHovered(false)}
      whileHover={hoverEffect ? { y: -5 } : {}}
    >
      {/* Glass reflection effect */}
      <div 
        className="absolute inset-0 opacity-10 bg-gradient-to-br from-white via-transparent to-transparent pointer-events-none"
        style={{
          opacity: isHovered && hoverEffect ? 0.15 : 0.05,
        }}
      />

      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
