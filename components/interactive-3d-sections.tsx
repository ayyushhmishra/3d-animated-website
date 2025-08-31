"use client"

import { Canvas } from "@react-three/fiber"
import {
  OrbitControls,
  Float,
  Text,
  Environment,
  ContactShadows,
  MeshTransmissionMaterial,
  useGLTF,
  useTexture,
  Html,
} from "@react-three/drei"
import { Suspense, useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import React from "react"

// Interactive City Section with Physics Wallah Theme
export function InteractiveCitySection() {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden cursor-interactive">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 50 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#0a0a0a")
        }}
      >
        <Suspense fallback={
          <Html center>
            <div className="text-purple-400 text-sm">Loading City Models...</div>
          </Html>
        }>
          <Environment preset="sunset" />
          <ambientLight intensity={0.4} color="#ffffff" />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
          
          <PWCityScene />
          
          <OrbitControls
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.5}
            minDistance={8}
            maxDistance={15}
          />
          
          <ContactShadows 
            position={[0, -2, 0]} 
            opacity={0.3} 
            scale={20} 
            blur={2} 
            color="#ffffff" 
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Interactive Vehicle Section
export function InteractiveVehicleSection() {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden cursor-interactive">
      <Canvas
        camera={{ position: [3, 2, 5], fov: 50 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#0a0a0a")
        }}
      >
        <Suspense fallback={
          <Html center>
            <div className="text-purple-400 text-sm">Loading Vehicle...</div>
          </Html>
        }>
          <Environment preset="studio" />
          <ambientLight intensity={0.4} color="#ffffff" />
          <directionalLight position={[5, 5, 5]} intensity={1.5} color={"#a855f7"} />
          
          <PWHoverCar />
          
          <OrbitControls
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.6}
            minDistance={3}
            maxDistance={8}
          />
          
          <ContactShadows 
            position={[0, -1, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={1.5} 
            color="#ffffff" 
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Interactive Planet Section
export function InteractivePlanetSection() {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden cursor-interactive">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#0a0a0a")
        }}
      >
        <Suspense fallback={
          <Html center>
            <div className="text-purple-400 text-sm">Loading Planet...</div>
          </Html>
        }>
          <Environment preset="night" />
          <ambientLight intensity={0.3} color="#ffffff" />
          <pointLight position={[10, 10, 10]} intensity={2} color="#a855f7" />
          
          <PWPlanetSystem />
          
          <OrbitControls
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.4}
            minDistance={5}
            maxDistance={12}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Interactive Character Section
export function InteractiveCharacterSection() {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden cursor-interactive">
      <Canvas
        camera={{ position: [0, 1, 4], fov: 60 }}
        onCreated={({ gl }) => {
          gl.setClearColor("#0a0a0a")
        }}
      >
        <Suspense fallback={
          <Html center>
            <div className="text-purple-400 text-sm">Loading PW Bot...</div>
          </Html>
        }>
          <Environment preset="studio" />
          <ambientLight intensity={0.5} color="#ffffff" />
          <directionalLight position={[3, 3, 3]} intensity={1.5} color={"#a855f7"} />
          
          <PWBot />
          
          <OrbitControls
            enablePan={false}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.5}
            minDistance={2}
            maxDistance={6}
          />
          
          <ContactShadows 
            position={[0, -1.5, 0]} 
            opacity={0.3} 
            scale={5} 
            blur={1} 
            color="#ffffff" 
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Realistic Physics Wallah City Scene Component
function PWCityScene() {
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001
    }
  })

  const buildings = []
  for (let i = 0; i < 40; i++) {
    const x = (Math.random() - 0.5) * 25
    const z = (Math.random() - 0.5) * 25
    const height = 2 + Math.random() * 6
    const width = 0.8 + Math.random() * 1.2
    const depth = 0.8 + Math.random() * 1.2
    const type = Math.floor(Math.random() * 4) // Different building types
    buildings.push({ x, z, height, width, depth, type, id: i })
  }

  return (
    <group ref={groupRef}>
      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Minimized Trypillia Model - Single Instance */}
      <TrypilliaBuildings position={[0, 0, 0]} scale={1.2} />
      
      {/* Central PW Tower - Flagship building */}
      <RealisticPWTower />
      
      {/* Flying vehicles around the city */}
      <FlyingVehicle position={[8, 4, 5]} />
      <FlyingVehicle position={[-6, 3, -8]} />
      <FlyingVehicle position={[3, 5, -12]} />
    </group>
  )
}

