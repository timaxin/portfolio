"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { defaultLocale, isLocale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

/**
 * Catches a render failure anywhere under this segment and keeps the header and
 * footer standing — error.tsx does not wrap the layout in its own segment, only
 * what the layout renders as children, so the page around this boundary stays
 * intact rather than going blank.
 *
 * A Client Component, and so given no params: the locale comes from the URL
 * itself, which still works after whatever failed.
 */
export default function Error({ error, retry }: { error: Error; retry: () => void }) {
  const pathname = usePathname();
  const segment = pathname.split("/")[1] ?? "";
  const locale = isLocale(segment) ? segment : defaultLocale;
  const dict = dictionaries[locale].errorPage;

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="py-6">
      <p className="section-label">Error</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{dict.title}</h1>
      <p className="mt-2 max-w-2xl text-[0.9375rem] text-muted">{dict.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => retry()}
          className="cursor-pointer rounded-xl border border-border px-3.5 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          {dict.retry}
        </button>
        <Link
          href={`/${locale}`}
          className="rounded-xl border border-border px-3.5 py-2 text-sm transition-colors hover:border-accent hover:text-accent"
        >
          {dict.home}
        </Link>
      </div>
    </section>
  );
}
