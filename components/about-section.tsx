"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Code2, Palette, Zap, Coffee } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable code that stands the test of time.",
    color: "primary" as const,
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive interfaces that users love to interact with.",
    color: "secondary" as const,
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing for speed and delivering lightning-fast experiences.",
    color: "primary" as const,
  },
  {
    icon: Coffee,
    title: "Problem Solver",
    description: "Tackling complex challenges with creative solutions.",
    color: "secondary" as const,
  },
]

export function AboutSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.2 })

  return (
    <section id="about" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[200px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-secondary font-mono text-sm tracking-widest uppercase">{"// About Me"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Who <span className="text-primary text-glow-magenta">I Am</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text content */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="glass rounded-2xl p-8 space-y-6">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {"I'm a passionate "}
                <span className="text-foreground font-medium">Front End Developer</span>
                {" with a love for creating immersive digital experiences. Based in "}
                <span className="text-secondary">Hamburg, Germany</span>
                {
                  ", I specialize in building modern web applications that combine aesthetic beauty with technical excellence."
                }
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {
                  "With a keen eye for detail and a drive for innovation, I transform complex ideas into elegant, user-friendly interfaces. I believe that great software should not only function flawlessly but also "
                }
                <span className="text-primary">inspire and delight</span>
                {" its users."}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {
                  "When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or enjoying a good cup of coffee while sketching out my next big idea."
                }
              </p>
            </div>
          </div>

          {/* Highlight cards */}
          <div
            className={`grid grid-cols-2 gap-4 transition-all duration-700 delay-400 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className={`glass rounded-xl p-6 hover:scale-105 transition-all duration-300 group ${
                  item.color === "primary" ? "hover:neon-glow-magenta" : "hover:neon-glow-turquoise"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                    item.color === "primary"
                      ? "bg-primary/20 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                      : "bg-secondary/20 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground"
                  } transition-all duration-300`}
                >
                  <item.icon size={24} />
                </div>
                <h3 className="font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
