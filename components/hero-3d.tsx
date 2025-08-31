"use client"

import { Canvas } from "@react-three/fiber"
import {
  Html,
  Scroll,
  ScrollControls,
  OrbitControls,
  useGLTF,
  useTexture,
  Text,
  Float,
  useScroll,
  Environment,
  ContactShadows,
  PerspectiveCamera,
  MeshTransmissionMaterial,
  MeshDistortMaterial,
} from "@react-three/drei"
import { Suspense, useMemo, useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import FeatureCard from "./FeatureCard"
import React from "react"
import type { JSX } from "react"

function Scene() {
  const scroll = useScroll()
  return (
    <>
      {/* Enhanced Lighting for Black/Purple Theme */}
      <ambientLight intensity={0.3} color="#8b5cf6" />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color={"#a855f7"} />
      <directionalLight position={[-5, -2, -5]} intensity={0.8} color={"#c084fc"} />
      <pointLight position={[0, 5, 0]} intensity={2} color="#8b5cf6" />
      <spotLight position={[10, 10, 10]} angle={0.3} intensity={1.5} color="#a855f7" />

      {/* Enhanced Starfield with Purple Tones */}
      <Stars count={1200} radius={50} />

      {/* Central Crystal/Orb */}
      <Float speed={1.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <CrystalOrb position={[0, 0, 0]} />
      </Float>

      {/* Hero Garden Model */}
      <HeroGardenModel />
      
      {/* Hero City Model - DAE format */}
      <HeroCityModel />
      
      {/* Flying Car Model */}
      <FuturisticCar />

      {/* 3D Title with Glow */}
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.4}>
        <Text
          position={[0, 2, -1.5]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.ttf"
        >
          3D ANIMATION
          <meshStandardMaterial
            color="#ffffff"
            emissive="#8b5cf6"
            emissiveIntensity={0.4}
          />
        </Text>
      </Float>

      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
        <Text
          position={[0, 1.4, -1.5]}
          fontSize={0.3}
          color="#c084fc"
          anchorX="center"
          anchorY="middle"
          font="/fonts/Geist-Bold.ttf"
        >
          SHOWCASE
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={0.3}
          />
        </Text>
      </Float>

      {/* Enhanced City Section */}
      <EnhancedCitySection />

      {/* Enhanced Planet Section */}
      <EnhancedPlanetSection />

      {/* Enhanced Vehicle Section */}
      <EnhancedVehicleSection />

      {/* Floating Geometric Elements */}
      <FloatingGeometry />
    </>
  )
}

// Enhanced Crystal Orb with transmission material
function CrystalOrb(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.01
      ref.current.rotation.y += 0.02
      const time = state.clock.getElapsedTime()
      ref.current.scale.setScalar(1 + Math.sin(time * 2) * 0.1)
    }
  })

  return (
    <mesh ref={ref} {...props} scale={[1.6, 1.6, 1.6]}>
      <icosahedronGeometry args={[1, 1]} />
      <MeshTransmissionMaterial
        color="#8b5cf6"
        transmission={1}
        opacity={0.8}
        metalness={0.2}
        roughness={0.1}
        ior={1.5}
        thickness={1.5}
        envMapIntensity={1.5}
        clearcoat={1}
        attenuationDistance={0.5}
        attenuationColor="#a855f7"
      />
    </mesh>
  )
}

// Enhanced Earth Sphere for planet section
function EarthSphere(props: JSX.IntrinsicElements["mesh"]) {
  const ref = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y += 0.005
    }
  })

  return (
    <mesh ref={ref} {...props} scale={[1.4, 1.4, 1.4]}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        color="#1a1a1a"
        metalness={0.8}
        roughness={0.2}
        emissive="#8b5cf6"
        emissiveIntensity={0.3}
      />
    </mesh>
  )
}

