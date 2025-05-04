'use client'

import { ReactNode, useState } from 'react'
import { motion } from 'framer-motion'

interface RotatingIconProps {
  icon: ReactNode;
  hoverIcon?: ReactNode;
  className?: string;
}

export default function RotatingIcon({ 
  icon, 
  hoverIcon,
  className = '' 
}: RotatingIconProps) {
  const [isHovered, setIsHovered] = useState(false)
  
  return (
    <motion.div
      className={`relative cursor-pointer ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        rotateY: isHovered ? 180 : 0
      }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 15
      }}
    >
      <div className={`absolute inset-0 flex items-center justify-center ${isHovered ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
        {icon}
      </div>
      
      <div 
        className={`absolute inset-0 flex items-center justify-center ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity transform rotate-y-180`} 
        style={{ transform: 'rotateY(180deg)' }}
      >
        {hoverIcon || icon}
      </div>
    </motion.div>
  )
}
