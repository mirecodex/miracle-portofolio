'use client'

import { useEffect, useRef } from 'react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const contentRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    // Skip smooth scroll for browsers that support it natively
    if ('scrollBehavior' in document.documentElement.style) {
      return
    }
    
    const handleHashClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')
      
      if (!anchor) return
      
      // Only handle hash links on the same page
      const href = anchor.getAttribute('href')
      if (!href || !href.startsWith('#')) return
      
      const targetId = href.substring(1)
      const targetElement = document.getElementById(targetId)
      
      if (!targetElement) return
      
      e.preventDefault()
      
      // Smooth scroll to target
      window.scrollTo({
        top: targetElement.offsetTop - 100, // Adjust for header
        behavior: 'smooth'
      })
      
      // Update URL without scrolling
      window.history.pushState(null, '', href)
    }
    
    document.addEventListener('click', handleHashClick)
    
    return () => {
      document.removeEventListener('click', handleHashClick)
    }
  }, [])
  
  return <div ref={contentRef}>{children}</div>
}
