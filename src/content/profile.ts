/**
 * Единственный источник правды о владельце портфолио.
 * Всё, что здесь написано, попадает в системный промпт чат-бота, —
 * модели запрещено выходить за пределы этих фактов.
 *
 * TODO: заменить заглушки на реальные данные перед публикацией.
 */

export type Experience = {
  company: string;
  role: string;
  period: string;
  /** Чем занимался и что осталось после тебя — конкретика, а не обязанности. */
  highlights: string[];
  stack: string[];
};

export type Profile = {
  name: string;
  headline: string;
  location: string;
  timezone: string;
  languages: string[];
  yearsOfExperience: number;
  summary: string;
  stack: Record<string, string[]>;
  experience: Experience[];
  education: string[];
  /** Честно перечисленные пробелы: бот сошлётся на них вместо того, чтобы выдумывать. */
  gaps: string[];
  availability: string;
  contacts: { label: string; value: string; href: string }[];
};

export const profile: Profile = {
  name: "Tsimafei Yefimenka",
  headline: "Senior Software Engineer — TypeScript, Next.js, Nest.js",
  location: "Warsaw, Poland",
  timezone: "Europe/Warsaw (CET/CEST)",
  languages: ["Русский — родной", "English — B2/C1", "Polski — A2"],
  yearsOfExperience: 8,

  summary: [
    "Senior-разработчик с фокусом на TypeScript-стек: продуктовый фронтенд на Next.js,",
    "сервисы на Nest.js, CI/CD и облачная инфраструктура.",
    "Одинаково уверенно веду фичу от прототипа до продакшена и разбираю чужой легаси.",
  ].join(" "),

  stack: {
    "Языки": ["TypeScript", "JavaScript", "SQL"],
    "Фронтенд": ["Next.js (App Router)", "React", "Tailwind CSS", "Zustand / TanStack Query"],
    "Бэкенд": ["Nest.js", "Node.js", "REST", "GraphQL", "PostgreSQL", "Redis"],
    "Инфраструктура": ["Docker", "GitHub Actions", "AWS", "Cloudflare Workers", "Vercel"],
    "Практики": ["Code review", "Тестирование (Jest, Playwright)", "Наставничество", "Проектирование API"],
  },

  experience: [
    {
      company: "TODO: компания",
      role: "Senior Software Engineer",
      period: "2022 — н. в.",
      highlights: [
        "TODO: конкретный результат с цифрой (ускорил, сократил, вывел в прод).",
        "TODO: зона ответственности — что было на тебе целиком.",
      ],
      stack: ["Next.js", "Nest.js", "PostgreSQL", "AWS"],
    },
    {
      company: "TODO: предыдущая компания",
      role: "Software Engineer",
      period: "2019 — 2022",
      highlights: ["TODO: что сделал и почему это было важно бизнесу."],
      stack: ["React", "Node.js", "Docker"],
    },
  ],

  education: ["TODO: вуз, специальность, год выпуска"],

  gaps: [
    "Нет коммерческого опыта в геймдеве и с движками вроде Phaser/Unity.",
    "TODO: другие честные пробелы — их лучше назвать самому, чем оставить боту домысливать.",
  ],

  availability:
    "Открыт к предложениям: full-time, remote или гибрид в Варшаве. Готов обсуждать проектную работу.",

  contacts: [
    { label: "Email", value: "timaxin@gmail.com", href: "mailto:timaxin@gmail.com" },
    { label: "GitHub", value: "github.com/TODO", href: "https://github.com/TODO" },
    { label: "LinkedIn", value: "linkedin.com/in/TODO", href: "https://linkedin.com/in/TODO" },
  ],
};
