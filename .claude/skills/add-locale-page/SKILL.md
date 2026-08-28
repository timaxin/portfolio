---
name: add-locale-page
description: Add a new page under src/app/[locale]/ to the portfolio with every convention wired up — server component shape, metadata, dictionary entries in ru/en/pl, and the header nav link. Use when asked to create a new route, section or page on this site (a stack/skills page, an experience or timeline page, an about page), or when a new nav item should appear.
---

# Add a localized page

A page is not finished when it renders: without its dictionary entries it cannot be
translated, and without a nav link nobody reaches it. Do all four steps.

## 1. The route

`src/app/[locale]/<segment>/page.tsx`, an async server component. Copy the shape from
`src/app/[locale]/projects/page.tsx`:

```tsx
export async function generateMetadata({
  params,
}: PageProps<"/[locale]/<segment>">): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? { title: dictionaries[locale].<key>.title } : {};
}

export default async function Page({ params }: PageProps<"/[locale]/<segment>">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  ...
}
```

Do **not** add `generateStaticParams` for a static route — `src/app/[locale]/layout.tsx`
already enumerates the locales, and `dynamicParams = false` makes anything else 404. Only a
dynamic sub-segment needs its own (see `projects/[slug]/page.tsx`, which crosses locales
with slugs). The layout also emits canonical and hreflang tags, so nothing to do there.

## 2. Copy

Add a section to the `Dictionary` type in `src/i18n/dictionaries.ts` and fill it for all
three locales — TypeScript will not let one slip. Page copy about the candidate belongs in
`src/content/`, wrapped in `Localized<...>` and read with `t(value, locale)`; UI chrome
belongs in the dictionary. Never inline a bare string.

If the page displays existing content in a new shape, keep `profile.ts` / `projects.ts`
intact — they also feed the bot's system prompt — and put the presentation data (icons,
order, grouping) in a new module keyed by the existing names.

## 3. Navigation

Add `nav.<key>` to all three dictionaries and a `<NavLink href={`/${locale}/<segment>`}>`
in `src/components/SiteHeader.tsx`. `NavLink` highlights by `usePathname`; `exact` is only
for the home route.

## 4. Styling and client code

Semantic tokens only (`bg-surface`, `text-muted`, `border-border`, `bg-accent-soft`) — see
CLAUDE.md. Keep the page a server component; if it needs interactivity, isolate it in a
small `"use client"` child so the page itself still renders on the server. Load heavy
animation libraries with a dynamic import inside that child, never at page level.

## 5. Verify

`npm run typecheck && npm run lint`, then open the route on the dev server in all three
locales, at 375px width, and with dark mode — the site has no theme toggle, so dark mode is
checked with `resize_window` `{colorScheme: "dark"}`.
