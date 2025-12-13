"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Resume", href: "#resume" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500",
        isScrolled ? "glass py-3" : "bg-transparent py-6",
      )}
    >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <a href="#home" className="text-xl font-bold tracking-tight group">
          <span className="text-foreground group-hover:text-primary transition-colors">dstn</span>
          <span className="text-primary animate-flicker">.</span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className={cn(
                  "relative text-sm font-medium tracking-wide uppercase transition-all duration-300",
                  activeSection === item.href.slice(1)
                    ? "text-primary text-glow-magenta"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.name}
                {activeSection === item.href.slice(1) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full" />
                )}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "md:hidden fixed inset-0 top-[60px] glass transition-all duration-500",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8">
          {navItems.map((item, index) => (
            <li
              key={item.name}
              style={{
                transitionDelay: isOpen ? `${index * 50}ms` : "0ms",
              }}
              className={cn(
                "transition-all duration-300",
                isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
              )}
            >
              <a
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-2xl font-medium tracking-wide uppercase transition-colors",
                  activeSection === item.href.slice(1)
                    ? "text-primary text-glow-magenta"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}