// Enhanced Futuristic Car
function FuturisticCar() {
  const scroll = useScroll()
  const ref = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime()
      // Floating motion
      ref.current.position.y = -0.2 + Math.sin(t * 1.5) * 0.3
      // Gentle rotation
      ref.current.rotation.y = Math.sin(t * 0.5) * 0.2
      // Move with scroll
      ref.current.position.z = 0.5 + scroll.offset * 3
    }
  })

  return (
    <group ref={ref} position={[-2, -0.2, 0.5]}>
      {/* Car Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.2, 0.4, 0.6]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Car Windows */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1, 0.3, 0.5]} />
        <meshStandardMaterial
          color="#a855f7"
          metalness={0.1}
          roughness={0.1}
          opacity={0.7}
          transparent
        />
      </mesh>
      
      {/* Wheels */}
      <mesh position={[-0.4, -0.3, 0.3]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.2}
          emissive="#c084fc"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[-0.4, -0.3, -0.3]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.2}
          emissive="#c084fc"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0.4, -0.3, 0.3]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.2}
          emissive="#c084fc"
          emissiveIntensity={0.3}
        />
      </mesh>
      <mesh position={[0.4, -0.3, -0.3]}>
        <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.2}
          emissive="#c084fc"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

// Enhanced Stars with Purple Theme
function Stars({ count = 1200, radius = 50 }: { count?: number; radius?: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = radius * Math.sqrt(Math.random())
      const theta = Math.random() * 2 * Math.PI
      const phi = Math.acos(2 * Math.random() - 1)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      arr.set([x, y, z], i * 3)
    }
    return arr
  }, [count, radius])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.0001
      ref.current.rotation.y += 0.0002
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={0.025} 
        color={"#8b5cf6"} 
        sizeAttenuation 
        transparent 
        opacity={0.8}
      />
    </points>
  )
}

// Floating Geometric Elements
function FloatingGeometry() {
  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[4, 2, -2]}>
          <octahedronGeometry args={[0.3]} />
          <meshStandardMaterial
            color="#a855f7"
            metalness={0.8}
            roughness={0.2}
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh position={[-3, 1, -1]}>
          <tetrahedronGeometry args={[0.4]} />
          <meshStandardMaterial
            color="#c084fc"
            metalness={0.7}
            roughness={0.3}
            emissive="#a855f7"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1.8}>
        <mesh position={[2, -1, 1]}>
          <dodecahedronGeometry args={[0.25]} />
          <meshStandardMaterial
            color="#7c3aed"
            metalness={0.9}
            roughness={0.1}
            emissive="#8b5cf6"
            emissiveIntensity={0.6}
          />
        </mesh>
      </Float>
    </group>
  )
}

function ScrollAnimations() {
  // Animate based on scroll via css transforms of sections; the 3D camera movement is handled by OrbitControls plus user scroll parallax in HTML.
  return (
    <>
      {/* HTML content mapped to scroll pages */}
      <Scroll html>
        <div className="w-full h-full">
          {/* Page 1 - Hero */}
          <section className="h-screen flex items-center justify-center px-6">
            <div className="max-w-xl text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-semibold text-balance">
                Experience the Next-Gen 3D Game Preview
              </h1>
              <p className="text-white/70 leading-relaxed">
                Scroll to explore cinematic sequences, dynamic 3D motion, and interactive 360° viewing.
              </p>
              <div className="flex items-center justify-center gap-3">
                <a
                  href="#cta"
                  className="px-5 py-3 rounded-md bg-cyan-500 text-black font-medium hover:bg-cyan-400 transition-colors"
                >
                  Watch Trailer
                </a>
                <a
                  href="#features"
                  className="px-5 py-3 rounded-md border border-white/20 hover:border-white/40 transition-colors"
                >
                  Discover Features
                </a>
              </div>
            </div>
          </section>

          {/* Page 2 - World */}
          <section id="world" className="h-screen flex items-center justify-center px-6">
            <div className="max-w-lg text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-semibold">A Living, Breathing World</h2>
              <p className="text-white/70">
                Glide past orbits, feel depth with parallax stars, and rotate the scene to view from any angle.
              </p>
              <p className="text-lime-300/90 text-sm">Tip: Drag to rotate. Pinch/scroll to zoom.</p>
            </div>
          </section>

          {/* Page 3 - Features */}
          <section id="features" className="h-screen px-6 flex items-center justify-center">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard title="Cinematic Scroll" desc="Timeline-driven 3D reveals synced to your scroll." />
              <FeatureCard title="Interactive 360°" desc="Orbit and zoom to inspect animations from any angle." />
              <FeatureCard title="Mobile-First" desc="Optimized with lightweight effects and smooth motion." />
            </div>
          </section>

          {/* Page 4 - City Showcase */}
          <section className="h-screen flex items-center justify-center px-6">
            <div className="max-w-xl text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-semibold">Futuristic City</h2>
              <p className="text-white/70">
                Scroll to see towers rise with neon emissive edges and the skyline spin into view.
              </p>
            </div>
          </section>

          {/* Page 5 - Vehicles */}
          <section className="h-screen flex items-center justify-center px-6">
            <div className="max-w-xl text-center space-y-3">
              <h2 className="text-3xl md:text-4xl font-semibold">Hover Vehicles</h2>
              <p className="text-white/70">Hover above a reactive pad and rotate to view every angle.</p>
            </div>
          </section>

          {/* Page 6 - CTA */}
          <section id="cta" className="h-screen flex items-center justify-center px-6">
            <div className="max-w-md text-center space-y-4">
              <h3 className="text-3xl md:text-4xl font-semibold">Ready to Play?</h3>
              <p className="text-white/70">Book a live demo and get early access to the preview build.</p>
              <a
                href="#"
                className="px-6 py-3 rounded-md bg-lime-400 text-black font-medium hover:bg-lime-300 transition-colors"
              >
                Get Early Access
              </a>
            </div>
          </section>
        </div>
      </Scroll>
    </>
  )
}

