import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Timeline } from "@/components/Timeline";
import { profile } from "@/content/profile";
import { isLocale, t } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/experience">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: dictionaries[locale].experience.title } : {};
}

export default async function ExperiencePage({ params }: PageProps<"/[locale]/experience">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale].experience;

  return (
    <section>
      <h1 className="animate-rise text-2xl font-semibold tracking-tight">{dict.title}</h1>
      <p className="animate-rise mt-1 text-sm text-muted" style={{ animationDelay: "60ms" }}>
        {dict.subtitle}
      </p>

      <Timeline className="relative mt-10 pl-8">
        {/* The rail sits behind the dots; the drawn part scales down from the top,
            so it has to be its own element rather than a border on the list. */}
        <div className="absolute top-2 bottom-2 left-[7px] w-px bg-border" aria-hidden />
        <div
          data-spine
          className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent"
          aria-hidden
        />

        <ol className="space-y-10">
          {profile.experience.map((job) => (
            <li key={`${job.company}-${job.period.en}`} data-entry className="relative">
              <span
                className="absolute top-1.5 -left-8 size-[15px] rounded-full border-2 border-accent bg-background"
                aria-hidden
              />

              <p className="text-xs tracking-wider text-muted uppercase">{t(job.period, locale)}</p>
              <h2 className="mt-1 font-medium">{t(job.role, locale)}</h2>
              <p className="text-sm text-accent">{job.company}</p>
              <p className="mt-0.5 text-xs text-muted">{job.location}</p>

              <ul className="mt-3 space-y-2 text-sm">
                {t(job.highlights, locale).map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="text-accent">—</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {job.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full bg-surface-muted px-2.5 py-1 text-xs text-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </Timeline>

      {/* The dates have holes in them; the profile explains each one, so say it
          here rather than leaving the reader to count months. */}
      <div className="mt-12 border-t border-border pt-8">
        <h2 className="text-xs font-medium tracking-wider text-muted uppercase">{dict.notes}</h2>
        <ul className="mt-3 space-y-2 text-sm text-muted">
          {t(profile.timelineNotes, locale).map((note) => (
            <li key={note} className="flex gap-2">
              <span className="text-accent">—</span>
              <span>{note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10 border-t border-border pt-8">
        <h2 className="text-xs font-medium tracking-wider text-muted uppercase">
          {dict.education}
        </h2>
        <ul className="mt-3 space-y-2 text-sm">
          {t(profile.education, locale).map((entry) => (
            <li key={entry}>{entry}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
