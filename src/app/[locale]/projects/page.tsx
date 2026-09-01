import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectList, type ProjectCard } from "@/components/ProjectList";
import { projects } from "@/content/projects";
import { isLocale, t } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { techKeys } from "@/lib/tech-keys";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: dictionaries[locale].projects.title } : {};
}

export default async function ProjectsPage({ params }: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = dictionaries[locale].projects;

  // Localized here so the client component never carries three languages of copy.
  const cards: ProjectCard[] = projects.map((project) => ({
    slug: project.slug,
    kind: project.kind,
    title: t(project.title, locale),
    tagline: t(project.tagline, locale),
    period: t(project.period, locale),
    stack: project.stack,
    keys: project.stack.flatMap(techKeys),
  }));

  return (
    <section>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{dict.title}</h1>
      <p className="mt-2 max-w-2xl text-[0.9375rem] text-muted">{dict.subtitle}</p>

      {/* The filter reads the query string, which is not known while prerendering. */}
      <Suspense fallback={<div className="mt-8 h-64" />}>
        <ProjectList projects={cards} locale={locale} />
      </Suspense>
    </section>
  );
}
