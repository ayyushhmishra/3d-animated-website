"use client"

import Link from "next/link"
import Image from "next/image"
import { CitySection } from "@/components/sections/city"
import { PlanetSection } from "@/components/sections/planet"
import { VehicleSection } from "@/components/sections/vehicle"
import { GarageSection } from "@/components/sections/garage"

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border sticky top-0 z-40 bg-background/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">
            Game Preview
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="#hero" className="hover:text-primary">
              Hero
            </a>
            <a href="#city" className="hover:text-primary">
              City
            </a>
            <a href="#planet" className="hover:text-primary">
              Planet
            </a>
            <a href="#vehicle" className="hover:text-primary">
              Vehicle
            </a>
            <a href="#garage" className="hover:text-primary">
              Garage
            </a>
          </nav>
        </div>
      </header>

      <section id="hero" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-semibold text-pretty">Enter the next‑gen game world</h1>
            <p className="text-muted-foreground leading-relaxed">
              Explore a futuristic city, orbit distant planets, and inspect vehicles in full 360°. Scroll like a normal
              website—no zoom or scaling—then drag on any 3D scene to rotate.
            </p>
            <div className="flex gap-3">
              <a
                href="#city"
                className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-primary-foreground"
              >
                Explore City
              </a>
              <a href="#planet" className="inline-flex items-center rounded-md border border-border px-4 py-2">
                View Planet
              </a>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-muted/20 p-2">
            <CitySection compact />
          </div>
        </div>
      </section>

      <section id="city" className="bg-muted/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="mb-6">
            <h2 className="text-2xl md:text-4xl font-semibold">Futuristic City</h2>
            <p className="text-muted-foreground leading-relaxed">
              Rotate the skyline in 360° and inspect districts. Hover to see the hand cursor, then drag to rotate.
            </p>
          </div>
          <CitySection />
        </div>
      </section>

      <section id="planet">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="mb-6">
            <h2 className="text-2xl md:text-4xl font-semibold">Planetary Orbit</h2>
            <p className="text-muted-foreground leading-relaxed">
              A textured planet with small moons in orbit. Drag to rotate the planet at any angle.
            </p>
          </div>
          <PlanetSection />
        </div>
      </section>

      <section id="vehicle" className="bg-muted/10">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="mb-6">
            <h2 className="text-2xl md:text-4xl font-semibold">Vehicle Showcase</h2>
            <p className="text-muted-foreground leading-relaxed">
              Inspect a vehicle model in 360°. No scroll hijacking—just natural page scrolling and drag to rotate.
            </p>
          </div>
          <VehicleSection />
        </div>
      </section>

      <section id="garage">
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="mb-6">
            <h2 className="text-2xl md:text-4xl font-semibold">Garage</h2>
            <p className="text-muted-foreground leading-relaxed">
              Multiple vehicles under different lighting setups. Hover to see the hand cursor, drag to rotate in 360°.
            </p>
          </div>
          <GarageSection />
        </div>
      </section>

      <footer className="mt-12 border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image src="/images/pw-logo.png" alt="Physics Wallah logo" width={28} height={28} className="rounded" />
            <span className="text-sm">Physics Wallah</span>
          </div>
          <span className="text-xs text-muted-foreground">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
      </footer>
    </main>
  )
}
