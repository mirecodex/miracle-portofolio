'use client'

import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'

interface SectionDividerProps {
  type?: 'wave' | 'curve' | 'angle' | 'triangle'
  position?: 'top' | 'bottom'
  flipX?: boolean
  height?: number
  bgFrom?: string
  bgTo?: string
}

export default function SectionDivider({ 
  type = 'wave',
  position = 'bottom',
  flipX = false,
  height = 70,
  bgFrom,
  bgTo
}: SectionDividerProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const defaultBgFrom = isDark ? 'fill-dark-900' : 'fill-light-100'
  const defaultBgTo = isDark ? 'fill-dark-800' : 'fill-light-200'
  
  // Use provided colors or defaults
  const fillFrom = bgFrom || defaultBgFrom
  const fillTo = bgTo || defaultBgTo
  
  const isTop = position === 'top'
  
  // Generate proper path based on type
  const getPath = () => {
    switch(type) {
      case 'wave':
        return "M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,48C672,53,768,75,864,69.3C960,64,1056,32,1152,26.7C1248,21,1344,43,1392,53.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      case 'curve':
        return "M0,224L80,197.3C160,171,320,117,480,117.3C640,117,800,171,960,197.3C1120,224,1280,224,1360,224L1440,224L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
      case 'angle':
        return "M0,256L120,224C240,192,480,128,720,133.3C960,139,1200,213,1320,250.7L1440,288L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"
      case 'triangle':
        return "M1440,320L0,320L720,32L1440,320Z"
      default:
        return "M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,48C672,53,768,75,864,69.3C960,64,1056,32,1152,26.7C1248,21,1344,43,1392,53.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
    }
  }
  
  return (
    <div 
      className={`absolute ${isTop ? 'top-0' : 'bottom-0'} left-0 w-full overflow-hidden leading-0 z-10 pointer-events-none`}
      style={{ 
        transform: `${isTop ? 'rotate(180deg)' : ''} ${flipX ? 'scaleX(-1)' : ''}`,
      }}
    >
      <svg
        className="relative block w-full"
        style={{ height: `${height}px` }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <motion.path
          d={getPath()}
          className={`${isTop ? fillTo : fillFrom}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        />
      </svg>
    </div>
  )
}
