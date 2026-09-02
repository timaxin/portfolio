import { locales, type Locale } from "@/i18n/config";

/** Canonical origin. Vercel preview deployments still answer on their own URLs. */
export const SITE_URL = "https://www.timcv.pl";

/**
 * Canonical + hreflang alternates for one page, in one locale.
 *
 * `path` is locale-relative: "" for the home page, "/projects/ai-portfolio" for
 * a project. Every page must set its own — metadata that goes unset is
 * inherited from the layout, which would otherwise leave every page pointing
 * its canonical at the locale root and telling search engines the rest of the
 * site is a duplicate of it.
 */
export function pageAlternates(locale: Locale, path: string) {
  return {
    canonical: `/${locale}${path}`,
    languages: Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])),
  };
}
