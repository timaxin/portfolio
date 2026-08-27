# Portfolio

A personal site where the CV is a chat: someone asks, Claude answers strictly from my
profile. Plus project pages the bot also knows about. Three languages: ru / en / pl.

https://github.com/timaxin/portfolio

## Run it

```bash
cp .env.example .env.local   # fill in ANTHROPIC_API_KEY
npm run dev
```

## Where things live

| File | What for |
|---|---|
| `src/content/profile.ts` | experience, stack, education, gaps, contacts |
| `src/content/projects.ts` | projects — feed both `/projects` and the bot's prompt |
| `src/content/system-prompt.ts` | the bot's rules: no invention, answer in the question's language |
| `src/i18n/dictionaries.ts` | UI strings and error copy |
| `src/app/api/chat/route.ts` | proxy to Anthropic — the key lives here |
| `src/proxy.ts` | `/` → `/ru`\|`/en`\|`/pl` from Accept-Language |

Anything a human reads is wrapped in `Localized<...>`, so TS won't let a translation slip.
Add a project to `projects.ts` and the bot knows about it immediately — nothing else to do.

## Vercel

1. vercel.com/new → import this repo. Next.js is detected automatically; leave build and
   output settings alone.
2. Settings → Environment Variables → `ANTHROPIC_API_KEY`.
   **Tick all three environments** (Production, Preview, Development), otherwise the chat
   dies silently on preview deployments.
3. Deploy.

`vercel.json` pins the region to `fra1` (Frankfurt) — closest to Warsaw, less latency before
the first token. The route sets `maxDuration = 30`; the default 10s is too short for streaming.

Custom domain: Settings → Domains.

## Cost

The endpoint is public and every question costs money.

- Model is `claude-haiku-4-5`, the cheapest one. Override with `ANTHROPIC_MODEL`.
  (Don't set `output_config.effort` — Haiku 4.5 rejects it.)
- The system prompt carries `cache_control`, so repeat questions read it from cache.
- Caps: 600 chars per question, 12 messages of history, 1024 tokens per answer.
- Rate limit of 12 questions per hour per IP (`src/lib/rate-limit.ts`). The counter lives in
  instance memory and Vercel runs several instances, so it's not a guarantee — just a guard
  against accidental hammering. If someone goes at it seriously: Vercel KV, or Turnstile in
  front of the first request.
