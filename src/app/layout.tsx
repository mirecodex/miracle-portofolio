import './globals.css'
import { Inter, Roboto_Mono } from 'next/font/google'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import StarryBackground from '@/components/StarryBackground'
import FloatingTechLogos from '@/components/FloatingTechLogos'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import PixelGame from '@/components/games/PixelGame'
import { MouseGlowEffect } from '@/components/InteractiveElements'
import SmoothScroll from '@/components/SmoothScroll'
import ScrollProgress from '@/components/ScrollProgress'
import { ParticleField } from '@/components/ui/particle-field'
import ClientGestureWrapper from '@/components/interactions/ClientGestureWrapper'
import { Metadata } from 'next'
import { Providers } from './providers'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})

export const metadata: Metadata = {
  title: 'Christian Miracle Rumawung | AI Engineer & Software Engineer',
  description: 'Portfolio showcasing expertise in AI Engineering, Software Development and AI Automation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${robotoMono.variable} font-sans body-padding`}>
        <Providers>
          {/* Modern 3D particle background */}
          <ParticleField />
          <StarryBackground />
          <FloatingTechLogos />
          <MouseGlowEffect />
          <ThemeSwitcher />
          <PixelGame />
          <ScrollProgress />
          
          <ClientGestureWrapper>
            <SmoothScroll>
              <div className="flex flex-col min-h-screen">
                <main className="flex-grow overflow-hidden">
                  {children}
                </main>
                <Footer />
                <Navbar />
              </div>
            </SmoothScroll>
          </ClientGestureWrapper>
        </Providers>
      </body>
    </html>
  )
}
