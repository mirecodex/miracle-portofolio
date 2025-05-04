'use client'

import { useState, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { 
  useTexture, 
  Image as DreiImage, 
  Preload, 
  PresentationControls,
  Html,
  Text as DreiText
} from '@react-three/drei'
import { motion } from 'framer-motion'
import { projectsData } from '@/lib/dummy-data'
import * as THREE from 'three'

function ProjectDisplay({ projects, activeIndex, setActiveIndex }) {
  const group = useRef()
  const { viewport } = useThree()
  const width = viewport.width / 2.5
  
  // Rotate the group to show active project
  useFrame((state) => {
    if (!group.current) return
    const targetRotation = -activeIndex * (Math.PI / 2) // 90 degrees per project
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotation,
      0.05
    )
  })
  
  return (
    <group ref={group}>
      {projects.map((project, i) => (
        <ProjectPanel 
          key={i}
          project={project}
          position={[0, 0, -width * i]}
          width={width}
          isActive={activeIndex === i}
          onClick={() => setActiveIndex(i)}
        />
      ))}
    </group>
  )
}

function ProjectPanel({ project, position, width, isActive, onClick }) {
  const group = useRef()
  
  // Use useFrame for hover effect instead of framer-motion-3d
  useFrame(({ clock }) => {
    if (group.current && isActive) {
      const t = clock.getElapsedTime()
      group.current.scale.x = THREE.MathUtils.lerp(group.current.scale.x, 1.05, 0.1)
      group.current.scale.y = THREE.MathUtils.lerp(group.current.scale.y, 1.05, 0.1)
      group.current.scale.z = THREE.MathUtils.lerp(group.current.scale.z, 1.05, 0.1)
    } else if (group.current) {
      group.current.scale.x = THREE.MathUtils.lerp(group.current.scale.x, 1, 0.1)
      group.current.scale.y = THREE.MathUtils.lerp(group.current.scale.y, 1, 0.1)
      group.current.scale.z = THREE.MathUtils.lerp(group.current.scale.z, 1, 0.1)
    }
  })
  
  return (
    <group position={position}>
      <group 
        ref={group}
        onClick={onClick}
      >
        {/* Create a colored rectangle instead of loading an image */}
        <mesh scale={[width, width * 0.6, 0.01]}>
          <boxGeometry />
          <meshStandardMaterial color={isActive ? "#f97316" : "#fb923c"} />
          <Html position={[0, 0, 0.1]} center>
            <div className="text-white text-center px-4 py-2 bg-dark-800/80 rounded">
              {project.title}
            </div>
          </Html>
        </mesh>
        
        {/* Show additional info when active */}
        {isActive && (
          <group position={[0, -width * 0.35, 0.1]}>
            <mesh position={[0, 0, -0.05]} scale={[width + 0.2, width * 0.25, 0.01]}>
              <boxGeometry />
              <meshStandardMaterial color="#111827" opacity={0.8} transparent />
            </mesh>
            
            <DreiText 
              position={[0, 0.15, 0]} 
              color="white" 
              fontSize={0.12} 
              maxWidth={width * 0.9}
              textAlign="center"
            >
              {project.title}
            </DreiText>
            
            <DreiText 
              position={[0, -0.05, 0]} 
              color="#f97316" 
              fontSize={0.08} 
              maxWidth={width * 0.9}
              textAlign="center"
            >
              {project.category}
            </DreiText>
          </group>
        )}
      </group>
    </group>
  )
}

export default function ProjectShowcase() {
  const [activeProject, setActiveProject] = useState(0)
  
  return (
    <div className="h-[500px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <color attach="background" args={["#111827"]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <ProjectDisplay 
            projects={projectsData}
            activeIndex={activeProject}
            setActiveIndex={setActiveProject}
          />
        </PresentationControls>
        
        <Preload all />
      </Canvas>
      
      {/* Navigation controls */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2">
        {projectsData.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveProject(i)}
            className={`w-3 h-3 rounded-full transition-colors ${
              activeProject === i ? 'bg-primary-500' : 'bg-dark-600'
            }`}
            aria-label={`View project ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
