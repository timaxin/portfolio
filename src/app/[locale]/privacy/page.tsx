import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { privacy } from "@/content/privacy";
import { isLocale, t } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { pageAlternates } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/privacy">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = dictionaries[locale].privacy;
  return {
    title: dict.title,
    description: dict.subtitle,
    alternates: pageAlternates(locale, "/privacy"),
  };
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale].privacy;
  const email = "timaxin@gmail.com";

  return (
    <article>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{dict.title}</h1>
      <p className="mt-2 max-w-2xl text-[0.9375rem] text-muted">{dict.subtitle}</p>
      <p className="mt-1 text-xs text-muted">
        {dict.updated}: {privacy.updated}
      </p>

      <p className="mt-6 max-w-2xl text-[0.9375rem] leading-relaxed">{t(privacy.intro, locale)}</p>

      {privacy.sections.map((section) => (
        <section key={section.heading.en} className="mt-7">
          <h2 className="section-label">{t(section.heading, locale)}</h2>
          <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed">
            {t(section.body, locale)}
          </p>
        </section>
      ))}

      <section className="mt-7">
        <h2 className="section-label">{dict.contactLabel}</h2>
        <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed">
          {t(privacy.contact, locale)}{" "}
          <a href={`mailto:${email}`} className="text-accent underline underline-offset-2">
            {email}
          </a>
        </p>
      </section>
    </article>
  );
}
