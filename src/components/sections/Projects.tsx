'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projectsData } from '@/lib/dummy-data'
import { Github, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const categories = ["All", "AI App", "Web App", "Mobile App"]

export default function Projects() {
  const [filter, setFilter] = useState("All")
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  })

  const filteredProjects = filter === "All" 
    ? projectsData 
    : projectsData.filter(project => project.category === filter)

  return (
    <section id="projects" className="bg-dark-900 py-20">
      <div className="section-container" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="heading-lg mb-4">
            <span className="orange-gradient">Featured Projects</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            A selection of my recent work, showcasing my skills and expertise.
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                filter === category
                  ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                  : 'bg-dark-700 text-gray-300 hover:bg-dark-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="bg-dark-800 border-none h-full overflow-hidden relative z-10 group-hover:border-primary-500/50 transition-all duration-300 border rounded-xl shadow-lg">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 to-primary-700/10 z-0"></div>
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl blur opacity-0 group-hover:opacity-20 transition duration-1000 group-hover:duration-200 z-0"></div>
                </div>
                
                <div className="relative h-56 w-full overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center text-white text-2xl font-bold transform transition-transform duration-700 group-hover:scale-110">
                    {project.title.split(' ')[0]}
                  </div>
                  <div className="absolute inset-0 bg-dark-900/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="flex gap-4 scale-0 group-hover:scale-100 transition-transform duration-300">
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-dark-700 hover:bg-dark-600 p-3 rounded-full text-white transition-colors"
                      >
                        <Github className="h-5 w-5 transition-transform hover:scale-125" />
                      </a>
                      <a 
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary-500 hover:bg-primary-600 p-3 rounded-full text-white transition-colors"
                      >
                        <ExternalLink className="h-5 w-5 transition-transform hover:scale-125" />
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="default" className="text-xs capitalize">
                    {project.category}
                  </Badge>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary-500 transition-colors relative">
                    {project.title}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300"></span>
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 5).map((tag, i) => (
                      <Badge 
                        key={i}
                        variant="outline" 
                        className="text-xs bg-dark-700/50 hover:bg-dark-600 text-primary-400 border-dark-600"
                      >
                        {tag}
                      </Badge>
                    ))}
                    {project.tags.length > 5 && (
                      <Badge 
                        variant="outline" 
                        className="text-xs bg-dark-700/50 hover:bg-dark-600 text-gray-400 border-dark-600"
                      >
                        +{project.tags.length - 5}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Floating shine effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-primary-700 rounded-xl blur opacity-0 group-hover:opacity-30 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
