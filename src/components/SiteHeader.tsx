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

        {/* "Doświadczenie" next to three more items and a language switcher does
            not fit 375px, and the row used to push the switcher off-screen. The
            nav scrolls instead; the switcher stays put, since a reader who wants
            another language should never have to find it. */}
        <div className="flex items-center justify-between gap-2 sm:shrink-0 sm:justify-end sm:gap-3">
          <nav className="-mx-1 flex min-w-0 items-center gap-0.5 overflow-x-auto px-1 text-sm [scrollbar-width:none] sm:mx-0 sm:gap-1 sm:overflow-visible sm:px-0">
            <NavLink href={`/${locale}`} exact>
              {dict.nav.chat}
            </NavLink>
            <NavLink href={`/${locale}/experience`}>{dict.nav.experience}</NavLink>
            <NavLink href={`/${locale}/projects`}>{dict.nav.projects}</NavLink>
            <NavLink href={`/${locale}/stack`}>{dict.nav.stack}</NavLink>
          </nav>
          <span className="h-4 w-px shrink-0 bg-border" />
          <span className="shrink-0">
            <LanguageSwitcher current={locale} label={dict.languageSwitcher} />
          </span>
        </div>
      </div>
    </header>
  );
}
