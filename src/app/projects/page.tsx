import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/projects";

export const metadata: Metadata = { title: "Проекты" };

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold tracking-tight">Проекты</h1>
      <p className="mt-1 text-sm text-muted">
        Всё, что здесь перечислено, чат-бот тоже знает — можно спросить его в свободной форме.
      </p>

      <ul className="mt-8 space-y-4">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/projects/${project.slug}`}
              className="block rounded-2xl border border-border bg-surface p-5 transition-colors hover:border-accent"
            >
              <h2 className="font-medium">{project.title}</h2>
              <p className="mt-1 text-sm text-muted">{project.tagline}</p>
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
