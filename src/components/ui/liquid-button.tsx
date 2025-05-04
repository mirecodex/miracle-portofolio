'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface LiquidButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LiquidButton({ 
  children, 
  href, 
  onClick, 
  variant = 'primary',
  size = 'md',
  className = ''
}: LiquidButtonProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isHovered, setIsHovered] = useState(false)
  
  // Define button styles based on variant and size
  const baseStyle = "relative overflow-hidden rounded-full font-medium transition-all flex items-center justify-center"
  
  const variantStyles = {
    primary: isDark 
      ? "bg-gradient-to-r from-primary-600 to-primary-500 text-white" 
      : "bg-gradient-to-r from-primary-600 to-primary-500 text-white",
    secondary: isDark 
      ? "bg-dark-800/70 backdrop-blur-md text-white border border-dark-700/50" 
      : "bg-light-200/70 backdrop-blur-md text-dark-900 border border-light-300/50",
    outline: isDark
      ? "bg-transparent text-primary-400 border-2 border-primary-500/50"
      : "bg-transparent text-primary-600 border-2 border-primary-500/50"
  }
  
  const sizeStyles = {
    sm: "text-sm px-4 py-2 gap-1",
    md: "text-base px-6 py-2.5 gap-2",
    lg: "text-lg px-8 py-3 gap-2"
  }
  
  const buttonStyle = `${baseStyle} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`
  
  const Component = href ? motion.a : motion.button
  const props = href ? { href } : { type: 'button', onClick }
  
  return (
    <div className="relative">
      {/* Animated background blobs for liquid effect */}
      {variant === 'primary' && (
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 rounded-full bg-primary-400 blur-md"
            animate={{
              scale: isHovered ? [1, 1.05, 1] : 1,
              opacity: isHovered ? 0.6 : 0
            }}
            transition={{ duration: 1, repeat: isHovered ? Infinity : 0, repeatType: 'reverse' }}
          />
        </div>
      )}
      
      <Component
        {...props}
        className={buttonStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
      >
        {/* Interactive liquid bubble effect on hover */}
        <span className="relative z-10">
          {children}
        </span>
        
        {variant === 'primary' && (
          <>
            {/* Animated liquid bubbles */}
            {[...Array(5)].map((_, i) => (
              <motion.span
                key={i}
                className="absolute rounded-full bg-white"
                initial={{ 
                  x: "100%", 
                  y: "100%", 
                  scale: 0,
                  opacity: 0 
                }}
                animate={isHovered ? {
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  scale: [0, Math.random() * 0.5 + 0.5, 0],
                  opacity: [0, 0.3, 0]
                } : {}}
                transition={{
                  duration: Math.random() + 0.5,
                  delay: i * 0.1,
                  repeat: isHovered ? Infinity : 0,
                  repeatDelay: Math.random()
                }}
                style={{
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                }}
              />
            ))}
          </>
        )}
      </Component>
    </div>
  )
}
