import { describe, expect, it } from "vitest";
import { defaultLocale } from "./config";
import { detectLocale } from "./detect-locale";

describe("detectLocale", () => {
  it("falls back to the default when the browser says nothing", () => {
    expect(detectLocale(null)).toBe(defaultLocale);
    expect(detectLocale("")).toBe(defaultLocale);
  });

  it("takes the first language the site actually speaks", () => {
    expect(detectLocale("en-GB,en;q=0.9")).toBe("en");
    expect(detectLocale("pl-PL,pl;q=0.9")).toBe("pl");
  });

  it("honours q-weights rather than header order", () => {
    expect(detectLocale("de;q=0.9,pl;q=0.8,en;q=1.0")).toBe("en");
    expect(detectLocale("en;q=0.3,ru;q=0.9")).toBe("ru");
  });

  it("skips languages the site does not have", () => {
    expect(detectLocale("de-DE,de;q=0.9,fr;q=0.8,pl;q=0.5")).toBe("pl");
  });

  it("falls back when nothing on offer matches", () => {
    expect(detectLocale("de-DE,fr;q=0.8,ja;q=0.5")).toBe(defaultLocale);
  });

  it("ignores case and region", () => {
    expect(detectLocale("EN-US")).toBe("en");
  });
});
