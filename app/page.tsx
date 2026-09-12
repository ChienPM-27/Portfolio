import { Navigation } from "@/components/shell/Navigation";
import { Hero } from "@/components/hero/Hero";
import { ProjectSection } from "@/components/projects/ProjectSection";
import { AboutSection } from "@/components/about/AboutSection";
import { projects } from "@/projects/registry";
import { Footer } from "@/components/shell/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground overflow-x-clip selection:bg-cyan-500/20 selection:text-cyan-400">
      <Navigation />
      <main className="flex-1 flex flex-col">
        <Hero />

        <div id="projects" className="flex flex-col gap-8 sm:gap-16 py-8 sm:py-16">
          {projects.map((proj, idx) => (
            <ProjectSection key={proj.data.slug} project={proj} index={idx} />
          ))}
        </div>

        <AboutSection />
      </main>
      <Footer />
    </div>
  );
}