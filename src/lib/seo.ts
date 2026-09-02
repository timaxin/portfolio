import { defaultLocale, locales, type Locale } from "@/i18n/config";

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
  // Cast to named properties rather than an index signature: spreading the
  // latter alongside "x-default" below silently drops it — TypeScript keeps
  // only the object's own keys when a spread is mixed with a literal one.
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}${path}`])) as Record<
    Locale,
    string
  >;

  return {
    canonical: `/${locale}${path}`,
    languages: {
      ...languages,
      // `src/proxy.ts` auto-redirects a visitor by Accept-Language — the exact
      // case x-default exists for, so a language outside ru/en/pl has a stated
      // default rather than an unspecified one.
      "x-default": `/${defaultLocale}${path}`,
    },
  };
}
