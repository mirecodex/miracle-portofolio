'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Home, User, Code2, Briefcase, FolderGit2, MessageSquare } from 'lucide-react'

const navItems = [
  { name: 'Home', href: '#hero', icon: <Home size={20} /> },
  { name: 'About', href: '#about', icon: <User size={20} /> },
  { name: 'Skills', href: '#skills', icon: <Code2 size={20} /> },
  { name: 'Experience', href: '#experience', icon: <Briefcase size={20} /> },
  { name: 'Projects', href: '#projects', icon: <FolderGit2 size={20} /> },
  { name: 'Contact', href: '#contact', icon: <MessageSquare size={20} /> },
]

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero')
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1))
      
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (!element) return false
        
        const rect = element.getBoundingClientRect()
        return rect.top <= 300 && rect.bottom >= 300
      })
      
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      className="fixed bottom-6 left-0 right-0 z-50 flex justify-center"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <div className="bg-dark-800/80 backdrop-blur-lg rounded-full border border-dark-700/50 p-3 shadow-xl flex items-center gap-4">
        {navItems.map((item) => {
          const isActive = activeSection === item.href.substring(1)
          
          return (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Link
                href={item.href}
                className={`flex items-center justify-center w-12 h-12 rounded-full ${
                  isActive 
                    ? "bg-primary-500 text-white" 
                    : "bg-dark-700 text-gray-400 hover:bg-dark-600 hover:text-white"
                } transition-colors`}
                aria-label={item.name}
              >
                {item.icon}
                {isActive && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute inset-0 rounded-full"
                    transition={{ type: "spring", duration: 0.5 }}
                  />
                )}
              </Link>
              
              {/* Simple tooltip */}
              {hoveredItem === item.name && !isActive && (
                <motion.div
                  className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-dark-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap z-50"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                >
                  {item.name}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-dark-800 rotate-45"></div>
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </motion.header>
  )
}
