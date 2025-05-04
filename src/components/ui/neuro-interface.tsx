'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'

interface NeuroInterfaceProps {
  active?: boolean
  className?: string
  children?: React.ReactNode
  connectionCount?: number
  density?: number
  color?: string
}

export function NeuroInterface({
  active = true,
  className = '',
  children,
  connectionCount = 30,
  density = 80,
  color
}: NeuroInterfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [nodes, setNodes] = useState<Array<{x: number, y: number, id: number}>>([])
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const connectionColor = color || (isDark ? '#3b82f6' : '#60a5fa')
  
  // Set up neural network nodes
  useEffect(() => {
    if (!containerRef.current || !active) return
    
    const updateDimensions = () => {
      if (!containerRef.current) return
      const { width, height } = containerRef.current.getBoundingClientRect()
      setWidth(width)
      setHeight(height)
      
      // Create nodes
      const nodeCount = Math.min(100, Math.floor((width * height) / (10000 / density)))
      const newNodes = Array.from({ length: nodeCount }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        id: i
      }))
      
      setNodes(newNodes)
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    
    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [active, density])
  
  // Calculate connections between nodes
  const getConnections = () => {
    if (!active || nodes.length < 2) return []
    
    const result: Array<{ from: {x: number, y: number}, to: {x: number, y: number}, opacity: number }> = []
    const maxConnections = Math.min(connectionCount, nodes.length * 2)
    
    for (let i = 0; i < maxConnections; i++) {
      // Pick two random nodes
      const fromIndex = Math.floor(Math.random() * nodes.length)
      let toIndex
      do {
        toIndex = Math.floor(Math.random() * nodes.length)
      } while (toIndex === fromIndex)
      
      const from = nodes[fromIndex]
      const to = nodes[toIndex]
      
      // Calculate distance for opacity
      const distance = Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2))
      const maxDistance = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2))
      const opacity = 0.8 - (distance / maxDistance) * 0.6
      
      result.push({ from, to, opacity })
    }
    
    return result
  }
  
  // Neural pulses animation
  const [pulses, setPulses] = useState<Array<{id: number, fromX: number, fromY: number, toX: number, toY: number}>>([])
  
  // Generate neural pulse animation
  useEffect(() => {
    if (!active || nodes.length < 2) return
    
    const interval = setInterval(() => {
      if (nodes.length < 2) return
      
      // Random source and target nodes
      const fromIndex = Math.floor(Math.random() * nodes.length)
      let toIndex
      do {
        toIndex = Math.floor(Math.random() * nodes.length)
      } while (toIndex === fromIndex)
      
      const from = nodes[fromIndex]
      const to = nodes[toIndex]
      
      setPulses(prev => [
        ...prev.slice(-5), // Keep only the last 5 pulses for performance
        { 
          id: Date.now(), 
          fromX: from.x, 
          fromY: from.y, 
          toX: to.x, 
          toY: to.y
        }
      ])
    }, 1000)
    
    return () => clearInterval(interval)
  }, [active, nodes])
  
  const networkConnections = getConnections()
  
  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Neural network visualization */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg width={width} height={height}>
          {/* Connections */}
          {active && networkConnections.map((connection, i) => (
            <motion.line
              key={i}
              x1={connection.from.x}
              y1={connection.from.y}
              x2={connection.to.x}
              y2={connection.to.y}
              stroke={connectionColor}
              strokeWidth={0.5}
              strokeOpacity={connection.opacity}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: i * 0.01 }}
            />
          ))}
          
          {/* Nodes */}
          {active && nodes.map(node => (
            <motion.circle
              key={node.id}
              cx={node.x}
              cy={node.y}
              r={1.5}
              fill={connectionColor}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.7, scale: 1 }}
              transition={{ duration: 0.5, delay: node.id * 0.01 }}
            />
          ))}
          
          {/* Animated pulses */}
          <AnimatePresence>
            {active && pulses.map(pulse => (
              <motion.circle
                key={pulse.id}
                initial={{ 
                  cx: pulse.fromX,
                  cy: pulse.fromY,
                  r: 2,
                  opacity: 0.8
                }}
                animate={{
                  cx: [pulse.fromX, pulse.toX],
                  cy: [pulse.fromY, pulse.toY],
                  r: [2, 1],
                  opacity: [0.8, 0.1]
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 1,
                  ease: "easeInOut" 
                }}
                fill={connectionColor}
              />
            ))}
          </AnimatePresence>
        </svg>
      </div>
    </div>
  )
}
