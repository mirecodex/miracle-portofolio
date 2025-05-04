'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface ShimmerTextProps {
  text: string;
  className?: string;
}

export default function ShimmerText({ text, className = '' }: ShimmerTextProps) {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <span className={className}>{text}</span>
  }
  
  return (
    <div className={`relative ${className}`}>
      {/* Base text */}
      <span className={`relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-primary-600`}>
        {text}
      </span>
      
      {/* Shimmer effect */}
      <motion.span
        className="absolute inset-0 bg-clip-text text-transparent"
        style={{
          backgroundImage: 'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
        }}
        animate={{
          backgroundPosition: ['200% 0', '-200% 0']
        }}
        transition={{
          duration: 5,
          ease: 'linear',
          repeat: Infinity
        }}
      >
        {text}
      </motion.span>
    </div>
  )
}
