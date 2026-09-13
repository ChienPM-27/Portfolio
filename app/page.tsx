import { Navigation } from "@/components/shell/Navigation";
import { Hero } from "@/components/hero/Hero";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { AboutSection } from "@/components/about/AboutSection";
import { projects } from "@/projects/registry";
import { Footer } from "@/components/shell/Footer";
import { HudOverlay } from "@/components/shell/HudOverlay";
import { ParticleBackground } from "@/components/shell/ParticleBackground";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-obsidian text-hud-white overflow-x-clip">
      <ParticleBackground />
      <Navigation />
      <HudOverlay />
      <main className="flex-1 flex flex-col">
        <Hero />

        {/* Projects with vertical timeline context */}
        <div id="projects" className="relative">
          {/* Vertical Timeline Rail — left edge */}
          <div className="hidden lg:block timeline-rail" />

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
        </div>

        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}