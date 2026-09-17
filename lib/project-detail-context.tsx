"use client";

import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ProjectDetailContextType {
  activeSlug: string | null;
  openProject: (slug: string) => void;
  closeProject: () => void;
}

const ProjectDetailContext = createContext<ProjectDetailContextType | undefined>(undefined);

export function ProjectDetailProvider({ children }: { children: ReactNode }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const openProject = useCallback((slug: string) => {
    setActiveSlug(slug);
  }, []);

  const closeProject = useCallback(() => {
    setActiveSlug(null);
  }, []);

  return (
    <ProjectDetailContext.Provider value={{ activeSlug, openProject, closeProject }}>
      {children}
    </ProjectDetailContext.Provider>
  );
}

export function useProjectDetail(): ProjectDetailContextType {
  const context = useContext(ProjectDetailContext);
  if (!context) {
    throw new Error("useProjectDetail must be used within a ProjectDetailProvider");
  }
  return context;
}