// Realistic Building Component with Game-Level Detail
function RealisticBuilding({ 
  position, 
  height, 
  width, 
  depth, 
  type, 
  index 
}: { 
  position: [number, number, number]; 
  height: number; 
  width: number; 
  depth: number; 
  type: number; 
  index: number; 
}) {
  const buildingRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (buildingRef.current) {
      // Animated windows lighting
      buildingRef.current.children.forEach((child, i) => {
        if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
          if (child.userData.isWindow) {
            child.material.emissiveIntensity = 0.4 + Math.sin(clock.getElapsedTime() * 1.5 + index + i) * 0.3
          }
        }
      })
    }
  })

  const buildingTypes = [
    { color: "#1a1a1a", windowColor: "#8b5cf6", floors: Math.floor(height * 2) },
    { color: "#2a2a2a", windowColor: "#a855f7", floors: Math.floor(height * 1.8) },
    { color: "#0f0f0f", windowColor: "#c084fc", floors: Math.floor(height * 2.2) },
    { color: "#1f1f1f", windowColor: "#7c3aed", floors: Math.floor(height * 1.9) }
  ]
  
  const buildingType = buildingTypes[type]
  
  return (
    <group ref={buildingRef} position={position}>
      {/* Main building structure */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial
          color={buildingType.color}
          metalness={0.7}
          roughness={0.3}
          envMapIntensity={0.5}
        />
      </mesh>
      
      {/* Windows grid */}
      {Array.from({ length: buildingType.floors }, (_, floor) => (
        Array.from({ length: Math.floor(width * 2) }, (_, windowX) => (
          Array.from({ length: Math.floor(depth * 2) }, (_, windowZ) => {
            const isWindow = Math.random() > 0.3
            if (!isWindow) return null
            
            return (
              <mesh
                key={`${floor}-${windowX}-${windowZ}`}
                position={[
                  (windowX - width) * 0.3,
                  (floor - buildingType.floors / 2) * (height / buildingType.floors) + 0.2,
                  depth / 2 + 0.01
                ]}
                userData={{ isWindow: true }}
              >
                <planeGeometry args={[0.15, 0.2]} />
                <meshStandardMaterial
                  color={buildingType.windowColor}
                  emissive={buildingType.windowColor}
                  emissiveIntensity={0.4}
                  transparent
                  opacity={0.8}
                />
              </mesh>
            )
          })
        ))
      ))}
      
      {/* Rooftop details */}
      <mesh position={[0, height / 2 + 0.1, 0]}>
        <boxGeometry args={[width * 0.8, 0.2, depth * 0.8]} />
        <meshStandardMaterial
          color="#333333"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Antenna/Communication array */}
      {Math.random() > 0.7 && (
        <mesh position={[0, height / 2 + 0.5, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
          <meshStandardMaterial
            color="#666666"
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      )}
    </group>
  )
}

// Central PW Tower - Flagship Building
function RealisticPWTower() {
  const towerRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (towerRef.current) {
      const time = clock.getElapsedTime()
      towerRef.current.rotation.y += 0.005
      
      // Pulsing PW logo
      const logo = towerRef.current.getObjectByName('pwLogo')
      if (logo && logo instanceof THREE.Mesh && logo.material instanceof THREE.MeshStandardMaterial) {
        logo.material.emissiveIntensity = 0.8 + Math.sin(time * 2) * 0.4
      }
    }
  })

  return (
    <group ref={towerRef} position={[0, 4, 0]}>
      {/* Main tower structure */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 2, 8, 8]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* PW Logo on tower */}
      <Text
        name="pwLogo"
        position={[0, 2, 2.1]}
        fontSize={1.2}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        PW
        <meshStandardMaterial
          color="#ffffff"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
        />
      </Text>
      
      {/* Tower crown */}
      <mesh position={[0, 4.5, 0]}>
        <coneGeometry args={[1.8, 1, 6]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.2}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      
      {/* Energy beam from top */}
      <mesh position={[0, 6, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 3, 16]} />
        <meshStandardMaterial
          color="#c084fc"
          emissive="#8b5cf6"
          emissiveIntensity={1}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  )
}

