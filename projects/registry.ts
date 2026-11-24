import { ProjectData } from "@/lib/types";
import { signLanguageData } from "./sign-language-islr/data";
import { remoraData } from "./remora-production/data";
import { brewliteData } from "./brewlite/data";

/**
 * Central Featured Project Registry
 *
 * Source of truth for featured portfolio projects.
 */
export const projects: ProjectData[] = [
  signLanguageData,
  remoraData,
  brewliteData,
];
