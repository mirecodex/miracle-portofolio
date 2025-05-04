'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { experienceData } from '@/lib/dummy-data'

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0)
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  return (
    <section id="experience" className="bg-dark-900 py-20 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-primary-700/5 rounded-full blur-[80px]"></div>
      </div>
      
      <div className="section-container" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading-lg mb-4">
            <span className="orange-gradient">Work Experience</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A timeline of my professional journey over the past 15+ years.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Tab Selection */}
          <motion.div
            className="md:w-1/3"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible glassmorphism rounded-xl">
              {experienceData.map((exp, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`py-4 px-6 text-left border-b-2 md:border-b-0 md:border-l-2 transition-all min-w-fit md:w-full relative group ${
                    activeTab === index
                      ? 'border-primary-500 text-primary-500 bg-dark-800/80'
                      : 'border-dark-700 text-gray-400 hover:bg-dark-800/50 hover:text-gray-300'
                  }`}
                >
                  <span className="block font-medium">{exp.company}</span>
                  <span className="text-sm opacity-80">{exp.period}</span>
                  
                  {/* Active indicator with glow */}
                  {activeTab === index && (
                    <motion.div 
                      layoutId="activeExperience"
                      className="absolute inset-0 border-l-2 md:border-l-4 border-primary-500 pointer-events-none"
                      transition={{ duration: 0.3 }}
                    >
                      <div className="absolute left-0 top-1/4 bottom-1/4 w-1 md:w-1 bg-primary-500 blur-sm" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Tab Content */}
          <motion.div
            className="md:w-2/3"
            key={activeTab} // Force re-mount when tab changes
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="glassmorphism rounded-xl p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white">{experienceData[activeTab].position}</h3>
                <p className="text-primary-500">{experienceData[activeTab].company}</p>
                <p className="text-sm text-gray-400">{experienceData[activeTab].period}</p>
              </div>

              <p className="text-gray-300 mb-8">
                {experienceData[activeTab].description}
              </p>
              
              <div className="border-t border-dark-700 pt-6">
                <h4 className="text-sm text-gray-400 mb-3">TECHNOLOGIES</h4>
                <div className="flex flex-wrap gap-2">
                  {experienceData[activeTab].technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="bg-dark-800 text-primary-400 px-3 py-1 rounded-full text-sm border border-dark-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
