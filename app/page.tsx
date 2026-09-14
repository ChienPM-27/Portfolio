import { Navigation } from "@/components/shell/Navigation";
import { Hero } from "@/components/hero/Hero";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { projects } from "@/projects/registry";
import { Footer } from "@/components/shell/Footer";
import { TechnicalBackground } from "@/components/shell/TechnicalBackground";
import { TechnicalCursor } from "@/components/shell/TechnicalCursor";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-obsidian text-hud-white overflow-x-clip">
      {/* Reusable Canvas 2D Technical Multi-Layer Background */}
      <TechnicalBackground />

      {/* Interactive Custom Technical Cursor (Desktop Only - Snappy & Zero-Lag) */}
      <TechnicalCursor />

      {/* Minimal Navigation */}
      <Navigation />

      <main className="flex-1 flex flex-col z-10">
        {/* Editorial Minimal Hero */}
        <Hero />

        {/* Cinematic Scroll-driven Projects Sequence */}
        <section id="projects" className="relative py-12">
          <div className="flex flex-col gap-0">
            {projects.map((proj, idx) => (
              <ProjectSection
                key={proj.data.slug}
                project={proj}
                index={idx}
                totalProjects={projects.length}
              />
            ))}
          </div>
        </section>

        {/* Editorial About & Background */}
        <AboutSection />

        {/* Dedicated Contact Section */}
        <ContactSection />
      </main>

      {/* Grounded Footer & Telemetry */}
      <Footer />
    </div>
  );
}