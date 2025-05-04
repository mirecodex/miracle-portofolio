'use client'

import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'

interface NeomorphicBoxProps {
  children: ReactNode;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  interactive?: boolean;
  hoverEffect?: boolean;
}

export default function NeomorphicBox({
  children,
  className = '',
  intensity = 'medium',
  interactive = true,
  hoverEffect = true,
}: NeomorphicBoxProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  
  const intensityMap = {
    low: {
      shadow: 'shadow-sm',
      insetShadow: 'shadow-inner-sm',
      glow: 'opacity-10',
    },
    medium: {
      shadow: 'shadow-md',
      insetShadow: 'shadow-inner',
      glow: 'opacity-20',
    },
    high: {
      shadow: 'shadow-lg',
      insetShadow: 'shadow-inner-lg',
      glow: 'opacity-30',
    },
  }
  
  const currentIntensity = intensityMap[intensity]
  
  return (
    <motion.div
      className={`relative rounded-2xl bg-gradient-to-br from-dark-800 to-dark-900 ${className}`}
      onHoverStart={() => interactive && setIsHovered(true)}
      onHoverEnd={() => interactive && setIsHovered(false)}
      onTapStart={() => interactive && setIsPressed(true)}
      onTap={() => interactive && setIsPressed(false)}
      onTapCancel={() => interactive && setIsPressed(false)}
      animate={{
        scale: isPressed ? 0.98 : 1,
        boxShadow: isPressed 
          ? 'inset 3px 3px 10px rgba(0, 0, 0, 0.3), inset -3px -3px 10px rgba(255, 255, 255, 0.05)'
          : '5px 5px 15px rgba(0, 0, 0, 0.3), -5px -5px 15px rgba(255, 255, 255, 0.05)'
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
    >
      {/* Border glow effect */}
      {hoverEffect && (
        <motion.div 
          className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-primary-500 to-primary-700 -z-10"
          animate={{ 
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
          style={{ filter: 'blur(8px)' }}
        />
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}
