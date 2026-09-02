import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";
import { LOCALE_HEADER } from "@/i18n/locale-header";

/**
 * Every page lives under /:locale. A request without a prefix is redirected to the
 * language from Accept-Language, falling back to the default when none matches.
 */
function detectLocale(header: string | null) {
  if (!header) return defaultLocale;

  const preferred = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { tag: tag.split("-")[0]?.toLowerCase() ?? "", weight: Number(q ?? 1) };
    })
    .sort((a, b) => b.weight - a.weight);

  return preferred.find((entry) => isLocale(entry.tag))?.tag ?? defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const current = locales.find(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (current) {
    // not-found.tsx renders outside the route it replaced and so never receives
    // params. The locale is known here, so it travels on as a request header.
    const headers = new Headers(request.headers);
    headers.set(LOCALE_HEADER, current);
    return NextResponse.next({ request: { headers } });
  }

  const locale = detectLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip the API, Next internals and anything that looks like a file.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
