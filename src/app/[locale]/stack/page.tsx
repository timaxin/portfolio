import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProximityGrid } from "@/components/ProximityGrid";
import { TechTile } from "@/components/TechTile";
import { profile } from "@/content/profile";
import { isGridGroup } from "@/content/tech-icons";
import { isLocale, t } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/stack">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: dictionaries[locale].stack.title } : {};
}

export default async function StackPage({ params }: PageProps<"/[locale]/stack">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = dictionaries[locale].stack;
  const tools = profile.stack.filter((group) => isGridGroup(group.group.en));
  const rest = profile.stack.filter((group) => !isGridGroup(group.group.en));

  return (
    <section>
      <h1 className="animate-rise text-2xl font-semibold tracking-tight">{dict.title}</h1>
      <p className="animate-rise mt-1 text-sm text-muted" style={{ animationDelay: "60ms" }}>
        {dict.subtitle}
      </p>

      <ProximityGrid className="animate-rise mt-8 space-y-8" >
        {tools.map((group) => (
          <div key={group.group.en}>
            <h2 className="text-xs font-medium tracking-wider text-muted uppercase">
              {t(group.group, locale)}
            </h2>
            <ul className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(88px,1fr))] items-start gap-1">
              {group.items.map((item) => (
                <TechTile key={item} name={item} locale={locale} />
              ))}
            </ul>
          </div>
        ))}
      </ProximityGrid>

      {/* Not tools: a logo next to "Mentoring" would be dressing up a soft skill. */}
      <div className="animate-rise mt-12 space-y-6 border-t border-border pt-8">
        {rest.map((group) => (
          <div key={group.group.en}>
            <h2 className="text-xs font-medium tracking-wider text-muted uppercase">
              {t(group.group, locale)}
            </h2>
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="rounded-full bg-surface-muted px-2.5 py-1 text-xs text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
