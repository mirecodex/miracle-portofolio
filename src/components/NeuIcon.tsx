'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface NeuIconProps {
  icon: React.ReactNode;
  title?: string;
  onClick?: () => void;
  className?: string;
  isActive?: boolean;
}

export default function NeuIcon({ icon, title, onClick, className, isActive = false }: NeuIconProps) {
  const [isHovered, setIsHovered] = React.useState(false)
  
  const buttonVariants = {
    initial: { 
      scale: 1,
      boxShadow: '3px 3px 6px rgba(0, 0, 0, 0.2), -3px -3px 6px rgba(255, 255, 255, 0.05)'
    },
    hover: { 
      scale: 0.92,
      boxShadow: 'inset 3px 3px 6px rgba(0, 0, 0, 0.2), inset -3px -3px 6px rgba(255, 255, 255, 0.05)'
    }
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      variants={buttonVariants}
      initial="initial"
      animate={isHovered || isActive ? "hover" : "initial"}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className={`flex items-center justify-center relative z-0 w-14 h-14 rounded-full bg-dark-800 ${
        isActive ? 'text-primary-500' : 'text-gray-400'
      } transition-colors ${className}`}
      title={title}
    >
      <span className={`text-2xl ${isActive ? 'scale-110' : ''} transition-transform`}>
        {icon}
      </span>
      {isActive && (
        <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-medium text-primary-500">
          {title}
        </span>
      )}
    </motion.button>
  )
}
