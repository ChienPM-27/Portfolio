import dynamic from "next/dynamic";
import { Navigation } from "@/components/shell/Navigation";
import { Hero } from "@/components/hero/Hero";
import { ClientChrome } from "@/components/shell/ClientChrome";
import { TechnicalBackground } from "@/components/shell/TechnicalBackground";
import {
  ProjectsCarouselSkeleton,
  AboutSectionSkeleton,
  ContactSectionSkeleton,
} from "@/components/ui/Skeletons";
import { ProjectDetailProvider } from "@/lib/project-detail-context";

const ProjectsHighlightsCarousel = dynamic(
  () =>
    import("@/components/projects/ProjectsHighlightsCarousel").then(
      (m) => m.ProjectsHighlightsCarousel
    ),
  { loading: () => <ProjectsCarouselSkeleton /> }
);

const AboutSection = dynamic(
  () =>
    import("@/components/about/AboutSection").then((m) => m.AboutSection),
  { loading: () => <AboutSectionSkeleton /> }
);

const ContactSection = dynamic(
  () =>
    import("@/components/contact/ContactSection").then(
      (m) => m.ContactSection
    ),
  { loading: () => <ContactSectionSkeleton /> }
);

const Footer = dynamic(() =>
  import("@/components/shell/Footer").then((m) => m.Footer)
);

export default function Home() {
  return (
    <ProjectDetailProvider>
      <div className="relative flex flex-col min-h-screen bg-obsidian text-hud-white overflow-x-clip">
        <TechnicalBackground />
        <ClientChrome />

        {/* Minimal Navigation */}
        <Navigation />

        <main className="flex-1 flex flex-col z-10">
          {/* Above-the-fold Hero */}
          <Hero />

          {/* Code-split Highlights Carousel */}
          <ProjectsHighlightsCarousel />

          {/* Deferred Below-the-Fold Sections */}
          <AboutSection />
          <ContactSection />
        </main>

        <Footer />
      </div>
    </ProjectDetailProvider>
  );
}
