"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/i18n/config";

/** Меняет только первый сегмент пути, чтобы переключение не выбрасывало со страницы. */
export function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <div className="flex items-center gap-0.5" aria-label={label}>
      {locales.map((locale) => (
        <Link
          key={locale}
          href={`/${locale}${rest ? `/${rest}` : ""}`}
          aria-current={locale === current ? "true" : undefined}
          className={
            locale === current
              ? "rounded-md px-1.5 py-1 text-xs font-semibold text-accent"
              : "rounded-md px-1.5 py-1 text-xs text-muted transition-colors hover:text-foreground"
          }
        >
          {localeLabels[locale]}
        </Link>
      ))}
    </div>
  );
}
