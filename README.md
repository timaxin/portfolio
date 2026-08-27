# AI-портфолио

Портфолио-сайт, где вместо статичного резюме — чат: рекрутер задаёт вопрос, модель Claude
отвечает строго по базе знаний о кандидате. Плюс обычные страницы под проекты, которые
чат-бот тоже «знает».

## Как это устроено

```
Браузер ──POST /api/chat──▶ серверный прокси ──▶ Anthropic API
   ▲                          (ключ живёт здесь)        │
   └──────── NDJSON-поток с текстом ответа ◀────────────┘
```

Ключевая идея: **ключ API никогда не попадает в браузер**. Между фронтом и Anthropic всегда
стоит серверный прокси, который подставляет системный промпт с профилем и стримит ответ.

Прокси есть в двух видах — выберите один:

| Вариант | Прокси | Хостинг фронта |
|---|---|---|
| По умолчанию | [`src/app/api/chat/route.ts`](src/app/api/chat/route.ts) | Vercel, любой Node-хостинг, `next start` |
| GitHub Pages | [`worker/src/index.ts`](worker/src/index.ts) (Cloudflare Worker) | GitHub Pages (статический экспорт) |

Оба варианта импортируют одну и ту же логику из `src/lib/chat.ts`, так что база знаний,
лимиты и системный промпт не расходятся между ними.

## Быстрый старт

```bash
cp .env.example .env.local   # вписать ANTHROPIC_API_KEY
npm run dev
```

Откройте http://localhost:3000.

## Что заполнить под себя

Вся база знаний — обычные типизированные TS-модули, никакой БД и векторного поиска:

- [`src/content/profile.ts`](src/content/profile.ts) — опыт, стек, образование, пробелы, контакты.
- [`src/content/projects.ts`](src/content/projects.ts) — проекты. Один массив питает и страницы
  `/projects`, и системный промпт: добавили проект — бот сразу о нём знает.
- [`src/content/suggested-questions.ts`](src/content/suggested-questions.ts) — стартовые подсказки.
- [`src/content/system-prompt.ts`](src/content/system-prompt.ts) — правила поведения бота
  (не выдумывать, отвечать на языке вопроса, честно говорить о пробелах).

Найдите по репозиторию `TODO:` — это все места-заглушки.

## Деплой

### Вариант A — Vercel (проще)

Импортируйте репозиторий, добавьте переменную окружения `ANTHROPIC_API_KEY` — всё.
Роут `/api/chat` работает из коробки, `NEXT_PUBLIC_CHAT_ENDPOINT` задавать не нужно.

### Вариант B — GitHub Pages + Cloudflare Worker

1. Задеплойте воркер:

   ```bash
   npx wrangler secret put ANTHROPIC_API_KEY -c worker/wrangler.toml
   npm run worker:deploy
   ```

   В [`worker/wrangler.toml`](worker/wrangler.toml) пропишите `ALLOWED_ORIGINS` — домен вашего
   сайта на Pages. Воркер отвечает только на запросы с этих Origin.

2. В репозитории: **Settings → Pages → Source: GitHub Actions**.

3. В **Settings → Secrets and variables → Actions → Variables** добавьте:
   - `CHAT_ENDPOINT` — URL воркера (`https://portfolio-chat.<subdomain>.workers.dev`);
   - `BASE_PATH` — `/<имя-репозитория>`, если сайт живёт на `username.github.io/<repo>`.
     Для `username.github.io` или своего домена оставьте пустым.

4. Пуш в `main` запускает [workflow](.github/workflows/deploy-pages.yml).

Локально статическую сборку можно проверить так:

```bash
npm run build:static && npx serve out
```

## Деньги и защита эндпоинта

Эндпоинт публичный, и каждый вопрос стоит денег. Что уже сделано:

- **Rate limit** — `src/lib/rate-limit.ts`, по умолчанию 12 вопросов в час с IP.
  Счётчик живёт в памяти инстанса; для жёсткой гарантии вынесите его в Cloudflare KV,
  Durable Object или Redis.
- **CORS белым списком** — воркер отвечает только доменам из `ALLOWED_ORIGINS`.
- **Лимиты на вход** — не длиннее 600 символов на вопрос, не больше 12 сообщений истории.
- **Prompt caching** — системный промпт помечен `cache_control`, повторные запросы
  за кешированную часть стоят примерно на порядок дешевле.
- **`effort: "low"`** — ответы короткие, глубокое рассуждение здесь не нужно.

По умолчанию используется `claude-opus-5`. Если публичный чат должен быть максимально дешёвым,
поставьте `ANTHROPIC_MODEL=claude-haiku-4-5` — для Q&A по фиксированному контексту этого хватает.

Следующий шаг, если бюджет всё же жгут ботами: [Cloudflare Turnstile](https://developers.cloudflare.com/turnstile/)
перед первым запросом.

## Скрипты

| Команда | Что делает |
|---|---|
| `npm run dev` | Дев-сервер |
| `npm run build` | Обычная сборка (с рабочим `/api/chat`) |
| `npm run build:static` | Статический экспорт в `out/` под GitHub Pages |
| `npm run typecheck` | Проверка типов приложения и воркера |
| `npm run worker:dev` | Локальный запуск Cloudflare Worker |
| `npm run worker:deploy` | Деплой воркера |
