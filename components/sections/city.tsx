"use client"

import { useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { SectionCanvas } from "@/components/three/section-canvas"
import * as THREE from "three"

type CityBuilding = {
  x: number
  z: number
  h: number
  color: string
  glow?: boolean
}

function Buildings() {
  const buildings = useMemo<CityBuilding[]>(() => {
    const arr: CityBuilding[] = []
    const size = 6
    const step = 0.9
    const palette = ["#cbd5e1", "#94a3b8", "#8b5cf6", "#a78bfa"] // slate + purple tints
    for (let x = -size; x <= size; x += step) {
      for (let z = -size; z <= size; z += step) {
        if (Math.random() > 0.8) continue
        const h = 0.5 + Math.random() * 3.5
        const color = palette[Math.floor(Math.random() * palette.length)]
        const glow = Math.random() > 0.85 // some buildings get emissive "neon"
        arr.push({ x, z, h, color, glow })
      }
    }
    return arr
  }, [])

  useFrame(({ clock, scene }) => {
    const t = clock.getElapsedTime()
    const g = scene.getObjectByName("cityGroup")
    if (g) g.rotation.y = Math.sin(t * 0.05) * 0.1
  })

  return (
    <group name="cityGroup">
      {/* ground */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -1.6, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#0b0b12" />
      </mesh>

      {/* skyline */}
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.h / 2 - 1.5, b.z]} castShadow receiveShadow>
          <boxGeometry args={[0.7, b.h, 0.7]} />
          <meshStandardMaterial
            color={b.color}
            emissive={b.glow ? new THREE.Color("#7c3aed") : new THREE.Color("#000000")}
            emissiveIntensity={b.glow ? 0.45 : 0}
            metalness={0.2}
            roughness={0.6}
          />
        </mesh>
      ))}

      {/* subtle fog for depth */}
      <fogExp2 attach="fog" args={["#0b0b12", 0.02]} />
      {/* ambient sky mood */}
      <hemisphereLight skyColor={"#6d28d9"} groundColor={"#0b0b12"} intensity={0.25} />
    </group>
  )
}

export function CitySection({ compact = false }: { compact?: boolean }) {
  return (
    <SectionCanvas cameraPosition={[0, 2.2, 10]}>
      <group scale={compact ? 0.8 : 1}>
        <Buildings />
      </group>
    </SectionCanvas>
  )
}
