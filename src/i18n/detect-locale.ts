import { defaultLocale, isLocale, type Locale } from "./config";

/**
 * Picks a language from an Accept-Language header, honouring its q-weights and
 * ignoring the region ("en-GB" is English). Falls back to the default when the
 * header is absent or offers nothing the site speaks.
 *
 * Separate from src/proxy.ts so it can be tested without pulling in next/server.
 */
export function detectLocale(header: string | null): Locale {
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.split("-")[0]?.toLowerCase() ?? "", weight: Number(q ?? 1) };
    })
    .sort((a, b) => b.weight - a.weight);

  // A loop rather than `find`, because the type guard has to narrow the tag
  // itself — through `find` it only narrows the entry, leaving a bare string.
  for (const entry of preferred) {
    if (isLocale(entry.tag)) return entry.tag;
  }
  return defaultLocale;
}
