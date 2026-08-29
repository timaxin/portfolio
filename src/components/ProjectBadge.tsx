import type { ProjectKind } from "@/content/projects";
import type { Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

/** Says at a glance whether a project was paid client work or built in-house. */
export function ProjectBadge({ kind, locale }: { kind: ProjectKind; locale: Locale }) {
  const dict = dictionaries[locale].projects;

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs whitespace-nowrap ${
        kind === "commercial"
          ? "bg-accent-soft text-accent"
          : "border border-border text-muted"
      }`}
    >
      {kind === "commercial" ? dict.commercial : dict.internal}
    </span>
  );
}
