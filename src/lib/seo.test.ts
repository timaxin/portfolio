import { describe, expect, it } from "vitest";
import { locales } from "@/i18n/config";
import { pageAlternates } from "./seo";

describe("pageAlternates", () => {
  it("points a page's canonical at itself, not at the locale root", () => {
    expect(pageAlternates("en", "/projects").canonical).toBe("/en/projects");
    expect(pageAlternates("ru", "/projects/radioheart").canonical).toBe(
      "/ru/projects/radioheart",
    );
  });

  it("uses the locale root for the home page", () => {
    expect(pageAlternates("pl", "").canonical).toBe("/pl");
  });

  it("offers the same page in every language the site ships", () => {
    const { languages } = pageAlternates("en", "/stack");
    expect(Object.keys(languages)).toEqual([...locales]);
    expect(languages).toEqual({ ru: "/ru/stack", en: "/en/stack", pl: "/pl/stack" });
  });

  it("names the current locale among its own alternates, as hreflang requires", () => {
    const { canonical, languages } = pageAlternates("ru", "/experience");
    expect(languages.ru).toBe(canonical);
  });
});
