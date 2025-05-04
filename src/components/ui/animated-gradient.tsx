'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface AnimatedGradientProps {
  className?: string
  colors?: string[]
  direction?: 'horizontal' | 'vertical' | 'diagonal'
  speed?: 'slow' | 'medium' | 'fast'
  children?: React.ReactNode
}

export function AnimatedGradient({
  className = '',
  colors = ['#3b82f6', '#60a5fa', '#3b82f6'],
  direction = 'horizontal',
  speed = 'medium',
  children
}: AnimatedGradientProps) {
  // Generate the gradient background style
  const getGradientDirection = () => {
    switch (direction) {
      case 'horizontal': return 'to right'
      case 'vertical': return 'to bottom'
      case 'diagonal': return '135deg'
      default: return 'to right'
    }
  }
  
  // Calculate animation duration based on speed
  const getDuration = () => {
    switch (speed) {
      case 'slow': return 7
      case 'medium': return 4
      case 'fast': return 2
      default: return 4
    }
  }
  
  // Calculate background size for infinite animation
  const getBackgroundSize = () => {
    return direction === 'vertical' ? '100% 400%' : '400% 100%'
  }
  
  return (
    <motion.div 
      className={`relative overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        background: `linear-gradient(${getGradientDirection()}, ${colors.join(', ')})`,
        backgroundSize: getBackgroundSize(),
      }}
      animate={{
        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
      }}
      transition={{
        duration: getDuration(),
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {children}
    </motion.div>
  )
}