// Flying Vehicle Component
function FlyingVehicle({ position }: { position: [number, number, number] }) {
  const vehicleRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (vehicleRef.current) {
      const time = clock.getElapsedTime()
      vehicleRef.current.position.y = position[1] + Math.sin(time + position[0]) * 0.5
      vehicleRef.current.rotation.y += 0.02
      vehicleRef.current.rotation.z = Math.sin(time) * 0.1
    }
  })

  return (
    <group ref={vehicleRef} position={position} scale={0.3}>
      {/* Vehicle body */}
      <mesh>
        <capsuleGeometry args={[0.3, 1.5, 4, 8]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      
      {/* Wings */}
      <mesh position={[1, 0, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh position={[-1, 0, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Propulsion trails */}
      <mesh position={[0, 0, -1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.15, 2, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#8b5cf6"
          emissiveIntensity={1}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  )
}

// Realistic Physics Wallah Hover Car - Game Quality
function PWHoverCar() {
  const carRef = useRef<THREE.Group>(null)
  const wheelsRef = useRef<THREE.Group[]>([])
  
  useFrame(({ clock }) => {
    if (carRef.current) {
      const t = clock.getElapsedTime()
      carRef.current.position.y = Math.sin(t * 1.5) * 0.15
      carRef.current.rotation.y += 0.008
      carRef.current.rotation.z = Math.sin(t * 2) * 0.02
      
      // Rotating wheels
      wheelsRef.current.forEach((wheel) => {
        if (wheel) {
          wheel.rotation.x += 0.1
        }
      })
    }
  })

  return (
    <group ref={carRef} position={[0, 0.5, 0]}>
      {/* Hover Pad Base */}
      <mesh position={[0, -0.7, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <ringGeometry args={[1.5, 2.5, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#a855f7"
          emissiveIntensity={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Main Car Chassis - Sleek Design */}
      <mesh position={[0, 0, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[0.4, 2.2, 4, 16]} />
        <meshStandardMaterial
          color="#0a0a0a"
          metalness={0.95}
          roughness={0.05}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Front Section */}
      <mesh position={[1.2, 0, 0]} castShadow>
        <coneGeometry args={[0.4, 0.8, 8]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      
      {/* Cockpit Glass */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <sphereGeometry args={[0.6, 16, 8, 0, Math.PI]} />
        <MeshTransmissionMaterial
          color="#ffffff"
          transmission={0.95}
          opacity={0.8}
          metalness={0.05}
          roughness={0.05}
          ior={1.4}
          thickness={0.5}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* PW Logo on Hood */}
      <Text
        position={[0.8, 0.3, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        rotation={[0, -Math.PI / 2, 0]}
      >
        PW
        <meshStandardMaterial
          color="#ffffff"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
        />
      </Text>
      
      {/* Hover Wheels/Discs */}
      {[
        [-0.8, -0.3, 0.5],
        [-0.8, -0.3, -0.5],
        [0.8, -0.3, 0.5],
        [0.8, -0.3, -0.5]
      ].map((pos, i) => (
        <group key={i} ref={(el) => wheelsRef.current[i] = el!} position={pos}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.3, 0.05, 8, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#a855f7"
              emissiveIntensity={0.8}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Inner energy core */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.15, 0.15, 0.1, 16]} />
            <meshStandardMaterial
              color="#c084fc"
              emissive="#8b5cf6"
              emissiveIntensity={1}
            />
          </mesh>
        </group>
      ))}
      
      {/* Thruster Effects */}
      <mesh position={[-1.5, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <coneGeometry args={[0.15, 1, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#8b5cf6"
          emissiveIntensity={1.2}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Side Thrusters */}
      {[-0.6, 0.6].map((z, i) => (
        <mesh key={i} position={[-1, 0, z]} rotation={[0, Math.PI / 2, 0]}>
          <coneGeometry args={[0.08, 0.5, 6]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={1}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
      
      {/* Energy Trails */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.3}>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#8b5cf6"
            emissiveIntensity={1.5}
          />
        </mesh>
      </Float>
    </group>
  )
}

// Realistic Physics Wallah Planet System - Game Quality
function PWPlanetSystem() {
  const planetRef = useRef<THREE.Group>(null)
  const atmosphereRef = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.003
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y -= 0.001
      const time = clock.getElapsedTime()
      atmosphereRef.current.material.opacity = 0.3 + Math.sin(time) * 0.1
    }
  })

  return (
    <group ref={planetRef}>
      {/* Central Planet with Real Texture */}
      <RealisticPlanet />
      
      {/* Planet Atmosphere */}
      <mesh ref={atmosphereRef}>
        <sphereGeometry args={[2.2, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#a855f7"
          emissiveIntensity={0.4}
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Surface Glow Effect */}
      <mesh>
        <sphereGeometry args={[2.05, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#000000"
          emissiveIntensity={0}
          transparent
          opacity={0.5}
        />
      </mesh>
      
      {/* Multiple Ring Systems */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[3.5, 0.15, 16, 128]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.1}
          emissive="#a855f7"
          emissiveIntensity={0.6}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      <mesh rotation={[Math.PI / 1.8, 0, Math.PI / 3]}>
        <torusGeometry args={[4.2, 0.08, 16, 128]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.2}
          emissive="#c084fc"
          emissiveIntensity={0.5}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      <mesh rotation={[Math.PI / 2.5, 0, Math.PI / 6]}>
        <torusGeometry args={[5, 0.05, 12, 100]} />
        <meshStandardMaterial
          color="#c084fc"
          metalness={0.7}
          roughness={0.3}
          emissive="#8b5cf6"
          emissiveIntensity={0.4}
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Orbiting Space Stations/Moons */}
      <RealisticMoon distance={6} size={0.4} speed={0.8} color="#8b5cf6" type="station" />
      <RealisticMoon distance={7.5} size={0.3} speed={0.6} color="#a855f7" type="moon" />
      <RealisticMoon distance={9} size={0.25} speed={0.4} color="#c084fc" type="crystal" />
      <RealisticMoon distance={11} size={0.2} speed={0.3} color="#7c3aed" type="moon" />
      
      {/* Energy Particles */}
      <PWParticleField />
    </group>
  )
}

// Realistic Moon/Station Component
function RealisticMoon({ 
  distance, 
  size, 
  speed, 
  color, 
  type 
}: { 
  distance: number; 
  size: number; 
  speed: number; 
  color: string; 
  type: "station" | "moon" | "crystal"; 
}) {
  const ref = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    const x = Math.cos(t) * distance
    const z = Math.sin(t) * distance
    const y = Math.sin(t * 1.5) * 0.3
    
    if (ref.current) {
      ref.current.position.set(x, y, z)
    }
    
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.008
      meshRef.current.rotation.y += 0.012
    }
  })
  
  const renderMoonType = () => {
    switch (type) {
      case "station":
        return (
          <group>
            {/* Space Station Core */}
            <mesh ref={meshRef}>
              <octahedronGeometry args={[size, 2]} />
              <meshStandardMaterial
                color={color}
                metalness={0.9}
                roughness={0.1}
                emissive={color}
                emissiveIntensity={0.6}
              />
            </mesh>
            {/* Station Rings */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[size * 1.5, size * 0.1, 8, 16]} />
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
      case "crystal":
        return (
          <mesh ref={meshRef}>
            <dodecahedronGeometry args={[size, 1]} />
            <MeshTransmissionMaterial
              color={color}
              transmission={0.9}
              opacity={0.8}
              metalness={0.1}
              roughness={0.05}
              ior={1.5}
              thickness={1}
              envMapIntensity={1}
            />
          </mesh>
        )
      default: // moon
        return (
          <mesh ref={meshRef}>
            <icosahedronGeometry args={[size, 2]} />
            <meshStandardMaterial
              color={color}
              metalness={0.6}
              roughness={0.4}
              emissive={color}
              emissiveIntensity={0.3}
            />
          </mesh>
        )
    }
  }
  
  return (
    <group ref={ref}>
      {renderMoonType()}
    </group>
  )
}

// Particle Field for Space Environment
function PWParticleField() {
  const particlesRef = useRef<THREE.Points>(null)
  
  const particleCount = 200
  const positions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const radius = 15 + Math.random() * 10
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI * 2
      
      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = radius * Math.cos(phi)
    }
    return arr
  }, [])
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005
      const time = clock.getElapsedTime()
      particlesRef.current.material.opacity = 0.6 + Math.sin(time) * 0.2
    }
  })
  
  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  )
}

// Realistic Physics Wallah Bot Character - Game Quality
function PWBot() {
  const botRef = useRef<THREE.Group>(null)
  const eyesRef = useRef<THREE.Group[]>([])
  const hologramRef = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (botRef.current) {
      const t = clock.getElapsedTime()
      botRef.current.position.y = Math.sin(t * 1.5) * 0.08
      botRef.current.rotation.y = Math.sin(t * 0.3) * 0.1
      
      // Animated eyes
      eyesRef.current.forEach((eye, i) => {
        if (eye) {
          const offset = i * 0.5
          eye.scale.setScalar(0.8 + Math.sin(t * 3 + offset) * 0.2)
        }
      })
      
      // Hologram animation
      if (hologramRef.current) {
        hologramRef.current.rotation.y += 0.02
        hologramRef.current.material.opacity = 0.6 + Math.sin(t * 2) * 0.3
      }
    }
  })

  return (
    <group ref={botRef} position={[0, 0, 0]}>
      {/* Base Platform */}
      <mesh position={[0, -1.2, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[1.2, 1.2, 0.1, 16]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#000000"
          emissiveIntensity={0}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Bot Main Body - More Detailed */}
      <mesh position={[0, -0.2, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.9, 1.8, 12]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.9}
          roughness={0.1}
          envMapIntensity={0.8}
        />
      </mesh>
      
      {/* Chest Panel */}
      <mesh position={[0, 0, 0.8]} castShadow>
        <boxGeometry args={[1.2, 1, 0.1]} />
        <meshStandardMaterial
          color="#2a2a2a"
          metalness={0.8}
          roughness={0.2}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      
      {/* Head Assembly */}
      <group position={[0, 1.1, 0]}>
        {/* Main Head */}
        <mesh castShadow>
          <capsuleGeometry args={[0.5, 0.8, 4, 8]} />
          <meshStandardMaterial
            color="#0a0a0a"
            metalness={0.9}
            roughness={0.05}
            envMapIntensity={1}
          />
        </mesh>
        
        {/* Head Display Screen */}
        <mesh position={[0, 0, 0.6]}>
          <planeGeometry args={[0.8, 0.5]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#a855f7"
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
          />
        </mesh>
        
        {/* Advanced Eyes */}
        <group>
          {[-0.25, 0.25].map((x, i) => (
            <group key={i} ref={(el) => eyesRef.current[i] = el!} position={[x, 0.1, 0.45]}>
              {/* Eye Housing */}
              <mesh>
                <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
                <meshStandardMaterial
                  color="#333333"
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
              {/* Eye Core */}
              <mesh position={[0, 0, 0.1]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshStandardMaterial
                  color="#c084fc"
                  emissive="#8b5cf6"
                  emissiveIntensity={1.2}
                />
              </mesh>
            </group>
          ))}
        </group>
      </group>
      
      {/* Arms */}
      {[-0.8, 0.8].map((x, i) => (
        <group key={i} position={[x, 0.3, 0]}>
          {/* Upper Arm */}
          <mesh rotation={[0, 0, i === 0 ? Math.PI / 6 : -Math.PI / 6]}>
            <capsuleGeometry args={[0.12, 0.8, 4, 8]} />
            <meshStandardMaterial
              color="#2a2a2a"
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
          {/* Hand */}
          <mesh position={[x > 0 ? 0.6 : -0.6, -0.4, 0]}>
            <sphereGeometry args={[0.15, 16, 16]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#a855f7"
              emissiveIntensity={0.4}
              metalness={0.8}
              roughness={0.2}
            />
          </mesh>
        </group>
      ))}
      
      {/* Large PW Logo on Chest */}
      <Text
        position={[0, 0, 0.9]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        PW
        <meshStandardMaterial
          color="#ffffff"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
        />
      </Text>
      
      {/* Advanced Holographic Display */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
        <group position={[0, 2.2, 0]}>
          <mesh ref={hologramRef}>
            <torusGeometry args={[0.6, 0.03, 8, 32]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#a855f7"
              emissiveIntensity={1}
              transparent
              opacity={0.7}
            />
          </mesh>
          {/* Hologram Content */}
          <Text
            position={[0, 0, 0]}
            fontSize={0.15}
            color="#c084fc"
            anchorX="center"
            anchorY="middle"
          >
            Physics Tutor AI
            <meshStandardMaterial
              color="#c084fc"
              emissive="#8b5cf6"
              emissiveIntensity={0.8}
              transparent
              opacity={0.8}
            />
          </Text>
        </group>
      </Float>
      
      {/* Energy Conduits */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 4) * Math.PI * 2) * 0.8,
            0,
            Math.sin((i / 4) * Math.PI * 2) * 0.8
          ]}
          rotation={[0, (i / 4) * Math.PI * 2, 0]}
        >
          <cylinderGeometry args={[0.02, 0.02, 1.5, 8]} />
          <meshStandardMaterial
            color="#ffffff"
            emissive="#8b5cf6"
            emissiveIntensity={0.6}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </group>
  )
}

// Your Working Trypillia Architecture Model Component  
function TrypilliaBuildings({ 
  position = [0, 0, 0], 
  scale = 1 
}: { 
  position?: [number, number, number]; 
  scale?: number; 
}) {
  const { scene } = useGLTF("/models/cucutenitrypillia-culture-architecture/source/Trypillia.glb")
  const groupRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime()
      groupRef.current.rotation.y += 0.002
      groupRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2
    }
  })
  
  // Clone and process your working GLB model with realistic materials
  const clonedScene = useMemo(() => {
    if (!scene) return null
    const cloned = scene.clone()
    cloned.scale.set(scale, scale, scale)
    
    // Apply realistic building materials instead of purple
    cloned.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material instanceof THREE.MeshStandardMaterial) {
          const newMaterial = child.material.clone()
          
          // Realistic building colors - concrete, glass, metal
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
  }, [scene, scale])
  
  if (!clonedScene) return null
  
  return (
    <group ref={groupRef} position={position}>
      <primitive object={clonedScene} />
    </group>
  )
}

// Realistic Planet with Real Texture
function RealisticPlanet() {
  const planetTexture = useTexture("/models/planet-beta-hydri-free-sample/textures/Planet_Beta_Hydri_8192.jpg")
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002
    }
  })
  
  return (
    <mesh ref={meshRef} castShadow receiveShadow>
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial
        map={planetTexture}
        metalness={0.1}
        roughness={0.9}
        envMapIntensity={0.8}
      />
    </mesh>
  )
}

// Interactive Nature Section - Forest Lab Environment
export function InteractiveNatureSection() {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden cursor-interactive">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 45 }}
        shadows
        gl={{ antialias: true }}
      >
        <Suspense fallback={
          <Html center>
            <div className="text-purple-400 text-sm">Loading Forest...</div>
          </Html>
        }>
          <PWForestScene />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Interactive Vehicle Gallery - Multiple Cars
export function InteractiveVehicleGallery() {
  return (
    <div className="h-full w-full rounded-xl overflow-hidden cursor-interactive">
      <Canvas
        camera={{ position: [0, 2, 8], fov: 45 }}
        shadows
        gl={{ antialias: true }}
      >
        <Suspense fallback={
          <Html center>
            <div className="text-purple-400 text-sm">Loading Vehicles...</div>
          </Html>
        }>
          <PWVehicleGallery />
        </Suspense>
      </Canvas>
    </div>
  )
}

// Advanced Space Scene with Nebula and Planets
function PWForestScene() {
  return (
    <group>
      {/* Space Lighting */}
      <ambientLight intensity={0.2} color="#ffffff" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#ffffff"
      />
      <pointLight position={[0, 5, 0]} intensity={1} color="#a855f7" />
      
      {/* Space Background */}
      <mesh position={[0, 0, -10]} rotation={[0, 0, 0]}>
        <sphereGeometry args={[50, 32, 32]} />
        <meshBasicMaterial
          color="#000011"
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Multiple Planets */}
      <AdvancedPlanet position={[0, 0, 0]} scale={1.5} color="#8b5cf6" />
      <AdvancedPlanet position={[8, 2, -5]} scale={1} color="#a855f7" />
      <AdvancedPlanet position={[-6, -1, 4]} scale={0.8} color="#c084fc" />
      <AdvancedPlanet position={[12, 3, 2]} scale={0.6} color="#e879f9" />
      
      {/* Asteroid Belt */}
      <AsteroidBelt />
      
      {/* Space Station */}
      <SpaceStation position={[0, 3, -8]} />
      
      {/* Interactive Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={25}
        maxPolarAngle={Math.PI / 1.5}
        minPolarAngle={Math.PI / 8}
      />
    </group>
  )
}

// Advanced Vehicle Gallery with Different Car Types
function PWVehicleGallery() {
  return (
    <group>
      {/* Gallery Lighting */}
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        color="#ffffff"
      />
      <spotLight
        position={[0, 10, 0]}
        intensity={0.8}
        angle={0.3}
        penumbra={0.1}
        color="#ffffff"
        castShadow
      />
      
      {/* Gallery Platform */}
      <mesh position={[0, -0.5, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <cylinderGeometry args={[8, 8, 0.2, 32]} />
        <meshStandardMaterial
          color="#1a1a1a"
          metalness={0.8}
          roughness={0.2}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      
      {/* Different Vehicle Types */}
      <group position={[0, 0, 0]}>
        <SuperCar />
      </group>
      <group position={[4, 0, 2]} scale={[0.8, 0.8, 0.8]}>
        <RacingCar />
      </group>
      <group position={[-4, 0, -2]} scale={[1.2, 1.2, 1.2]}>
        <HoverBike />
      </group>
      <group position={[0, 0, -5]} scale={[0.9, 0.9, 0.9]}>
        <FlyingCar />
      </group>
      
      {/* Interactive Controls */}
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={4}
        maxDistance={20}
        maxPolarAngle={Math.PI / 1.6}
        minPolarAngle={Math.PI / 8}
      />
    </group>
  )
}

// Advanced Planet Component
function AdvancedPlanet({ 
  position, 
  scale = 1, 
  color = "#8b5cf6" 
}: { 
  position: [number, number, number]; 
  scale?: number; 
  color?: string; 
}) {
  const planetRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (planetRef.current) {
      const time = clock.getElapsedTime()
      planetRef.current.rotation.y += 0.01
      planetRef.current.position.y = position[1] + Math.sin(time * 0.5) * 0.2
    }
  })
  
  return (
    <group ref={planetRef} position={position} scale={[scale, scale, scale]}>
      {/* Main Planet */}
      <mesh castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.3}
          roughness={0.7}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      
      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.8, 32]} />
        <meshStandardMaterial
          color={color}
          transparent
          opacity={0.6}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

// Asteroid Belt
function AsteroidBelt() {
  const beltRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (beltRef.current) {
      beltRef.current.rotation.y += 0.002
    }
  })
  
  return (
    <group ref={beltRef}>
      {Array.from({ length: 20 }, (_, i) => {
        const angle = (i / 20) * Math.PI * 2
        const radius = 15 + Math.random() * 5
        const height = (Math.random() - 0.5) * 4
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius,
              height,
              Math.sin(angle) * radius
            ]}
            scale={[0.1 + Math.random() * 0.2, 0.1 + Math.random() * 0.2, 0.1 + Math.random() * 0.2]}
          >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color="#666"
              metalness={0.3}
              roughness={0.8}
            />
          </mesh>
        )
      })}
    </group>
  )
}

