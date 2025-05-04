"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext<{
  selectedValue: string;
  onValueChange: (value: string) => void;
}>({
  selectedValue: "",
  onValueChange: () => {},
})

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ defaultValue, value, onValueChange, children, className, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = React.useState<string>(value || defaultValue || "")
    
    // Update internal state when controlled value changes
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value)
      }
    }, [value])

    const handleValueChange = React.useCallback((value: string) => {
      setSelectedValue(value)
      onValueChange?.(value)
    }, [onValueChange])

    return (
      <TabsContext.Provider value={{ selectedValue, onValueChange: handleValueChange }}>
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-dark-700 p-1 text-white",
      className
    )}
    {...props}
  />
))
TabsList.displayName = "TabsList"

interface TabsTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const { selectedValue, onValueChange } = React.useContext(TabsContext)
    const isActive = selectedValue === value
    
    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        data-state={isActive ? "active" : "inactive"}
        onClick={() => onValueChange(value)}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          isActive ? "bg-primary-500 text-white shadow-sm" : "text-gray-300 hover:text-white hover:bg-dark-600/50",
          className
        )}
        {...props}
      />
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    const { selectedValue } = React.useContext(TabsContext)
    const isSelected = selectedValue === value
    
    if (!isSelected) return null
    
    return (
      <div
        ref={ref}
        role="tabpanel"
        data-state={isSelected ? "active" : "inactive"}
        tabIndex={isSelected ? 0 : -1}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
