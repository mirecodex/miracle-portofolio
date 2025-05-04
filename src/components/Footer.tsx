'use client'

import { personalData } from '@/lib/dummy-data'
import { Github, Twitter, Linkedin, Instagram, Dribbble } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Footer() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Safely check if social links exist
  const socials = personalData.socials || {
    github: "#",
    twitter: "#",
    linkedin: "#",
    instagram: "#",
    dribbble: "#"
  }

  return (
    <footer className={`border-t ${
      isDark ? 'bg-dark-900 border-dark-800' : 'bg-light-100 border-light-300'
    } py-12`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className={`text-xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-dark-900'
            }`}>
              <span className="blue-gradient">{personalData.name}</span>
            </h3>
            <p className={`${isDark ? 'text-gray-400' : 'text-dark-600'} max-w-md`}>
              {personalData.bio}
            </p>
          </div>
          
          <div className="flex space-x-6">
            <a href={socials.github} target="_blank" rel="noopener noreferrer"
              className={`${isDark ? 'text-gray-400 hover:text-primary-500' : 'text-dark-600 hover:text-primary-600'} transition-colors`}>
              <Github size={24} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href={socials.twitter} target="_blank" rel="noopener noreferrer"
              className={`${isDark ? 'text-gray-400 hover:text-primary-500' : 'text-dark-600 hover:text-primary-600'} transition-colors`}>
              <Twitter size={24} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href={socials.linkedin} target="_blank" rel="noopener noreferrer"
              className={`${isDark ? 'text-gray-400 hover:text-primary-500' : 'text-dark-600 hover:text-primary-600'} transition-colors`}>
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href={socials.instagram} target="_blank" rel="noopener noreferrer"
              className={`${isDark ? 'text-gray-400 hover:text-primary-500' : 'text-dark-600 hover:text-primary-600'} transition-colors`}>
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href={socials.dribbble} target="_blank" rel="noopener noreferrer"
              className={`${isDark ? 'text-gray-400 hover:text-primary-500' : 'text-dark-600 hover:text-primary-600'} transition-colors`}>
              <Dribbble size={24} />
              <span className="sr-only">Dribbble</span>
            </a>
          </div>
        </div>
        
        <div className={`border-t ${
          isDark ? 'border-dark-800' : 'border-light-300'
        } mt-8 pt-8 flex flex-col md:flex-row justify-between items-center`}>
          <p className={`${isDark ? 'text-gray-500' : 'text-dark-500'} text-sm`}>
            © {new Date().getFullYear()} {personalData.name}. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className={`text-sm ${
              isDark ? 'text-gray-500 hover:text-gray-400' : 'text-dark-500 hover:text-dark-600'
            } transition-colors`}>
              Privacy Policy
            </a>
            <a href="#" className={`text-sm ${
              isDark ? 'text-gray-500 hover:text-gray-400' : 'text-dark-500 hover:text-dark-600'
            } transition-colors`}>
              Terms of Service
            </a>
            <a href="#" className={`text-sm ${
              isDark ? 'text-gray-500 hover:text-gray-400' : 'text-dark-500 hover:text-dark-600'
            } transition-colors`}>
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
