import { techKeys } from "@/lib/tech-keys";
import { projects, type Project } from "./projects";

/**
 * Which projects used which technology.
 *
 * Names on both sides are reduced to comparable keys by `techKeys`.
 */

const byKey = new Map<string, Project[]>();

for (const project of projects) {
  for (const entry of project.stack) {
    for (const key of techKeys(entry)) {
      const known = byKey.get(key);
      if (known) known.push(project);
      else byKey.set(key, [project]);
    }
  }
}

/** Accepts either spelling — a grid tile's label or a project's own stack entry. */
export function projectsUsing(tech: string): Project[] {
  const found = new Set<Project>();
  for (const key of techKeys(tech)) {
    for (const project of byKey.get(key) ?? []) found.add(project);
  }
  return [...found];
}

/** A tile only becomes a link when the link would lead somewhere. */
export function isUsedInProjects(tech: string): boolean {
  return projectsUsing(tech).length > 0;
}
