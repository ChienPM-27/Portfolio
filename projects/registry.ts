import { ProjectDefinition } from "@/lib/types";

// Project Modules
import { data as projAData } from "./project-a/data";
import ProjAScene from "./project-a/Scene";

import { data as projBData } from "./project-b/data";
import ProjBScene from "./project-b/Scene";

import { data as projCData } from "./project-c/data";
import ProjCScene from "./project-c/Scene";

/**
 * Central Project Registry
 *
 * Principle I: This file is the ONLY place that lists which projects exist and in what order.
 * Adding a new project requires:
 * 1. Creating projects/<slug>/{data.ts, Scene.tsx}
 * 2. Registering it here.
 *
 * Zero edits to global layouts or other project modules.
 */
export const projects: ProjectDefinition[] = [
  {
    data: projAData,
    Scene: ProjAScene,
  },
  {
    data: projBData,
    Scene: ProjBScene,
  },
  {
    data: projCData,
    Scene: ProjCScene,
  },
];