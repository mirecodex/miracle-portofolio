'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { random } from 'maath'

function ParticleSystem({ count = 5000 }) {
  const points = useRef<THREE.Points>(null!)
  const sphere = random.inSphere(new Float32Array(count * 3), { radius: 10 })

  useFrame((state, delta) => {
    if (!points.current) return
    points.current.rotation.x -= delta / 10
    points.current.rotation.y -= delta / 15
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={points}
        positions={sphere}
        stride={3}
        frustumCulled={false}
      >
        <PointMaterial
          transparent
          color="#f97316"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  )
}

export default function FloatingParticles() {
  return (
    <div className="fixed inset-0 -z-10 opacity-70">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ParticleSystem />
      </Canvas>
    </div>
  )
}
