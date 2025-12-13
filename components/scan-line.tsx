"use client"

import { useEffect, useState } from "react"

export function ScanLine() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((prev) => !prev)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-[0.03]" aria-hidden="true">
      <div
        className="absolute left-0 right-0 h-[2px] bg-neon-turquoise"
        style={{
          animation: "scan-line 8s linear infinite",
        }}
      />
    </div>
  )
}
