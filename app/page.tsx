import { Navigation } from "@/components/shell/Navigation";
import { Hero } from "@/components/hero/Hero";
import { ProjectsHighlightsCarousel } from "@/components/projects/ProjectsHighlightsCarousel";
import { AboutSection } from "@/components/about/AboutSection";
import { ContactSection } from "@/components/contact/ContactSection";
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