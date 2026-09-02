import { describe, expect, it } from "vitest";
import { projects } from "./projects";
import { isUsedInProjects, projectsUsing } from "./tech-index";

describe("projectsUsing", () => {
  it("matches a grid tile against the plainer name a project lists", () => {
    // The stack page says "Next.js (App Router)"; the project says "Next.js".
    const slugs = projectsUsing("Next.js (App Router)").map((p) => p.slug);
    expect(slugs).toContain("ai-portfolio");
  });

  it("matches a tile that stands for two names at once", () => {
    // "Vue / Vuex" has to find the project that lists only "Vue".
    expect(projectsUsing("Vue / Vuex").length).toBeGreaterThan(0);
  });

  it("finds the same projects from either spelling", () => {
    const viaTile = projectsUsing("Next.js (App Router)").map((p) => p.slug).sort();
    const viaPill = projectsUsing("Next.js").map((p) => p.slug).sort();
    expect(viaTile).toEqual(viaPill);
  });

  it("returns each project once even when two of its entries match", () => {
    const found = projectsUsing("Vue / Vuex");
    expect(new Set(found.map((p) => p.slug)).size).toBe(found.length);
  });

  it("finds nothing for a technology nobody used", () => {
    expect(projectsUsing("COBOL")).toEqual([]);
    expect(projectsUsing("")).toEqual([]);
  });
});

describe("isUsedInProjects", () => {
  it("agrees with projectsUsing, since a tile is a link only when it leads somewhere", () => {
    for (const name of ["React", "COBOL", "Vue / Vuex", ""]) {
      expect(isUsedInProjects(name)).toBe(projectsUsing(name).length > 0);
    }
  });

  it("is true for every technology a project actually lists", () => {
    for (const project of projects) {
      for (const entry of project.stack) {
        expect(isUsedInProjects(entry)).toBe(true);
      }
    }
  });
});
