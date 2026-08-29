import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProjectBadge } from "@/components/ProjectBadge";
import { projects } from "@/content/projects";
import { isLocale, t } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

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

  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">{dict.title}</h1>
      <p className="mt-1 text-sm text-muted">{dict.subtitle}</p>

      <ul className="mt-8 space-y-4">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/${locale}/projects/${project.slug}`}
              className="block rounded-2xl border border-border bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_10px_30px_-18px_var(--accent)]"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-medium">{t(project.title, locale)}</h2>
                <ProjectBadge kind={project.kind} locale={locale} />
              </div>
              <p className="mt-1 text-sm text-muted">{t(project.tagline, locale)}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-surface-muted px-2.5 py-1 text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
