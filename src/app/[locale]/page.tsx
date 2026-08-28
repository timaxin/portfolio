import Image from "next/image";
import { notFound } from "next/navigation";
import { Chat } from "@/components/Chat";
import photo from "@/images/profile-photo.jpg";
import { profile } from "@/content/profile";
import { isLocale, t } from "@/i18n/config";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <section className="mb-8">
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
              className="animate-rise text-2xl font-semibold tracking-tight sm:text-3xl"
              style={{ animationDelay: "60ms" }}
            >
              {profile.name}
            </h1>
            <p
              className="animate-rise mt-1 text-sm text-accent"
              style={{ animationDelay: "120ms" }}
            >
              {t(profile.headline, locale)}
            </p>
          </div>
        </div>
        <p
          className="animate-rise mt-5 max-w-2xl text-sm leading-relaxed"
          style={{ animationDelay: "180ms" }}
        >
          {t(profile.summary, locale)}
        </p>
        <p className="animate-rise mt-3 text-sm text-muted" style={{ animationDelay: "240ms" }}>
          {t(profile.availability, locale)}
        </p>
      </section>

      {/* The wrapper keeps the chat's own flex sizing while carrying the last
          step of the entrance — Chat itself is a client component. */}
      <div className="animate-rise flex flex-1 flex-col" style={{ animationDelay: "300ms" }}>
        <Chat locale={locale} />
      </div>
    </>
  );
}
