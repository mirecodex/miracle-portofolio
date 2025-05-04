'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Icosahedron,
  MeshDistortMaterial,
  GradientTexture,
  Float,
  Trail,
  Points,
  PointMaterial
} from '@react-three/drei'
import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import * as THREE from 'three'
import { random } from 'maath'

// Floating holographic model
function HolographicCore({ scale = 1.5, wireframe = false }) {
  const mesh = useRef<THREE.Mesh>(null!)
  const [hover, setHover] = useState(false)
  
  // Animation for pulsating effect
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    mesh.current.material.distort = 0.4 + Math.sin(t) * 0.15
    mesh.current.rotation.y += 0.01
    mesh.current.rotation.z += 0.005
  })
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Icosahedron 
        ref={mesh} 
        args={[1, 2]} 
        scale={scale}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <MeshDistortMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
          wireframe={wireframe}
          distort={0.5}
          speed={5}
        >
          <GradientTexture
            stops={[0, 0.5, 1]}
            colors={['#f97316', '#fb923c', '#f97316']}
            size={100}
          />
        </MeshDistortMaterial>
      </Icosahedron>
    </Float>
  )
}

// Orbital particles
function OrbitingParticles({ count = 80, radius = 4 }) {
  const points = useRef<THREE.Points>(null!)
  
  // Generate particles in a sphere shape
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      const x = Math.cos(angle) * radius * (0.8 + Math.random() * 0.4)
      const y = (Math.random() - 0.5) * radius * 0.5
      const z = Math.sin(angle) * radius * (0.8 + Math.random() * 0.4)
      
      positions[i * 3] = x
      positions[i * 3 + 1] = y
      positions[i * 3 + 2] = z
    }
    return positions
  }, [count, radius])
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.2
    points.current.rotation.y = t
  })
  
  return (
    <Points ref={points} positions={particlesPosition} stride={3}>
      <PointMaterial
        transparent
        color="#fb923c"
        size={0.08}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  )
}

// Dynamic data flow lines
function DataFlowLines({ count = 8, length = 2 }) {
  const lineRefs = useRef<THREE.Group[]>([])
  const lines = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const direction = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize()
      
      const angle = Math.random() * Math.PI * 2
      const radius = 2 + Math.random() * 2
      const startPosition = new THREE.Vector3(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 4,
        Math.sin(angle) * radius
      )
      
      return {
        direction,
        startPosition,
        speed: Math.random() * 0.02 + 0.01,
        color: new THREE.Color(`hsl(${30 + Math.random() * 20}, 100%, 50%)`)
      }
    })
  }, [count])
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    
    lineRefs.current.forEach((line, i) => {
      if (!line) return
      
      const lineData = lines[i]
      line.position.copy(lineData.startPosition)
      line.position.y += Math.sin(t * lineData.speed * 5) * 0.5
      line.rotation.y = t * lineData.speed * 2
    })
  })
  
  return (
    <group>
      {lines.map((line, i) => (
        <group
          key={i}
          ref={el => lineRefs.current[i] = el as THREE.Group}
          position={line.startPosition}
        >
          <Trail
            width={0.05}
            length={length}
            color={line.color}
            attenuation={(w) => w * 0.5}
          >
            <mesh position={[0.5, 0, 0]}>
              <sphereGeometry args={[0.05]} />
              <meshBasicMaterial color={line.color} />
            </mesh>
          </Trail>
        </group>
      ))}
    </group>
  )
}

export default function HolographicModel() {
  return (
    <div className="w-full h-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={["#111827"]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 10]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <HolographicCore />
        <OrbitingParticles />
        <DataFlowLines />
        
        <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
          <Noise opacity={0.1} premultiply blendFunction={1} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
