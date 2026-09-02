"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

/**
 * A 404 that still looks like the site, and points somewhere.
 *
 * Worth having beyond good manners: project slugs have been renamed here, so an
 * old link in a recruiter's inbox lands on this page rather than on a stack
 * trace from the framework.
 *
 * A Client Component, and so given no params — same as error.tsx, and for the
 * same reason: not-found.tsx renders in place of a route that never matched,
 * with nothing to read a locale from. Reading it via `headers()` on the server
 * worked too, but a Request-time API anywhere in this segment's tree marks the
 * *whole* segment dynamic — every page under [locale] lost its static build,
 * not just this one. `usePathname()` costs nothing server-side.
 */
export default function NotFound() {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] ?? "";
  const locale = isLocale(segment) ? segment : defaultLocale;
  const dict = dictionaries[locale];

  const sections = [
    { href: `/${locale}`, label: dict.nav.chat },
    { href: `/${locale}/experience`, label: dict.nav.experience },
    { href: `/${locale}/projects`, label: dict.nav.projects },
    { href: `/${locale}/stack`, label: dict.nav.stack },
  ];

  return (
    <section className="py-6">
      <p className="section-label">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
        {dict.notFound.title}
      </h1>
      <p className="mt-2 max-w-2xl text-[0.9375rem] text-muted">{dict.notFound.description}</p>

      <h2 className="section-label mt-8">{dict.notFound.elsewhere}</h2>
      <div className="mt-3 flex flex-wrap gap-2">
        {sections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-xl border border-border px-3.5 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            {section.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
