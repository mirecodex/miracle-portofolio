'use client'

import { useRef, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { useInView } from 'react-intersection-observer'

// Dynamic import for Three.js with error handling
let THREE: any = null;

export function ParticleField({ 
  density = 50,
  speed = 0.2,
  color1 = '#3b82f6', // Blue
  color2 = '#2563eb', // Darker blue
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [inViewRef, inView] = useInView({ triggerOnce: true })
  const [threeLoaded, setThreeLoaded] = useState(false)
  
  // Load Three.js dynamically
  useEffect(() => {
    const loadThree = async () => {
      try {
        THREE = await import('three')
        setThreeLoaded(true)
      } catch (err) {
        console.warn('Failed to load Three.js. Install it with: npm install three')
      }
    }
    
    loadThree()
  }, [])
  
  useEffect(() => {
    if (!inView || !threeLoaded || !THREE) return
    
    // Setup Three.js scene
    const container = containerRef.current
    if (!container) return
    
    // Initialize scene, camera, and renderer
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 20
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)
    
    // Create particles
    const particlesGeometry = new THREE.BufferGeometry()
    const particlesCount = Math.min(10000, density * (container.clientWidth * container.clientHeight) / 5000)
    
    const positions = new Float32Array(particlesCount * 3)
    const colors = new Float32Array(particlesCount * 3)
    
    const color1Obj = new THREE.Color(color1)
    const color2Obj = new THREE.Color(color2)
    
    for (let i = 0; i < particlesCount; i++) {
      // Position
      positions[i * 3] = (Math.random() - 0.5) * 50 // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50 // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50 // z
      
      // Color - mix between two colors based on position
      const mixFactor = Math.random()
      const particleColor = color1Obj.clone().lerp(color2Obj, mixFactor)
      
      colors[i * 3] = particleColor.r
      colors[i * 3 + 1] = particleColor.g
      colors[i * 3 + 2] = particleColor.b
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    
    // Material
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      depthWrite: false,
    })
    
    // Points
    const particles = new THREE.Points(particlesGeometry, particlesMaterial)
    scene.add(particles)
    
    // Animation
    const clock = new THREE.Clock()
    
    const tick = () => {
      const elapsedTime = clock.getElapsedTime()
      
      // Update particles
      particles.rotation.y = elapsedTime * speed * 0.05
      particles.rotation.x = elapsedTime * speed * 0.03
      
      // Update positions for wave effect
      const positions = particlesGeometry.attributes.position.array as Float32Array
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3
        const x = positions[i3]
        const y = positions[i3 + 1]
        
        // Wave effect
        positions[i3 + 2] += Math.sin(elapsedTime * speed + x * 0.5 + y * 0.5) * 0.01
      }
      particlesGeometry.attributes.position.needsUpdate = true
      
      // Render
      renderer.render(scene, camera)
      window.requestAnimationFrame(tick)
    }
    
    tick()
    
    // Handle window resize
    const handleResize = () => {
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement)
      }
      particlesGeometry.dispose()
      particlesMaterial.dispose()
    }
  }, [inView, threeLoaded, density, speed, color1, color2, isDark])
  
  return (
    <div 
      ref={(el) => {
        containerRef.current = el as HTMLDivElement
        inViewRef(el)
      }}
      className="absolute inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}
