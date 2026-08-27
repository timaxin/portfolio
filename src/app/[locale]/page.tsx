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
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{profile.name}</h1>
        <p className="mt-1 text-sm text-accent">{t(profile.headline, locale)}</p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed">{t(profile.summary, locale)}</p>
        <p className="mt-3 text-sm text-muted">{t(profile.availability, locale)}</p>
      </section>

      <Chat locale={locale} />
    </>
  );
}
