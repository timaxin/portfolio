import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectBadge } from "@/components/ProjectBadge";
import { ProjectDiagram } from "@/components/ProjectDiagram";
import { diagrams } from "@/content/diagrams";
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
  // Only the projects whose architecture is the interesting part carry one.
  const diagram = diagrams[project.slug];

  return (
    <article>
      <Link
        href={`/${locale}/projects`}
        className="text-sm text-muted transition-colors hover:text-foreground"
      >
        ← {dict.back}
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{t(project.title, locale)}</h1>
        <ProjectBadge kind={project.kind} locale={locale} />
      </div>
      <p className="mt-1 text-sm text-accent">{t(project.tagline, locale)}</p>

      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
        <dt className="text-muted">{dict.role}</dt>
        <dd>{t(project.role, locale)}</dd>
        {project.kind === "commercial" && (
          <>
            <dt className="text-muted">{dict.client}</dt>
            {/* An unnamed client is stated as unnamed: a blank row reads like an
                oversight, and the NDA is not a secret in itself. */}
            <dd className={project.client ? undefined : "text-muted italic"}>
              {project.client ? t(project.client, locale) : dict.clientUndisclosed}
            </dd>
          </>
        )}
        <dt className="text-muted">{dict.period}</dt>
        <dd>{t(project.period, locale)}</dd>
        <dt className="text-muted">{dict.stack}</dt>
        <dd>{project.stack.join(", ")}</dd>
      </dl>

      {/* Problem, then product, then what was mine — a flat list of bullets buried
          the metrics among the descriptions. */}
      <section className="mt-8">
        <h2 className="section-label">
          {dict.challenge}
        </h2>
        <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed">
          {t(project.challenge, locale)}
        </p>
      </section>

      <section className="mt-7">
        <h2 className="section-label">{dict.about}</h2>
        <p className="mt-2 max-w-2xl text-[0.9375rem] leading-relaxed">
          {t(project.description, locale)}
        </p>
      </section>

      {diagram && (
        <section className="mt-7">
          <h2 className="section-label">{dict.howItWorks}</h2>
          <div className="mt-3">
            <ProjectDiagram diagram={diagram} locale={locale} />
          </div>
          <p className="mt-2 text-xs text-muted">{dict.diagramLegend}</p>
        </section>
      )}

      {highlights.length > 0 && (
        <section className="mt-7">
          <h2 className="section-label">
            {dict.contribution}
          </h2>
          <ul className="mt-3 space-y-2.5 text-[0.9375rem] leading-relaxed">
            {highlights.map((highlight) => (
              <li key={highlight} className="flex gap-2.5">
                <span className="mt-px text-accent">—</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </section>
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
