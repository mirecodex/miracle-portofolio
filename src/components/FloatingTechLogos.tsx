'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

// Define tech logos with proper colors
const techLogos = [
  { name: 'React', symbol: '⚛️', color: '#61DAFB' },
  { name: 'Next.js', symbol: '▲', color: '#ffffff' },
  { name: 'TypeScript', symbol: 'TS', color: '#3178C6' },
  { name: 'JavaScript', symbol: 'JS', color: '#F7DF1E' },
  { name: 'Python', symbol: '🐍', color: '#3776AB' },
  { name: 'Node.js', symbol: 'Node', color: '#339933' },
  { name: 'GraphQL', symbol: '◯', color: '#E10098' },
  { name: 'MongoDB', symbol: 'DB', color: '#47A248' },
  { name: 'Docker', symbol: '🐳', color: '#2496ED' },
  { name: 'Git', symbol: 'Git', color: '#F05032' },
  { name: 'CSS', symbol: 'CSS', color: '#1572B6' },
  { name: 'HTML', symbol: 'HTML', color: '#E34F26' },
  { name: 'AWS', symbol: 'AWS', color: '#FF9900' },
  { name: 'Firebase', symbol: '🔥', color: '#FFCA28' },
]

interface FloatingLogo {
  id: number
  name: string
  symbol: string
  color: string
  x: number
  y: number
  size: number
  rotation: number
  speed: { x: number, y: number }
  opacity: number
}

export default function FloatingTechLogos() {
  const [logos, setLogos] = useState<FloatingLogo[]>([])
  const animationRef = useRef<number>()
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  useEffect(() => {
    // Generate random logos
    const generateLogos = () => {
      if (!containerRef.current) return []
      
      // Increase number of logos for better coverage across pages
      const containerWidth = window.innerWidth
      const containerHeight = document.documentElement.scrollHeight // Use entire document height
      const logoCount = Math.min(30, Math.floor((containerWidth * containerHeight) / 40000))
      
      return Array.from({ length: logoCount }).map((_, i) => {
        const randomLogo = techLogos[Math.floor(Math.random() * techLogos.length)]
        return {
          id: i,
          name: randomLogo.name,
          symbol: randomLogo.symbol,
          color: randomLogo.color,
          x: Math.random() * containerWidth,
          y: Math.random() * containerHeight, // Distribute across full document height
          size: Math.random() * 30 + 20, // 20-50px
          rotation: Math.random() * 360,
          speed: { 
            x: (Math.random() - 0.5) * 0.5, 
            y: (Math.random() - 0.5) * 0.5 
          },
          opacity: Math.random() * 0.2 + 0.05 // 0.05-0.25 opacity
        }
      })
    }
    
    // Initialize logos
    if (containerRef.current) {
      setLogos(generateLogos())
    }
    
    // Handle resize
    const handleResize = () => {
      if (containerRef.current) {
        setLogos(generateLogos())
      }
    }
    
    // Also update on scroll to ensure logos appear on newly visible areas
    const handleScroll = () => {
      if (containerRef.current) {
        const currentHeight = document.documentElement.scrollHeight
        if (currentHeight > containerRef.current.clientHeight) {
          containerRef.current.style.height = `${currentHeight}px`
        }
      }
    }
    
    // Animation loop
    const animate = () => {
      setLogos(prevLogos => {
        if (!containerRef.current) return prevLogos
        
        const containerWidth = containerRef.current.clientWidth
        const containerHeight = containerRef.current.clientHeight
        
        return prevLogos.map(logo => {
          // Update position based on speed
          let newX = logo.x + logo.speed.x
          let newY = logo.y + logo.speed.y
          let newSpeedX = logo.speed.x
          let newSpeedY = logo.speed.y
          
          // Bounce off edges
          if (newX <= 0 || newX >= containerWidth - logo.size) {
            newSpeedX = -logo.speed.x
            newX = Math.max(0, Math.min(newX, containerWidth - logo.size))
          }
          
          if (newY <= 0 || newY >= containerHeight - logo.size) {
            newSpeedY = -logo.speed.y
            newY = Math.max(0, Math.min(newY, containerHeight - logo.size))
          }
          
          return {
            ...logo,
            x: newX,
            y: newY,
            speed: { x: newSpeedX, y: newSpeedY }
          }
        })
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate)
    
    // Add resize listener
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 -z-10 overflow-hidden pointer-events-none"
    >
      {logos.map(logo => (
        <motion.div
          key={logo.id}
          className="absolute rounded-xl backdrop-blur-md"
          style={{
            left: logo.x,
            top: logo.y,
            width: logo.size,
            height: logo.size,
            opacity: logo.opacity,
            backgroundColor: isDark ? 'rgba(15, 23, 42, 0.3)' : 'rgba(255, 255, 255, 0.3)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(15, 23, 42, 0.05)'}`,
            color: logo.color,
            fontSize: logo.size * 0.4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            transform: `rotate(${logo.rotation}deg)`,
            boxShadow: isDark 
              ? '0 4px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)' 
              : '0 4px 30px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
            overflow: 'hidden'
          }}
          animate={{
            rotate: [logo.rotation, logo.rotation + 360],
          }}
          transition={{
            rotate: {
              duration: 40 + Math.random() * 40,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          {/* Add glassmorphic effect with inner shadow and reflection */}
          <div 
            className="absolute inset-0 opacity-20 bg-gradient-to-br from-white via-transparent to-transparent"
            style={{ mixBlendMode: isDark ? 'overlay' : 'overlay' }}
          />
          
          {/* Logo content */}
          <span className="z-10">{logo.symbol}</span>
        </motion.div>
      ))}
    </div>
  )
}
