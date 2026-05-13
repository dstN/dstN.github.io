import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ScanLine } from "@/components/scan-line"
import dynamic from "next/dynamic"

const AboutSection = dynamic(() => import("@/components/about-section").then(mod => mod.AboutSection))
const ProjectsSection = dynamic(() => import("@/components/projects-section").then(mod => mod.ProjectsSection))
const SkillsSection = dynamic(() => import("@/components/skills-section").then(mod => mod.SkillsSection))
const ResumeSection = dynamic(() => import("@/components/resume-section").then(mod => mod.ResumeSection))
const ContactSection = dynamic(() => import("@/components/contact-section").then(mod => mod.ContactSection))
const Footer = dynamic(() => import("@/components/footer").then(mod => mod.Footer))

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <ScanLine />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ResumeSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
