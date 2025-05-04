'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Trail, Float } from '@react-three/drei'
import { skillsData } from '@/lib/dummy-data'

// Get all skill names from the data
const allSkills = skillsData.reduce((acc, category) => {
  return [...acc, ...category.items.map(item => item.name)]
}, [])

function SkillsOrbit() {
  const groupRef = useRef()
  
  // Use Fibonacci sphere to distribute points evenly
  const points = useMemo(() => {
    const pts = []
    const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle
    
    for (let i = 0; i < allSkills.length; i++) {
      const y = 1 - (i / (allSkills.length - 1)) * 2 // y goes from 1 to -1
      const radius = Math.sqrt(1 - y * y) // Radius at y
      const theta = phi * i // Golden angle increment
      
      const x = Math.cos(theta) * radius
      const z = Math.sin(theta) * radius
      
      pts.push([x * 2.5, y * 2.5, z * 2.5])
    }
    
    return pts
  }, [])
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.1
    groupRef.current.rotation.y = t
    groupRef.current.rotation.z = Math.sin(t * 0.5) * 0.1
  })
  
  return (
    <group ref={groupRef}>
      {allSkills.map((skill, i) => (
        <SkillPoint 
          key={skill}
          text={skill}
          position={points[i]}
          delay={i * 0.1}
          speed={0.2 + Math.random() * 0.3}
        />
      ))}
    </group>
  )
}

function SkillPoint({ text, position, delay, speed }) {
  const ref = useRef()
  const intensity = useMemo(() => Math.random() * 0.5 + 0.5, [])
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() - delay
    if (t < 0) return
    
    // Small additional oscillation
    ref.current.position.x += Math.sin(t * speed * 2) * 0.001
    ref.current.position.y += Math.cos(t * speed * 2) * 0.001
    ref.current.position.z += Math.sin(t * speed * 1.5) * 0.001
  })
  
  return (
    <group ref={ref} position={position}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <Trail 
          width={0.05} 
          length={4} 
          color="#f97316" 
          attenuation={(width) => width / 5}
        >
          <mesh>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshStandardMaterial 
              color="#f97316" 
              emissive="#f97316" 
              emissiveIntensity={intensity}
            />
          </mesh>
        </Trail>
        <Text
          position={[0, 0.1, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          {text}
        </Text>
      </Float>
    </group>
  )
}

export default function SkillsGlobe() {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        
        <SkillsOrbit />
      </Canvas>
    </div>
  )
}
