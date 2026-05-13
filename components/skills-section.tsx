import { cn } from "@/lib/utils"

const skillCategories = [
  {
    title: "Technologies",
    skills: [
      { name: "HTML / CSS", level: 95 },
      { name: "JavaScript / TypeScript", level: 90 },
      { name: "Vue.js / Nuxt", level: 88 },
      { name: "React / Next.js", level: 80 },
      { name: "Tailwind CSS / SASS", level: 92 },
      { name: "Bootstrap", level: 88 },
      { name: "jQuery", level: 85 },
      { name: "MJML / Email Development", level: 85 },
      { name: "WordPress / Joomla / Twig", level: 82 },
      { name: "Node.js / NestJS", level: 70 },
      { name: "Responsive Design", level: 95 },
      { name: "Accessibility / a11y", level: 85 },
      { name: "REST APIs", level: 80 },
      { name: "SEO", level: 78 },
    ],
    accent: "primary" as const,
  },
  {
    title: "Tools & Workflow",
    skills: [
      { name: "VS Code", level: 95 },
      { name: "Git / GitHub", level: 90 },
      { name: "npm / yarn", level: 88 },
      { name: "Docker / DDEV", level: 72 },
      { name: "Jira / Confluence", level: 80 },
      { name: "Postman", level: 78 },
      { name: "Figma / MCP", level: 70 },
      { name: "Vite / Webpack", level: 82 },
      { name: "CLI / Terminal", level: 85 },
      { name: "CI / CD (GitHub Actions)", level: 75 },
      { name: "Browser DevTools", level: 92 },
    ],
    accent: "secondary" as const,
  },
]

export function SkillsSection() {
  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[200px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="mb-16 animate-fade-in">
          <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">{"// skills"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Tech <span className="text-secondary text-glow-cyan">Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-xl font-mono text-sm">
            The tools and technologies I use to bring ideas to production.
          </p>
        </div>

        {/* Skill categories */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((category, catIndex) => (
            <div
              key={category.title}
              className="glass rounded-sm border border-border/50 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${catIndex * 150}ms` }}
            >
              {/* Category header */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
                <span className={cn(
                  "font-mono text-xs tracking-[0.2em] uppercase",
                  category.accent === "primary" ? "text-primary" : "text-secondary"
                )}>
                  {category.title}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  {category.skills.length} skills
                </span>
              </div>

              {/* Skills with progress bars */}
              <div className="p-5 space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-baseline mb-1.5">
                      <span className="text-xs font-mono text-foreground">{skill.name}</span>
                      <span className="text-xs font-mono text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-none overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-none transition-all duration-1000",
                          category.accent === "primary" ? "bg-primary" : "bg-secondary"
                        )}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
