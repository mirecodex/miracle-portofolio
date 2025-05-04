'use client'

import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

type Point = { x: number, y: number }
type Gesture = Point[]

interface GestureRecognizerProps {
  onGestureComplete?: (gesture: string) => void;
  gestureTriggerDistance?: number;
  children?: React.ReactNode;
}

const GESTURES = {
  CIRCLE: 'circle',
  SWIPE_RIGHT: 'swipe-right',
  SWIPE_LEFT: 'swipe-left',
  Z_SHAPE: 'z-shape',
}

export function GestureRecognizer({
  onGestureComplete,
  gestureTriggerDistance = 100,
  children
}: GestureRecognizerProps) {
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentPoints, setCurrentPoints] = useState<Gesture>([])
  const [gestureVisual, setGestureVisual] = useState<string>('')
  const [guidanceActive, setGuidanceActive] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const timeoutRef = useRef<NodeJS.Timeout>()
  
  // Draw the gesture
  const handlePointerDown = (e: React.PointerEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setIsDrawing(true)
    setCurrentPoints([{ x, y }])
    setGestureVisual(`M${x},${y}`)
  }
  
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDrawing || !containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setCurrentPoints(prev => [...prev, { x, y }])
    setGestureVisual(prev => `${prev} L${x},${y}`)
  }
  
  const handlePointerUp = () => {
    if (!isDrawing) return
    
    setIsDrawing(false)
    recognizeGesture(currentPoints)
    
    // Clear visual after a delay
    timeoutRef.current = setTimeout(() => {
      setGestureVisual('')
    }, 1000)
  }
  
  const recognizeGesture = (points: Gesture) => {
    if (points.length < 5) return
    
    // Calculate bounding box
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
    points.forEach(point => {
      minX = Math.min(minX, point.x)
      minY = Math.min(minY, point.y)
      maxX = Math.max(maxX, point.x)
      maxY = Math.max(maxY, point.y)
    })
    
    const width = maxX - minX
    const height = maxY - minY
    
    // Only recognize gestures over a certain size
    if (width < gestureTriggerDistance && height < gestureTriggerDistance) return
    
    // Recognize circle
    if (isCircle(points)) {
      onGestureComplete?.(GESTURES.CIRCLE)
      return
    }
    
    // Recognize horizontal swipes
    if (width > height * 2) {
      const start = points[0]
      const end = points[points.length - 1]
      
      if (end.x - start.x > gestureTriggerDistance) {
        onGestureComplete?.(GESTURES.SWIPE_RIGHT)
        return
      }
      
      if (start.x - end.x > gestureTriggerDistance) {
        onGestureComplete?.(GESTURES.SWIPE_LEFT)
        return
      }
    }
    
    // Recognize Z shape
    if (isZShape(points)) {
      onGestureComplete?.(GESTURES.Z_SHAPE)
      return
    }
  }
  
  const isCircle = (points: Gesture): boolean => {
    // Simple circle detection - check if end point is near start point
    // and the path has sufficient variation
    if (points.length < 20) return false
    
    const start = points[0]
    const end = points[points.length - 1]
    
    const distance = Math.sqrt(
      Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
    )
    
    // Calculate average distance from center
    let sumX = 0, sumY = 0
    points.forEach(p => {
      sumX += p.x
      sumY += p.y
    })
    
    const centerX = sumX / points.length
    const centerY = sumY / points.length
    
    let radiusSum = 0
    points.forEach(p => {
      radiusSum += Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2))
    })
    
    const avgRadius = radiusSum / points.length
    let radiusVariation = 0
    
    points.forEach(p => {
      const radius = Math.sqrt(Math.pow(p.x - centerX, 2) + Math.pow(p.y - centerY, 2))
      radiusVariation += Math.abs(radius - avgRadius)
    })
    
    const normalizedVariation = radiusVariation / points.length / avgRadius
    
    return distance < avgRadius * 0.5 && normalizedVariation < 0.4
  }
  
  const isZShape = (points: Gesture): boolean => {
    if (points.length < 10) return false
    
    // Simplify to 3 segments
    const segments = 3
    const segmentLength = Math.floor(points.length / segments)
    const simplifiedPoints = []
    
    for (let i = 0; i < segments; i++) {
      const segmentStart = i * segmentLength
      const point = points[segmentStart]
      simplifiedPoints.push(point)
    }
    
    // Add end point
    simplifiedPoints.push(points[points.length - 1])
    
    // Check if it's roughly a Z shape
    if (simplifiedPoints.length !== 4) return false
    
    const [p1, p2, p3, p4] = simplifiedPoints
    
    // First horizontal line (p1 -> p2)
    const isFirstHorizontal = Math.abs(p2.y - p1.y) < Math.abs(p2.x - p1.x) * 0.5
    // Diagonal line (p2 -> p3)
    const isDiagonal = (p3.x - p2.x) * (p3.y - p2.y) < 0
    // Second horizontal line (p3 -> p4)
    const isSecondHorizontal = Math.abs(p4.y - p3.y) < Math.abs(p4.x - p3.x) * 0.5
    
    return isFirstHorizontal && isDiagonal && isSecondHorizontal
  }
  
  // Display gesture guidance
  const showGuidance = () => {
    setGuidanceActive(true)
    timeoutRef.current = setTimeout(() => {
      setGuidanceActive(false)
    }, 5000)
  }
  
  // Clean up
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      {children}
      
      {/* Gesture visualization */}
      {gestureVisual && (
        <svg className="absolute inset-0 pointer-events-none z-50" style={{ mixBlendMode: 'difference' }}>
          <motion.path
            d={gestureVisual}
            fill="none"
            stroke="rgba(59, 130, 246, 0.8)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          />
        </svg>
      )}
      
      {/* Gesture guidance */}
      {guidanceActive && (
        <motion.div 
          className="absolute top-0 left-0 right-0 p-4 bg-black/70 text-white text-center text-sm rounded-lg backdrop-blur-md z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          Try gestures: Circle = theme toggle | Swipe = navigation | Z shape = open menu
        </motion.div>
      )}
      
      {/* Help button */}
      <button
        onClick={showGuidance}
        className="absolute bottom-4 right-4 w-8 h-8 rounded-full bg-primary-500/20 backdrop-blur-sm flex items-center justify-center text-primary-500 z-30"
        aria-label="Gesture help"
      >
        ?
      </button>
    </div>
  )
}
