"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Read actual DOM state — the inline script in layout.tsx already set it
    setIsDark(document.documentElement.classList.contains("dark"))
  }, [])

  function toggleTheme() {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle("dark", next)
    localStorage.setItem("theme", next ? "dark" : "light")
  }

  // Prevent hydration mismatch — render placeholder until mounted
  if (!mounted) {
    return (
      <button
        className="w-8 h-8 rounded-sm border border-border/50 flex items-center justify-center text-muted-foreground"
        aria-label="Toggle theme"
      >
        <Sun size={14} />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 rounded-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all cursor-pointer"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <Sun size={14} /> : <Moon size={14} />}
    </button>
  )
}