// Enhanced City Section with Purple Theme
function EnhancedCitySection() {
  const group = React.useRef<THREE.Group>(null)
  const scroll = useScroll()
  const buildings = useMemo(() => {
    const items: { x: number; z: number; h: number; type: number }[] = []
    const count = 120
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 45
      const z = (Math.random() - 0.5) * 45
      const h = 0.8 + Math.random() * 8
      const type = Math.floor(Math.random() * 3)
      items.push({ x, z, h, type })
    }
    return items
  }, [])

  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    const t = scroll.range(0.18, 0.18)
    g.position.z = THREE.MathUtils.damp(g.position.z, -8 - 8 * t, 3, dt)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, t * 1.2, 3, dt)
  })

  return (
    <group ref={group} position={[0, 0, -8]}>
      {buildings.map((b, i) => (
        <EnhancedBuilding key={i} x={b.x} z={b.z} h={b.h} index={i} type={b.type} />
      ))}
    </group>
  )
}

// Enhanced Building with Purple Theme
function EnhancedBuilding({ x, z, h, index, type }: { x: number; z: number; h: number; index: number; type: number }) {
  const mesh = React.useRef<THREE.Mesh>(null)
  const scroll = useScroll()
  
  const materials = [
    { color: "#1a1a1a", emissive: "#8b5cf6", metalness: 0.8, roughness: 0.2 },
    { color: "#2a2a2a", emissive: "#a855f7", metalness: 0.7, roughness: 0.3 },
    { color: "#0a0a0a", emissive: "#c084fc", metalness: 0.9, roughness: 0.1 }
  ]
  
  const material = materials[type]
  
  useFrame((_, dt) => {
    const m = mesh.current
    if (!m) return
    const base = 0.2
    const span = 0.16
    const start = base + (index % 15) * 0.002
    const t = THREE.MathUtils.clamp((scroll.offset - start) / span, 0, 1)
    const eased = t * t * (3 - 2 * t)
    m.position.y = THREE.MathUtils.damp(m.position.y, (eased * h) / 2, 6, dt)
    ;(m.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.2 + 0.8 * eased
  })
  
  return (
    <mesh ref={mesh} position={[x, 0, z]} castShadow receiveShadow>
      <boxGeometry args={[0.9, h, 0.9]} />
      <meshStandardMaterial 
        color={material.color}
        metalness={material.metalness}
        roughness={material.roughness}
        emissive={material.emissive}
      />
    </mesh>
  )
}

// Enhanced Planet Section with Purple Theme
function EnhancedPlanetSection() {
  const group = React.useRef<THREE.Group>(null)
  const scroll = useScroll()
  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    const t = scroll.range(0.36, 0.18)
    g.position.set(
      THREE.MathUtils.damp(g.position.x, 0, 3, dt),
      THREE.MathUtils.damp(g.position.y, 1.5 + t * 0.8, 3, dt),
      THREE.MathUtils.damp(g.position.z, -3, 3, dt),
    )
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, t * Math.PI * 2.5, 3, dt)
  })
  return (
    <group ref={group}>
      <EarthSphere position={[0, 0, 0]} />
      
      {/* Enhanced Ring System */}
      <mesh rotation-x={Math.PI / 2}>
        <torusGeometry args={[2.2, 0.08, 20, 128]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          metalness={0.8}
          roughness={0.2}
          emissive="#a855f7"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      <mesh rotation-x={Math.PI / 2} rotation-z={Math.PI / 4}>
        <torusGeometry args={[2.8, 0.05, 16, 128]} />
        <meshStandardMaterial 
          color="#a855f7" 
          metalness={0.7}
          roughness={0.3}
          emissive="#c084fc"
          emissiveIntensity={0.2}
        />
      </mesh>
      
      {/* Enhanced Moons */}
      <EnhancedMoon distance={3.2} size={0.32} speed={0.7} color="#8b5cf6" />
      <EnhancedMoon distance={4.1} size={0.25} speed={1.1} color="#a855f7" />
      <EnhancedMoon distance={5.2} size={0.18} speed={0.5} color="#c084fc" />
    </group>
  )
}

