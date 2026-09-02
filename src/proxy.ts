import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/i18n/config";
import { detectLocale } from "@/i18n/detect-locale";
import { LOCALE_HEADER } from "@/i18n/locale-header";

/** Every page lives under /:locale; a request without a prefix is redirected. */
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
