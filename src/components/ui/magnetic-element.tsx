'use client'

import { useState, useRef, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface MagneticElementProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticElement({ 
  children, 
  className = '', 
  strength = 15
}: MagneticElementProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const { clientX, clientY } = e
    const { left, top, width, height } = ref.current.getBoundingClientRect()
    
    const x = clientX - (left + width / 2)
    const y = clientY - (top + height / 2)
    
    // Apply non-linear transformation for more natural movement
    const magneticX = (x / width) * strength
    const magneticY = (y / height) * strength
    
    setPosition({ x: magneticX, y: magneticY })
  }
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }
  
  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", damping: 10, stiffness: 150, mass: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
