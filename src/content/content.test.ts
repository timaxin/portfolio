import { describe, expect, it } from "vitest";
import { locales, t, type Localized } from "@/i18n/config";
import { diagrams } from "./diagrams";
import { profile } from "./profile";
import { projects } from "./projects";

/**
 * Guards the shape of the content, not its wording. TypeScript already refuses a
 * missing translation; what it cannot see is an empty string standing in for one,
 * or a diagram edge pointing at a node that was renamed.
 */

const everyLocaleFilled = (value: Localized) =>
  locales.every((locale) => t(value, locale).trim().length > 0);

describe("projects", () => {
  it("has a unique slug per project, since the slug is the URL", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("says something in all three languages everywhere a visitor reads", () => {
    for (const project of projects) {
      for (const field of ["title", "tagline", "challenge", "description", "role", "period"] as const) {
        expect(everyLocaleFilled(project[field]), `${project.slug}.${field}`).toBe(true);
      }
    }
  });

  it("lists highlights in every language or in none", () => {
    for (const project of projects) {
      const counts = locales.map((locale) => t(project.highlights, locale).length);
      expect(new Set(counts).size, `${project.slug} highlight counts`).toBe(1);
    }
  });

  it("names a client only for commercial work", () => {
    for (const project of projects) {
      if (project.kind === "internal") {
        expect(project.client, project.slug).toBeUndefined();
      }
    }
  });

  it("gives every project a stack to be found by", () => {
    for (const project of projects) {
      expect(project.stack.length, project.slug).toBeGreaterThan(0);
    }
  });
});

describe("diagrams", () => {
  it("belongs to a project that exists", () => {
    const slugs = new Set(projects.map((project) => project.slug));
    for (const slug of Object.keys(diagrams)) {
      expect(slugs.has(slug), slug).toBe(true);
    }
  });

  it("connects nodes that are actually in the diagram", () => {
    for (const [slug, diagram] of Object.entries(diagrams)) {
      const ids = new Set(diagram.nodes.map((node) => node.id));
      for (const edge of diagram.edges) {
        expect(ids.has(edge.from), `${slug}: edge from ${edge.from}`).toBe(true);
        expect(ids.has(edge.to), `${slug}: edge to ${edge.to}`).toBe(true);
      }
    }
  });

  it("gives every node a distinct id, or an edge would be ambiguous", () => {
    for (const [slug, diagram] of Object.entries(diagrams)) {
      const ids = diagram.nodes.map((node) => node.id);
      expect(new Set(ids).size, slug).toBe(ids.length);
    }
  });
});

describe("profile", () => {
  it("carries the availability facts a recruiter scans for", () => {
    expect(profile.availability.facts.length).toBeGreaterThan(0);
    for (const fact of profile.availability.facts) {
      expect(everyLocaleFilled(fact.label)).toBe(true);
      expect(everyLocaleFilled(fact.value)).toBe(true);
    }
  });

  it("keeps every stack group non-empty, since each one renders as a section", () => {
    for (const group of profile.stack) {
      expect(everyLocaleFilled(group.group)).toBe(true);
      expect(group.items.length).toBeGreaterThan(0);
    }
  });

  it("gives every job the same number of highlights in each language", () => {
    for (const job of profile.experience) {
      const counts = locales.map((locale) => t(job.highlights, locale).length);
      expect(new Set(counts).size, job.company).toBe(1);
    }
  });
});
