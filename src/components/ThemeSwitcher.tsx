'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { SunMoon, Moon } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // After mounting, we can safely show the theme toggle
  useEffect(() => {
    setMounted(true)
    
    // Apply proper class to body for styling
    const updateBodyClass = () => {
      if (document.body) {
        document.body.classList.remove('light-mode', 'dark-mode');
        document.body.classList.add(theme === 'light' ? 'light-mode' : 'dark-mode');
      }
    };
    
    updateBodyClass();
    
    // Update body class when theme changes
    window.addEventListener('themeChange', updateBodyClass);
    return () => window.removeEventListener('themeChange', updateBodyClass);
  }, [theme]);

  if (!mounted) {
    return null
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className={`fixed top-6 right-6 z-50 p-2.5 rounded-full transition-colors ${
        theme === 'light' 
          ? 'bg-light-200 text-dark-900 hover:bg-light-300' 
          : 'bg-dark-800 text-primary-400 hover:bg-dark-700'
      }`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <motion.div 
          animate={{ 
            rotate: theme === 'light' ? 0 : 180,
            opacity: theme === 'light' ? 1 : 0
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <SunMoon size={20} />
        </motion.div>
        <motion.div 
          animate={{ 
            rotate: theme === 'dark' ? 0 : -180,
            opacity: theme === 'dark' ? 1 : 0
          }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon size={20} />
        </motion.div>
      </div>
    </motion.button>
  )
}
