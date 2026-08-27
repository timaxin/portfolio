import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { isLocale, locales, t } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project || !isLocale(locale)) return {};

  return { title: t(project.title, locale), description: t(project.tagline, locale) };
}

export default async function ProjectPage({ params }: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();

  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const dict = dictionaries[locale].projects;
  const highlights = t(project.highlights, locale);

  return (
    <article>
      <Link
        href={`/${locale}/projects`}
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← {dict.back}
      </Link>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight">{t(project.title, locale)}</h1>
      <p className="mt-1 text-sm text-accent">{t(project.tagline, locale)}</p>

      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
        <dt className="text-muted">{dict.role}</dt>
        <dd>{t(project.role, locale)}</dd>
        <dt className="text-muted">{dict.period}</dt>
        <dd>{project.period}</dd>
        <dt className="text-muted">{dict.stack}</dt>
        <dd>{project.stack.join(", ")}</dd>
      </dl>

      <p className="mt-6 text-sm leading-relaxed">{t(project.description, locale)}</p>

      {highlights.length > 0 && (
        <ul className="mt-6 space-y-2 text-sm">
          {highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span className="text-accent">—</span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      )}

      {project.links.length > 0 && (
        <div className="mt-8 flex flex-wrap gap-2">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border border-border px-3.5 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
