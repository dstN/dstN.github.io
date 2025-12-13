"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient orbs */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-glow-pulse"
        style={{
          transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-[128px] animate-glow-pulse"
        style={{
          transform: `translate(${mousePosition.x * -0.5}px, ${mousePosition.y * -0.5}px)`,
          animationDelay: "1s",
        }}
        aria-hidden="true"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <p
            className={`text-secondary font-mono text-sm md:text-base tracking-widest uppercase mb-4 transition-all duration-700 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {"<"} Hello World {"/>"}
          </p>

          {/* Main heading */}
          <h1
            className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 transition-all duration-700 delay-100 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-foreground">{"Hey! I'm "}</span>
            <span className="text-primary text-glow-magenta animate-flicker">Dustin</span>
            <span className="text-secondary">.</span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-xl md:text-2xl text-muted-foreground mb-4 transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Front End Developer from <span className="text-secondary text-glow-turquoise">Hamburg, Germany</span>
          </p>

          {/* Tagline */}
          <p
            className={`text-lg text-muted-foreground/80 max-w-2xl mx-auto mb-12 transition-all duration-700 delay-300 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            I craft futuristic digital experiences with clean code and pixel-perfect precision.
          </p>

          {/* CTA Buttons */}
          <div
            className={`flex flex-wrap items-center justify-center gap-4 mb-16 transition-all duration-700 delay-400 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            <a
              href="#projects"
              className="group relative px-8 py-3 bg-primary text-primary-foreground font-medium rounded-lg overflow-hidden transition-all hover:scale-105 neon-glow-magenta"
            >
              <span className="relative z-10">View My Work</span>
            </a>
            <a
              href="#contact"
              className="px-8 py-3 glass rounded-lg font-medium text-foreground hover:text-primary transition-all hover:scale-105 hover:border-primary/50"
            >
              Get in Touch
            </a>
          </div>

          {/* Social Links */}
          <div
            className={`flex items-center justify-center gap-6 transition-all duration-700 delay-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            {[
              { icon: Github, href: "https://github.com/dstn", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: Mail, href: "mailto:hello@example.com", label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 glass rounded-full text-muted-foreground hover:text-primary hover:neon-glow-magenta transition-all hover:scale-110"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-secondary transition-colors animate-float"
        aria-label="Scroll to about section"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} />
      </a>
    </section>
  )
}
