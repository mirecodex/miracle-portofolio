'use client'

import { ReactNode, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface FloatingCardProps {
  children: ReactNode;
  className?: string;
  depth?: number;
  springStrength?: number;
}

export default function FloatingCard({
  children,
  className = '',
  depth = 20,
  springStrength = 100
}: FloatingCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const springConfig = { stiffness: springStrength, damping: 15 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)
  
  // Transform mouse movement into rotation
  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10])
  
  // Transform mouse movement into translation
  const translateX = useTransform(springX, [-0.5, 0.5], [-depth / 2, depth / 2])
  const translateY = useTransform(springY, [-0.5, 0.5], [-depth / 2, depth / 2])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5
    
    x.set(mouseX)
    y.set(mouseY)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <div 
      ref={ref}
      className={`relative perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1000px' }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Main card */}
        <motion.div 
          className="relative w-full h-full"
          style={{
            translateZ: depth,
            transformStyle: 'preserve-3d'
          }}
        >
          {children}
        </motion.div>
        
        {/* Shadow layer */}
        <motion.div
          className="absolute inset-0 -z-10 bg-black rounded-inherit shadow-2xl"
          style={{
            translateX,
            translateY,
            rotateX,
            rotateY,
            translateZ: -depth,
            filter: 'blur(20px)',
            opacity: 0.3,
          }}
        />
      </motion.div>
    </div>
  )
}
