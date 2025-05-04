'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Float, 
  PerspectiveCamera, 
  Environment, 
  MeshDistortMaterial,
  OrbitControls
} from '@react-three/drei'
import { Color } from 'three'

function AnimatedSphere({ position, color, speed, displacementScale }) {
  const mesh = useRef()
  const col = useMemo(() => new Color(color), [color])
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    mesh.current.material.distort = (Math.sin(t) + 1) / 2 * displacementScale
    mesh.current.material.roughness = (Math.cos(t) + 1) / 4 + 0.1
    
    // Subtle pulsating glow
    const pulse = (Math.sin(t * 0.5) + 1) / 4 + 0.1
    mesh.current.material.emissiveIntensity = pulse
  })
  
  return (
    <Float speed={speed * 3} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={mesh} position={position}>
        <sphereGeometry args={[1.2, 64, 64]} />
        <MeshDistortMaterial
          color={col}
          emissive={col}
          roughness={0.1}
          metalness={0.9}
          speed={0.7}
          distort={0.5}
          radius={1}
        />
      </mesh>
    </Float>
  )
}

function DNA({ count = 20, radius = 2, rotationSpeed = 0.5 }) {
  const group = useRef()
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2
      // Create DNA double helix pattern
      pts.push([
        Math.cos(angle) * radius,
        i * 0.4 - (count * 0.2),
        Math.sin(angle) * radius,
      ])
      pts.push([
        -Math.cos(angle) * radius,
        i * 0.4 - (count * 0.2),
        -Math.sin(angle) * radius,
      ])
    }
    return pts
  }, [count, radius])
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    group.current.rotation.y = t * rotationSpeed
  })
  
  return (
    <group ref={group}>
      {points.map((point, i) => (
        <mesh key={i} position={point}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#f97316" : "#fb923c"} 
            emissive={i % 2 === 0 ? "#f97316" : "#fb923c"}
            emissiveIntensity={0.3}
          />
          {/* Connection lines between adjacent points */}
          {i > 0 && i % 2 !== 0 && (
            <line>
              <bufferGeometry 
                attach="geometry"
                onUpdate={(self) => {
                  const positions = new Float32Array(6)
                  positions.set([
                    0, 0, 0,
                    points[i-1][0] - point[0], 
                    points[i-1][1] - point[1], 
                    points[i-1][2] - point[2]
                  ])
                  self.setAttribute('position', new THREE.BufferAttribute(positions, 3))
                }}
              />
              <lineBasicMaterial color="#f97316" opacity={0.5} transparent />
            </line>
          )}
        </mesh>
      ))}
    </group>
  )
}

export default function HeroModel() {
  return (
    <div className="h-full w-full min-h-[400px]">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        
        <AnimatedSphere 
          position={[0, 0, 0]} 
          color="#f97316" 
          speed={0.3} 
          displacementScale={0.7} 
        />
        
        <DNA count={15} radius={3} rotationSpeed={0.2} />
        
        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}
