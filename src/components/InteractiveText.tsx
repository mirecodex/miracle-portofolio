'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'

interface InteractiveTextProps {
  text: string
  className?: string
  letterSpacing?: string
}

export default function InteractiveText({ 
  text, 
  className = '',
  letterSpacing = 'normal'
}: InteractiveTextProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  return (
    <span className={`inline-block ${className}`} style={{ letterSpacing }}>
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block relative cursor-pointer transform-gpu"
          initial={{ opacity: 0, y: 20, rotateY: 90 }}
          animate={{ opacity: 1, y: 0, rotateY: 0 }}
          transition={{ 
            delay: 0.05 * index, 
            duration: 0.5,
            type: "spring",
            damping: 12
          }}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          whileHover={{ 
            y: -5,
            scale: 1.2,
            transition: { duration: 0.2 }
          }}
        >
          {char === ' ' ? '\u00A0' : char}
          
          <AnimatePresence>
            {hoveredIndex === index && (
              <motion.div
                className={`absolute -bottom-1 left-0 w-full h-0.5 rounded-full ${
                  isDark ? 'bg-primary-400' : 'bg-primary-500'
                }`}
                layoutId="charUnderline"
                initial={{ opacity: 0, width: '0%' }}
                animate={{ opacity: 1, width: '100%' }}
                exit={{ opacity: 0, width: '0%' }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>
        </motion.span>
      ))}
    </span>
  )
}
