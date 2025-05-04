'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  duration?: number;
}

export default function RevealSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.5
}: RevealSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 }
  }
  
  const initialDirection = directionMap[direction]
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0,
        ...initialDirection
      }}
      animate={
        inView ? { 
          opacity: 1,
          y: 0,
          x: 0
        } : { 
          opacity: 0,
          ...initialDirection
        }
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1] // cubic-bezier easing
      }}
    >
      {children}
    </motion.div>
  )
}
