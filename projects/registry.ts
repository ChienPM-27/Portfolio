import { ProjectDefinition } from "@/lib/types";

// Project Modules
import { data as projAData } from "./project-a/data";
import ProjAScene from "./project-a/Scene";

import { data as projBData } from "./project-b/data";
import ProjBScene from "./project-b/Scene";

import { data as projCData } from "./project-c/data";
import ProjCScene from "./project-c/Scene";

import { data as projDData } from "./project-d/data";
import ProjDScene from "./project-d/Scene";

/**
 * Central Project Registry
 *
 * Source of truth for portfolio project scenes.
 * Adding a project requires creating its data.ts + Scene.tsx and registering here.
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
  {
    data: projDData,
    Scene: ProjDScene,
  },
];