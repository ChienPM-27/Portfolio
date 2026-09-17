import { Navigation } from "@/components/shell/Navigation";
import { Hero } from "@/components/hero/Hero";
import { ProjectsHighlightsCarousel } from "@/components/projects/ProjectsHighlightsCarousel";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { projects } from "@/projects/registry";
import { Footer } from "@/components/shell/Footer";
import { TechnicalBackground } from "@/components/shell/TechnicalBackground";
import { TechnicalCursor } from "@/components/shell/TechnicalCursor";
import { ProjectDetailProvider } from "@/lib/project-detail-context";
import { ImmersiveProjectDetail } from "@/components/projects/ImmersiveProjectDetail";

export default function Home() {
  return (
    <ProjectDetailProvider>
      <div className="relative flex flex-col min-h-screen bg-obsidian text-hud-white overflow-x-clip">
        {/* Immersive Scroll-Hijacked Detail View for Projects */}
        <ImmersiveProjectDetail />
      {/* Reusable Canvas 2D Technical Multi-Layer Background */}
      <TechnicalBackground />

      {/* Interactive Custom Technical Cursor (Desktop Only - Snappy & Zero-Lag) */}
      <TechnicalCursor />

      {/* Minimal Navigation */}
      <Navigation />

      <main className="flex-1 flex flex-col z-10">
        {/* Editorial Minimal Hero with Dual Gateway & 3D Interactive Core */}
        <Hero />

        {/* Logotomia-inspired Dynamic Momentum Drag Carousel */}
        <ProjectsHighlightsCarousel />

        {/* Cinematic Scroll-driven Projects Sequence */}
        <section id="projects" className="relative z-10 bg-obsidian py-12">
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
  </ProjectDetailProvider>
  );
}