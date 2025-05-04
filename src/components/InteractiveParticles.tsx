'use client'

import { useRef, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
}

export default function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0, active: false })
  const rafRef = useRef<number>()
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      setDimensions({ width: window.innerWidth, height: window.innerHeight })
    }
    
    // Initialize canvas
    handleResize()
    
    // Create particles
    const particleCount = Math.floor((window.innerWidth * window.innerHeight) / 15000)
    const newParticles: Particle[] = []
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: isDark ? '#ffffff' : '#3b82f6',
        opacity: Math.random() * 0.5 + 0.1
      })
    }
    
    particlesRef.current = newParticles
    
    // Handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
      mouseRef.current.active = true
      
      // Add extra particles on mouse move for interactivity
      if (Math.random() > 0.85) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: isDark ? '#3b82f6' : '#3b82f6',
          opacity: Math.random() * 0.5 + 0.3
        })
        
        // Cap max particles to avoid performance issues
        if (particlesRef.current.length > particleCount * 1.5) {
          particlesRef.current.splice(0, 1)
        }
      }
    }
    
    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }
    
    // Animation loop
    const animate = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Move particles
        particle.x += particle.speedX
        particle.y += particle.speedY
        
        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1
        
        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${isDark ? '59, 130, 246' : '59, 130, 246'}, ${particle.opacity})`
        ctx.fill()
        
        // Connect particles near mouse
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - particle.x
          const dy = mouseRef.current.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${isDark ? '59, 130, 246' : '59, 130, 246'}, ${0.1 * (1 - distance / 120)})`
            ctx.lineWidth = 1 * (1 - distance / 120)
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(mouseRef.current.x, mouseRef.current.y)
            ctx.stroke()
            
            // Move particles slightly toward mouse
            particle.x += dx * 0.01
            particle.y += dy * 0.01
          }
        }
        
        // Connect particles that are close to each other
        for (let i = index + 1; i < particlesRef.current.length; i++) {
          const otherParticle = particlesRef.current[i]
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${isDark ? '59, 130, 246' : '59, 130, 246'}, ${0.05 * (1 - distance / 100)})`
            ctx.lineWidth = 0.5 * (1 - distance / 100)
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        }
      })
      
      rafRef.current = requestAnimationFrame(animate)
    }
    
    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    
    animate()
    
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [isDark])
  
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: isDark ? 0.7 : 0.4 }}
    />
  )
}
