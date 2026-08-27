import type { Localized } from "@/i18n/config";

/**
 * Единственный источник правды о владельце портфолио.
 * Всё, что здесь написано, попадает в системный промпт чат-бота, —
 * модели запрещено выходить за пределы этих фактов.
 *
 * TODO: заменить заглушки на реальные данные перед публикацией.
 */

export type Experience = {
  company: string;
  role: Localized;
  period: Localized;
  /** Чем занимался и что осталось после тебя — конкретика, а не обязанности. */
  highlights: Localized<string[]>;
  stack: string[];
};

export type StackGroup = { group: Localized; items: string[] };

export type Profile = {
  name: string;
  headline: Localized;
  location: Localized;
  timezone: string;
  languages: Localized<string[]>;
  yearsOfExperience: number;
  summary: Localized;
  stack: StackGroup[];
  experience: Experience[];
  education: Localized<string[]>;
  /** Честно перечисленные пробелы: бот сошлётся на них вместо того, чтобы выдумывать. */
  gaps: Localized<string[]>;
  availability: Localized;
  contacts: { label: string; value: string; href: string }[];
};

export const profile: Profile = {
  name: "Tsimafei Yefimenka",

  headline: {
    ru: "Senior Software Engineer — TypeScript, Next.js, Nest.js",
    en: "Senior Software Engineer — TypeScript, Next.js, Nest.js",
    pl: "Senior Software Engineer — TypeScript, Next.js, Nest.js",
  },

  location: {
    ru: "Варшава, Польша",
    en: "Warsaw, Poland",
    pl: "Warszawa, Polska",
  },

  timezone: "Europe/Warsaw (CET/CEST)",

  languages: {
    ru: ["Русский — родной", "Английский — B2/C1", "Польский — A2"],
    en: ["Russian — native", "English — B2/C1", "Polish — A2"],
    pl: ["Rosyjski — ojczysty", "Angielski — B2/C1", "Polski — A2"],
  },

  yearsOfExperience: 8,

  summary: {
    ru: "Senior-разработчик с фокусом на TypeScript-стек: продуктовый фронтенд на Next.js, сервисы на Nest.js, CI/CD и облачная инфраструктура. Одинаково уверенно веду фичу от прототипа до продакшена и разбираю чужой легаси.",
    en: "Senior engineer focused on the TypeScript stack: product front-ends on Next.js, services on Nest.js, CI/CD and cloud infrastructure. Equally comfortable taking a feature from prototype to production and untangling someone else's legacy code.",
    pl: "Senior developer skupiony na stacku TypeScript: produktowy front-end w Next.js, serwisy w Nest.js, CI/CD i infrastruktura chmurowa. Tak samo pewnie prowadzę funkcję od prototypu do produkcji, jak i rozplątuję cudzy legacy.",
  },

  stack: [
    {
      group: { ru: "Языки", en: "Languages", pl: "Języki" },
      items: ["TypeScript", "JavaScript", "SQL"],
    },
    {
      group: { ru: "Фронтенд", en: "Frontend", pl: "Frontend" },
      items: ["Next.js (App Router)", "React", "Tailwind CSS", "Zustand / TanStack Query"],
    },
    {
      group: { ru: "Бэкенд", en: "Backend", pl: "Backend" },
      items: ["Nest.js", "Node.js", "REST", "GraphQL", "PostgreSQL", "Redis"],
    },
    {
      group: { ru: "Инфраструктура", en: "Infrastructure", pl: "Infrastruktura" },
      items: ["Docker", "GitHub Actions", "AWS", "Cloudflare Workers", "Vercel"],
    },
    {
      group: { ru: "Практики", en: "Practices", pl: "Praktyki" },
      items: [
        "Code review",
        "Testing (Jest, Playwright)",
        "Mentoring",
        "API design",
      ],
    },
  ],

  experience: [
    {
      company: "TODO: компания",
      role: {
        ru: "Senior Software Engineer",
        en: "Senior Software Engineer",
        pl: "Senior Software Engineer",
      },
      period: { ru: "2022 — н. в.", en: "2022 — present", pl: "2022 — obecnie" },
      highlights: {
        ru: [
          "TODO: конкретный результат с цифрой (ускорил, сократил, вывел в прод).",
          "TODO: зона ответственности — что было на тебе целиком.",
        ],
        en: [
          "TODO: a concrete result with a number (sped up, cut down, shipped).",
          "TODO: scope of ownership — what was entirely yours.",
        ],
        pl: [
          "TODO: konkretny wynik z liczbą (przyspieszyłem, zmniejszyłem, wdrożyłem).",
          "TODO: zakres odpowiedzialności — co było w całości na tobie.",
        ],
      },
      stack: ["Next.js", "Nest.js", "PostgreSQL", "AWS"],
    },
    {
      company: "TODO: предыдущая компания",
      role: {
        ru: "Software Engineer",
        en: "Software Engineer",
        pl: "Software Engineer",
      },
      period: { ru: "2019 — 2022", en: "2019 — 2022", pl: "2019 — 2022" },
      highlights: {
        ru: ["TODO: что сделал и почему это было важно бизнесу."],
        en: ["TODO: what you built and why it mattered to the business."],
        pl: ["TODO: co zrobiłeś i dlaczego było to ważne dla biznesu."],
      },
      stack: ["React", "Node.js", "Docker"],
    },
  ],

  education: {
    ru: ["TODO: вуз, специальность, год выпуска"],
    en: ["TODO: university, major, graduation year"],
    pl: ["TODO: uczelnia, kierunek, rok ukończenia"],
  },

  gaps: {
    ru: [
      "Нет коммерческого опыта в геймдеве и с движками вроде Phaser/Unity.",
      "TODO: другие честные пробелы — их лучше назвать самому, чем оставить боту домысливать.",
    ],
    en: [
      "No commercial experience in game development or with engines like Phaser/Unity.",
      "TODO: other honest gaps — better to name them yourself than let the bot guess.",
    ],
    pl: [
      "Brak komercyjnego doświadczenia w gamedevie i z silnikami typu Phaser/Unity.",
      "TODO: inne szczere luki — lepiej nazwać je samemu, niż zostawić botowi do domyślenia.",
    ],
  },

  availability: {
    ru: "Открыт к предложениям: full-time, remote или гибрид в Варшаве и Лодзи. Готов обсуждать проектную работу.",
    en: "Open to offers: full-time, remote or hybrid in Warsaw and Łódź. Happy to discuss project work.",
    pl: "Otwarty na oferty: full-time, zdalnie lub hybrydowo w Warszawie i Łodzi. Chętnie porozmawiam o pracy projektowej.",
  },

  contacts: [
    { label: "Email", value: "timaxin@gmail.com", href: "mailto:timaxin@gmail.com" },
    { label: "GitHub", value: "github.com/timaxin", href: "https://github.com/timaxin" },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/timaxin",
      href: "https://www.linkedin.com/in/timaxin/",
    },
  ],
};
