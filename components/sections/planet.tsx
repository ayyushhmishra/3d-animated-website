"use client"

import { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import { TextureLoader } from "three"
import type * as THREE from "three"
import { SectionCanvas } from "@/components/three/section-canvas"

function PlanetSystem() {
  const tex = useLoader(TextureLoader, "/assets/3d/texture_earth.jpg")
  const planetRef = useRef<THREE.Mesh>(null!)
  const moonRef = useRef<THREE.Mesh>(null!)
  const moonRef2 = useRef<THREE.Mesh>(null!)

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (planetRef.current) planetRef.current.rotation.y = t * 0.15
    const r1 = 3.2
    const r2 = 4.1
    if (moonRef.current) {
      moonRef.current.position.x = Math.cos(t * 0.6) * r1
      moonRef.current.position.z = Math.sin(t * 0.6) * r1
    }
    if (moonRef2.current) {
      moonRef2.current.position.x = Math.cos(t * 0.35 + 1.2) * r2
      moonRef2.current.position.z = Math.sin(t * 0.35 + 1.2) * r2
    }
  })

  return (
    <group position={[0, 0.2, 0]}>
      {/* main planet */}
      <mesh ref={planetRef} castShadow receiveShadow>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial map={tex} />
      </mesh>

      {/* soft purple atmosphere shell */}
      <mesh scale={1.05}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhongMaterial color={"#7c3aed"} transparent opacity={0.12} side={2} />
      </mesh>

      {/* orbit rings */}
      <mesh rotation-x={-Math.PI / 2}>
        <ringGeometry args={[3.15, 3.2, 128]} />
        <meshBasicMaterial color={"#a78bfa"} transparent opacity={0.35} />
      </mesh>
      <mesh rotation-x={-Math.PI / 2}>
        <ringGeometry args={[4.05, 4.1, 128]} />
        <meshBasicMaterial color={"#7c3aed"} transparent opacity={0.25} />
      </mesh>

      {/* moons */}
      <mesh ref={moonRef} position={[3.2, 0, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>

      <mesh ref={moonRef2} position={[4.1, 0.5, 0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#93c5fd" />
      </mesh>
    </group>
  )
}

export function PlanetSection() {
  return (
    <SectionCanvas cameraPosition={[0, 0.8, 8]} envPreset="night">
      <PlanetSystem />
    </SectionCanvas>
  )
}
