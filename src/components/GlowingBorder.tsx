'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface GlowingBorderProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  intensity?: 'low' | 'medium' | 'high';
  animated?: boolean;
}

export default function GlowingBorder({ 
  children,
  className,
  glowColor = 'from-primary-500 to-primary-700',
  intensity = 'medium',
  animated = true,
}: GlowingBorderProps) {
  
  const intensityMap = {
    low: 'opacity-20',
    medium: 'opacity-40',
    high: 'opacity-70'
  }
  
  const glowVariants = {
    initial: { backgroundPosition: '0% 50%' },
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }
  
  return (
    <div className={cn("relative rounded-lg p-px overflow-hidden", className)}>
      {/* Glow Border */}
      <motion.div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r rounded-lg",
          glowColor,
          intensityMap[intensity],
          "bg-[length:400%_100%]"
        )}
        variants={animated ? glowVariants : undefined}
        initial="initial"
        animate={animated ? "animate" : undefined}
      />
      
      {/* Content */}
      <div className="relative bg-dark-800 rounded-lg z-10">
        {children}
      </div>
    </div>
  )
}
