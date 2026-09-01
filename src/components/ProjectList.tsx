"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProjectBadge } from "@/components/ProjectBadge";
import type { ProjectKind } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import { techKeys } from "@/lib/tech-keys";

/** Already localized on the server: this component never sees `Localized<...>`. */
export type ProjectCard = {
  slug: string;
  kind: ProjectKind;
  title: string;
  tagline: string;
  /** "09.2022 — present, Godel Technologies Europe" — dates and employer in one. */
  period: string;
  stack: string[];
  /** Which `?tech=` values this project answers to, lowercased. */
  keys: string[];
};

/** A URL is user input; only a sane amount of it goes back on screen. */
const MAX_LABEL = 40;

export function ProjectList({ projects, locale }: { projects: ProjectCard[]; locale: Locale }) {
  const dict = dictionaries[locale].projects;

  // The filter lives in the URL rather than in state, so /stack can link
  // straight into a filtered list and the result can be shared.
  const tech = useSearchParams().get("tech")?.trim() ?? "";
  // A tile links as "Vue / Vuex", a pill as "Vue" — both have to hit.
  const wanted = techKeys(tech);
  const shown = tech
    ? projects.filter((project) => wanted.some((key) => project.keys.includes(key)))
    : projects;

  return (
    <>
      {tech && (
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-accent/40 bg-accent-soft px-4 py-3 text-sm">
          <span className="text-muted">{dict.filteredBy}</span>
          <span className="font-medium text-accent">{tech.slice(0, MAX_LABEL)}</span>
          <Link
            href={`/${locale}/projects`}
            scroll={false}
            className="ml-auto rounded-full border border-border px-2.5 py-1 text-xs transition-colors hover:border-accent hover:text-accent"
          >
            {dict.clearFilter}
          </Link>
        </div>
      )}

      {shown.length === 0 ? (
        <p className="mt-8 text-sm text-muted">{dict.noMatches}</p>
      ) : (
        <ul className="mt-8 space-y-4">
          {shown.map((project) => (
            <li
              key={project.slug}
              className="relative rounded-2xl border border-border bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-[0_10px_30px_-18px_var(--accent)]"
            >
              {/* The heading's link is stretched over the whole card, so the card
                  stays one click target while the stack pills below stay their
                  own — an anchor inside an anchor is not valid HTML. */}
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-medium">
                  <Link
                    href={`/${locale}/projects/${project.slug}`}
                    className="after:absolute after:inset-0 after:rounded-2xl"
                  >
                    {project.title}
                  </Link>
                </h2>
                <ProjectBadge kind={project.kind} locale={locale} />
              </div>

              <p className="mt-1 text-sm text-muted">{project.tagline}</p>
              {/* Six projects are scanned, not read: when each ran, and where,
                  belongs on the card rather than one click away. */}
              <p className="mt-2 text-xs text-muted">{project.period}</p>

              <div className="relative mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((item) => {
                  const active = techKeys(item).some((key) => wanted.includes(key));
                  return (
                    <Link
                      key={item}
                      href={
                        active
                          ? `/${locale}/projects`
                          : `/${locale}/projects?tech=${encodeURIComponent(item)}`
                      }
                      scroll={false}
                      className={`rounded-full px-2.5 py-1 text-xs transition-colors ${
                        active
                          ? "bg-accent text-accent-contrast"
                          : "bg-surface-muted text-muted hover:bg-accent-soft hover:text-accent"
                      }`}
                    >
                      {item}
                    </Link>
                  );
                })}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
