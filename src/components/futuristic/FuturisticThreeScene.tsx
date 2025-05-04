'use client'

import { useRef, Suspense } from 'react'
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber'
import {
  useGLTF,
  AdaptiveDpr,
  Environment,
  CubeCamera,
  Preload,
  OrbitControls,
  PerspectiveCamera
} from '@react-three/drei'
import { Vector3, MathUtils, Object3D } from 'three'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import { motion } from 'framer-motion-3d'
import { MotionConfig } from 'framer-motion'

// A futuristic floating shape
function FuturisticShape(props: any) {
  const meshRef = useRef<Object3D>()
  const speed = useRef(Math.random() * 0.1 + 0.05)
  
  useFrame((state, delta) => {
    if (!meshRef.current) return
    
    // Float animation
    meshRef.current.position.y += Math.sin(state.clock.elapsedTime * speed.current) * 0.002
    
    // Slow rotation
    meshRef.current.rotation.x += delta * 0.1
    meshRef.current.rotation.y += delta * 0.12
    meshRef.current.rotation.z += delta * 0.08
  })
  
  return (
    <motion.mesh
      {...props}
      ref={meshRef}
      scale={0.2}
      animate={{
        scale: [0.18, 0.2, 0.18],
        transition: {
          duration: 5,
          repeat: Infinity,
          repeatType: 'reverse',
        }
      }}
    >
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial 
        color="#f97316"
        roughness={0.1}
        metalness={0.8}
        emissive="#f97316"
        emissiveIntensity={0.2}
      />
    </motion.mesh>
  )
}

// Orbital particles
function OrbitalParticles({ count = 100, radius = 3 }) {
  const particlesRef = useRef<Object3D>()
  const particles = Array.from({ length: count }).map(() => {
    const angle = Math.random() * Math.PI * 2
    const orbitRadius = Math.random() * radius * 0.5 + radius * 0.5
    return {
      position: new Vector3(
        Math.cos(angle) * orbitRadius,
        (Math.random() - 0.5) * 2,
        Math.sin(angle) * orbitRadius
      ),
      size: Math.random() * 0.05 + 0.02,
      speed: Math.random() * 0.2 + 0.1
    }
  })
  
  useFrame((state, delta) => {
    if (!particlesRef.current) return
    
    for (let i = 0; i < particlesRef.current.children.length; i++) {
      const particle = particlesRef.current.children[i]
      const data = particles[i]
      
      // Orbital movement
      const angle = state.clock.elapsedTime * data.speed
      particle.position.x = Math.cos(angle) * Math.abs(data.position.x)
      particle.position.z = Math.sin(angle) * Math.abs(data.position.z)
    }
  })
  
  return (
    <group ref={particlesRef}>
      {particles.map((data, i) => (
        <motion.mesh key={i} position={data.position}>
          <sphereGeometry args={[data.size, 8, 8]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.7} />
        </motion.mesh>
      ))}
    </group>
  )
}

export default function FuturisticThreeScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Suspense fallback={null}>
        <MotionConfig transition={{ duration: 1 }}>
          <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={0.5} />
            <FuturisticShape position={[0, 0, 0]} />
            <OrbitalParticles />
            <Environment preset="city" />
            <EffectComposer>
              <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
              <Noise opacity={0.02} />
            </EffectComposer>
            <AdaptiveDpr pixelated />
            <Preload all />
          </Canvas>
        </MotionConfig>
      </Suspense>
    </div>
  )
}
