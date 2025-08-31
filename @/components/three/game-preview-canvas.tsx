"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Scroll, ScrollControls, Environment, Html, Float } from "@react-three/drei"
import { Suspense, useMemo, useRef } from "react"
import * as THREE from "three"
import { useScroll } from "@react-three/drei"
import Math from "mathjs"

export default function GamePreviewCanvas() {
  return (
    <div className="relative h-[600vh] w-full">
      <Canvas
        camera={{ position: [0, 2.5, 10], fov: 50 }}
        shadows
        gl={{ antialias: true }}
        className="sticky top-0 h-[100vh] w-full"
      >
        <color attach="background" args={["#0b1220"]} />
        <Suspense fallback={null}>
          {/* 6 scroll pages to match overlays */}
          <ScrollControls pages={6} damping={0.18}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[6, 8, 4]} intensity={1.4} castShadow />
            <Environment preset="city" />

            {/* Scenes */}
            <HeroRig />
            <CitySection />
            <PlanetSection />
            <VehicleSection />

            {/* Optional HTML in-scene labels */}
            <Scroll html>
              <div />
            </Scroll>

            {/* Allow 360 drag at any time */}
            <OrbitControls
              enableDamping
              dampingFactor={0.08}
              enablePan={false}
              minDistance={4}
              maxDistance={18}
              target={[0, 1.5, 0]}
            />
          </ScrollControls>
        </Suspense>
      </Canvas>
    </div>
  )
}

function HeroRig() {
  const group = useRef<THREE.Group>(null)
  const scroll = useScroll()
  useFrame((_, dt) => {
    const t = scroll.offset // 0..1 across all pages
    const g = group.current
    if (!g) return
    // Subtle camera-stage animation as user begins scrolling
    g.position.y = THREE.MathUtils.damp(g.position.y, t * -3.5, 3, dt)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, t * Math.PI * 1.2, 3, dt)
  })
  return (
    <group ref={group}>
      {/* Futuristic floor grid */}
      <GridFloor />
      {/* Floating title badge as 3D element */}
      <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.5}>
        <TitleBadge />
      </Float>
    </group>
  )
}

function GridFloor() {
  const gridMat = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#06b6d4"),
        transparent: true,
        opacity: 0.12,
      }),
    [],
  )
  const geo = useMemo(() => new THREE.PlaneGeometry(80, 80, 40, 40), [])
  return (
    <mesh geometry={geo} material={gridMat} rotation-x={-Math.PI / 2} position-y={-0.01}>
      <gridHelper args={[80, 40, "#0ea5a6", "#0ea5a6"]} />
    </mesh>
  )
}

function TitleBadge() {
  return (
    <Html center>
      <div className="pointer-events-none select-none rounded-lg border border-[rgba(255,255,255,0.2)] bg-[rgba(11,18,32,0.75)] px-4 py-2 text-center">
        <span className="text-sm font-medium text-white/90">Scroll to Explore</span>
      </div>
    </Html>
  )
}

// City with procedurally generated buildings animated by scroll
function CitySection() {
  const group = useRef<THREE.Group>(null)
  const scroll = useScroll()
  const buildings = useMemo(() => {
    const rng = Math.seedrandom("city") || Math.random
    const items = []
    const count = 80
    for (let i = 0; i < count; i++) {
      const x = (rng() - 0.5) * 40
      const z = (rng() - 0.5) * 40
      const h = 0.5 + rng() * 6
      items.push({ x, z, h })
    }
    return items
  }, [])

  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    // Animate city growth around scroll page ~1
    const t = THREE.MathUtils.smoothstep(scroll.range(0.15, 0.2), 0, 1)
    g.position.z = THREE.MathUtils.damp(g.position.z, -5 + -8 * t, 3, dt)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, t * 0.8, 3, dt)
  })

  return (
    <group ref={group} position={[0, 0, -5]}>
      {buildings.map((b, i) => (
        <Building key={i} x={b.x} z={b.z} h={b.h} index={i} />
      ))}
    </group>
  )
}

