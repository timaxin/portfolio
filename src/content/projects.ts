import type { Localized } from "@/i18n/config";

/**
 * Проекты портфолио. Один массив питает и страницы /projects, и системный промпт,
 * поэтому добавление проекта автоматически расширяет знания чат-бота.
 */

export type Project = {
  slug: string;
  title: Localized;
  tagline: Localized;
  /** Развёрнутое описание — уходит в промпт, на странице показывается целиком. */
  description: Localized;
  role: Localized;
  period: string;
  stack: string[];
  highlights: Localized<string[]>;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "ai-portfolio",

    title: {
      ru: "AI-портфолио",
      en: "AI portfolio",
      pl: "AI portfolio",
    },

    tagline: {
      ru: "Сайт-портфолио, где вместо резюме — чат с ИИ",
      en: "A portfolio site where the CV is replaced by an AI chat",
      pl: "Strona portfolio, na której zamiast CV jest czat z AI",
    },

    description: {
      ru: "Портфолио, построенное как чат: рекрутер задаёт вопрос обо мне и получает ответ, собранный моделью строго по моей базе знаний. Next.js на фронте, тонкий прокси с ключом Anthropic на бэкенде, стриминг ответа через NDJSON.",
      en: "A portfolio built as a chat: a recruiter asks a question and gets an answer composed by the model strictly from my knowledge base. Next.js on the front, a thin proxy holding the Anthropic key on the back, response streamed over NDJSON.",
      pl: "Portfolio zbudowane jako czat: rekruter zadaje pytanie i dostaje odpowiedź złożoną przez model wyłącznie z mojej bazy wiedzy. Next.js na froncie, cienkie proxy z kluczem Anthropic na backendzie, odpowiedź streamowana przez NDJSON.",
    },

    role: {
      ru: "Автор, весь стек",
      en: "Author, full stack",
      pl: "Autor, cały stack",
    },

    period: "2026",

    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Anthropic API", "Vercel"],

    highlights: {
      ru: [
        "Ключ API никогда не попадает в браузер: все запросы идут через серверный прокси.",
        "База знаний — типизированные TS-модули, а не векторная база: правки в один файл.",
        "Rate limiting и ограничение длины истории, чтобы публичный эндпоинт не сжёг бюджет.",
        "Три языка интерфейса и контента: русский, английский, польский.",
      ],
      en: [
        "The API key never reaches the browser — every request goes through a server proxy.",
        "The knowledge base is typed TS modules, not a vector store: edits land in one file.",
        "Rate limiting and history caps so a public endpoint can't burn the budget.",
        "Three languages across UI and content: Russian, English, Polish.",
      ],
      pl: [
        "Klucz API nigdy nie trafia do przeglądarki — każde żądanie idzie przez serwerowe proxy.",
        "Baza wiedzy to typowane moduły TS, nie baza wektorowa: zmiany w jednym pliku.",
        "Rate limiting i limity historii, żeby publiczny endpoint nie spalił budżetu.",
        "Trzy języki interfejsu i treści: rosyjski, angielski, polski.",
      ],
    },

    links: [{ label: "GitHub", href: "https://github.com/timaxin/portfolio" }],
  },
];
