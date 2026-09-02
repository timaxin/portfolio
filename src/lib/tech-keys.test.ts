import { describe, expect, it } from "vitest";
import { displayName, techKeys } from "./tech-keys";

describe("displayName", () => {
  it("drops the qualifier that would not fit under a tile", () => {
    expect(displayName("CI/CD (GitHub Actions, GitLab CI, GoCD)")).toBe("CI/CD");
    expect(displayName("Next.js (App Router)")).toBe("Next.js");
  });

  it("leaves a plain name alone", () => {
    expect(displayName("PostgreSQL")).toBe("PostgreSQL");
  });
});

describe("techKeys", () => {
  it("splits a tile that stands for two things a project may list separately", () => {
    expect(techKeys("Vue / Vuex")).toEqual(["vue", "vuex"]);
    expect(techKeys("HTML5 / CSS3")).toEqual(["html5", "css3"]);
  });

  it("reduces the two spellings of one technology to the same key", () => {
    expect(techKeys("Next.js (App Router)")).toEqual(techKeys("Next.js"));
    expect(techKeys("React")).toEqual(techKeys("react"));
  });

  it("produces nothing from an empty or punctuation-only name", () => {
    expect(techKeys("")).toEqual([]);
    expect(techKeys("  /  ")).toEqual([]);
  });
});
