'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { personalData } from '@/lib/dummy-data'
import SectionDivider from './SectionDivider'
import { useTheme } from 'next-themes'

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <section id="about" className={`relative py-20 ${isDark ? 'bg-dark-800' : 'bg-light-200'}`}>
      {/* Add top divider */}
      <SectionDivider type="wave" position="top" />

      {/* Background glow effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px]"></div>
        <div className="absolute top-20 right-1/3 w-64 h-64 bg-primary-700/5 rounded-full blur-[80px]"></div>
      </div>

      <div className="section-container relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading-lg mb-4">
            <span className="orange-gradient">About Me</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Get to know my background, passion and approach to projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Tech matrix visualization */}
          <motion.div
            className="md:col-span-1 relative"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-full min-h-[300px]">
              {/* Terminal-style tech matrix */}
              <div className="absolute inset-0 bg-dark-800/70 backdrop-blur-sm border border-dark-700/50 rounded-xl overflow-hidden p-4 font-mono text-sm">
                <div className="flex items-center border-b border-dark-700 pb-2 mb-4">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="ml-4 text-gray-400">dev_journey.tsx</div>
                </div>
                
                {/* Animated typing effect */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="h-full"
                >
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <div className="col-span-2 mb-2">
                      <span className="text-primary-400">{"// Tech stack"}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-blue-400 mr-2">{"<AI>"}</span>
                      <span className="text-gray-300">NLP</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-purple-400 mr-2">Python</span>
                      <span className="text-yellow-400">TensorFlow</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-blue-400 mr-2">React</span>
                      <span className="text-gray-300">NextJS</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-blue-300 mr-2">TypeScript</span>
                      <span className="text-pink-400">GraphQL</span>
                    </div>
                    
                    <div className="col-span-2 mt-4">
                      <span className="text-primary-400">{"// Experience timeline"}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">2008:</span>
                      <span className="text-gray-300">HTML, CSS, jQuery</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">2015:</span>
                      <span className="text-gray-300">React adoption</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">2018:</span>
                      <span className="text-gray-300">NextJS & AI</span>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-green-400 mr-2">Now:</span>
                      <span className="text-gray-300">AI-driven solutions</span>
                    </div>
                    
                    <div className="col-span-2 mt-4 animate-pulse">
                      <span className="text-primary-500">{">"}</span>
                      <span className="ml-1 border-r-2 border-primary-500 pr-1 animate-blink"></span>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-1/4 -left-4 w-24 h-24 rounded-lg bg-primary-500/10 blur-xl -z-10"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-primary-500/10 blur-xl -z-10"></div>
            </div>
          </motion.div>
          
          {/* About text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-2 space-y-6"
          >
            {/* Journey info */}
            <div className="glassmorphism rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary-400 mb-3">My Journey</h3>
              <motion.p 
                className="text-gray-300"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                I started my journey as a developer in 2008 building simple websites with HTML, CSS, and jQuery. As the web evolved, so did my skillset. I've been an early adopter of React since 2015 and have been working with NextJS since its early versions.
              </motion.p>
            </div>
            
            {/* Passion info */}
            <div className="glassmorphism rounded-xl p-6">
              <h3 className="text-xl font-semibold text-primary-400 mb-3">My Passion</h3>
              <motion.p 
                className="text-gray-300"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                My passion lies in AI integration and automation, finding innovative ways to combine traditional software development with artificial intelligence to create intelligent, responsive applications. I specialize in developing AI-driven solutions that solve complex business challenges while maintaining a focus on user experience and accessibility.
              </motion.p>
            </div>
            
            {/* Approach section with animation */}
            <motion.div 
              className="glassmorphism rounded-xl p-6 relative overflow-hidden"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <h3 className="text-xl font-semibold text-primary-400 mb-3">My Approach</h3>
              <p className="text-gray-300">
                I believe in creating applications that aren't just functional but also intuitive and accessible. My work combines technical excellence with user-centered design, ensuring that the end product not only meets business requirements but exceeds user expectations.
              </p>
              
              {/* Decorative animated elements */}
              <div className="absolute -right-4 -bottom-4 w-32 h-32 opacity-20">
                <motion.svg 
                  viewBox="0 0 100 100" 
                  className="w-full h-full text-primary-500"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="1 8" />
                  <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="4" fill="none" strokeDasharray="1 12" strokeDashoffset="6" />
                </motion.svg>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Add bottom divider */}
      <SectionDivider type="curve" position="bottom" />
    </section>
  )
}