// Enhanced Moon with Purple Theme
function EnhancedMoon({ distance, size, speed, color }: { distance: number; size: number; speed: number; color: string }) {
  const ref = React.useRef<THREE.Group>(null)
  const meshRef = React.useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    const x = Math.cos(t) * distance
    const z = Math.sin(t) * distance
    const g = ref.current
    if (g) g.position.set(x, 0.4 + Math.sin(t * 2) * 0.1, z)
    
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01
      meshRef.current.rotation.y += 0.02
    }
  })
  
  return (
    <group ref={ref}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial 
          color={color} 
          metalness={0.8} 
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  )
}

// Enhanced Vehicle Section with Purple Theme
function EnhancedVehicleSection() {
  const group = React.useRef<THREE.Group>(null)
  const scroll = useScroll()
  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    const t = scroll.range(0.54, 0.2)
    g.position.y = THREE.MathUtils.damp(g.position.y, 0.8 + Math.sin(t * Math.PI) * 0.6, 4, dt)
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, t * Math.PI * 2.5, 4, dt)
  })
  return (
    <group ref={group} position={[0, 1, 2]}>
      <EnhancedHoverPad />
      <EnhancedHoverCar />
      <VehicleShowcaseElements />
    </group>
  )
}

// Enhanced Hover Pad with Purple Theme
function EnhancedHoverPad() {
  const ref = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (ref.current) {
      const time = clock.getElapsedTime()
      ;(ref.current.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.4 + Math.sin(time * 3) * 0.3
    }
  })
  
  return (
    <group>
      <mesh ref={ref} rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
        <circleGeometry args={[2, 64]} />
        <meshStandardMaterial 
          color="#0a0a0a" 
          emissive="#8b5cf6" 
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Inner ring */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.01, 0]}>
        <ringGeometry args={[1.2, 1.8, 32]} />
        <meshStandardMaterial 
          color="#a855f7" 
          emissive="#c084fc" 
          emissiveIntensity={0.8}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  )
}

// Enhanced Hover Car
function EnhancedHoverCar() {
  const ref = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (ref.current) {
      const t = clock.getElapsedTime()
      ref.current.position.y = 0.5 + Math.sin(t * 2.5) * 0.15
      ref.current.rotation.y += 0.01
    }
  })
  
  return (
    <group ref={ref} position={[0, 0.5, 0]}>
      {/* Main Car Body */}
      <mesh>
        <boxGeometry args={[1.5, 0.5, 0.8]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.95}
          roughness={0.05}
          emissive="#8b5cf6"
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Car Top */}
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[1.2, 0.4, 0.6]} />
        <meshStandardMaterial
          color="#a855f7"
          metalness={0.1}
          roughness={0.1}
          opacity={0.8}
          transparent
        />
      </mesh>
      
      {/* Energy Core */}
      <mesh position={[0, 0.6, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#8b5cf6"
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  )
}

