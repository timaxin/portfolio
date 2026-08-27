/**
 * Проекты портфолио. Один массив питает и страницу /projects, и системный промпт,
 * поэтому добавление проекта автоматически расширяет знания чат-бота.
 */

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  /** Развёрнутое описание — уходит в промпт, на странице показывается целиком. */
  description: string;
  role: string;
  period: string;
  stack: string[];
  highlights: string[];
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "ai-portfolio",
    title: "AI-портфолио",
    tagline: "Сайт-портфолио, где вместо резюме — чат с ИИ",
    description: [
      "Портфолио, построенное как чат: рекрутер задаёт вопрос обо мне и получает ответ,",
      "собранный моделью строго по моей базе знаний. Next.js на фронте, тонкий прокси",
      "с ключом Anthropic на бэкенде, стриминг ответа через NDJSON.",
    ].join(" "),
    role: "Автор, весь стек",
    period: "2026",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Anthropic API", "Cloudflare Workers"],
    highlights: [
      "Ключ API никогда не попадает в браузер: все запросы идут через серверный прокси.",
      "База знаний — типизированные TS-модули, а не векторная база: правки в один файл.",
      "Rate limiting и ограничение длины истории, чтобы публичный эндпоинт не сжёг бюджет.",
    ],
    links: [{ label: "GitHub", href: "https://github.com/TODO/portfolio" }],
  },
  {
    slug: "todo-project",
    title: "TODO: следующий проект",
    tagline: "TODO: одна строка о сути",
    description: "TODO: 2–3 предложения о задаче, решении и результате.",
    role: "TODO",
    period: "TODO",
    stack: ["TODO"],
    highlights: ["TODO: что было сложного и как решил."],
    links: [],
  },
];
