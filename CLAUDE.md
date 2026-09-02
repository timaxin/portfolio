@AGENTS.md

# Working agreement for this repo

`README.md` covers what lives where and how it deploys. This file is what an agent needs
before changing anything.

## Language

English everywhere in the repo — code, comments, commit messages, env samples, docs.
Russian appears only as `ru` values inside `Localized<...>` content, i.e. the copy visitors
read on the page.

## Content is the source of truth, and it is shared

`src/content/profile.ts` and `src/content/projects.ts` feed both the pages and the bot:
`buildKnowledgeBase()` in `src/content/system-prompt.ts` flattens them into the system
prompt. Reshaping a content type therefore breaks the prompt, not just a page. When a UI
needs extra per-item data (icons, ordering, grouping), add a separate lookup module keyed
by the existing name rather than widening `Profile`, `StackGroup` or `Project`.

## i18n and routes

- Every human-readable string is `Localized<T>` (ru/en/pl) and read through `t(value, locale)`.
  TypeScript rejects a missing translation — keep it that way, never inline a bare string.
- UI chrome (nav labels, buttons, errors) belongs in `src/i18n/dictionaries.ts`, not in
  components.
- Pages live under `src/app/[locale]/`. A static route needs no `generateStaticParams` —
  the layout already enumerates locales; only dynamic segments add their own (see
  `projects/[slug]/page.tsx`). `dynamicParams = false` in the layout means an unknown
  locale 404s.
- Pages are async server components taking `PageProps<"/[locale]/...">`, awaiting `params`,
  and calling `notFound()` when `isLocale(locale)` fails.
- `src/proxy.ts` is this Next version's middleware — locale redirects live there.
- Absolute URLs come from `SITE_URL` in `src/app/[locale]/layout.tsx`, which also emits the
  canonical and hreflang tags.

## Styling

Tailwind v4, configured in CSS. Colors are semantic tokens declared in
`src/app/globals.css` (`:root` + `@theme inline`): use `bg-surface`, `text-muted`,
`border-border`, `bg-accent-soft`, never a literal hex or a Tailwind palette color. Dark
mode is `prefers-color-scheme` only — there is no toggle and no `dark:` variant in use, so
a new color must be added to both blocks. Markdown coming out of the bot is styled by the
`.answer` rules in the same file.

## Chat streaming

`/api/chat` streams NDJSON (`{type:"delta"|"done"|"error"}`, see `src/lib/chat-config.ts`),
read by the async generator in `chat-client.ts`. Keep the rendering decoupled from token
boundaries: `Chat.tsx` holds the received text in `pending` and reveals it character by
character through `useTypewriter`, and the finished answer joins `turns` only on the next
question, so the text never re-mounts mid-animation. Any in-flight request is aborted on
unmount — an abandoned stream keeps burning tokens.

## React and lint constraints

Server components by default; `"use client"` only where an event, effect or ref demands it.
ESLint enforces `react-hooks/set-state-in-effect`: an effect body may not call `setState`.
Derive the value during render, or set it from an event handler, a `requestAnimationFrame`
callback or a subscription instead.

## Before finishing

Run `npm run typecheck`, `npm run lint` and `npm test`. Vitest covers the pure functions —
the follow-up marker protocol, locale detection, tech-name matching, the rate limiter — and a
set of content invariants TypeScript cannot see, such as a translation present but empty or a
diagram edge pointing at a renamed node. Verify UI changes against the dev server rather
than by reading the diff — the `verify-chat-stream` skill covers exercising the chat
without a model key.

Then commit the work, without being asked and without pushing: every meaningful change gets
its own commit, and pushing is Tsimafei's call. The `commit-work` skill has the rules.
