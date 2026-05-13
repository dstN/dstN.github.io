"use client"

import { useEffect, useState } from "react"
import { ChevronDown, Mail } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/icons"
import { getMailtoHref } from "@/lib/email"

const roles = ["Front End Developer", "UI/UX Enthusiast", "Open Source Builder"]

export function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const currentRole = roles[roleIndex]
    
    if (!isDeleting && displayedText === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000)
      return () => clearTimeout(timeout)
    }

    if (isDeleting && displayedText === "") {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
      return
    }

    const timeout = setTimeout(
      () => {
        setDisplayedText(currentRole.slice(0, displayedText.length + (isDeleting ? -1 : 1)))
      },
      isDeleting ? 40 : 80
    )

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, roleIndex])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

      {/* Large gradient orbs */}
      <div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[200px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/8 rounded-full blur-[200px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div
          className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Terminal-style tag */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 glass rounded-sm border border-border/50 mb-8">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-glow-pulse" />
            <span className="text-xs font-mono text-muted-foreground">online</span>
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
            <span className="text-foreground">dstN</span>
            <span className="text-primary text-glow-magenta">.</span>
          </h1>

          {/* Typewriter */}
          <div className="h-10 mb-8 flex items-center justify-center">
            <p className="text-lg md:text-xl font-mono text-muted-foreground">
              <span className="text-primary/70">{">"} </span>
              {displayedText}
              <span className="animate-terminal-blink text-primary">▌</span>
            </p>
          </div>

          {/* Description */}
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
            Building <span className="text-foreground">clean</span>,{" "}
            <span className="text-foreground">performant</span>, and{" "}
            <span className="text-foreground">accessible</span> web experiences
            from Hamburg, DE.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-mono text-sm rounded-sm hover:opacity-90 hover:glow-magenta transition-all duration-300"
            >
              view_projects()
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 glass border border-border/50 font-mono text-sm text-muted-foreground rounded-sm hover:text-primary hover:border-primary/50 transition-all duration-300"
            >
              send_message()
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4">
            {[
              { icon: GithubIcon, href: "https://github.com/dstN", label: "GitHub" },
              { icon: LinkedinIcon, href: "https://www.linkedin.com/in/dustin-aaron-tramm/", label: "LinkedIn" },
              { icon: Mail, href: getMailtoHref(), label: "Email" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-10 h-10 glass rounded-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
        aria-label="Scroll down"
      >
        <span className="text-xs font-mono tracking-widest uppercase">scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </a>
    </section>
  )
}
