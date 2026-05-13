import Image from "next/image"
import { Code2, Palette, Zap, Coffee } from "lucide-react"

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description: "Writing maintainable, scalable code that stands the test of time.",
    accent: "primary" as const,
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive interfaces that users love to interact with.",
    accent: "secondary" as const,
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing for speed and delivering lightning-fast experiences.",
    accent: "primary" as const,
  },
  {
    icon: Coffee,
    title: "Problem Solver",
    description: "Tackling complex challenges with creative solutions.",
    accent: "secondary" as const,
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Dot background */}
      <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />

      {/* Background accent */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[200px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="mb-16 animate-fade-in">
          <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">{"// about"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Who <span className="text-primary text-glow-magenta">I Am</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {/* Profile image */}
          <div className="animate-fade-in-left h-full" style={{ animationDelay: "100ms" }}>
            <div className="glass rounded-sm border border-border/50 overflow-hidden h-full flex flex-col">
              {/* Terminal-style header */}
              <div className="flex items-center justify-between px-4 py-2 border-b border-border/30">
                <span className="font-mono text-xs text-muted-foreground">profile.webp</span>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-destructive/70" />
                  <span className="w-2 h-2 rounded-full bg-neon-green/50" />
                  <span className="w-2 h-2 rounded-full bg-primary/50" />
                </div>
              </div>
              <div className="flex-1 relative">
                <Image
                  src="/images/dustin-profile.webp"
                  alt="Dustin Aaron Tramm"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="animate-fade-in h-full" style={{ animationDelay: "200ms" }}>
            <div className="glass rounded-sm p-6 md:p-8 border border-border/50 h-full flex flex-col justify-between">
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {"I'm a passionate "}
                <span className="text-foreground font-medium">Front End Developer</span>
                {" with a love for creating immersive digital experiences. Based in "}
                <span className="text-primary font-mono">Hamburg, DE</span>
                {", I specialize in building modern web applications that combine aesthetic beauty with technical excellence."}
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {"With a keen eye for detail and a drive for innovation, I transform complex ideas into elegant, user-friendly interfaces. I believe that great software should not only function flawlessly but also "}
                <span className="text-secondary">inspire and delight</span>
                {" its users."}
              </p>
              <div className="pt-4 border-t border-border/30">
                <p className="font-mono text-xs text-muted-foreground">
                  <span className="text-primary">$</span> cat status.txt
                </p>
                <p className="font-mono text-xs text-neon-green mt-1">
                  → building things & always curious
                  <span className="animate-terminal-blink ml-1">▌</span>
                </p>
              </div>
            </div>
          </div>

          {/* Highlight cards */}
          <div className="grid grid-cols-2 gap-3 animate-fade-in-right h-full" style={{ animationDelay: "400ms" }}>
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className={`glass rounded-sm border border-border/50 p-4 md:p-5 hover:scale-[1.03] transition-all duration-300 group ${
                  item.accent === "primary" ? "hover:border-primary/50 hover:glow-magenta" : "hover:border-secondary/50 hover:glow-cyan"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div
                  className={`w-8 h-8 rounded-sm flex items-center justify-center mb-3 ${
                    item.accent === "primary"
                      ? "bg-primary/15 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
                      : "bg-secondary/15 text-secondary group-hover:bg-secondary group-hover:text-secondary-foreground"
                  } transition-all duration-300`}
                >
                  <item.icon size={16} />
                </div>
                <h3 className="font-mono font-semibold mb-1 text-foreground text-xs">{item.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
