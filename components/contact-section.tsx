import { Mail, MapPin } from "lucide-react"
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/icons"
import { ContactForm } from "@/components/contact-form"
import { ObfuscatedEmail } from "@/components/obfuscated-email"

export function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-dots opacity-40" aria-hidden="true" />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[200px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="mb-16 animate-fade-in">
          <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">{"// contact"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Get In <span className="text-primary text-glow-magenta">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-xl font-mono text-sm">
            Have a project in mind? Let&apos;s build something great together.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 items-stretch">
          {/* Contact Form */}
          <div className="glass rounded-sm border border-border/50 overflow-hidden animate-fade-in-left h-full flex flex-col">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border/30">
              <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
                new_message.tsx
              </span>
              <div className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-destructive/70" />
                <span className="w-2 h-2 rounded-full bg-neon-green/50" />
                <span className="w-2 h-2 rounded-full bg-primary/50" />
              </div>
            </div>
            <div className="p-5 md:p-6 flex-1">
              <ContactForm />
            </div>
          </div>

          {/* Info panel */}
          <div className="flex flex-col gap-4 animate-fade-in-right h-full" style={{ animationDelay: "200ms" }}>
            {/* Location */}
            <div className="glass rounded-sm border border-border/50 p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-primary/15 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-semibold text-foreground mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">Hamburg, DE</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="glass rounded-sm border border-border/50 p-5">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-secondary/15 flex items-center justify-center shrink-0">
                  <Mail size={14} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-mono text-xs font-semibold text-foreground mb-1">Email</h3>
                  <ObfuscatedEmail />
                </div>
              </div>
            </div>

            {/* Socials */}
            <div className="glass rounded-sm border border-border/50 p-5">
              <h3 className="font-mono text-xs font-semibold text-foreground mb-3">Connect</h3>
              <div className="flex items-center gap-3">
                {[
                  { icon: GithubIcon, href: "https://github.com/dstN", label: "GitHub" },
                  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/dustin-aaron-tramm/", label: "LinkedIn" },
                  { icon: XIcon, href: "https://twitter.com/dstnjs", label: "X" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:glow-magenta transition-all"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Terminal block */}
            <div className="glass rounded-sm border border-border/50 p-5 flex-1 flex items-end">
              <div className="font-mono text-xs space-y-1">
                <p className="text-muted-foreground">
                  <span className="text-primary">$</span> curl api.dstN.dev/status
                </p>
                <p className="text-neon-green">
                  {`{ "status": "available", "response_time": "< 24h" }`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
