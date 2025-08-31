"use client"

import { useRef, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { useGLTF, ContactShadows } from "@react-three/drei"
import { SectionCanvas } from "@/components/three/section-canvas"
import type * as THREE from "three"

type EnvPreset =
  | "apartment"
  | "city"
  | "dawn"
  | "forest"
  | "lobby"
  | "night"
  | "park"
  | "studio"
  | "sunset"
  | "warehouse"

function VehicleModel() {
  const { scene } = useGLTF("/assets/3d/duck.glb")
  const ref = useRef<THREE.Group>(null!)
  const glowRef = useRef<THREE.Mesh>(null!)

  useEffect(() => {
    scene.traverse((obj) => {
      const mesh = obj as unknown as THREE.Mesh
      // @ts-expect-error - runtime type guard for three mesh
      if (mesh?.isMesh && mesh.material) {
        const mat = mesh.material as THREE.MeshStandardMaterial
        if (mat) {
          mat.metalness = Math.min(0.8, mat.metalness ?? 0.6)
          mat.roughness = Math.max(0.25, mat.roughness ?? 0.35)
          ;(mat as any).envMapIntensity = 1.2
        }
      }
    })
  }, [scene])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.y = t * 0.3
      ref.current.position.y = Math.sin(t * 1.2) * 0.25
    }
    if (glowRef.current) {
      const s = 1 + Math.sin(t * 1.3) * 0.05
      glowRef.current.scale.set(s, s, 1)
    }
  })

  return (
    <group ref={ref} dispose={null} position={[0, 0.2, 0]} scale={1.8}>
      <pointLight position={[2.8, 2.0, -2.0]} intensity={0.9} color="#7c3aed" />
      <pointLight position={[-2.2, 1.5, 2.5]} intensity={0.6} color="#8b5cf6" />
      <mesh ref={glowRef} rotation-x={Math.PI / 2} position={[0, -0.4, 0]}>
        <torusGeometry args={[1.1, 0.04, 28, 64]} />
        <meshStandardMaterial
          color="#6d28d9"
          emissive="#7c3aed"
          emissiveIntensity={0.8}
          metalness={0.1}
          roughness={0.25}
        />
      </mesh>
      <primitive object={scene} />
      <ContactShadows opacity={0.45} scale={10} blur={2.4} far={4} resolution={512} color="#000" />
    </group>
  )
}
useGLTF.preload("/assets/3d/duck.glb")

export function VehicleSection({ env = "city" }: { env?: EnvPreset }) {
  return (
    <SectionCanvas cameraPosition={[0, 1.2, 7]} envPreset={env}>
      <VehicleModel />
    </SectionCanvas>
  )
}
