import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

/**
 * Все страницы живут под /:locale. Запрос без префикса перекидываем на язык
 * из Accept-Language, а если он не подошёл — на язык по умолчанию.
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

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return NextResponse.next();

  const locale = detectLocale(request.headers.get("accept-language"));
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Пропускаем API, служебные пути Next и всё, что похоже на файл.
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
