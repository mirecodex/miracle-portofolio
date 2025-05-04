'use client'

import { GestureRecognizer } from './gesture-recognizer'
import { useTheme } from 'next-themes'

export default function ClientGestureWrapper({
  children
}: {
  children: React.ReactNode
}) {
  const { setTheme, theme } = useTheme()
  
  const handleGestureComplete = (gesture: string) => {
    if (gesture === 'circle') {
      // Toggle theme
      setTheme(theme === 'dark' ? 'light' : 'dark')
    }
  }
  
  return (
    <GestureRecognizer onGestureComplete={handleGestureComplete}>
      {children}
    </GestureRecognizer>
  )
}
