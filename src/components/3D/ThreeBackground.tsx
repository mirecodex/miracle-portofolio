'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  AdaptiveDpr, 
  Environment, 
  Preload, 
  SpotLight, 
  Float, 
  OrbitControls
} from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import * as THREE from 'three'

// Dynamic floating particles
function Particles({ count = 200, colors = ['#f97316', '#ef4444', '#8b5cf6'] }) {
  const mesh = useRef()
  const light = useRef()
  const particles = useRef([])
  
  // Initialize particles with random positions
  if (particles.current.length === 0) {
    for (let i = 0; i < count; i++) {
      particles.current.push({
        position: [
          Math.random() * 40 - 20, 
          Math.random() * 40 - 20, 
          Math.random() * 40 - 20
        ],
        scale: Math.random() * 0.4 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: [0, 0, 0],
        speed: Math.random() * 0.05 + 0.01
      })
    }
  }
  
  // Animate particles
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()
    
    particles.current.forEach((particle, i) => {
      const i3 = i * 3
      // Slow rotation
      mesh.current.geometry.attributes.rotation.array[i3] += particle.speed
      mesh.current.geometry.attributes.rotation.array[i3 + 1] += particle.speed * 0.8
      mesh.current.geometry.attributes.rotation.array[i3 + 2] += particle.speed * 0.5
    })
    
    mesh.current.geometry.attributes.rotation.needsUpdate = true
    
    // Move light
    if (light.current) {
      light.current.position.x = Math.sin(time * 0.5) * 10
      light.current.position.z = Math.cos(time * 0.5) * 10
    }
  })
  
  return (
    <group>
      {/* Particles */}
      <instancedMesh ref={mesh} args={[null, null, count]}>
        <boxGeometry args={[1, 1, 1]}>
          <instancedBufferAttribute 
            attach="attributes-rotation" 
            args={[new Float32Array(count * 3), 3]} 
          />
        </boxGeometry>
        <meshStandardMaterial 
          vertexColors 
          roughness={0.5}
          metalness={0.8} 
        />
        {particles.current.map((particle, i) => (
          <group key={i} position={particle.position} scale={particle.scale}>
            <Float 
              speed={particle.speed * 20} 
              rotationIntensity={particle.speed * 10}
              floatIntensity={particle.speed * 5}
            >
              <mesh>
                <boxGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={particle.color} />
              </mesh>
            </Float>
          </group>
        ))}
      </instancedMesh>
      
      {/* Moving light */}
      <SpotLight
        ref={light}
        position={[10, 10, 10]}
        angle={0.5}
        penumbra={0.5}
        intensity={20}
        color="#f97316"
        castShadow
      />
    </group>
  )
}

// Floating torus
function FloatingTorus() {
  const torusMesh = useRef()
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.5
    torusMesh.current.rotation.x = Math.sin(t) * 0.3
    torusMesh.current.rotation.y = Math.sin(t * 0.8) * 0.3
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={torusMesh} position={[0, 0, -5]} castShadow receiveShadow>
        <torusGeometry args={[5, 1, 16, 32]} />
        <meshStandardMaterial 
          color="#f97316" 
          roughness={0.1} 
          metalness={0.9} 
          emissive="#f97316"
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  )
}

export default function ThreeBackground({ children }) {
  return (
    <div className="fixed inset-0 -z-10">
      <Suspense fallback={null}>
        <Canvas shadows dpr={[1, 2]} camera={{ position: [0, 0, 20], fov: 45 }}>
          <color attach="background" args={["#111827"]} />
          <fog attach="fog" args={["#111827", 30, 50]} />
          
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 10]} intensity={0.3} castShadow />
          
          <Particles />
          <FloatingTorus />
          
          <Environment preset="city" />
          
          <EffectComposer>
            <Bloom 
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
              height={300}
              intensity={0.3}
            />
            <ChromaticAberration offset={[0.0005, 0.0005]} />
          </EffectComposer>
          
          <AdaptiveDpr pixelated />
          <Preload all />
        </Canvas>
      </Suspense>
      {children}
    </div>
  )
}
