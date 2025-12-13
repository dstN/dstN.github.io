"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { cn } from "@/lib/utils"

const skillCategories = [
  {
    title: "Frontend",
    skills: [
      { name: "React", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Next.js", level: 88 },
      { name: "Vue.js", level: 75 },
      { name: "Tailwind CSS", level: 92 },
    ],
    color: "primary" as const,
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Python", level: 70 },
      { name: "PostgreSQL", level: 78 },
      { name: "GraphQL", level: 82 },
      { name: "REST APIs", level: 90 },
    ],
    color: "secondary" as const,
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", level: 92 },
      { name: "Docker", level: 75 },
      { name: "Figma", level: 85 },
      { name: "CI/CD", level: 80 },
      { name: "Testing", level: 78 },
    ],
    color: "primary" as const,
  },
]

export function SkillsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.2 })

  return (
    <section id="skills" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[200px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-secondary font-mono text-sm tracking-widest uppercase">{"// My Expertise"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Skills & <span className="text-primary text-glow-magenta">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {"A comprehensive toolkit that enables me to build full-stack applications from concept to deployment."}
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={cn(
                "glass rounded-2xl p-8 transition-all duration-700",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
              style={{ transitionDelay: `${categoryIndex * 150}ms` }}
            >
              <h3
                className={cn(
                  "text-xl font-bold mb-6",
                  category.color === "primary" ? "text-primary" : "text-secondary",
                )}
              >
                {category.title}
              </h3>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-1000 ease-out",
                          category.color === "primary" ? "bg-primary" : "bg-secondary",
                        )}
                        style={{
                          width: isInView ? `${skill.level}%` : "0%",
                          transitionDelay: `${categoryIndex * 150 + skillIndex * 100}ms`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech stack icons */}
        <div
          className={`mt-16 flex flex-wrap items-center justify-center gap-8 transition-all duration-700 delay-500 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Tailwind", "Git", "Docker"].map((tech) => (
            <div
              key={tech}
              className="px-6 py-3 glass rounded-full text-muted-foreground hover:text-foreground hover:scale-110 transition-all cursor-default"
            >
              <span className="font-mono text-sm">{tech}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
