'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Trail, Float, OrbitControls } from '@react-three/drei'
import { skillsData } from '@/lib/dummy-data'
import * as THREE from 'three'

// Extract all skills from the data
const allSkills = skillsData.reduce((acc, category) => {
  return [...acc, ...category.items.map(item => ({
    name: item.name,
    level: item.level
  }))]
}, [] as { name: string, level: number }[])

function SkillsOrbit() {
  const group = useRef<THREE.Group>(null!)
  
  // Place skills in 3D space using Fibonacci sphere distribution
  const skillPoints = useMemo(() => {
    return allSkills.map((skill, i) => {
      const phi = Math.acos(-1 + (2 * i) / allSkills.length)
      const theta = Math.sqrt(allSkills.length * Math.PI) * phi
      
      // Calculate position on sphere
      const radius = 3 + (skill.level / 100)
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      // Random rotation and movement values
      return {
        ...skill,
        position: [x, y, z],
        rotation: [Math.random(), Math.random(), Math.random()],
        speed: 0.2 + Math.random() * 0.5,
        offset: Math.random() * Math.PI * 2
      }
    })
  }, [])
  
  // Slow rotation of the entire orbit
  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.getElapsedTime() * 0.05
    group.current.rotation.y = t
  })
  
  return (
    <group ref={group}>
      {skillPoints.map((skill, i) => (
        <SkillNode 
          key={i}
          name={skill.name}
          level={skill.level}
          position={skill.position}
          rotation={skill.rotation}
          speed={skill.speed}
          offset={skill.offset}
        />
      ))}
    </group>
  )
}

function SkillNode({ name, level, position, rotation, speed, offset }) {
  const nodeRef = useRef<THREE.Group>(null!)
  const color = new THREE.Color(`hsl(${30 + level * 0.3}, 100%, 50%)`)
  
  // Individual node animation
  useFrame(({ clock }) => {
    if (!nodeRef.current) return
    const t = clock.getElapsedTime()
    
    // Small oscillation
    nodeRef.current.position.x += Math.sin(t * speed + offset) * 0.002
    nodeRef.current.position.y += Math.cos(t * speed + offset) * 0.002
    nodeRef.current.position.z += Math.sin(t * speed * 0.8 + offset) * 0.002
  })
  
  return (
    <group ref={nodeRef} position={position} rotation={rotation}>
      <Float speed={1} rotationIntensity={0.5} floatIntensity={0.5}>
        <Trail
          width={0.05}
          length={5}
          color={color}
          attenuation={(width) => width / 5}
        >
          <mesh>
            <sphereGeometry args={[0.08 + level * 0.002, 16, 16]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Trail>
        
        <Text
          position={[0, 0.15, 0]}
          fontSize={0.12 + level * 0.001}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#111827"
        >
          {name}
        </Text>
        
        <Text
          position={[0, -0.15, 0]}
          fontSize={0.1}
          color={color}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.01}
          outlineColor="#111827"
        >
          {level}%
        </Text>
      </Float>
    </group>
  )
}

export default function SkillsVisualization() {
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        {/* Add better lighting instead of relying on environment maps */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#ffffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.2} color="#f97316" />
        <pointLight position={[0, 0, 5]} intensity={0.5} color="#f97316" />
        
        <SkillsOrbit />
        
        <OrbitControls 
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.5}
          dampingFactor={0.1}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI * 3/4}
        />
      </Canvas>
    </div>
  )
}
