"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Send, Mail, MapPin, Github, Linkedin, Twitter, CheckCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.2 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({ name: "", email: "", message: "" })
    }, 3000)
  }

  return (
    <section id="contact" ref={ref} className="relative py-32 overflow-hidden">
      {/* Background accent */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[200px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-secondary font-mono text-sm tracking-widest uppercase">{"// Let's Connect"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            Get in <span className="text-primary text-glow-magenta">Touch</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {
              "Have a project in mind or just want to say hello? I'd love to hear from you. Let's create something amazing together."
            }
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact info */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <div className="glass rounded-2xl p-8 h-full">
              <h3 className="text-2xl font-bold mb-8 text-foreground">{"Let's work together"}</h3>

              <div className="space-y-6 mb-12">
                <a href="mailto:hello@dustin.dev" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      hello@dustin.dev
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/20 text-secondary flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="text-foreground font-medium">Hamburg, Germany</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Find me on</p>
                <div className="flex items-center gap-4">
                  {[
                    { icon: Github, href: "#", label: "GitHub" },
                    { icon: Linkedin, href: "#", label: "LinkedIn" },
                    { icon: Twitter, href: "#", label: "Twitter" },
                  ].map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="p-3 glass rounded-full text-muted-foreground hover:text-primary hover:neon-glow-magenta transition-all hover:scale-110"
                      aria-label={social.label}
                    >
                      <social.icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div
            className={`transition-all duration-700 delay-400 ${
              isInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center h-full py-12">
                  <div className="w-16 h-16 rounded-full bg-secondary/20 text-secondary flex items-center justify-center mb-4 neon-glow-turquoise">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">Message Sent!</h4>
                  <p className="text-muted-foreground text-center">
                    {"Thanks for reaching out. I'll get back to you soon!"}
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className={cn(
                        "block text-sm font-medium mb-2 transition-colors",
                        focusedField === "name" ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formState.name}
                      onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        "w-full px-4 py-3 bg-input rounded-lg border-2 transition-all text-foreground placeholder:text-muted-foreground/50 focus:outline-none",
                        focusedField === "name"
                          ? "border-primary neon-glow-magenta"
                          : "border-transparent hover:border-border",
                      )}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={cn(
                        "block text-sm font-medium mb-2 transition-colors",
                        focusedField === "email" ? "text-secondary" : "text-muted-foreground",
                      )}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formState.email}
                      onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className={cn(
                        "w-full px-4 py-3 bg-input rounded-lg border-2 transition-all text-foreground placeholder:text-muted-foreground/50 focus:outline-none",
                        focusedField === "email"
                          ? "border-secondary neon-glow-turquoise"
                          : "border-transparent hover:border-border",
                      )}
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className={cn(
                        "block text-sm font-medium mb-2 transition-colors",
                        focusedField === "message" ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formState.message}
                      onChange={(e) => setFormState((prev) => ({ ...prev, message: e.target.value }))}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      rows={5}
                      className={cn(
                        "w-full px-4 py-3 bg-input rounded-lg border-2 transition-all resize-none text-foreground placeholder:text-muted-foreground/50 focus:outline-none",
                        focusedField === "message"
                          ? "border-primary neon-glow-magenta"
                          : "border-transparent hover:border-border",
                      )}
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-primary text-primary-foreground font-medium rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform neon-glow-magenta"
                  >
                    <Send size={18} />
                    Send Message
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
