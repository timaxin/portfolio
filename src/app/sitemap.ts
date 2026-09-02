import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/seo";

/**
 * Every indexable path, locale-relative. Kept as one list so a new top-level
 * route is one line here rather than a second place to remember.
 */
const paths = ["", "/experience", "/projects", "/stack", ...projects.map((p) => `/projects/${p.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      },
    })),
  );
}
