'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export default function NeuralBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Neural nodes */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 bg-primary-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: 'blur(1px)'
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
              delay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Neural connections */}
      <svg className="absolute inset-0 w-full h-full z-0">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(249, 115, 22, 0.3)" />
            <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
          </linearGradient>
        </defs>
        {Array.from({ length: 10 }).map((_, i) => (
          <motion.path
            key={i}
            d={`M${Math.random() * 100},${Math.random() * 100} Q${Math.random() * 100},${Math.random() * 100} ${Math.random() * 100},${Math.random() * 100}`}
            stroke="url(#connectionGradient)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0],
              opacity: [0, 0.5, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: Math.random() * 5,
              repeatDelay: Math.random() * 5
            }}
          />
        ))}
      </svg>
      
      {/* Ambient blurs */}
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
    </div>
  )
}
