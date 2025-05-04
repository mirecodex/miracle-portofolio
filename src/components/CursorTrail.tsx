'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface Trail {
  x: number
  y: number
  id: number
}

export default function CursorTrail() {
  const [trails, setTrails] = useState<Trail[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      
      // Add new trail point
      setTrails(prev => [
        ...prev.slice(-20), // Keep only the last 20 points for performance
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ])
      
      // Clear timeout if it exists
      if (timeoutId) clearTimeout(timeoutId)
      
      // Set timeout to clear trails when mouse stops moving
      timeoutId = setTimeout(() => {
        setTrails([])
      }, 2000)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])
  
  // Calculate the base size and opacity for each trail dot
  const getSize = (index: number, total: number) => {
    return 12 * (1 - index / total) // Size decreases from newest to oldest
  }
  
  const getOpacity = (index: number, total: number) => {
    return 0.5 * (1 - index / total) // Opacity decreases from newest to oldest
  }
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main cursor dot */}
      <motion.div
        className={`fixed rounded-full ${isDark ? 'bg-primary-400' : 'bg-primary-500'}`}
        style={{
          width: 8,
          height: 8,
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
        }}
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: [1, 1.2, 1],
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 300,
          duration: 0.4,
        }}
      />
      
      {/* Trail dots */}
      {trails.map((trail, index) => (
        <motion.div
          key={trail.id}
          className={`fixed rounded-full ${isDark ? 'bg-primary-400' : 'bg-primary-500'}`}
          initial={{ 
            x: trail.x - getSize(index, trails.length) / 2, 
            y: trail.y - getSize(index, trails.length) / 2, 
            opacity: getOpacity(index, trails.length),
            scale: 1,
            width: getSize(index, trails.length),
            height: getSize(index, trails.length)
          }}
          animate={{ 
            opacity: 0,
            scale: 0.5,
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
          style={{
            width: getSize(index, trails.length),
            height: getSize(index, trails.length),
          }}
        />
      ))}
    </div>
  )
}
