'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function AnimatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [linkHovered, setLinkHovered] = useState(false)
  
  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const handleClick = () => {
      setClicked(true)
      setTimeout(() => setClicked(false), 300)
    }

    const handleLinkHover = () => {
      setLinkHovered(true)
    }

    const handleLinkUnhover = () => {
      setLinkHovered(false)
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mousedown', handleClick)
    
    const interactiveElements = document.querySelectorAll(
      'a, button, [role="button"], input, textarea, select, [tabindex]:not([tabindex="-1"])'
    )
    
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleLinkHover)
      el.addEventListener('mouseleave', handleLinkUnhover)
    })

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mousedown', handleClick)
      
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleLinkHover)
        el.removeEventListener('mouseleave', handleLinkUnhover)
      })
    }
  }, [])

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-primary-500 z-50 pointer-events-none mix-blend-difference hidden md:block"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: clicked ? 0.8 : linkHovered ? 1.5 : 1
        }}
        transition={{
          type: 'spring',
          damping: 15,
          mass: 0.1,
          stiffness: 150
        }}
      />
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary-500 z-50 pointer-events-none hidden md:block"
        animate={{
          x: position.x - 4,
          y: position.y - 4
        }}
        transition={{
          type: 'spring',
          damping: 20,
          mass: 0.1,
          stiffness: 300
        }}
      />
    </>
  )
}
