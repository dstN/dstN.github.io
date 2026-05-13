"use client"

import { useState, useEffect, useRef } from "react"
import { X } from "lucide-react"
import { getEmail } from "@/lib/email"

export function LegalModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("...")
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setEmail(getEmail())

    // Trap focus and handle escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Legal Information"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass border border-border/50 rounded-sm z-10"
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between px-6 py-4 border-b border-border/30 bg-card/95 backdrop-blur-sm z-10">
          <h2 className="text-lg font-bold text-foreground">Legal Information</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-sm border border-border/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-8">
          {/* ─── Imprint ─── */}
          <section>
            <h3 className="text-lg font-bold text-primary mb-4">Imprint</h3>
            <div className="space-y-1 text-sm text-foreground">
              <p className="text-muted-foreground mb-2">Information according to § 5 DDG:</p>
              <p>Dustin Tramm</p>
              <p>c/o Impressumservice Dein-Impressum</p>
              <p>Stettiner Str. 41</p>
              <p>35410 Hungen</p>
              <p>Germany</p>
            </div>
            <p className="mt-4 text-sm">
              <span className="text-muted-foreground">Email: </span>
              <a
                href={`mailto:${email}`}
                className="text-primary hover:underline"
              >
                {email}
              </a>
            </p>
            <a
              href="#contact"
              onClick={onClose}
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-primary text-primary-foreground font-mono text-xs rounded-sm hover:opacity-90 transition-all"
            >
              Open contact form
            </a>
          </section>

          {/* ─── Privacy Policy ─── */}
          <section>
            <h3 className="text-lg font-bold text-primary mb-4">Privacy Policy</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              This website is designed with privacy in mind. It is a static site hosted on GitHub Pages.
              We do not use cookies, tracking scripts, or analytics services. No personal data is collected
              during your visit.
            </p>

            <h4 className="text-sm font-semibold text-foreground mb-2">Hosting &amp; Server Logs</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              This website is hosted by GitHub Pages. The hosting provider automatically collects
              information in server log files (IP address, browser type, time). This is technically
              necessary to display the site securely. See{" "}
              <a
                href="https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages#data-collection"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {"GitHub's privacy statement"}
              </a>
              {" "}for details.
            </p>

            <h4 className="text-sm font-semibold text-foreground mb-2">Contact Form</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              When you use the contact form, your name, email, and message are transmitted to
              Web3Forms (web3forms.com) for email delivery. Web3Forms does not store your data
              beyond the delivery process. See their{" "}
              <a
                href="https://web3forms.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                privacy policy
              </a>
              {" "}for details.
            </p>

            <h4 className="text-sm font-semibold text-foreground mb-2">Local Storage</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              This site uses your browser&apos;s localStorage to remember your theme preference
              (light/dark mode). This data is stored only on your device and is never transmitted
              to any server.
            </p>

            <h4 className="text-sm font-semibold text-foreground mb-2">External Links</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              This site contains links to external websites (GitHub, LinkedIn, etc.).
              We are not responsible for the privacy practices of these sites.
            </p>

            <h4 className="text-sm font-semibold text-foreground mb-2">Your Rights</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Under the GDPR, you have the right to access, rectification, erasure, and portability
              of your personal data. Since this site does not collect or store personal data, these
              rights are inherently fulfilled. For any questions, contact me via the email above.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
