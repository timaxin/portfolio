import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { NavLink } from "@/components/NavLink";
import { profile } from "@/content/profile";
import { t, type Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export function SiteHeader({ locale }: { locale: Locale }) {
  const dict = dictionaries[locale];

  return (
    <header className="border-b border-border bg-surface/80 backdrop-blur">
      {/* One row from sm up; on a phone the brand keeps its own line, because
          three nav items and the language switcher crush it to "Tsi…". */}
      <div className="mx-auto flex max-w-3xl flex-col gap-2 px-5 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-4">
        <Link href={`/${locale}`} className="flex min-w-0 flex-col leading-tight">
          <span className="truncate text-sm font-semibold">{profile.name}</span>
          {/* Three nav items plus the language switcher leave no room for the
              headline on a phone, and a six-line header is worse than no headline. */}
          <span className="hidden truncate text-xs text-muted sm:block">
            {t(profile.headline, locale)}
          </span>
        </Link>

        <div className="flex items-center justify-between gap-2 sm:shrink-0 sm:justify-end sm:gap-3">
          <nav className="flex items-center gap-0.5 text-sm sm:gap-1">
            <NavLink href={`/${locale}`} exact>
              {dict.nav.chat}
            </NavLink>
            <NavLink href={`/${locale}/experience`}>{dict.nav.experience}</NavLink>
            <NavLink href={`/${locale}/projects`}>{dict.nav.projects}</NavLink>
            <NavLink href={`/${locale}/stack`}>{dict.nav.stack}</NavLink>
          </nav>
          <span className="h-4 w-px bg-border" />
          <LanguageSwitcher current={locale} label={dict.languageSwitcher} />
        </div>
      </div>
    </header>
  );
}
