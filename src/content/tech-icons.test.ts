import { describe, expect, it } from "vitest";
import { brandColors, isGridGroup, monogram } from "./tech-icons";

describe("monogram", () => {
  it("keeps an acronym whole", () => {
    expect(monogram("AWS (Lambda, S3)")).toBe("AWS");
    expect(monogram("REST API")).toBe("REST");
  });

  it("condenses camel case to its capitals", () => {
    expect(monogram("WebSockets")).toBe("WS");
  });

  it("takes initials from several words", () => {
    expect(monogram("Web Audio API")).toBe("WA");
    expect(monogram("Spec-driven development")).toBe("SD");
  });

  it("falls back to the first two letters of a single plain word", () => {
    expect(monogram("Monorepo")).toBe("MO");
  });

  it("spells Playwright PW, since PL reads as the Polish locale", () => {
    expect(monogram("Playwright")).toBe("PW");
  });
});

describe("brandColors", () => {
  it("leaves a mid-tone logo as the colour people recognise", () => {
    // TypeScript blue sits between both thresholds and is legible either way.
    expect(brandColors("3178C6")).toEqual({ light: "#3178C6", dark: "#3178C6" });
  });

  it("lifts a near-black logo so the dark theme does not swallow it", () => {
    const { light, dark } = brandColors("000000");
    expect(light).toBe("#000000");
    expect(Number.parseInt(dark.slice(1, 3), 16)).toBeGreaterThan(0x80);
  });

  it("darkens a logo too bright to read on white", () => {
    // React cyan and the JavaScript yellow are the cases the threshold is set for.
    for (const hex of ["61DAFB", "F7DF1E"]) {
      const { light, dark } = brandColors(hex);
      expect(light).not.toBe(`#${hex}`);
      expect(dark).toBe(`#${hex}`);
    }
  });

  it("never touches a colour for both themes at once", () => {
    for (const hex of ["000000", "FFFFFF", "61DAFB", "3178C6", "2D3748"]) {
      const { light, dark } = brandColors(hex);
      expect(light === `#${hex}` || dark === `#${hex}`).toBe(true);
    }
  });

  it("always returns a full six-digit hex", () => {
    for (const hex of ["000000", "FFFFFF", "61DAFB", "2D3748"]) {
      const { light, dark } = brandColors(hex);
      expect(light).toMatch(/^#[0-9a-fA-F]{6}$/);
      expect(dark).toMatch(/^#[0-9a-fA-F]{6}$/);
    }
  });
});

describe("isGridGroup", () => {
  it("puts tools in the icon grid", () => {
    expect(isGridGroup("Frontend")).toBe(true);
    expect(isGridGroup("Testing")).toBe(true);
  });

  it("keeps what is not a tool out of it", () => {
    expect(isGridGroup("Ways of working")).toBe(false);
    expect(isGridGroup("Domains")).toBe(false);
  });
});