// Vehicle Showcase Elements
function VehicleShowcaseElements() {
  return (
    <group>
      {/* Floating Rings */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <mesh position={[3, 1, 0]} rotation-x={Math.PI / 2}>
          <torusGeometry args={[0.8, 0.05, 16, 32]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#a855f7"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
      
      <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
        <mesh position={[-3, 0.5, 0]} rotation-z={Math.PI / 4}>
          <torusGeometry args={[0.6, 0.04, 12, 24]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#c084fc"
            emissiveIntensity={0.4}
          />
        </mesh>
      </Float>
    </group>
  )
}

export default function Hero3D() {
  return (
    <div className="relative w-full h-full bg-black">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#0a0a0a")
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
        shadows
      >
        <Suspense fallback={null}>
          {/* Enhanced Environment */}
          <Environment preset="night" />
          <fog attach="fog" args={["#0a0a0a", 10, 50]} />
          
          {/* ScrollControls: 6 pages */}
          <ScrollControls pages={6} damping={0.3}>
            <Scene />
            {/* Overlay HTML pages */}
            <ScrollAnimations />
          </ScrollControls>
          
          {/* Enhanced OrbitControls */}
          <OrbitControls
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.5}
            minDistance={2}
            maxDistance={8}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 6}
          />
          
          {/* Contact Shadows for enhanced realism */}
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.3} 
            scale={20} 
            blur={2} 
            color="#8b5cf6" 
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Hero Garden Model - Beautiful Garden Scene
function HeroGardenModel() {
  const gardenRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (gardenRef.current) {
      const time = clock.getElapsedTime()
      gardenRef.current.rotation.y += 0.001
      gardenRef.current.position.y = Math.sin(time * 0.3) * 0.1
    }
  })
  
  return (
    <Float speed={0.4} rotationIntensity={0.05} floatIntensity={0.2}>
      <group ref={gardenRef} position={[8, -1, -6]} scale={[2, 2, 2]}>
        {/* Garden Ground */}
        <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[8, 8]} />
          <meshStandardMaterial
            color="#2d5016"
            metalness={0.1}
            roughness={0.9}
          />
        </mesh>
        
        {/* Multiple Trees */}
        <GardenTree position={[0, 0, 0]} />
        <GardenTree position={[2, 0, 1.5]} />
        <GardenTree position={[-2, 0, -1]} />
        <GardenTree position={[1, 0, -2]} />
        <GardenTree position={[-1.5, 0, 2]} />
        
        {/* Flower Beds */}
        <FlowerBed position={[0.5, 0, 0.5]} />
        <FlowerBed position={[-0.8, 0, -0.8]} />
        <FlowerBed position={[1.2, 0, -1.2]} />
        
        {/* Garden Path */}
        <mesh position={[0, -0.4, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[1, 6]} />
          <meshStandardMaterial
            color="#8b7355"
            metalness={0.1}
            roughness={0.8}
          />
        </mesh>
        
        {/* Garden Bench */}
        <GardenBench position={[0, 0, 2]} />
        
        {/* Floating Butterflies */}
        <FloatingButterflies />
      </group>
    </Float>
  )
}

// Garden Tree Component
function GardenTree({ position }: { position: [number, number, number] }) {
  const treeRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (treeRef.current) {
      const time = clock.getElapsedTime()
      treeRef.current.rotation.y += 0.002
      treeRef.current.position.y = Math.sin(time * 0.5 + position[0]) * 0.05
    }
  })
  
  return (
    <group ref={treeRef} position={position}>
      {/* Tree Trunk */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.25, 1, 8]} />
        <meshStandardMaterial
          color="#4a3728"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Tree Canopy */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <sphereGeometry args={[0.8, 8, 6]} />
        <meshStandardMaterial
          color="#228b22"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
    </group>
  )
}

