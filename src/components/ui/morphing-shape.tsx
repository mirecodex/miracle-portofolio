'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

// Dynamic import for GSAP with error handling
let gsap: any = null

interface MorphingShapeProps {
  className?: string
  fill1?: string
  fill2?: string
}

export function MorphingShape({
  className = '',
  fill1,
  fill2,
}: MorphingShapeProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [gsapLoaded, setGsapLoaded] = useState(false)
  
  // Default colors based on theme
  const defaultFill1 = isDark ? 'rgba(37, 99, 235, 0.2)' : 'rgba(59, 130, 246, 0.1)'
  const defaultFill2 = isDark ? 'rgba(29, 78, 216, 0.1)' : 'rgba(37, 99, 235, 0.05)'
  
  // Load GSAP dynamically
  useEffect(() => {
    const loadGsap = async () => {
      try {
        gsap = (await import('gsap')).default
        setGsapLoaded(true)
      } catch (err) {
        console.warn('Failed to load GSAP. Install it with: npm install gsap')
      }
    }
    
    loadGsap()
  }, [])
  
  useEffect(() => {
    if (!gsapLoaded || !gsap) return
    
    const path = pathRef.current
    if (!path) return
    
    // Generate random points for the blob
    const generatePoints = () => {
      const points = []
      const segments = 10
      const radius = 100
      
      for (let i = 0; i < segments; i++) {
        const angle = (i / segments) * Math.PI * 2
        const variance = Math.random() * 30 - 15
        const x = Math.cos(angle) * (radius + variance)
        const y = Math.sin(angle) * (radius + variance)
        points.push({ x, y })
      }
      return points
    }
    
    // Generate path string from points
    const generatePathString = (points: Array<{x: number, y: number}>) => {
      let path = `M${points[0].x},${points[0].y}`
      
      for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1]
        const currPoint = points[i]
        const nextPoint = points[(i + 1) % points.length]
        
        const cpX1 = (prevPoint.x + currPoint.x) / 2
        const cpY1 = (prevPoint.y + currPoint.y) / 2
        const cpX2 = (currPoint.x + nextPoint.x) / 2
        const cpY2 = (currPoint.y + nextPoint.y) / 2
        
        path += ` S${currPoint.x},${currPoint.y} ${cpX2},${cpY2}`
      }
      
      path += ' Z'
      return path
    }
    
    // Animation
    const initialPoints = generatePoints()
    const initialPath = generatePathString(initialPoints)
    path.setAttribute('d', initialPath)
    
    const morphBlob = () => {
      const newPoints = generatePoints()
      const newPath = generatePathString(newPoints)
      
      gsap.to(path, {
        attr: { d: newPath },
        duration: 8,
        ease: "power2.inOut",
        onComplete: morphBlob
      })
    }
    
    morphBlob()
    
    return () => {
      // Cleanup GSAP animations if they exist
      if (gsap && gsap.killTweensOf) {
        gsap.killTweensOf(path)
      }
    }
  }, [gsapLoaded])
  
  return (
    <motion.svg
      ref={svgRef}
      viewBox="-120 -120 240 240"
      className={className}
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={fill1 || defaultFill1} />
          <stop offset="100%" stopColor={fill2 || defaultFill2} />
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d=""
        fill="url(#gradient)"
        filter="blur(7px)"
      />
    </motion.svg>
  )
}