// Space Station
function SpaceStation({ position }: { position: [number, number, number] }) {
  const stationRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (stationRef.current) {
      stationRef.current.rotation.y += 0.005
    }
  })
  
  return (
    <group ref={stationRef} position={position}>
      {/* Main Hub */}
      <mesh castShadow>
        <cylinderGeometry args={[0.5, 0.5, 0.3, 8]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.8}
          roughness={0.2}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      
      {/* Arms */}
      {[0, Math.PI / 2, Math.PI, 3 * Math.PI / 2].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 1.5, 0, Math.sin(angle) * 1.5]} rotation={[0, angle, 0]}>
          <boxGeometry args={[3, 0.1, 0.1]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.8}
            roughness={0.2}
            emissive="#a855f7"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// Super Car - High Performance Vehicle
function SuperCar() {
  const carRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (carRef.current) {
      const time = clock.getElapsedTime()
      carRef.current.rotation.y += 0.01
      carRef.current.position.y = Math.sin(time * 2) * 0.1
    }
  })
  
  return (
    <group ref={carRef}>
      {/* Main Body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[4, 0.6, 1.8]} />
        <meshStandardMaterial
          color="#ff4500"
          metalness={0.95}
          roughness={0.05}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      
      {/* Front Nose */}
      <mesh position={[2.2, 0.2, 0]} castShadow>
        <coneGeometry args={[0.4, 1.2, 8]} />
        <meshStandardMaterial
          color="#ff6b00"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Cockpit */}
      <mesh position={[0.2, 0.85, 0]} castShadow>
        <boxGeometry args={[2, 0.5, 1.4]} />
        <MeshTransmissionMaterial
          color="#1a1a1a"
          transmission={0.3}
          opacity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Wheels */}
      {[[-1.5, -0.2, 1], [1.5, -0.2, 1], [-1.5, -0.2, -1], [1.5, -0.2, -1]].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 16]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.9}
            roughness={0.1}
            emissive="#8b5cf6"
            emissiveIntensity={0.1}
          />
        </mesh>
      ))}
    </group>
  )
}

