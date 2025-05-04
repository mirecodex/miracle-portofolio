'use client'

import { ReactNode, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right'
}

export default function ParallaxSection({
  children,
  speed = 0.5,
  className = '',
  direction = 'up'
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  // Calculate transform based on direction
  const getDirectionalTransform = () => {
    const offset = 100 * speed
    
    switch (direction) {
      case 'up': 
        return useTransform(scrollYProgress, [0, 1], ['0%', `-${offset}%`])
      case 'down':
        return useTransform(scrollYProgress, [0, 1], ['0%', `${offset}%`])
      case 'left':
        return useTransform(scrollYProgress, [0, 1], ['0%', `-${offset}%`])
      case 'right':
        return useTransform(scrollYProgress, [0, 1], ['0%', `${offset}%`])
      default:
        return useTransform(scrollYProgress, [0, 1], ['0%', `-${offset}%`])
    }
  }
  
  const y = direction === 'up' || direction === 'down' 
    ? getDirectionalTransform() 
    : undefined
  
  const x = direction === 'left' || direction === 'right'
    ? getDirectionalTransform()
    : undefined

  return (
    <div ref={ref} className={`${className} overflow-hidden`}>
      <motion.div style={{ y, x }}>
        {children}
      </motion.div>
    </div>
  )
}
