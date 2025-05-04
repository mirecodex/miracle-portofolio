'use client'

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'

interface AugmentedTextProps {
  text: string
  className?: string
  color?: string
  glitchIntensity?: number
  scanEffect?: boolean
  delay?: number
}

export default function AugmentedText({
  text,
  className = '',
  color = '#f97316',
  glitchIntensity = 0.02,
  scanEffect = true,
  delay = 0
}: AugmentedTextProps) {
  const [hovered, setHovered] = useState(false)
  const [visibleText, setVisibleText] = useState(text)
  const controls = useAnimation()
  
  // Initialize reveal animation
  useEffect(() => {
    const revealText = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: {
          delay,
          staggerChildren: 0.03,
          delayChildren: delay
        }
      })
    }
    
    revealText()
  }, [controls, delay])
  
  // Random glitch effect
  useEffect(() => {
    let glitchInterval: NodeJS.Timeout
    
    if (hovered) {
      glitchInterval = setInterval(() => {
        if (Math.random() < glitchIntensity) {
          const glitchedChars = text.split('').map((char, i) => {
            if (char === ' ' || Math.random() > 0.1) return char
            const glitchChars = '_=/\\*&%$#@!><?'
            return glitchChars[Math.floor(Math.random() * glitchChars.length)]
          })
          
          setVisibleText(glitchedChars.join(''))
          
          // Reset to original text after a short delay
          setTimeout(() => setVisibleText(text), 100)
        }
      }, 200)
    }
    
    return () => {
      clearInterval(glitchInterval)
      setVisibleText(text)
    }
  }, [hovered, text, glitchIntensity])

  return (
    <motion.span
      className={`inline-block relative ${className}`}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={controls}
      initial={{ opacity: 0 }}
    >
      {/* Main text */}
      <motion.span className={`relative inline-block z-10 ${hovered ? 'text-white' : ''}`}>
        {visibleText}
      </motion.span>
      
      {/* Scanner effect */}
      {hovered && scanEffect && (
        <motion.span
          className="absolute inset-0 overflow-hidden"
          initial={{ scaleY: 0 }}
          animate={{
            scaleY: 1,
            opacity: [0, 0.7, 0],
            top: ['0%', '100%'],
          }}
          transition={{
            duration: 1,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop'
          }}
          style={{ 
            backgroundColor: color,
            mixBlendMode: 'overlay',
            height: '20%',
            transformOrigin: 'top'
          }}
        />
      )}
      
      {/* Highlight effect */}
      {hovered && (
        <motion.span
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          exit={{ opacity: 0 }}
          style={{ 
            backgroundColor: color,
            mixBlendMode: 'color-dodge',
            filter: 'blur(2px)'
          }}
        />
      )}
      
      {/* Subtle blue shadow when hovered */}
      {hovered && (
        <motion.span
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{ 
            color,
            textShadow: `0 0 5px ${color}, 0 0 10px ${color}`,
            transform: 'translate(-2px, 2px)'
          }}
        >
          {text}
        </motion.span>
      )}
    </motion.span>
  )
}
