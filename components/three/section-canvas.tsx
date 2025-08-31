"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"
import { useState, useEffect, useRef, type ReactNode } from "react"

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

type SectionCanvasProps = {
  children: ReactNode
  fov?: number
  cameraPosition?: [number, number, number]
  className?: string
  envPreset?: EnvPreset
}

export function SectionCanvas({
  children,
  fov = 50,
  cameraPosition = [0, 0, 8],
  className = "",
  envPreset = "city",
}: SectionCanvasProps) {
  const [dragging, setDragging] = useState(false)
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true)
            io.disconnect()
            break
          }
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={[
        "relative w-full h-[70vh] md:h-[80vh] rounded-xl border border-border overflow-hidden bg-card transition-all duration-700 ease-out",
        dragging ? "cursor-grabbing" : "cursor-grab",
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        className,
      ].join(" ")}
      onPointerDown={() => setDragging(true)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      aria-label="Interactive 3D view. Hover to rotate, scrolling works normally."
      role="region"
    >
      <Canvas shadows dpr={[1, 2]} camera={{ fov, position: cameraPosition }}>
        <ambientLight intensity={0.55} />
        <directionalLight position={[6, 10, 4]} intensity={1.15} castShadow />
        {/* Purple accent rim/key lights for the black+purple theme */}
        <spotLight position={[-6, 4, -2]} angle={0.6} penumbra={0.5} intensity={0.9} color={"#7c3aed"} />
        <spotLight position={[4, -2, 6]} angle={0.5} penumbra={0.5} intensity={0.6} color={"#9333ea"} />
        <Environment preset={envPreset} />
        <OrbitControls makeDefault enableZoom={false} enablePan={false} rotateSpeed={0.8} />
        {children}
      </Canvas>
    </div>
  )
}
