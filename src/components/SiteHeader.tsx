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
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-4">
        <Link href={`/${locale}`} className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{profile.name}</span>
          <span className="text-xs text-muted">{t(profile.headline, locale)}</span>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="flex items-center gap-1 text-sm">
            <NavLink href={`/${locale}`} exact>
              {dict.nav.chat}
            </NavLink>
            <NavLink href={`/${locale}/projects`}>{dict.nav.projects}</NavLink>
          </nav>
          <span className="h-4 w-px bg-border" />
          <LanguageSwitcher current={locale} label={dict.languageSwitcher} />
        </div>
      </div>
    </header>
  );
}
