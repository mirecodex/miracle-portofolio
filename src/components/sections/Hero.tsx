'use client'

import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { personalData } from '@/lib/dummy-data'
import ModernProfilePhoto from '@/components/ModernProfilePhoto'
import { useTheme } from 'next-themes'
import SectionDivider from './SectionDivider'
import { useState, useEffect } from 'react'
import { MagneticElement } from '@/components/ui/magnetic-element'
import { LiquidButton } from '@/components/ui/liquid-button'
import { AnimatedGradient } from '@/components/ui/animated-gradient'
import { GlassCard } from '@/components/ui/glass-card'
import { MorphingShape } from '@/components/ui/morphing-shape'
import { NeuroInterface } from '@/components/ui/neuro-interface'

export default function Hero() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const [isHovered, setIsHovered] = useState(false)

  // Define the animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  // Handle mouse movement for interactive hover effects
  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e
    const { left, top, width, height } = currentTarget.getBoundingClientRect()
    const x = (clientX - left) / width - 0.5
    const y = (clientY - top) / height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  // Transform values for tilt effect
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['5deg', '-5deg'])
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['-5deg', '5deg'])

  // Words for typing animation
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const textOptions = [
    'Frontend Developer',
    'AI Specialist',
    'UX Designer',
    'Problem Solver',
    'Tech Enthusiast'
  ]

  useEffect(() => {
    // Rotate through text options
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % textOptions.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center overflow-hidden ${
        isDark ? 'bg-dark-900' : 'bg-light-100'
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background with morphing shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-1/2">
          <MorphingShape className="w-full h-full opacity-30" />
        </div>
        <div className="absolute bottom-0 left-0 w-2/3 h-2/3">
          <MorphingShape className="w-full h-full opacity-20" />
        </div>

        {/* Subtle grid pattern */}
        <div className={`absolute inset-0 ${isDark ? 'opacity-10' : 'opacity-5'}`}>
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke={isDark ? '#3b82f6' : '#60a5fa'}
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>

      <motion.div
        className="section-container relative z-10 py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 py-12">
          {/* Left content column */}
          <motion.div
            className="lg:w-1/2 space-y-8"
            variants={itemVariants}
            style={{
              perspective: '1000px'
            }}
          >
            {/* Neural interface for status badge */}
            <NeuroInterface className="inline-block">
              <motion.div
                className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm ${
                  isDark
                    ? 'bg-dark-800/80 text-primary-400 border border-primary-500/20'
                    : 'bg-light-200/80 text-primary-600 border border-primary-400/20'
                }`}
                initial={{ opacity: 0, scale: 0.8, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className={`w-2 h-2 rounded-full mr-2 ${isDark ? 'bg-primary-500' : 'bg-primary-600'}`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                Available for new projects
              </motion.div>
            </NeuroInterface>

            {/* Modern intro text with enhanced animation */}
            <div className="space-y-4">
              <motion.h2
                className={`text-lg tracking-wide ${
                  isDark ? 'text-gray-300' : 'text-dark-600'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                Hello, I'm
              </motion.h2>

              {/* Enhanced name display with 3D magnetic effect */}
              <MagneticElement strength={20}>
                <motion.div
                  className="perspective text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                  style={{
                    rotateY: isHovered ? rotateY : 0,
                    rotateX: isHovered ? rotateX : 0,
                    transformStyle: 'preserve-3d'
                  }}
                  transition={{ type: 'spring', damping: 20 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.03 }}
                >
                  <AnimatedGradient
                    className="inline-block transform-style-3d py-2 px-4"
                    colors={[
                      '#3b82f6',
                      '#60a5fa',
                      '#93c5fd',
                      '#60a5fa',
                      '#3b82f6'
                    ]}
                    direction="horizontal"
                    speed="medium"
                  >
                    Christian Miracle Rumawung
                  </AnimatedGradient>
                </motion.div>
              </MagneticElement>

              {/* Animated role text with typewriter effect */}
              <GlassCard className="w-fit px-4 py-2 mt-4">
                <div className="h-12 overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={currentTextIndex}
                      className={`text-2xl font-light ${
                        isDark ? 'text-primary-400' : 'text-primary-600'
                      }`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -20, opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {textOptions[currentTextIndex]}
                    </motion.p>
                  </AnimatePresence>
                  <motion.span
                    className={`inline-block w-0.5 h-6 ml-1 ${
                      isDark ? 'bg-primary-400' : 'bg-primary-600'
                    }`}
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatDelay: 0.2
                    }}
                  />
                </div>
              </GlassCard>
            </div>

            {/* Enhanced bio text */}
            <motion.p
              className={`max-w-lg text-lg ${
                isDark ? 'text-gray-300' : 'text-dark-600'
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
            >
              {personalData.bio}
            </motion.p>

            {/* Modern action buttons with neural interface */}
            <NeuroInterface connectionCount={15} density={150}>
              <motion.div
                className="flex flex-wrap gap-5 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.7 }}
              >
                {/* Primary liquid button */}
                <LiquidButton href="#contact" variant="primary" size="lg">
                  Contact Me
                  <svg
                    className="ml-2 w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </LiquidButton>

                {/* Secondary glass button */}
                <LiquidButton href="#projects" variant="secondary" size="lg">
                  View Projects
                </LiquidButton>
              </motion.div>
            </NeuroInterface>

            {/* Social icons */}
            <motion.div
              className="flex gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              {personalData.socials &&
                Object.entries(personalData.socials).map(([platform, url], index) => (
                  <MagneticElement key={platform} strength={25}>
                    <motion.a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`p-3 rounded-full ${
                        isDark
                          ? 'bg-dark-800/80 hover:bg-primary-600 text-gray-300 hover:text-white backdrop-blur-sm'
                          : 'bg-light-200/80 hover:bg-primary-600 text-dark-700 hover:text-white backdrop-blur-sm'
                      } transition-colors`}
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.8 + index * 0.1,
                        duration: 0.5
                      }}
                    >
                      {platform === 'github' && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                      )}
                      {platform === 'linkedin' && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      )}
                      {platform === 'twitter' && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                        </svg>
                      )}
                      {platform === 'instagram' && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            x="2"
                            y="2"
                            width="20"
                            height="20"
                            rx="5"
                            ry="5"
                          ></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      )}
                      {platform === 'dribbble' && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10"></circle>
                          <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"></path>
                        </svg>
                      )}
                    </motion.a>
                  </MagneticElement>
                ))}
            </motion.div>
          </motion.div>

          {/* Right content column - enhanced profile photo */}
          <motion.div className="lg:w-1/2" variants={itemVariants}>
            <NeuroInterface>
              <ModernProfilePhoto />
            </NeuroInterface>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <MagneticElement strength={15}>
            <motion.div className="flex flex-col items-center" whileHover={{ scale: 1.1 }}>
              <GlassCard className="px-3 py-1.5 rounded-full">
                <span
                  className={`text-sm ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Scroll
                </span>
              </GlassCard>
              <svg
                className={`w-6 h-6 mt-2 ${
                  isDark ? 'text-primary-500' : 'text-primary-600'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
              </svg>
            </motion.div>
          </MagneticElement>
        </motion.div>
      </motion.div>

      {/* Section divider */}
      <SectionDivider type="wave" position="bottom" />
    </section>
  )
}
