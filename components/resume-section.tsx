import { ResumeTimeline } from "@/components/resume-timeline"

const experiences = [
  {
    title: "Front End Developer",
    company: "conlabz GmbH",
    period: "11/2020 – Present",
    description:
      "Building and maintaining modern web applications for enterprise clients. Working with Vue.js, Tailwind CSS, and headless CMS architectures. Leading frontend initiatives including accessibility audits and performance optimization.",
    technologies: ["Vue.js", "Tailwind CSS", "Twig", "WordPress", "Docker"],
  },
  {
    title: "Front End Developer",
    company: "U. Günther GmbH",
    period: "02/2017 – 01/2018",
    description:
      "Developed responsive websites and web applications. Implemented pixel-perfect designs and maintained existing client projects.",
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "WordPress"],
  },
  {
    title: "Front End Developer",
    company: "Freelancing",
    period: "10/2016 – 01/2017",
    description:
      "Independently delivered web projects for small businesses. End-to-end responsibility from design implementation to deployment.",
    technologies: ["HTML", "CSS", "JavaScript", "WordPress"],
  },
  {
    title: "Front End Developer",
    company: "Sven Vörtmann Internet und IT Service",
    period: "10/2015 – 09/2016",
    description:
      "Built and maintained client websites with a focus on clean, standards-compliant frontend code and cross-browser compatibility.",
    technologies: ["HTML", "CSS", "JavaScript", "Joomla"],
  },
  {
    title: "Digital Media Designer",
    company: "Zweiradcenter Melahn GmbH",
    period: "05/2015 – 09/2015",
    description:
      "Created digital assets, marketing materials, and maintained the company's web presence.",
    technologies: ["Photoshop", "HTML", "CSS"],
  },
  {
    title: "Front End Developer",
    company: "art-box media GmbH",
    period: "08/2014 – 03/2015",
    description:
      "Continued as a junior developer post-apprenticeship. Took on larger frontend projects and mentored incoming apprentices.",
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "WordPress"],
  },
  {
    title: "Apprenticeship — Digital Media Designer",
    company: "art-box media Werbeagentur GmbH",
    period: "08/2011 – 07/2014",
    description:
      "3-year vocational training (Ausbildung) in digital media design. Learned the fundamentals of web development, graphic design, and print media production.",
    technologies: ["HTML", "CSS", "Photoshop", "InDesign", "Print"],
  },
]

export function ResumeSection() {
  return (
    <section id="resume" className="relative py-32 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />

      {/* Background accent */}
      <div
        className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[200px]"
        aria-hidden="true"
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <div className="mb-16 animate-fade-in">
          <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">{"// resume"}</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
            Work <span className="text-secondary text-glow-cyan">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-xl font-mono text-sm">
            10+ years of building for the web — from apprenticeship to senior frontend.
          </p>
        </div>

        {/* Timeline */}
        <ResumeTimeline experiences={experiences} />
      </div>
    </section>
  )
}
