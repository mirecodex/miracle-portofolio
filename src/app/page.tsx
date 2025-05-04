'use client'

import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Skills from '@/components/sections/Skills'
import Projects from '@/components/sections/Projects'
import SpaceShooter from '@/components/games/SpaceShooter' // Replace MemoryMatch
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <SpaceShooter /> {/* Replaced MemoryMatch */}
      <Contact />
    </>
  )
}
