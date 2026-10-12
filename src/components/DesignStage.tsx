"use client"

import { useEffect, useState, type ReactNode } from "react"
import { DESIGN_WIDTH, DESIGN_HEIGHT } from "@/constants/assets"

interface DesignStageProps {
  children: ReactNode
}

export default function DesignStage({ children }: DesignStageProps) {
  const [scale, setScale] = useState(1)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const updateScale = () => {
      setScale(Math.min(window.innerWidth / DESIGN_WIDTH, 1))
    }
    updateScale()
    window.addEventListener("resize", updateScale)
    return () => window.removeEventListener("resize", updateScale)
  }, [])

  return (
    <main
      className="design-stage"
      style={{
        height: mounted ? DESIGN_HEIGHT * scale : "100vh",
        opacity: mounted ? 1 : 0,
        transition: "opacity 0.15s ease-in",
      }}
    >
      <div
        className="design-canvas"
        style={{
          height: DESIGN_HEIGHT,
          width: DESIGN_WIDTH,
          transform: `scale(${scale})`,
        }}
      >
        <div className="relative size-full" data-node-id="1:2" data-name="Main">
          {children}
        </div>
      </div>
    </main>
  )
}
