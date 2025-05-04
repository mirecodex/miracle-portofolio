'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function MorphingBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* First blob */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-1/2 h-1/2 bg-gradient-to-br from-primary-500/10 to-primary-700/5 rounded-full blur-3xl"
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
      
      {/* Second blob */}
      <motion.div
        className="absolute top-1/2 -right-1/4 w-1/2 h-1/2 bg-gradient-to-tl from-primary-700/10 to-primary-500/5 rounded-full blur-3xl"
        animate={{
          x: [0, -70, 70, 0],
          y: [0, 50, -50, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
      
      {/* Third blob */}
      <motion.div
        className="absolute -bottom-1/4 left-1/3 w-1/3 h-1/3 bg-gradient-to-tr from-primary-600/10 to-primary-800/5 rounded-full blur-3xl"
        animate={{
          x: [-50, 50, -20, -50],
          y: [20, -20, 50, 20],
          scale: [1.1, 0.9, 1, 1.1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut'
        }}
      />
    </div>
  )
}