// Racing Car - Formula Style
function RacingCar() {
  const carRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (carRef.current) {
      const time = clock.getElapsedTime()
      carRef.current.rotation.y += 0.008
      carRef.current.position.y = Math.sin(time * 1.5) * 0.08
    }
  })
  
  return (
    <group ref={carRef}>
      {/* Low Profile Body */}
      <mesh position={[0, 0.1, 0]} castShadow>
        <boxGeometry args={[3.5, 0.3, 1.2]} />
        <meshStandardMaterial
          color="#00ff88"
          metalness={0.9}
          roughness={0.1}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      
      {/* Driver Cockpit */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[1.5, 0.4, 1]} />
        <MeshTransmissionMaterial
          color="#1a1a1a"
          transmission={0.4}
          opacity={0.7}
        />
      </mesh>
      
      {/* Rear Wing */}
      <mesh position={[-1.8, 0.6, 0]} castShadow>
        <boxGeometry args={[0.1, 0.4, 2]} />
        <meshStandardMaterial
          color="#00ff88"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Wheels */}
      {[[-1.2, -0.1, 0.8], [1.2, -0.1, 0.8], [-1.2, -0.1, -0.8], [1.2, -0.1, -0.8]].map((pos, i) => (
        <mesh key={i} position={pos} rotation={[Math.PI/2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 12]} />
          <meshStandardMaterial
            color="#333"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// Hover Bike - Futuristic
function HoverBike() {
  const bikeRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (bikeRef.current) {
      const time = clock.getElapsedTime()
      bikeRef.current.rotation.y += 0.012
      bikeRef.current.position.y = Math.sin(time * 3) * 0.15
    }
  })
  
  return (
    <group ref={bikeRef}>
      {/* Main Frame */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[2, 0.2, 0.6]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.1}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      
      {/* Hover Pads */}
      {[[-0.8, -0.1, 0], [0.8, -0.1, 0]].map((pos, i) => (
        <group key={i} position={pos}>
          <mesh castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 8]} />
            <meshStandardMaterial
              color="#ffffff"
                        emissive="#000000"
          emissiveIntensity={0}
            />
          </mesh>
          <pointLight color="#a855f7" intensity={0.8} distance={2} />
        </group>
      ))}
      
      {/* Rider */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial
          color="#ffdbac"
          roughness={0.8}
        />
      </mesh>
    </group>
  )
}

