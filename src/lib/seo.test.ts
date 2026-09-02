import { describe, expect, it } from "vitest";
import { defaultLocale, locales } from "@/i18n/config";
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
    for (const l of locales) expect(languages[l]).toBe(`/${l}/stack`);
  });

  it("declares an x-default, since the site auto-redirects by Accept-Language", () => {
    const { languages } = pageAlternates("en", "/projects/radioheart");
    expect(languages["x-default"]).toBe(`/${defaultLocale}/projects/radioheart`);
  });

  it("names the current locale among its own alternates, as hreflang requires", () => {
    const { canonical, languages } = pageAlternates("ru", "/experience");
    expect(languages.ru).toBe(canonical);
  });
});
