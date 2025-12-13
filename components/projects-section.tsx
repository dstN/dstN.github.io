"use client"

import { useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const projects = [
  {
    title: "NeonDash",
    description: "A futuristic analytics dashboard with real-time data visualization and AI-powered insights.",
    image: "/futuristic-analytics-dashboard-dark-theme-neon.jpg",
    tags: ["React", "TypeScript", "D3.js", "Tailwind"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "CyberStore",
    description: "E-commerce platform with immersive 3D product showcases and seamless checkout experience.",
    image: "/cyberpunk-e-commerce-website-dark-theme.jpg",
    tags: ["Next.js", "Three.js", "Stripe", "Prisma"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    title: "SynthWave",
    description: "Music streaming app with personalized recommendations and spatial audio support.",
    image: "/music-streaming-app-dark-theme-synthwave.jpg",
    tags: ["React Native", "Node.js", "MongoDB", "WebAudio"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    title: "HoloChat",
    description: "Real-time messaging platform with end-to-end encryption and AR features.",
    image: "/chat-messaging-app-dark-futuristic-theme.jpg",
    tags: ["Vue.js", "Socket.io", "WebRTC", "AWS"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
]

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.1 })
  const [activeProject, setActiveProject] = useState(0)

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length)
  }

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length)
  }

  return (
    <section id="projects" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-secondary font-mono text-sm tracking-widest uppercase">{"// My Work"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Featured <span className="text-primary text-glow-magenta">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {
              "A showcase of my recent work, from concept to deployment. Each project represents a unique challenge and creative solution."
            }
          </p>
        </div>

        {/* Featured project carousel */}
        <div
          className={`relative mb-16 transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="glass rounded-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Project image */}
              <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                <Image
                  src={projects[activeProject].image || "/placeholder.svg"}
                  alt={projects[activeProject].title}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent lg:bg-gradient-to-r" />
              </div>

              {/* Project info */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                {projects[activeProject].featured && (
                  <span className="inline-flex items-center gap-2 text-primary text-sm font-mono mb-4">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    Featured Project
                  </span>
                )}
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">{projects[activeProject].title}</h3>
                <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                  {projects[activeProject].description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {projects[activeProject].tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 text-sm font-mono bg-muted rounded-full text-muted-foreground">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-4">
                  <a
                    href={projects[activeProject].liveUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-transform neon-glow-magenta"
                  >
                    <ExternalLink size={18} />
                    Live Demo
                  </a>
                  <a
                    href={projects[activeProject].githubUrl}
                    className="inline-flex items-center gap-2 px-6 py-3 glass rounded-lg font-medium text-foreground hover:text-secondary transition-colors"
                  >
                    <Github size={18} />
                    Source
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevProject}
              className="p-3 glass rounded-full text-muted-foreground hover:text-primary hover:neon-glow-magenta transition-all"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>

            <div className="flex items-center gap-2">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveProject(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-all",
                    activeProject === index ? "bg-primary w-8" : "bg-muted hover:bg-muted-foreground",
                  )}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextProject}
              className="p-3 glass rounded-full text-muted-foreground hover:text-primary hover:neon-glow-magenta transition-all"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Project grid */}
        <div
          className={`grid md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-700 delay-400 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {projects.map((project, index) => (
            <div
              key={project.title}
              onClick={() => setActiveProject(index)}
              className={cn(
                "group cursor-pointer glass rounded-xl overflow-hidden transition-all duration-300 hover:scale-105",
                activeProject === index
                  ? "ring-2 ring-primary neon-glow-magenta"
                  : "hover:ring-1 hover:ring-secondary/50",
              )}
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
