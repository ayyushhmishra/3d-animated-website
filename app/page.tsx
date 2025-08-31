"use client"

import Hero3D from "@/components/hero-3d"
import { 
  InteractiveCitySection, 
  InteractiveVehicleSection, 
  InteractivePlanetSection, 
  InteractiveCharacterSection,
  InteractiveNatureSection,
  InteractiveVehicleGallery
} from "@/components/interactive-3d-sections"
import { useState, useEffect } from "react"

export default function Page() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsLoaded(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className="min-h-screen bg-black text-white font-sans smooth-scroll">
      {/* Custom Cursor */}
      <div 
        className="fixed w-4 h-4 bg-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-150 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: `scale(${isLoaded ? 1 : 0})`
        }}
      />

      {/* Physics Wallah Header */}
      <header className="fixed top-0 w-full z-40 glass-morphism">
        <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/images/pw-logo.png" alt="Physics Wallah" className="h-10 w-10" />
            <div>
              <h1 className="text-lg font-bold text-glow">Physics Wallah</h1>
              <p className="text-xs text-purple-300">Game Development Studio</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#hero" className="cursor-interactive hover:text-purple-300 transition-colors">
              Game World
            </a>
            <a href="#showcase" className="cursor-interactive hover:text-purple-300 transition-colors">
              3D Showcase
            </a>
            <a href="#environments" className="cursor-interactive hover:text-purple-300 transition-colors">
              Environments
            </a>
            <a href="#characters" className="cursor-interactive hover:text-purple-300 transition-colors">
              Characters
            </a>
            <a href="#download" className="cursor-interactive hover:text-purple-300 transition-colors">
              Play Now
            </a>
          </nav>

          <button className="cursor-interactive bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-lg transition-all duration-300 glow-purple text-sm font-medium">
            Download Game
          </button>
        </div>
      </header>

      {/* Physics Wallah Game Hero */}
      <section id="hero" className="h-screen relative overflow-hidden">
        <Hero3D />
        
        {/* Game Overlay Content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="text-center space-y-6 max-w-5xl px-6">
            <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <h1 className="text-6xl md:text-8xl font-bold text-glow mb-4">
                PW <span className="text-purple-400">UNIVERSE</span>
              </h1>
              <p className="text-2xl md:text-3xl text-purple-300 font-medium">
                The Ultimate Educational Gaming Experience
              </p>
            </div>
            
            <p className={`text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Explore immersive 3D worlds where learning meets adventure. Navigate through futuristic cities, cosmic planets, and high-tech vehicles in Physics Wallah's groundbreaking educational game.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <button className="cursor-interactive bg-purple-600 hover:bg-purple-700 px-10 py-5 rounded-lg text-xl font-bold transition-all duration-300 glow-purple-intense">
                🎮 PLAY NOW
              </button>
              <button className="cursor-interactive border border-purple-400 hover:bg-purple-400/10 px-10 py-5 rounded-lg text-xl font-medium transition-all duration-300">
                📺 Watch Trailer
              </button>
            </div>
          </div>
        </div>

        {/* Game Progress Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-purple-300">
            <span className="text-sm font-medium">Scroll to explore game worlds</span>
            <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive 3D Showcase */}
      <section id="showcase" className="py-24 bg-gradient-to-b from-black to-purple-950/20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-glow mb-6">
              Game World Showcase
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Drag any 3D element for 360° view. Discover the immersive worlds of Physics Wallah Universe
            </p>
          </div>

                     <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {/* City Environment Box - Real 3D */}
            <div className="cursor-interactive group">
              <div className="purple-accent-glow rounded-2xl p-6 hover:glow-purple transition-all duration-300">
                <div className="mb-4">
                  <InteractiveCitySection />
                </div>
                <h3 className="text-xl font-bold mb-2">Neo Tokyo Campus</h3>
                <p className="text-gray-400 text-sm">
                  Drag to explore the futuristic PW University with glowing buildings
                </p>
              </div>
            </div>

            {/* Vehicle Box - Real 3D */}
            <div className="cursor-interactive group">
              <div className="purple-accent-glow rounded-2xl p-6 hover:glow-purple transition-all duration-300">
                <div className="mb-4">
                  <InteractiveVehicleSection />
                </div>
                <h3 className="text-xl font-bold mb-2">PW Hover Car</h3>
                <p className="text-gray-400 text-sm">
                  Drag for 360° view of the anti-gravity PW branded vehicle
                </p>
              </div>
            </div>

            {/* Planet Box - Real 3D */}
            <div className="cursor-interactive group">
              <div className="purple-accent-glow rounded-2xl p-6 hover:glow-purple transition-all duration-300">
                <div className="mb-4">
                  <InteractivePlanetSection />
                </div>
                <h3 className="text-xl font-bold mb-2">PW Astro World</h3>
                <p className="text-gray-400 text-sm">
                  Drag to orbit around the cosmic Physics Wallah planet system
                </p>
              </div>
            </div>

            {/* Character Box - Real 3D */}
            <div className="cursor-interactive group">
              <div className="purple-accent-glow rounded-2xl p-6 hover:glow-purple transition-all duration-300">
                <div className="mb-4">
                  <InteractiveCharacterSection />
                </div>
                <h3 className="text-xl font-bold mb-2">PW Bot Assistant</h3>
                <p className="text-gray-400 text-sm">
                  Drag to meet your AI physics tutor with holographic display
                </p>
              </div>
            </div>

            {/* Nature Environment Box - Real 3D */}
            <div className="cursor-interactive group">
              <div className="purple-accent-glow rounded-2xl p-6 hover:glow-purple transition-all duration-300">
                <div className="mb-4">
                  <InteractiveNatureSection />
                </div>
                <h3 className="text-xl font-bold mb-2">Space Universe</h3>
                <p className="text-gray-400 text-sm">
                  Drag to explore multiple planets, asteroids, and space stations
                </p>
              </div>
            </div>

            {/* Vehicle Gallery Box - Real 3D */}
            <div className="cursor-interactive group">
              <div className="purple-accent-glow rounded-2xl p-6 hover:glow-purple transition-all duration-300">
                <div className="mb-4">
                  <InteractiveVehicleGallery />
                </div>
                <h3 className="text-xl font-bold mb-2">Vehicle Collection</h3>
                <p className="text-gray-400 text-sm">
                  Drag to explore super cars, racing cars, hover bikes, and flying cars
                </p>
              </div>
            </div>
          </div>

          {/* Game Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center relative overflow-hidden pulse-glow">
                <div className="w-12 h-12 bg-purple-800 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L3 7v10c0 5.55 3.84 9.74 9 9.74s9-4.19 9-9.74V7l-9-5z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Interactive Learning</h3>
              <p className="text-gray-400">
                Solve physics puzzles in 3D space while exploring stunning environments
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center relative overflow-hidden pulse-glow">
                <div className="w-12 h-12 bg-purple-800 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Cosmic Adventures</h3>
              <p className="text-gray-400">
                Travel through galaxies and discover the mysteries of the universe
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center relative overflow-hidden pulse-glow">
                <div className="w-12 h-12 bg-purple-800 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Achievement System</h3>
              <p className="text-gray-400">
                Earn rewards and unlock new worlds as you progress through levels
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Game Environments Section */}
      <section id="environments" className="py-24 bg-gradient-to-b from-purple-950/20 to-black">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-glow mb-6">
              Immersive <span className="text-purple-400">Environments</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Each world in PW Universe features unique physics challenges and stunning 3D landscapes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* City Environment */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-glow">🏙️ Neo Tokyo Campus</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Navigate through a futuristic educational city where skyscrapers light up with physics formulas. 
                Hover vehicles transport students between quantum labs and anti-gravity classrooms.
              </p>
              <div className="flex gap-4">
                <div className="purple-accent-glow rounded-lg px-4 py-2 text-sm">
                  🔬 Physics Labs
                </div>
                <div className="purple-accent-glow rounded-lg px-4 py-2 text-sm">
                  🚗 Hover Transport
                </div>
                <div className="purple-accent-glow rounded-lg px-4 py-2 text-sm">
                  ⚡ Energy Systems
                </div>
              </div>
            </div>
            <div className="cursor-interactive purple-accent-glow rounded-2xl p-4 hover:glow-purple transition-all duration-500 h-[500px]">
              <InteractiveCitySection />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            {/* Space Environment */}
            <div className="cursor-interactive purple-accent-glow rounded-2xl p-4 hover:glow-purple transition-all duration-500 lg:order-1 h-[500px]">
              <InteractivePlanetSection />
            </div>
            <div className="space-y-6 lg:order-2">
              <h3 className="text-3xl font-bold text-glow">🌌 Cosmic Laboratory</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                Explore the mysteries of space in zero-gravity environments. Study planetary motion, 
                gravitational forces, and cosmic phenomena while floating among the stars.
              </p>
              <div className="flex gap-4">
                <div className="purple-accent-glow rounded-lg px-4 py-2 text-sm">
                  🌍 Planetary Physics
                </div>
                <div className="purple-accent-glow rounded-lg px-4 py-2 text-sm">
                  ⭐ Star Formation
                </div>
                <div className="purple-accent-glow rounded-lg px-4 py-2 text-sm">
                  🚀 Space Travel
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Model Showcases */}
      <section className="py-16 bg-gradient-to-b from-black to-purple-950/20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-glow mb-4">
              More 3D Environments
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Explore additional interactive environments and vehicle galleries
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Forest Environment */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-glow">🌌 Advanced Space Universe</h3>
              <p className="text-gray-300 leading-relaxed">
                Explore a complete space environment with multiple planets, asteroid belts, and space stations. 
                Study orbital mechanics, gravitational forces, and cosmic phenomena.
              </p>
              <div className="flex gap-3">
                <div className="purple-accent-glow rounded-lg px-3 py-1 text-sm">
                  🌍 Multiple Planets
                </div>
                <div className="purple-accent-glow rounded-lg px-3 py-1 text-sm">
                  🛸 Space Stations
                </div>
              </div>
            </div>
            <div className="cursor-interactive purple-accent-glow rounded-2xl p-4 hover:glow-purple transition-all duration-500 h-[400px]">
              <InteractiveNatureSection />
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Vehicle Gallery */}
            <div className="cursor-interactive purple-accent-glow rounded-2xl p-4 hover:glow-purple transition-all duration-500 lg:order-1 h-[400px]">
              <InteractiveVehicleGallery />
            </div>
            <div className="space-y-6 lg:order-2">
              <h3 className="text-2xl font-bold text-glow">🚗 Advanced Vehicle Collection</h3>
              <p className="text-gray-300 leading-relaxed">
                Discover a diverse collection of vehicles including super cars, racing cars, hover bikes, 
                and flying cars. Each vehicle demonstrates different physics principles and technologies.
              </p>
              <div className="flex gap-3">
                <div className="purple-accent-glow rounded-lg px-3 py-1 text-sm">
                  🏎️ Super Cars
                </div>
                <div className="purple-accent-glow rounded-lg px-3 py-1 text-sm">
                  🚁 Flying Vehicles
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Characters Section */}
      <section id="characters" className="py-24 bg-black">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-glow mb-6">
              Meet Your <span className="text-purple-400">Learning Partners</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Interactive AI companions guide you through every physics adventure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* PW Bot */}
            <div className="cursor-interactive group">
              <div className="purple-accent-glow rounded-2xl p-6 hover:glow-purple transition-all duration-300">
                <div className="h-64 bg-purple-900/30 rounded-xl mb-6 relative overflow-hidden cursor-interactive">
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl pulse-glow">
                    🤖
                  </div>
                  <div className="absolute bottom-4 right-4 text-purple-300 text-xs bg-black/50 px-2 py-1 rounded">
                    AI Assistant
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">PW Bot</h3>
                <p className="text-gray-400">
                  Your intelligent AI tutor that explains complex physics concepts through interactive 3D demonstrations.
                </p>
              </div>
            </div>

            {/* Physics Avatar */}
            <div className="cursor-interactive group">
              <div className="purple-accent-glow rounded-2xl p-6 hover:glow-purple transition-all duration-300">
                <div className="h-64 bg-purple-900/30 rounded-xl mb-6 relative overflow-hidden cursor-interactive">
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl floating-animation">
                    👨‍🔬
                  </div>
                  <div className="absolute bottom-4 right-4 text-purple-300 text-xs bg-black/50 px-2 py-1 rounded">
                    Your Avatar
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Your Avatar</h3>
                <p className="text-gray-400">
                  Customize your physics student character and explore the universe with advanced gear and equipment.
                </p>
              </div>
            </div>

            {/* Einstein AI */}
            <div className="cursor-interactive group">
              <div className="purple-accent-glow rounded-2xl p-6 hover:glow-purple transition-all duration-300">
                <div className="h-64 bg-purple-900/30 rounded-xl mb-6 relative overflow-hidden cursor-interactive">
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl animate-pulse">
                    🧠
                  </div>
                  <div className="absolute bottom-4 right-4 text-purple-300 text-xs bg-black/50 px-2 py-1 rounded">
                    Master Guide
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">Einstein AI</h3>
                <p className="text-gray-400">
                  Advanced physics mentor that provides deep insights into quantum mechanics and relativity theory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Game Section */}
      <section id="download" className="py-24 bg-gradient-to-b from-black to-purple-950/30">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-glow mb-6">
            Ready to Enter
            <br />
            <span className="text-purple-400">PW Universe?</span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Join millions of students already exploring physics through immersive 3D gaming. Download now and start your cosmic educational journey!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-12">
            <button className="cursor-interactive bg-purple-600 hover:bg-purple-700 px-12 py-6 rounded-xl text-2xl font-bold transition-all duration-300 glow-purple-intense">
              🎮 DOWNLOAD FREE
            </button>
            <button className="cursor-interactive border border-purple-400 hover:bg-purple-400/10 px-12 py-6 rounded-xl text-2xl font-medium transition-all duration-300">
              📱 Mobile Version
            </button>
          </div>

          {/* Game Stats */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">10M+</div>
              <p className="text-gray-400">Active Players</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">500+</div>
              <p className="text-gray-400">Physics Challenges</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">50+</div>
              <p className="text-gray-400">3D Worlds</p>
            </div>
          </div>
        </div>
      </section>

      {/* Physics Wallah Footer */}
      <footer className="border-t border-purple-900/30 bg-black backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* PW Branding */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <img src="/images/pw-logo.png" alt="Physics Wallah" className="h-12 w-12" />
                <div>
                  <h3 className="text-2xl font-bold text-glow">Physics Wallah</h3>
                  <p className="text-purple-300">Game Development Studio</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Revolutionizing education through immersive 3D gaming experiences. 
                Join millions of students exploring physics in the PW Universe.
              </p>
              <div className="flex gap-4">
                <button className="cursor-interactive w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center justify-center glow-purple">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17 19H7V5h10v14zm-5-9c.83 0 1.5-.67 1.5-1.5S12.83 7 12 7s-1.5.67-1.5 1.5S11.17 10 12 10zm0 4c.83 0 1.5-.67 1.5-1.5S12.83 11 12 11s-1.5.67-1.5 1.5S11.17 14 12 14z"/>
                  </svg>
                </button>
                <button className="cursor-interactive w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center justify-center glow-purple">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-10 7H8v3H6v-3H3v-2h3V8h2v3h3v2zm4.5 2c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm4-3c-.83 0-1.5-.67-1.5-1.5S18.67 9 19.5 9s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                  </svg>
                </button>
                <button className="cursor-interactive w-12 h-12 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors flex items-center justify-center glow-purple">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Game Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-purple-300">Game Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="cursor-interactive hover:text-purple-300 transition-colors">3D Worlds</a></li>
                <li><a href="#" className="cursor-interactive hover:text-purple-300 transition-colors">Physics Labs</a></li>
                <li><a href="#" className="cursor-interactive hover:text-purple-300 transition-colors">AI Tutors</a></li>
                <li><a href="#" className="cursor-interactive hover:text-purple-300 transition-colors">Multiplayer</a></li>
                <li><a href="#" className="cursor-interactive hover:text-purple-300 transition-colors">Achievements</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-bold mb-4 text-purple-300">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="cursor-interactive hover:text-purple-300 transition-colors">Download</a></li>
                <li><a href="#" className="cursor-interactive hover:text-purple-300 transition-colors">System Requirements</a></li>
                <li><a href="#" className="cursor-interactive hover:text-purple-300 transition-colors">Help Center</a></li>
                <li><a href="#" className="cursor-interactive hover:text-purple-300 transition-colors">Community</a></li>
                <li><a href="#" className="cursor-interactive hover:text-purple-300 transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-purple-900/30 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Physics Wallah. All rights reserved.
              </p>
              <p className="text-purple-400 text-sm mt-1">
                Making learning fun through 3D gaming experiences 🎮✨
              </p>
            </div>
            
            <div className="flex gap-6 text-gray-400 text-sm">
              <a href="#" className="cursor-interactive hover:text-purple-300 transition-colors">Privacy Policy</a>
              <a href="#" className="cursor-interactive hover:text-purple-300 transition-colors">Terms of Service</a>
              <a href="#" className="cursor-interactive hover:text-purple-300 transition-colors">EULA</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}



