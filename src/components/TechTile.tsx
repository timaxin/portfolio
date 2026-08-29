import type { CSSProperties } from "react";
import Link from "next/link";
import { brandColors, displayName, iconFor, monogram } from "@/content/tech-icons";
import { isUsedInProjects } from "@/content/tech-index";
import type { Locale } from "@/i18n/config";

/**
 * One cell of the stack grid. A server component: the icon is inlined as an SVG
 * path, so no icon data and no requests reach the browser.
 */
export function TechTile({ name, locale }: { name: string; locale: Locale }) {
  const icon = iconFor(name);
  const brand = icon ? brandColors(icon.hex) : undefined;

  // Only tools that actually appear in a project become links — the rest would
  // land on an empty list and teach the reader to stop clicking.
  const used = isUsedInProjects(name);

  const mark = (
    <>
      <span className="tech-mark flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-muted transition-colors">
        {icon ? (
          <svg viewBox="0 0 24 24" aria-hidden className="h-5.5 w-5.5 fill-current">
            <path d={icon.path} />
          </svg>
        ) : (
          <span className="text-[0.7rem] font-semibold tracking-tight">{monogram(name)}</span>
        )}
      </span>
      <span data-label className="text-xs leading-tight text-muted">
        {displayName(name)}
      </span>
    </>
  );

  // The inner box is what the proximity effect scales. Keeping that off the
  // <li> means the entrance and the pointer never write the same property on
  // the same element.
  const boxed = "flex flex-col items-center gap-2";

  return (
    <li
      data-tile
      title={name}
      className="tech-tile rounded-xl px-1 py-3 text-center"
      style={
        brand
          ? ({ "--brand": brand.light, "--brand-dark": brand.dark } as CSSProperties)
          : undefined
      }
    >
      {used ? (
        <Link
          data-scale
          href={`/${locale}/projects?tech=${encodeURIComponent(name)}`}
          className={boxed}
        >
          {mark}
        </Link>
      ) : (
        <span data-scale className={boxed}>
          {mark}
        </span>
      )}
    </li>
  );
}
