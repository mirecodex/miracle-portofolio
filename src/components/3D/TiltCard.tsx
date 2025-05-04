'use client'

import { ReactNode, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
  maxTilt?: number;
}

export default function TiltCard({
  children,
  className = '',
  glareColor = 'rgba(255, 255, 255, 0.4)',
  maxTilt = 10
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })
  const [mouseOver, setMouseOver] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateXValue = (mouseY / (rect.height / 2)) * -maxTilt
    const rotateYValue = (mouseX / (rect.width / 2)) * maxTilt
    
    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
    setGlarePosition({ 
      x: (mouseX + rect.width / 2) / rect.width * 100,
      y: (mouseY + rect.height / 2) / rect.height * 100
    })
  }

  const handleMouseEnter = () => {
    setMouseOver(true)
  }

  const handleMouseLeave = () => {
    setMouseOver(false)
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
        transition: {
          type: 'spring',
          damping: 15,
          stiffness: 300
        }
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-inherit"
        style={{
          background: mouseOver 
            ? `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, ${glareColor} 0%, transparent 50%)` 
            : 'transparent',
          opacity: mouseOver ? 0.6 : 0,
          borderRadius: 'inherit',
          transition: 'opacity 0.3s'
        }}
      />
    </motion.div>
  )
}
