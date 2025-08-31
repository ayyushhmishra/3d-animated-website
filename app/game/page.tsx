"use client"

import Image from "next/image"
import Link from "next/link"
import { CitySection } from "@/components/sections/city"
import { PlanetSection } from "@/components/sections/planet"
import { VehicleSection } from "@/components/sections/vehicle"
import { GarageSection } from "@/components/sections/garage"

export default function GamePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/images/pw-logo.png" alt="Physics Wallah" width={32} height={32} />
            <span className="font-sans font-semibold">Physics Wallah</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="#hero" className="hover:text-primary">
              Hero
            </Link>
            <Link href="#city" className="hover:text-primary">
              City
            </Link>
            <Link href="#planet" className="hover:text-primary">
              Planet
            </Link>
            <Link href="#garage" className="hover:text-primary">
              Garage
            </Link>
            <Link href="#cta" className="hover:text-primary">
              Play
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section id="hero" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-4">
            <h1 className="text-pretty text-3xl md:text-5xl font-bold">Next‑Gen Game Preview with Real 3D</h1>
            <p className="text-muted-foreground leading-relaxed">
              Explore a futuristic city, orbit planets, and inspect vehicles in full 360° — all on a fast, scrollable
              page. Hover to see the hand cursor, click‑drag to rotate. Zoom is disabled so page scroll stays smooth and
              natural.
            </p>
            <div className="flex gap-3">
              <a href="#garage" className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-background">
                Explore Vehicles
              </a>
              <a href="#planet" className="inline-flex items-center rounded-md border border-border px-4 py-2">
                Fly to Planet
              </a>
            </div>
          </div>
          <div className="rounded-lg border border-border">
            {/* A small single vehicle preview in hero */}
            <VehicleSection variant="sport" />
          </div>
        </div>
      </section>

      {/* City */}
      <section id="city" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-balance">Futuristic City</h2>
          <p className="text-muted-foreground leading-relaxed">
            Dense blocks, reflective glass, and moody lighting inspired by neon‑lit streets. Drag to rotate; scroll the
            page to move on — no zoom hijacking.
          </p>
        </div>
        <CitySection />
      </section>

      {/* Planet */}
      <section id="planet" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-balance">Planet System</h2>
          <p className="text-muted-foreground leading-relaxed">
            Realistic textures and subtle rotation. Drift among stars and watch moons orbit in real time.
          </p>
        </div>
        <PlanetSection />
      </section>

      {/* Garage with multiple vehicles */}
      <section id="garage" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-semibold text-balance">Garage — Inspect in 360°</h2>
          <p className="text-muted-foreground leading-relaxed">
            Multiple vehicles, different finishes and lighting. Hover to get the hand cursor, click‑drag to rotate.
          </p>
        </div>
        <GarageSection />
      </section>

      {/* CTA */}
      <section id="cta" className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="rounded-xl border border-border p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl md:text-2xl font-semibold">Ready to play?</h3>
            <p className="text-muted-foreground">Jump into the world right now — it’s smooth, fast, and immersive.</p>
          </div>
          <a href="#hero" className="inline-flex items-center rounded-md bg-primary px-5 py-2.5 text-background">
            Start Demo
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image src="/images/pw-logo.png" alt="Physics Wallah logo" width={28} height={28} />
            <span className="text-sm">Physics Wallah</span>
          </div>
          <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} — All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}
