'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { skillsData } from '@/lib/dummy-data'
import { useTheme } from 'next-themes'
import SectionDivider from './SectionDivider'

// Flatten all skills into a single array
const allSkills = skillsData.flatMap(category => category.items)

export default function Skills() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className={`relative py-20 ${isDark ? 'bg-dark-900' : 'bg-light-100'}`}>
      {/* Add top divider */}
      <SectionDivider type="curve" position="top" flipX={true} />
      
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary-500/5 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-700/5 rounded-full blur-[100px]"></div>
      </div>
      
      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading-lg mb-4">
            <span className="blue-gradient">My Skills</span>
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${isDark ? 'text-gray-300' : 'text-dark-600'}`}>
            Technologies and frameworks I've mastered over my professional journey.
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {allSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="flex flex-col items-center"
              variants={itemVariants}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative group perspective">
                {/* 3D Hexagon card with glowing border */}
                <div className={`h-24 w-24 relative transform transition-transform duration-500 group-hover:rotate-y-180 ${isDark ? 'bg-dark-800/70 border-dark-700' : 'bg-light-200 border-light-400'}`}>
                  {/* Front face */}
                  <div className={`absolute inset-0 rounded-hexagon backdrop-blur-sm border flex items-center justify-center group-hover:border-primary-500/50 transition-all duration-300 transform preserve-3d backface-hidden ${isDark ? 'bg-dark-800/70 border-dark-700' : 'bg-light-200 border-light-400'}`}>
                    {/* Icon circle container */}
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDark ? 'bg-gradient-to-br from-dark-800 to-dark-700/80' : 'bg-gradient-to-br from-light-200 to-light-300'}`}>
                      {/* Skill initial */}
                      <span className={`text-3xl font-bold group-hover:text-primary-400 transition-all duration-300 ${isDark ? 'text-gray-300' : 'text-dark-600'}`}>
                        {skill.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    
                    {/* Skill level indicator - curved bar */}
                    <svg className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-20 h-5" viewBox="0 0 100 20">
                      <defs>
                        <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.8" />
                        </linearGradient>
                      </defs>
                      <path
                        d={`M5,10 C5,5 95,5 95,10`}
                        fill="none"
                        stroke={isDark ? "#1f2937" : "#d1d5db"}
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d={`M5,10 C5,5 ${skill.level},5 ${skill.level},10`}
                        fill="none"
                        stroke={`url(#gradient-${index})`}
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                    </svg>

                    {/* Glow effect on hover */}
                    <motion.div 
                      className="absolute inset-0 rounded-hexagon bg-primary-500 opacity-0 group-hover:opacity-10"
                      animate={hoveredSkill === skill.name ? { opacity: [0, 0.15, 0.05] } : { opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: 'reverse' }}
                      style={{ filter: 'blur(8px)' }}
                    />
                  </div>
                  
                  {/* Back face */}
                  <div className={`absolute inset-0 rounded-hexagon backdrop-blur-sm border flex items-center justify-center transition-all duration-300 transform preserve-3d backface-hidden rotate-y-180 ${isDark ? 'bg-dark-800/80 border-primary-500/50' : 'bg-light-200 border-primary-500/50'}`}>
                    <div className="text-center px-2">
                      <span className="text-primary-400 text-xl font-medium">{skill.level}%</span>
                      <div className={`mt-1 text-xs ${isDark ? 'text-gray-300' : 'text-dark-600'}`}>proficiency</div>
                    </div>
                  </div>
                </div>
                
                {/* Skill name */}
                <p className={`mt-3 text-sm text-center group-hover:text-primary-400 transition-colors ${isDark ? 'text-gray-300' : 'text-dark-600'}`}>
                  {skill.name}
                </p>
                
                {/* Pulsating dots for advanced skills */}
                {skill.level >= 90 && (
                  <motion.div 
                    className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary-500"
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Add bottom divider */}
      <SectionDivider type="angle" position="bottom" />
    </section>
  )
}
