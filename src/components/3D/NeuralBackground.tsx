'use client'

import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'
import { random } from 'maath'

function ParticlesField({ count = 500, color = '#f97316' }) {
  const points = useRef<THREE.Points>(null!)
  const radius = 20
  
  // Generate random points in a sphere
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    random.inSphere(positions, { radius })
    return positions
  }, [count, radius])
  
  // Generate random connections between points
  const connections = useMemo(() => {
    const lines = []
    const positions = Array.from({ length: count * 3 }).map((_, i) => particlePositions[i])
    
    for (let i = 0; i < count; i++) {
      const x1 = positions[i * 3]
      const y1 = positions[i * 3 + 1]
      const z1 = positions[i * 3 + 2]
      
      for (let j = i + 1; j < count; j++) {
        const x2 = positions[j * 3]
        const y2 = positions[j * 3 + 1]
        const z2 = positions[j * 3 + 2]
        
        const distance = Math.sqrt(
          Math.pow(x2 - x1, 2) + 
          Math.pow(y2 - y1, 2) + 
          Math.pow(z2 - z1, 2)
        )
        
        // Only connect points that are close to each other
        if (distance < radius * 0.15) {
          lines.push({
            points: [
              new THREE.Vector3(x1, y1, z1),
              new THREE.Vector3(x2, y2, z2)
            ],
            distance
          })
        }
      }
    }
    
    return lines
  }, [particlePositions, count, radius])
  
  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.x += delta * 0.05
      points.current.rotation.y += delta * 0.075
    }
  })
  
  return (
    <group>
      <Points ref={points} positions={particlePositions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color={color}
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Render connections */}
      {connections.map((connection, i) => (
        <line key={`line-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([
                connection.points[0].x, connection.points[0].y, connection.points[0].z,
                connection.points[1].x, connection.points[1].y, connection.points[1].z
              ])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            attach="material" 
            color={color} 
            opacity={0.2 * (1 - connection.distance / (radius * 0.15))} 
            transparent 
            linewidth={1}
          />
        </line>
      ))}
    </group>
  )
}

export default function NeuralBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 15], fov: 60 }}>
        <color attach="background" args={["#111827"]} />
        {/* Add basic lighting instead of relying on environment maps */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} />
        <ParticlesField />
        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
