"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const HoverCardContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  triggerRef: React.RefObject<HTMLElement>;
}>({
  isOpen: false,
  setIsOpen: () => {},
  triggerRef: { current: null }
})

const HoverCard = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLElement>(null)
  
  return (
    <HoverCardContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div {...props}>{children}</div>
    </HoverCardContext.Provider>
  )
}

const HoverCardTrigger = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { asChild?: boolean }
>(({ className, asChild = false, children, ...props }, ref) => {
  const { setIsOpen, triggerRef } = React.useContext(HoverCardContext)
  
  const handleMouseEnter = () => setIsOpen(true)
  const handleMouseLeave = () => setIsOpen(false)
  
  const childProps = {
    ref: (node: HTMLElement | null) => {
      // Handle both the ref passed in and our own ref
      if (typeof ref === 'function') ref(node as any)
      else if (ref) ref.current = node as any
      triggerRef.current = node
    },
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    ...props
  }
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, childProps)
  }
  
  return (
    <div className={cn("cursor-pointer", className)} {...childProps}>
      {children}
    </div>
  )
})
HoverCardTrigger.displayName = "HoverCardTrigger"

interface HoverCardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: "center" | "start" | "end"
  sideOffset?: number
}

const HoverCardContent = React.forwardRef<HTMLDivElement, HoverCardContentProps>(
  ({ className, align = "center", sideOffset = 4, children, ...props }, ref) => {
    const { isOpen, triggerRef } = React.useContext(HoverCardContext)
    const [position, setPosition] = React.useState({ top: 0, left: 0 })
    const contentRef = React.useRef<HTMLDivElement>(null)
    
    React.useEffect(() => {
      if (isOpen && triggerRef.current && contentRef.current) {
        const triggerRect = triggerRef.current.getBoundingClientRect()
        const contentRect = contentRef.current.getBoundingClientRect()
        
        let top = triggerRect.bottom + sideOffset + window.scrollY
        
        // Default center alignment
        let left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2 + window.scrollX
        
        // Adjust alignment
        if (align === "start") {
          left = triggerRect.left + window.scrollX
        } else if (align === "end") {
          left = triggerRect.right - contentRect.width + window.scrollX
        }
        
        // Keep within viewport
        const rightEdge = window.innerWidth - contentRect.width
        left = Math.max(10, Math.min(left, rightEdge - 10))
        
        setPosition({ top, left })
      }
    }, [isOpen, align, sideOffset])
    
    return (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={(node) => {
              // Handle both refs
              if (typeof ref === 'function') ref(node as any)
              else if (ref) ref.current = node as any
              contentRef.current = node as HTMLDivElement | null
            }}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "z-50 fixed rounded-md border border-dark-600 bg-dark-800 p-4 text-white shadow-md",
              className
            )}
            style={{
              top: position.top,
              left: position.left,
            }}
            {...props}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    )
  }
)
HoverCardContent.displayName = "HoverCardContent"

export { HoverCard, HoverCardTrigger, HoverCardContent }
