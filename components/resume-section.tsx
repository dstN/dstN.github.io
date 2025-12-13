"use client"

import { useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Briefcase, GraduationCap, Award, Download, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const timelineData = [
  {
    type: "work" as const,
    title: "Senior Frontend Developer",
    organization: "TechCorp Inc.",
    period: "2022 — Present",
    description:
      "Leading frontend development for enterprise applications, mentoring junior developers, and establishing best practices.",
    achievements: ["Improved performance by 40%", "Led team of 5 developers", "Implemented design system"],
  },
  {
    type: "work" as const,
    title: "Frontend Developer",
    organization: "Digital Agency",
    period: "2020 — 2022",
    description:
      "Built responsive web applications for various clients, collaborated with design teams, and optimized user experiences.",
    achievements: ["Delivered 20+ projects", "Reduced load time by 60%", "100% client satisfaction"],
  },
  {
    type: "education" as const,
    title: "B.Sc. Computer Science",
    organization: "Hamburg University",
    period: "2016 — 2020",
    description: "Focused on software engineering, human-computer interaction, and web technologies.",
    achievements: ["Graduated with honors", "Research assistant", "Thesis on UX optimization"],
  },
  {
    type: "work" as const,
    title: "Junior Developer",
    organization: "StartupHub",
    period: "2019 — 2020",
    description:
      "Developed MVPs for early-stage startups, worked in agile environments, and learned rapid prototyping.",
    achievements: ["Built 5 MVPs", "Full-stack exposure", "Startup methodology"],
  },
  {
    type: "certification" as const,
    title: "AWS Certified Developer",
    organization: "Amazon Web Services",
    period: "2021",
    description:
      "Professional certification demonstrating expertise in developing and maintaining AWS-based applications.",
    achievements: ["Cloud architecture", "Serverless applications", "DevOps practices"],
  },
]

export function ResumeSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.1 })
  const [expandedItem, setExpandedItem] = useState<number | null>(0)

  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return Briefcase
      case "education":
        return GraduationCap
      case "certification":
        return Award
      default:
        return Briefcase
    }
  }

  return (
    <section id="resume" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[200px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-secondary font-mono text-sm tracking-widest uppercase">{"// Career Path"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            My <span className="text-primary text-glow-magenta">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            {"An interactive timeline of my professional experience, education, and achievements."}
          </p>

          {/* Download CV button */}
          <a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 glass rounded-lg font-medium text-foreground hover:text-primary hover:neon-glow-magenta transition-all"
          >
            <Download size={18} />
            Download CV
          </a>
        </div>

        {/* Interactive timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-secondary to-primary"
              aria-hidden="true"
            />

            {/* Timeline items */}
            {timelineData.map((item, index) => {
              const Icon = getIcon(item.type)
              const isExpanded = expandedItem === index
              const isEven = index % 2 === 0

              return (
                <div
                  key={`${item.title}-${index}`}
                  className={cn(
                    "relative mb-8 transition-all duration-700",
                    isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                  )}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={cn("md:w-1/2 pl-20 md:pl-0", isEven ? "md:pr-12 md:text-right" : "md:ml-auto md:pl-12")}
                  >
                    {/* Timeline node */}
                    <div
                      className={cn(
                        "absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-10 transition-all duration-300",
                        item.type === "work" ? "bg-primary" : item.type === "education" ? "bg-secondary" : "bg-primary",
                        isExpanded &&
                          (item.type === "work" || item.type === "certification"
                            ? "neon-glow-magenta scale-125"
                            : "neon-glow-turquoise scale-125"),
                      )}
                    />

                    {/* Content card */}
                    <button
                      onClick={() => setExpandedItem(isExpanded ? null : index)}
                      className={cn(
                        "w-full text-left glass rounded-xl p-6 transition-all duration-300 cursor-pointer",
                        isExpanded
                          ? item.type === "work" || item.type === "certification"
                            ? "neon-glow-magenta"
                            : "neon-glow-turquoise"
                          : "hover:scale-[1.02]",
                      )}
                    >
                      <div className={cn("flex items-start gap-4", isEven && "md:flex-row-reverse")}>
                        <div
                          className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center shrink-0",
                            item.type === "work" || item.type === "certification"
                              ? "bg-primary/20 text-primary"
                              : "bg-secondary/20 text-secondary",
                          )}
                        >
                          <Icon size={24} />
                        </div>

                        <div className={cn("flex-1", isEven && "md:text-right")}>
                          <span className="text-xs font-mono text-muted-foreground">{item.period}</span>
                          <h3 className="text-lg font-bold text-foreground mt-1">{item.title}</h3>
                          <p
                            className={cn(
                              "text-sm font-medium",
                              item.type === "work" || item.type === "certification" ? "text-primary" : "text-secondary",
                            )}
                          >
                            {item.organization}
                          </p>

                          <div
                            className={cn(
                              "overflow-hidden transition-all duration-300",
                              isExpanded ? "max-h-96 mt-4" : "max-h-0",
                            )}
                          >
                            <p className="text-muted-foreground mb-4">{item.description}</p>
                            <div className={cn("flex flex-wrap gap-2", isEven && "md:justify-end")}>
                              {item.achievements.map((achievement) => (
                                <span
                                  key={achievement}
                                  className="px-3 py-1 text-xs font-mono bg-muted rounded-full text-muted-foreground"
                                >
                                  {achievement}
                                </span>
                              ))}
                            </div>
                          </div>

                          <ChevronDown
                            className={cn(
                              "w-5 h-5 mx-auto mt-2 text-muted-foreground transition-transform duration-300",
                              isExpanded && "rotate-180",
                              isEven && "md:ml-auto md:mr-0",
                            )}
                          />
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
