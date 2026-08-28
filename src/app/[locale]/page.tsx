import { notFound } from "next/navigation";
import { Chat } from "@/components/Chat";
import { profile } from "@/content/profile";
import { isLocale, t } from "@/i18n/config";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <section className="mb-8">
        <h1
          className="animate-rise text-2xl font-semibold tracking-tight sm:text-3xl"
          style={{ animationDelay: "0ms" }}
        >
          {profile.name}
        </h1>
        <p className="animate-rise mt-1 text-sm text-accent" style={{ animationDelay: "60ms" }}>
          {t(profile.headline, locale)}
        </p>
        <p
          className="animate-rise mt-4 max-w-2xl text-sm leading-relaxed"
          style={{ animationDelay: "120ms" }}
        >
          {t(profile.summary, locale)}
        </p>
        <p className="animate-rise mt-3 text-sm text-muted" style={{ animationDelay: "180ms" }}>
          {t(profile.availability, locale)}
        </p>
      </section>

      {/* The wrapper keeps the chat's own flex sizing while carrying the last
          step of the entrance — Chat itself is a client component. */}
      <div className="animate-rise flex flex-1 flex-col" style={{ animationDelay: "240ms" }}>
        <Chat locale={locale} />
      </div>
    </>
  );
}
