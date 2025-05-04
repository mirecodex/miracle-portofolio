"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  ratio?: number
}

const AspectRatio = React.forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ className, ratio = 1, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          paddingBottom: `${100 / ratio}%`,
          ...style,
        }}
        className={cn("w-full", className)}
        {...props}
      >
        <div className="absolute inset-0">{props.children}</div>
      </div>
    )
  }
)
AspectRatio.displayName = "AspectRatio"

export { AspectRatio }
