'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface AugmentedTextProps {
  text: string;
  className?: string;
  hoverEffect?: boolean;
  revealOnView?: boolean;
}

export default function AugmentedText({
  text,
  className = '',
  hoverEffect = true,
  revealOnView = false
}: AugmentedTextProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(!revealOnView)
  
  useEffect(() => {
    if (revealOnView) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.disconnect()
          }
        },
        { threshold: 0.5 }
      )
      
      const element = document.documentElement
      if (element) {
        observer.observe(element)
      }
      
      return () => observer.disconnect()
    }
  }, [revealOnView])
  
  // Split text into characters
  const characters = text.split('')
  
  return (
    <motion.span
      className={`inline-block ${className}`}
      onMouseEnter={() => hoverEffect && setIsHovered(true)}
      onMouseLeave={() => hoverEffect && setIsHovered(false)}
      aria-label={text}
    >
      {characters.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block relative"
          initial={{ opacity: 0, y: 10 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{
            delay: i * 0.03 + 0.1,
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1]
          }}
        >
          {/* Main character */}
          <span className={`relative z-10 ${isHovered ? 'text-primary-400' : ''}`}>
            {char === ' ' ? '\u00A0' : char}
          </span>
          
          {/* Effect overlay */}
          {isHovered && char !== ' ' && (
            <>
              <motion.span
                className="absolute top-1 left-0 text-primary-500 opacity-50 blur-[1px]"
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 0.5, y: 0 }}
              >
                {char}
              </motion.span>
              <motion.span
                className="absolute -bottom-0.5 left-0 text-primary-600 opacity-30 blur-[1px]"
                initial={{ opacity: 0, y: 2 }}
                animate={{ opacity: 0.3, y: 0 }}
              >
                {char}
              </motion.span>
            </>
          )}
        </motion.span>
      ))}
    </motion.span>
  )
}
