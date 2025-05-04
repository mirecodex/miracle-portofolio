'use client'

import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface Star {
  id: number
  x: number
  y: number
  size: number
  opacity: number
  duration: number
  delay: number
  glow: boolean
}

export default function StarryBackground() {
  const [stars, setStars] = useState<Star[]>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  // Shooting stars animation
  const [shootingStars, setShootingStars] = useState<{x: number, y: number, size: number, angle: number}[]>([])
  
  useEffect(() => {
    // Generate stars based on screen size
    const generateStars = () => {
      const newStars: Star[] = []
      const starCount = Math.min(100, Math.floor((window.innerWidth * window.innerHeight) / 6000))
      
      for (let i = 0; i < starCount; i++) {
        // Add regular stars
        newStars.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 1, // 1-3px
          opacity: Math.random() * 0.7 + 0.3, // 0.3-1
          duration: Math.random() * 5 + 3, // 3-8s
          delay: Math.random() * 5, // 0-5s
          glow: Math.random() > 0.7 // 30% of stars will glow
        })
      }
      
      setStars(newStars)
    }
    
    generateStars()
    
    // Random shooting stars
    const createShootingStar = () => {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * (window.innerHeight / 2) // Only in top half
      const size = Math.random() * 3 + 2
      const angle = Math.random() * 30 + 30 // 30-60 degrees
      
      setShootingStars(prev => [...prev, { x, y, size, angle }])
      
      // Remove the shooting star after animation
      setTimeout(() => {
        setShootingStars(prev => prev.filter(star => star.x !== x || star.y !== y))
      }, 1000)
    }
    
    // Create shooting stars periodically
    const interval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every interval
        createShootingStar()
      }
    }, 3000)
    
    // Stars canvas animation
    const renderStarCanvas = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      // Set canvas dimensions
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      
      // Animation loop
      let frame = 0
      
      const drawStars = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw twinkling stars
        stars.forEach(star => {
          const twinkle = Math.sin((frame + star.id * 30) / 50) * 0.5 + 0.5
          const alpha = star.opacity * twinkle
          
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()
          
          // Add glow effect to some stars
          if (star.glow) {
            const gradient = ctx.createRadialGradient(
              star.x, star.y, 0, 
              star.x, star.y, star.size * 4
            )
            gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.8})`)
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
            
            ctx.fillStyle = gradient
            ctx.beginPath()
            ctx.arc(star.x, star.y, star.size * 4, 0, Math.PI * 2)
            ctx.fill()
          }
        })
        
        // Draw shooting stars
        shootingStars.forEach(star => {
          const angleRad = (star.angle * Math.PI) / 180
          const length = star.size * 20
          
          // Shooting star head
          ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fill()
          
          // Shooting star tail
          const gradient = ctx.createLinearGradient(
            star.x, star.y,
            star.x - Math.cos(angleRad) * length,
            star.y + Math.sin(angleRad) * length
          )
          gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)')
          gradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
          
          ctx.strokeStyle = gradient
          ctx.lineWidth = star.size / 2
          ctx.beginPath()
          ctx.moveTo(star.x, star.y)
          ctx.lineTo(
            star.x - Math.cos(angleRad) * length, 
            star.y + Math.sin(angleRad) * length
          )
          ctx.stroke()
        })
        
        frame++
        requestAnimationFrame(drawStars)
      }
      
      drawStars()
    }
    
    renderStarCanvas()
    
    // Handle window resize
    const handleResize = () => {
      generateStars()
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth
        canvasRef.current.height = window.innerHeight
      }
    }
    
    window.addEventListener('resize', handleResize)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  
  return (
    <div className={`fixed inset-0 -z-20 overflow-hidden pointer-events-none transition-colors duration-500 ${
      isDark ? 'bg-dark-900' : 'bg-light-100'
    }`}>
      {/* Stars canvas */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full" 
        style={{ opacity: isDark ? 1 : 0.3 }}
      />
      
      {/* Enhanced background with multiple gradient layers for depth */}
      <div className="absolute inset-0 w-full h-full">
        {/* Primary large gradient blobs */}
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vh] rounded-full blur-[150px]" 
             style={{ backgroundColor: isDark ? 'rgba(59, 130, 246, 0.03)' : 'rgba(59, 130, 246, 0.02)' }} />
        <div className="absolute bottom-1/3 right-1/3 w-[40vw] h-[40vh] rounded-full blur-[130px]"
             style={{ backgroundColor: isDark ? 'rgba(29, 78, 216, 0.025)' : 'rgba(37, 99, 235, 0.015)' }} />
             
        {/* Secondary smaller and more intense gradient blobs */}
        <div className="absolute top-1/2 right-1/4 w-[30vw] h-[30vh] rounded-full blur-[100px]"
             style={{ backgroundColor: isDark ? 'rgba(37, 99, 235, 0.02)' : 'rgba(59, 130, 246, 0.01)' }} />
        <div className="absolute bottom-1/4 left-1/3 w-[25vw] h-[25vh] rounded-full blur-[120px]"
             style={{ backgroundColor: isDark ? 'rgba(59, 130, 246, 0.015)' : 'rgba(29, 78, 216, 0.01)' }} />
             
        {/* Subtle detail gradients */}
        <div className="absolute top-[70vh] left-[15vw] w-[20vw] h-[20vh] rounded-full blur-[80px]"
             style={{ backgroundColor: isDark ? 'rgba(30, 64, 175, 0.02)' : 'rgba(96, 165, 250, 0.015)' }} />
        <div className="absolute top-[20vh] right-[20vw] w-[15vw] h-[15vh] rounded-full blur-[70px]"
             style={{ backgroundColor: isDark ? 'rgba(37, 99, 235, 0.02)' : 'rgba(37, 99, 235, 0.01)' }} />
      </div>
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  )
}
