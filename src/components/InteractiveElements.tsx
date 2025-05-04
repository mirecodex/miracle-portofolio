'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useTheme } from 'next-themes'

// Mouse-following glow effect
export function MouseGlowEffect() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  const smoothX = useSpring(mouseX, { damping: 50, stiffness: 400 })
  const smoothY = useSpring(mouseY, { damping: 50, stiffness: 400 })
  
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])
  
  return (
    <motion.div
      className="fixed pointer-events-none z-0 opacity-70"
      style={{
        left: smoothX,
        top: smoothY,
        width: 300,
        height: 300,
        borderRadius: '50%',
        translateX: '-50%',
        translateY: '-50%',
        background: isDark 
          ? 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(37, 99, 235, 0) 70%)' 
          : 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(37, 99, 235, 0) 70%)',
      }}
    />
  )
}

// Floating particles that follow mouse with delay
export function FloatingParticles() {
  const particleCount = 5
  const particles = Array.from({ length: particleCount }).map((_, i) => i)
  
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [mouseX, mouseY])
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {particles.map((p, i) => {
        const delay = i * 0.05
        
        const x = useTransform(mouseX, v => v)
        const y = useTransform(mouseY, v => v)
        
        const springConfig = { damping: 30 - i * 2, stiffness: 200 - i * 15 }
        const springX = useSpring(x, springConfig)
        const springY = useSpring(y, springConfig)
        
        return (
          <motion.div
            key={p}
            className="w-1.5 h-1.5 rounded-full bg-primary-500 absolute"
            style={{
              left: springX,
              top: springY,
              translateX: '-50%',
              translateY: '-50%',
              opacity: 0.3 - (i * 0.05)
            }}
          />
        )
      })}
    </div>
  )
}

// Wavy background section divider
export function WavyDivider({ className = '', inverted = false }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  return (
    <div className={`absolute ${inverted ? 'bottom-0 rotate-180' : 'top-0'} left-0 w-full overflow-hidden leading-0 z-10 pointer-events-none ${className}`}>
      <svg
        className="relative block w-full h-[50px] md:h-[70px]"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
          className={isDark ? 'fill-dark-800' : 'fill-light-200'}
        ></path>
      </svg>
    </div>
  )
}

export default { MouseGlowEffect, FloatingParticles, WavyDivider }