// Flower Bed Component
function FlowerBed({ position }: { position: [number, number, number] }) {
  const bedRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (bedRef.current) {
      const time = clock.getElapsedTime()
      bedRef.current.rotation.y += 0.003
    }
  })
  
  return (
    <group ref={bedRef} position={position}>
      {/* Flower Bed Base */}
      <mesh position={[0, -0.3, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <circleGeometry args={[0.6, 8]} />
        <meshStandardMaterial
          color="#654321"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Flowers */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 0.3
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              0,
              Math.sin(angle) * radius
            ]}
          >
            <sphereGeometry args={[0.05, 6, 4]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#ff69b4" : "#ffd700"}
              roughness={0.6}
              metalness={0.1}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Garden Bench Component
function GardenBench({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Bench Seat */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[1.5, 0.1, 0.3]} />
        <meshStandardMaterial
          color="#8b4513"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
      
      {/* Bench Back */}
      <mesh position={[0, 0.5, -0.1]} castShadow>
        <boxGeometry args={[1.5, 0.6, 0.1]} />
        <meshStandardMaterial
          color="#8b4513"
          roughness={0.7}
          metalness={0.2}
        />
      </mesh>
      
      {/* Bench Legs */}
      {[[-0.6, 0.1, 0.1], [0.6, 0.1, 0.1], [-0.6, 0.1, -0.1], [0.6, 0.1, -0.1]].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <boxGeometry args={[0.1, 0.2, 0.1]} />
          <meshStandardMaterial
            color="#654321"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

// Floating Butterflies
function FloatingButterflies() {
  const butterfliesRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (butterfliesRef.current) {
      const time = clock.getElapsedTime()
      butterfliesRef.current.children.forEach((child, index) => {
        child.position.y = Math.sin(time * 2 + index) * 0.3 + 2
        child.rotation.y += 0.01
      })
    }
  })
  
  return (
    <group ref={butterfliesRef}>
      {Array.from({ length: 4 }, (_, i) => {
        const angle = (i / 4) * Math.PI * 2
        const radius = 2
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              2,
              Math.sin(angle) * radius
            ]}
            scale={[0.1, 0.1, 0.1]}
          >
            <boxGeometry args={[1, 0.5, 0.1]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#ff6b6b" : "#4ecdc4"}
              roughness={0.3}
              metalness={0.1}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Hero City Model using working Trypillia GLB model
function HeroCityModel() {
  const { scene } = useGLTF("/models/cucutenitrypillia-culture-architecture/source/Trypillia.glb")
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime()
      groupRef.current.rotation.y += 0.002
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.2
    }
  })
  
  const clonedScene = useMemo(() => {
    if (!scene) return null
    const cloned = scene.clone()
    cloned.scale.set(2, 2, 2) // Minimized scale for hero view
    
    // Apply realistic building materials for hero
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material instanceof THREE.MeshStandardMaterial) {
          const newMaterial = child.material.clone()
          
          // Realistic building colors
          if (child.name.includes('wall') || child.name.includes('building')) {
            newMaterial.color = new THREE.Color("#8a8a8a") // Concrete gray
            newMaterial.metalness = 0.1
            newMaterial.roughness = 0.8
            newMaterial.emissive = new THREE.Color("#000000")
            newMaterial.emissiveIntensity = 0
          } else if (child.name.includes('window') || child.name.includes('glass')) {
            newMaterial.color = new THREE.Color("#87ceeb") // Sky blue glass
            newMaterial.metalness = 0.0
            newMaterial.roughness = 0.1
            newMaterial.transparent = true
            newMaterial.opacity = 0.7
            newMaterial.emissive = new THREE.Color("#1a1a1a")
            newMaterial.emissiveIntensity = 0.1
          } else if (child.name.includes('roof') || child.name.includes('metal')) {
            newMaterial.color = new THREE.Color("#2c2c2c") // Dark metal
            newMaterial.metalness = 0.8
            newMaterial.roughness = 0.3
            newMaterial.emissive = new THREE.Color("#000000")
            newMaterial.emissiveIntensity = 0
          } else {
            // Default realistic building material
            newMaterial.color = new THREE.Color("#6a6a6a") // Neutral gray
            newMaterial.metalness = 0.2
            newMaterial.roughness = 0.7
            newMaterial.emissive = new THREE.Color("#000000")
            newMaterial.emissiveIntensity = 0
          }
          
          child.material = newMaterial
        }
      }
    })
    
    return cloned
  }, [scene])
  
  if (!clonedScene) return null
  
  return (
    <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.4}>
      <group ref={groupRef} position={[-12, -3, -8]}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  )
}

// Preload Your Working GLB Models
useGLTF.preload("/models/cucutenitrypillia-culture-architecture/source/Trypillia.glb")
