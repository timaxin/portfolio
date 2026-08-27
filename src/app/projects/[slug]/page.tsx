import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  return { title: project?.title ?? "Проект", description: project?.tagline };
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article>
      <Link href="/projects" className="text-sm text-muted hover:text-foreground">
        ← Все проекты
      </Link>

      <h1 className="mt-6 text-2xl font-semibold tracking-tight">{project.title}</h1>
      <p className="mt-1 text-sm text-muted">{project.tagline}</p>

      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
        <dt className="text-muted">Роль</dt>
        <dd>{project.role}</dd>
        <dt className="text-muted">Период</dt>
        <dd>{project.period}</dd>
        <dt className="text-muted">Стек</dt>
        <dd>{project.stack.join(", ")}</dd>
      </dl>

      <p className="mt-6 text-sm leading-relaxed">{project.description}</p>

      {project.highlights.length > 0 && (
        <ul className="mt-6 space-y-2 text-sm">
          {project.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-2">
              <span className="text-muted">—</span>
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
              className="rounded-xl border border-border px-3.5 py-2 text-sm transition-colors hover:border-accent"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
