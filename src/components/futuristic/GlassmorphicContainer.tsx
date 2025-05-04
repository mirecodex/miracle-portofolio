'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlassmorphicContainerProps {
  children: ReactNode;
  className?: string;
  blur?: string;
  borderOpacity?: number;
  backgroundOpacity?: number;
  hoverEffect?: boolean;
}

export default function GlassmorphicContainer({
  children,
  className = '',
  blur = 'backdrop-blur-md',
  borderOpacity = 0.1,
  backgroundOpacity = 0.1,
  hoverEffect = true,
}: GlassmorphicContainerProps) {
  const borderStyle = {
    '--tw-border-opacity': borderOpacity,
  } as React.CSSProperties
  
  const backgroundStyle = {
    '--tw-bg-opacity': backgroundOpacity,
  } as React.CSSProperties
  
  return (
    <motion.div
      className={cn(
        "rounded-xl overflow-hidden border border-white/[var(--tw-border-opacity)] bg-white/[var(--tw-bg-opacity)]",
        blur,
        hoverEffect && "transition-all duration-500 ease-out",
        className
      )}
      style={{
        ...borderStyle,
        ...backgroundStyle,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)'
      }}
      whileHover={hoverEffect ? {
        boxShadow: '0 8px 32px 0 rgba(249, 115, 22, 0.3)',
        borderColor: 'rgba(249, 115, 22, 0.3)',
      } : {}}
    >
      {/* Ambient reflection */}
      <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-white/20 via-transparent to-primary-500/10 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
