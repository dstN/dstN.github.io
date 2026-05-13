"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Experience {
  title: string
  company: string
  period: string
  description: string
  technologies: string[]
}

export function ResumeTimeline({ experiences }: { experiences: Experience[] }) {
  const [expandedItem, setExpandedItem] = useState<number | null>(0)

  return (
    <div className="relative max-w-2xl">
      {/* Timeline line */}
      <div
        className="absolute left-3 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-border to-transparent"
        aria-hidden="true"
      />

      {/* Timeline items */}
      {experiences.map((item, index) => {
        const isExpanded = expandedItem === index

        return (
          <div
            key={`${item.title}-${index}`}
            className="relative mb-4 pl-10 animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Timeline node */}
            <div
              className={cn(
                "absolute left-1.5 top-5 w-3 h-3 rounded-sm z-10 transition-all duration-300 border",
                isExpanded
                  ? "bg-primary border-primary glow-magenta scale-110"
                  : "bg-background border-border hover:border-primary"
              )}
            />

            {/* Content card */}
            <button
              onClick={() => setExpandedItem(isExpanded ? null : index)}
              className={cn(
                "w-full text-left glass rounded-sm border transition-all duration-300 cursor-pointer p-5",
                isExpanded
                  ? "border-primary/50 glow-magenta"
                  : "border-border/50 hover:border-primary/30"
              )}
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-mono text-xs text-primary tracking-wider">
                  {item.period}
                </span>
                <ChevronDown
                  className={cn(
                    "w-4 h-4 text-muted-foreground transition-transform duration-300",
                    isExpanded && "rotate-180"
                  )}
                />
              </div>

              <h3 className="text-sm font-bold text-foreground">{item.title}</h3>
              <p className="text-xs text-muted-foreground font-mono">{item.company}</p>

              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  isExpanded ? "max-h-96 mt-3" : "max-h-0"
                )}
              >
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 text-xs font-mono bg-muted/50 border border-border/50 rounded-sm text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          </div>
        )
      })}
    </div>
  )
}
