'use client'

import { useState, useRef, useEffect } from 'react'

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
}

interface NetworkProps {
  className?: string;
  nodeCount?: number;
  connectionDistance?: number;
  nodeColor?: string;
  lineColor?: string;
  animationSpeed?: number;
}

export default function NeuralNetwork({
  className = '',
  nodeCount = 60,
  connectionDistance = 150,
  nodeColor = 'rgba(249, 115, 22, 0.6)',
  lineColor = 'rgba(249, 115, 22, 0.3)',
  animationSpeed = 1
}: NetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [nodes, setNodes] = useState<Node[]>([])
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  // Set up canvas and create nodes
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const { width, height } = canvasRef.current.parentElement.getBoundingClientRect()
        setDimensions({ width, height })
        canvasRef.current.width = width
        canvasRef.current.height = height
        
        // Create new nodes
        const newNodes: Node[] = []
        for (let i = 0; i < nodeCount; i++) {
          newNodes.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * animationSpeed,
            vy: (Math.random() - 0.5) * animationSpeed,
            connections: []
          })
        }
        setNodes(newNodes)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [nodeCount, animationSpeed])
  
  // Animation loop
  useEffect(() => {
    if (!canvasRef.current || nodes.length === 0) return
    
    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return
    
    let animationFrameId: number
    
    const render = () => {
      if (!canvasRef.current) return
      
      const { width, height } = dimensions
      ctx.clearRect(0, 0, width, height)
      
      // Update nodes
      const updatedNodes = [...nodes]
      for (let i = 0; i < updatedNodes.length; i++) {
        const node = updatedNodes[i]
        
        // Move node
        node.x += node.vx
        node.y += node.vy
        
        // Bounce off edges
        if (node.x < 0 || node.x > width) node.vx *= -1
        if (node.y < 0 || node.y > height) node.vy *= -1
        
        // Keep within bounds
        node.x = Math.max(0, Math.min(width, node.x))
        node.y = Math.max(0, Math.min(height, node.y))
        
        // Clear previous connections
        node.connections = []
      }
      
      // Find connections
      for (let i = 0; i < updatedNodes.length; i++) {
        for (let j = i + 1; j < updatedNodes.length; j++) {
          const dx = updatedNodes[j].x - updatedNodes[i].x
          const dy = updatedNodes[j].y - updatedNodes[i].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < connectionDistance) {
            updatedNodes[i].connections.push(j)
            updatedNodes[j].connections.push(i)
          }
        }
      }
      
      // Draw connections
      ctx.strokeStyle = lineColor
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let i = 0; i < updatedNodes.length; i++) {
        const node = updatedNodes[i]
        for (const j of node.connections) {
          const otherNode = updatedNodes[j]
          const dx = otherNode.x - node.x
          const dy = otherNode.y - node.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          // Opacity based on distance
          const opacity = 1 - (distance / connectionDistance)
          ctx.globalAlpha = opacity
          
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(otherNode.x, otherNode.y)
        }
      }
      ctx.stroke()
      
      // Draw nodes
      ctx.fillStyle = nodeColor
      ctx.globalAlpha = 1
      for (const node of updatedNodes) {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 2, 0, Math.PI * 2)
        ctx.fill()
      }
      
      setNodes(updatedNodes)
      animationFrameId = requestAnimationFrame(render)
    }
    
    render()
    return () => cancelAnimationFrame(animationFrameId)
  }, [nodes, dimensions, connectionDistance, nodeColor, lineColor])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 z-0 ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  )
}