// Flying Car - Advanced
function FlyingCar() {
  const carRef = useRef<THREE.Group>(null)
  
  useFrame(({ clock }) => {
    if (carRef.current) {
      const time = clock.getElapsedTime()
      carRef.current.rotation.y += 0.006
      carRef.current.position.y = Math.sin(time * 1.8) * 0.2
    }
  })
  
  return (
    <group ref={carRef}>
      {/* Main Body */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[3, 0.8, 1.5]} />
        <meshStandardMaterial
          color="#00bfff"
          metalness={0.9}
          roughness={0.1}
          emissive="#000000"
          emissiveIntensity={0}
        />
      </mesh>
      
      {/* Wings */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[4, 0.1, 0.8]} />
        <meshStandardMaterial
          color="#00bfff"
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Propulsion Units */}
      {[[-1.5, 0.2, 0.8], [1.5, 0.2, 0.8], [-1.5, 0.2, -0.8], [1.5, 0.2, -0.8]].map((pos, i) => (
        <group key={i} position={pos}>
          <mesh castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.4, 8]} />
            <meshStandardMaterial
              color="#ffffff"
                        emissive="#000000"
          emissiveIntensity={0}
            />
          </mesh>
          <pointLight color="#a855f7" intensity={0.6} distance={3} />
        </group>
      ))}
    </group>
  )
}

// Preload the working models
useGLTF.preload("/models/cucutenitrypillia-culture-architecture/source/Trypillia.glb")
useTexture.preload("/models/planet-beta-hydri-free-sample/textures/Planet_Beta_Hydri_8192.jpg")
