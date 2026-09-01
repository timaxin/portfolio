import Image from "next/image";
import { notFound } from "next/navigation";
import { Chat } from "@/components/Chat";
import { profile } from "@/content/profile";
import photo from "@/images/profile-photo.jpg";
import { isLocale, t } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale].home;

  // The line a recruiter scans before deciding to read anything: years, where he
  // is, and which languages he can be interviewed in.
  const facts = [
    `${profile.yearsOfExperience} ${dict.yearsSuffix}`,
    t(profile.location, locale),
    ...t(profile.languages, locale),
  ];

  return (
    <>
      <section className="mb-10">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Sized for the layout rather than the file: the source is square, so
              `sizes` keeps the browser from fetching a 900px image for a 112px slot. */}
          <Image
            src={photo}
            alt={profile.name}
            priority
            placeholder="blur"
            sizes="(min-width: 640px) 112px, 80px"
            className="portrait size-20 shrink-0 rounded-full object-cover sm:size-28"
          />
          <div className="min-w-0">
            <h1
              className="animate-rise text-3xl font-semibold tracking-tight sm:text-4xl"
              style={{ animationDelay: "60ms" }}
            >
              {profile.name}
            </h1>
            <p
              className="animate-rise mt-1.5 text-sm text-accent sm:text-base"
              style={{ animationDelay: "120ms" }}
            >
              {t(profile.headline, locale)}
            </p>
          </div>
        </div>

        <ul
          className="animate-rise mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted"
          style={{ animationDelay: "180ms" }}
        >
          {facts.map((fact, index) => (
            <li key={fact} className="flex items-center gap-3">
              {index > 0 && <span aria-hidden className="text-border">·</span>}
              {fact}
            </li>
          ))}
        </ul>

        <p
          className="animate-rise mt-6 max-w-2xl text-[0.9375rem] leading-relaxed"
          style={{ animationDelay: "240ms" }}
        >
          {t(profile.summary, locale)}
        </p>

        <div className="animate-rise mt-8" style={{ animationDelay: "300ms" }}>
          <h2 className="section-label">
            {dict.availability}
          </h2>
          {/* Pairs rather than a paragraph: the contract type is the thing being
              looked for, and in prose it has to be read for. */}
          <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
            {profile.availability.facts.map((fact) => (
              <div key={fact.label.en} className="contents">
                <dt className="text-muted">{t(fact.label, locale)}</dt>
                <dd>{t(fact.value, locale)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            {t(profile.availability.notes, locale)}
          </p>
        </div>
      </section>

      {/* The wrapper keeps the chat's own flex sizing while carrying the last
          step of the entrance — Chat itself is a client component. */}
      <div className="animate-rise flex flex-1 flex-col" style={{ animationDelay: "360ms" }}>
        <Chat locale={locale} />
      </div>
    </>
  );
}