function Building({ x, z, h, index }: { x: number; z: number; h: number; index: number }) {
  const mesh = useRef<THREE.Mesh>(null)
  const scroll = useScroll()
  useFrame((_, dt) => {
    const m = mesh.current
    if (!m) return
    // Staggered rise animation
    const start = 0.18 + (index % 10) * 0.003
    const end = start + 0.12
    const t = THREE.MathUtils.clamp((scroll.offset - start) / (end - start), 0, 1)
    const eased = THREE.MathUtils.smoothstep(t, 0, 1)
    const targetY = eased * h
    m.position.y = THREE.MathUtils.damp(m.position.y, targetY / 2, 5, dt)
    ;(m.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.15 + 0.6 * eased
  })
  return (
    <mesh ref={mesh} position={[x, 0, z]} castShadow receiveShadow>
      <boxGeometry args={[0.8, h, 0.8]} />
      <meshStandardMaterial color="#1f2937" metalness={0.3} roughness={0.6} emissive="#06b6d4" />
    </mesh>
  )
}

// Planet with ring and moons, draggable rotation via OrbitControls (global)
function PlanetSection() {
  const group = useRef<THREE.Group>(null)
  const scroll = useScroll()
  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    const s = THREE.MathUtils.smoothstep(scroll.range(0.32, 0.18), 0, 1)
    g.position.set(
      THREE.MathUtils.damp(g.position.x, 0, 3, dt),
      THREE.MathUtils.damp(g.position.y, 1.5, 3, dt),
      THREE.MathUtils.damp(g.position.z, -2, 3, dt),
    )
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, s * Math.PI * 2, 3, dt)
  })
  return (
    <group ref={group}>
      <Planet />
    </group>
  )
}

function Planet() {
  const tex = new THREE.TextureLoader().load("/assets/3d/texture_earth.jpg")
  return (
    <group>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial map={tex} metalness={0.1} roughness={0.8} />
      </mesh>
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[1.8, 0.06, 16, 128]} />
        <meshBasicMaterial color="#a3e635" />
      </mesh>
      <Moon distance={2.5} size={0.3} speed={0.6} color="#06b6d4" />
      <Moon distance={3.4} size={0.22} speed={0.9} color="#ffffff" />
    </group>
  )
}

function Moon({ distance, size, speed, color }: { distance: number; size: number; speed: number; color: string }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    const x = Math.cos(t) * distance
    const z = Math.sin(t) * distance
    const g = ref.current
    if (g) g.position.set(x, 0.3, z)
  })
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} metalness={0.2} roughness={0.6} />
      </mesh>
    </group>
  )
}

// Vehicle section using sample duck model to simulate a hover car
function VehicleSection() {
  const group = useRef<THREE.Group>(null)
  const scroll = useScroll()
  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    const s = THREE.MathUtils.smoothstep(scroll.range(0.52, 0.16), 0, 1)
    g.position.y = THREE.MathUtils.damp(g.position.y, 0.6 + Math.sin(s * Math.PI) * 0.4, 4, dt)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, s * Math.PI * 2, 4, dt)
  })
  return (
    <group ref={group} position={[0, 0.8, 1.5]}>
      <HoverPad />
      <HoverCar />
    </group>
  )
}

function HoverPad() {
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
      <circleGeometry args={[1.6, 48]} />
      <meshStandardMaterial color="#0b1220" emissive="#06b6d4" emissiveIntensity={0.7} />
    </mesh>
  )
}

function HoverCar() {
  // Using built-in duck model as a stand-in for a vehicle
  // To replace with a real car: load your GLB and swap this component.
  const { useGLTF } = require("@react-three/drei")
  const gltf = useGLTF("/assets/3d/duck.glb")
  return (
    <group scale={0.8} position={[0, 0.4, 0]}>
      <primitive object={gltf.scene} />
    </group>
  )
}
