'use client'

import { useState, useEffect } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 20 })
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      // Only show progress bar after scrolling a bit
      setIsVisible(window.scrollY > 100)
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <>
      {/* Progress bar at top of page */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary-500 origin-left z-50"
        style={{ scaleX, opacity: isVisible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
      />
      
      {/* Scroll position indicator */}
      <motion.div 
        className={`fixed bottom-24 right-6 w-12 h-12 rounded-full ${
          isDark ? 'bg-dark-800' : 'bg-light-200'
        } border ${
          isDark ? 'border-dark-700' : 'border-light-300'
        } shadow-lg flex items-center justify-center z-40`}
        style={{ opacity: isVisible ? 1 : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
      >
        <svg className="w-10 h-10" viewBox="0 0 48 48">
          <motion.circle
            className="stroke-primary-500"
            cx="24"
            cy="24"
            r="20"
            fill="none"
            strokeWidth="4"
            strokeDasharray="125.6"
            style={{
              strokeDashoffset: useSpring(
                useTransform(scrollYProgress, [0, 1], [125.6, 0]), 
                { stiffness: 100, damping: 20 }
              )
            }}
          />
          <motion.circle
            className={isDark ? "fill-primary-500" : "fill-primary-600"}
            cx="24"
            cy="24"
            r="4"
          />
        </svg>
      </motion.div>
    </>
  )
}
