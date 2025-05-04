'use client'

import { useEffect, useRef } from 'react'
import { useTheme } from 'next-themes'

export default function NeonGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Setup canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Grid properties
    const gridSize = 40
    const lineWidth = 0.3
    const primaryColor = isDark ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.15)'
    const secondaryColor = isDark ? 'rgba(37, 99, 235, 0.1)' : 'rgba(37, 99, 235, 0.07)'
    
    // Animation properties
    let angle = 0
    let lastTime = 0
    const fps = 30
    const interval = 1000 / fps
    
    // Draw animated grid
    const drawGrid = (timestamp: number) => {
      // Throttle frame rate
      if (timestamp - lastTime < interval) {
        requestAnimationFrame(drawGrid)
        return
      }
      
      lastTime = timestamp
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Update angle for perspective effect
      angle += 0.003
      const perspective = Math.sin(angle) * 0.2 + 0.8
      
      // Calculate grid dimensions
      const horizLines = Math.ceil(canvas.height / gridSize) + 1
      const vertLines = Math.ceil(canvas.width / gridSize) + 1
      
      // Calculate center for perspective effect
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      
      // Draw horizontal lines
      for (let i = 0; i < horizLines; i++) {
        const y = i * gridSize
        
        // Calculate perspective offset
        const vanishOffset = (y - centerY) * perspective
        const startX = centerX + vanishOffset * 0.5
        const endX = canvas.width - startX
        
        // Distance from center - affects opacity
        const distFromCenter = Math.abs(y - centerY) / centerY
        const opacity = Math.max(0.05, 1 - distFromCenter * 1.2)
        
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = i % 5 === 0 
          ? `rgba(59, 130, 246, ${opacity * 0.6})` 
          : `rgba(37, 99, 235, ${opacity * 0.2})`
        ctx.stroke()
      }
      
      // Draw vertical lines
      for (let i = 0; i < vertLines; i++) {
        const x = i * gridSize
        
        // Calculate perspective offset
        const vanishOffset = (x - centerX) * perspective
        const startY = centerY + vanishOffset * 0.5
        const endY = canvas.height - startY
        
        // Distance from center - affects opacity
        const distFromCenter = Math.abs(x - centerX) / centerX
        const opacity = Math.max(0.05, 1 - distFromCenter * 1.2)
        
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = i % 5 === 0 
          ? `rgba(59, 130, 246, ${opacity * 0.6})` 
          : `rgba(37, 99, 235, ${opacity * 0.2})`
        ctx.stroke()
      }
      
      requestAnimationFrame(drawGrid)
    }
    
    requestAnimationFrame(drawGrid)
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [isDark])
  
  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ opacity: isDark ? 0.3 : 0.15 }}
    />
  )
}
