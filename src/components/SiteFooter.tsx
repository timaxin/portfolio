import Link from "next/link";
import { profile } from "@/content/profile";
import { type Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

/** The CV as recruiters' applicant trackers still want it: one PDF file. */
const RESUME_PATH = "/Tsimafei_Yefimenka_CV.pdf";

/** Baked at build time; a redeploy is what moves it, which is often enough. */
const year = new Date().getFullYear();

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center gap-x-4 gap-y-2 px-5 py-5 text-xs text-muted">
        {profile.contacts.map((contact) => (
          <a
            key={contact.label}
            href={contact.href}
            className="transition-colors hover:text-accent"
            target={contact.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
          >
            {contact.label}: {contact.value}
          </a>
        ))}

        <a
          href={RESUME_PATH}
          download
          className="rounded-full border border-border px-2.5 py-1 transition-colors hover:border-accent hover:text-accent"
        >
          {dictionaries[locale].resume} ↓
        </a>

        <Link href={`/${locale}/privacy`} className="transition-colors hover:text-accent">
          {dictionaries[locale].privacy.footerLink}
        </Link>

        <span className="ml-auto">
          © {year} {profile.name}
        </span>
      </div>
    </footer>
  );
}
