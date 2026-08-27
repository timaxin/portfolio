import type { Localized } from "@/i18n/config";

/**
 * The single source of truth about the portfolio owner.
 * Everything here goes into the chatbot's system prompt, and the model is not
 * allowed to step outside these facts.
 *
 * Deliberately absent (public page, public endpoint): phone number, salary
 * expectations, immigration/permit details, and any company he is interviewing with.
 */

export type Experience = {
  company: string;
  location: string;
  role: Localized;
  period: Localized;
  /** What he did and what outlived him — specifics, not a list of duties. */
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
  /** Explains anything a reader may spot in the dates. Without this the bot can
   *  count the months and has no answer for why. */
  timelineNotes: Localized<string[]>;
  /** Gaps and caveats stated honestly — partial experience counts. The bot cites
   *  these instead of making something up. */
  gaps: Localized<string[]>;
  availability: Localized;
  contacts: { label: string; value: string; href: string }[];
};

export const profile: Profile = {
  name: "Tsimafei Yefimenka",

  headline: {
    ru: "Senior Full-Stack Engineer — React, Next.js, Node.js, TypeScript",
    en: "Senior Full-Stack Engineer — React, Next.js, Node.js, TypeScript",
    pl: "Senior Full-Stack Engineer — React, Next.js, Node.js, TypeScript",
  },

  location: {
    ru: "Лодзь, Польша",
    en: "Łódź, Poland",
    pl: "Łódź, Polska",
  },

  timezone: "Europe/Warsaw (CET/CEST)",

  languages: {
    ru: ["Русский — родной", "Английский — B2", "Польский — B1"],
    en: ["Russian — native", "English — B2", "Polish — B1"],
    pl: ["Rosyjski — ojczysty", "Angielski — B2", "Polski — B1"],
  },

  yearsOfExperience: 7,

  summary: {
    ru: "Senior full-stack инженер, 7+ лет строит масштабируемые веб-платформы на React, Node.js и TypeScript; около пяти из них — с британскими и европейскими клиентами. Ведёт разработку фич, наставляет инженеров и вытаскивает производительность в FinTech, EdTech и B2B SaaS. Последнее время работает spec-first с AI-инструментами и оценивает ответы LLM для AI-лабораторий.",
    en: "Senior full-stack engineer with 7+ years building scalable web platforms on React, Node.js and TypeScript, about five of them with UK and EU clients. Leads feature delivery, mentors engineers and pushes on performance across FinTech, EdTech and B2B SaaS. Lately works spec-first with AI-assisted tooling and evaluates LLM output for AI labs.",
    pl: "Senior full-stack engineer z 7+ latami budowania skalowalnych platform webowych na React, Node.js i TypeScript, w tym około pięciu lat z klientami z UK i UE. Prowadzi rozwój funkcji, mentoruje inżynierów i wyciąga wydajność w FinTech, EdTech i B2B SaaS. Ostatnio pracuje spec-first z narzędziami AI i ocenia odpowiedzi LLM dla laboratoriów AI.",
  },

  stack: [
    {
      group: { ru: "Фронтенд", en: "Frontend", pl: "Frontend" },
      items: [
        "TypeScript",
        "JavaScript (ES6+)",
        "React",
        "Next.js (App Router)",
        "Redux",
        "TanStack Query",
        "Tailwind CSS",
        "styled-components",
        "HTML5 / CSS3",
      ],
    },
    {
      group: { ru: "Бэкенд", en: "Backend", pl: "Backend" },
      items: [
        "Node.js",
        "Express",
        "Nest.js",
        "PostgreSQL",
        "TimescaleDB",
        "MySQL",
        "Prisma",
        "WebSockets",
        "REST API",
        "Authentication",
      ],
    },
    {
      group: { ru: "Тестирование", en: "Testing", pl: "Testowanie" },
      items: ["Jest", "React Testing Library", "Playwright"],
    },
    {
      group: { ru: "Инфраструктура", en: "Infrastructure", pl: "Infrastruktura" },
      items: [
        "Git",
        "Docker",
        "CI/CD (GitHub Actions, GitLab CI, GoCD)",
        "Vercel",
        "AWS (Lambda, S3)",
      ],
    },
    {
      group: { ru: "AI в разработке", en: "AI workflows", pl: "AI w pracy" },
      items: [
        "Claude Code",
        "Windsurf",
        "Codex",
        "Spec-driven development",
        "Prompt engineering",
        "LLM evaluation",
      ],
    },
    {
      group: { ru: "Домены", en: "Domains", pl: "Domeny" },
      items: ["FinTech", "EdTech", "B2B SaaS", "AI/ML data & model evaluation"],
    },
    {
      group: { ru: "Как работает", en: "Ways of working", pl: "Sposób pracy" },
      items: [
        "Code review",
        "Mentoring",
        "Scrum",
        "Jira / Confluence",
        "Stakeholder management",
        "Remote-first teams",
      ],
    },
  ],

  experience: [
    {
      company: "Godel Technologies Europe",
      location: "Łódź, Poland",
      role: {
        ru: "Senior Software Engineer",
        en: "Senior Software Engineer",
        pl: "Senior Software Engineer",
      },
      period: { ru: "09.2021 — н. в.", en: "09.2021 — present", pl: "09.2021 — obecnie" },
      highlights: {
        ru: [
          "Возглавил миграцию ключевого клиентского модуля на React + TypeScript: бандл меньше на 30%, Lighthouse performance вырос с 62 до 91.",
          "Перевёл платформу сравнения цен британского страхового клиента (Compare the Market) на новый фреймворк и дизайн-систему: +25% к производительности страниц без потери функциональности.",
          "Сократил время загрузки страниц на 25%, а критические баги в проде — на 40%, через покрытие Jest/React Testing Library и более строгое код-ревью в команде из пяти человек.",
          "Наставлял двух мидл-инженеров через парное программирование и ревью — их онбординг стал короче на две недели.",
          "Довёл до продакшена два BFF/бэкенд-приложения по spec-driven development в команде из трёх человек, генерируя код из спецификаций через Claude Code, Windsurf и Codex — на 30–40% быстрее.",
        ],
        en: [
          "Led the migration of a core client-facing module to React + TypeScript: 30% smaller bundle, Lighthouse performance up from 62 to 91.",
          "Migrated a British insurance client's price comparison platform (Compare the Market) to a new framework and design system: 25% better page performance with no loss of functionality.",
          "Cut page load time by 25% and critical production bugs by 40% through Jest/React Testing Library coverage and a stricter review process across a team of five.",
          "Mentored two mid-level engineers through pair programming and code review, shortening their onboarding by two weeks.",
          "Delivered two BFF/backend applications end to end with spec-driven development in a team of three, scaffolding from specs with Claude Code, Windsurf and Codex — 30–40% faster delivery.",
        ],
        pl: [
          "Poprowadził migrację kluczowego modułu klienckiego na React + TypeScript: bundle mniejszy o 30%, Lighthouse performance z 62 do 91.",
          "Przeniósł platformę porównywania cen brytyjskiego klienta ubezpieczeniowego (Compare the Market) na nowy framework i design system: +25% wydajności stron bez utraty funkcjonalności.",
          "Skrócił czas ładowania stron o 25%, a krytyczne błędy produkcyjne o 40% dzięki pokryciu Jest/React Testing Library i ostrzejszemu code review w pięcioosobowym zespole.",
          "Mentorował dwóch inżynierów mid przez pair programming i code review — ich onboarding skrócił się o dwa tygodnie.",
          "Dostarczył end-to-end dwie aplikacje BFF/backend w podejściu spec-driven development w trzyosobowym zespole, generując kod ze specyfikacji przez Claude Code, Windsurf i Codex — o 30–40% szybciej.",
        ],
      },
      stack: ["React", "TypeScript", "Next.js", "Node.js", "Jest", "React Testing Library", "GoCD"],
    },
    {
      company: "Outlier, Alignerr, Preply",
      location: "Remote",
      role: {
        ru: "AI-тренер и prompt-инженер (фриланс)",
        en: "Freelance AI Trainer & Prompt Engineer",
        pl: "AI Trainer i Prompt Engineer (freelance)",
      },
      period: { ru: "03.2025 — н. в.", en: "03.2025 — present", pl: "03.2025 — obecnie" },
      highlights: {
        ru: [
          "Оценивал и ранжировал ответы LLM на задачах генерации кода на нескольких платформах AI-тренировки — работа шла в улучшение точности моделей ведущих AI-лабораторий.",
          "Выстроил процессы prompt engineering для технических задач оценки, подняв согласованность разметки в распределённой команде ревьюеров.",
          "Провёл 300+ часов индивидуальных занятий по JavaScript и React на Preply — от основ до портфолио-проектов уровня найма.",
        ],
        en: [
          "Evaluated and ranked LLM output on code-generation tasks across several AI training platforms, feeding model accuracy work at leading AI labs.",
          "Designed prompt engineering workflows for technical evaluation tasks, improving annotation consistency across a distributed reviewer team.",
          "Delivered 300+ hours of one-on-one JavaScript and React tutoring on Preply, taking students from fundamentals to job-ready portfolio projects.",
        ],
        pl: [
          "Oceniał i rankował odpowiedzi LLM w zadaniach generowania kodu na kilku platformach treningu AI — praca zasilała poprawę dokładności modeli czołowych laboratoriów AI.",
          "Zaprojektował procesy prompt engineeringu dla technicznych zadań oceny, podnosząc spójność adnotacji w rozproszonym zespole recenzentów.",
          "Przeprowadził 300+ godzin indywidualnych zajęć z JavaScriptu i Reacta na Preply — od podstaw do projektów portfolio na poziomie zatrudnienia.",
        ],
      },
      stack: ["LLM evaluation", "Prompt engineering", "JavaScript", "React"],
    },
    {
      company: "AKDev Group",
      location: "Minsk, Belarus",
      role: {
        ru: "Software Engineer",
        en: "Software Engineer",
        pl: "Software Engineer",
      },
      period: { ru: "08.2018 — 03.2021", en: "08.2018 — 03.2021", pl: "08.2018 — 03.2021" },
      highlights: {
        ru: [
          "Спроектировал дашборд мониторинга судов в реальном времени (Node.js, Express, TimescaleDB, WebSockets): телеметрия шла с судна по UDP, живые данные по 50+ судам, ежедневный инструмент операционных команд.",
          "Сделал к нему React-фронтенд с live-стримом: данные в реальном времени на 3D-модели судна, переключение по палубам, несколько ракурсов камеры и дашборды. Выкатывали через фича-флаги, с мониторингом, логированием и отработанным откатом.",
          "Построил и кастомизировал WYSIWYG-редактор (React, Laravel) для статей и уроков онлайн-школы.",
          "Реализовал триальные аккаунты — конверсия выросла на 2% в первый же квартал после запуска.",
          "Работал в кодовых базах React, Vue и Laravel в стартапе, выпуская фичи короткими релизными циклами вместе с продуктом и дизайном.",
        ],
        en: [
          "Architected a real-time ship monitoring dashboard (Node.js, Express, TimescaleDB, WebSockets) fed by UDP telemetry straight from the vessel, live across 50+ ships and used daily by operations teams.",
          "Built its live-stream React front-end: real-time data on a 3D ship model with deck switching, multiple camera views and dashboards. Rolled out behind feature flags with monitoring, logging and a rehearsed rollback path.",
          "Built and customised a WYSIWYG editor (React, Laravel) for authoring articles and online school lessons.",
          "Shipped trial-account functionality that lifted conversion by 2% in the first quarter after launch.",
          "Worked across React, Vue and Laravel codebases in a startup, shipping on tight release cycles alongside product and design.",
        ],
        pl: [
          "Zaprojektował dashboard monitoringu statków w czasie rzeczywistym (Node.js, Express, TimescaleDB, WebSockets): telemetria szła ze statku po UDP, dane na żywo z 50+ jednostek, codzienne narzędzie zespołów operacyjnych.",
          "Zbudował do niego frontend React z live streamem: dane w czasie rzeczywistym na modelu 3D statku, przełączanie pokładów, kilka ujęć kamery i dashboardy. Wdrożenie szło przez feature flagi, z monitoringiem, logowaniem i przećwiczonym rollbackiem.",
          "Zbudował i dostosował edytor WYSIWYG (React, Laravel) do tworzenia artykułów i lekcji szkoły online.",
          "Wdrożył konta próbne — konwersja wzrosła o 2% w pierwszym kwartale po starcie.",
          "Pracował w bazach kodu React, Vue i Laravel w startupie, dowożąc funkcje w krótkich cyklach wydawniczych razem z produktem i designem.",
        ],
      },
      stack: ["React", "Vue", "Node.js", "Express", "TimescaleDB", "WebSockets", "UDP", "Laravel"],
    },
  ],

  education: {
    ru: [
      "Белорусский государственный университет, Минск — бакалавр математики и математической кибернетики, 2016–2020. Курсы: проектирование алгоритмов, моделирование данных, статистический анализ, вычислительные системы.",
    ],
    en: [
      "Belarusian State University, Minsk — B.Sc. in Mathematics and Mathematical Cybernetics, 2016–2020. Coursework: algorithm design, data modelling, statistical analysis, computational systems.",
    ],
    pl: [
      "Białoruski Uniwersytet Państwowy, Mińsk — licencjat z matematyki i cybernetyki matematycznej, 2016–2020. Przedmioty: projektowanie algorytmów, modelowanie danych, analiza statystyczna, systemy obliczeniowe.",
    ],
  },

  timelineNotes: {
    ru: [
      "03.2021 — 09.2021: полгода срочной службы в армии. Этим объясняется перерыв между AKDev Group и Godel Technologies.",
    ],
    en: [
      "03.2021 — 09.2021: six months of mandatory military service. That accounts for the break between AKDev Group and Godel Technologies.",
    ],
    pl: [
      "03.2021 — 09.2021: pół roku obowiązkowej służby wojskowej. To wyjaśnia przerwę między AKDev Group a Godel Technologies.",
    ],
  },

  gaps: {
    ru: [
      "Нет прямого практического опыта с edge-рантаймами (Vercel Edge Functions, Cloudflare Workers).",
      "AWS знает частично: руками работал с Lambda и S3, с RDS и EC2 опыт ограниченный.",
      "Nest.js: руками работал, но в основном на некоммерческих проектах — Nest.js-сервис в продакшене не вёл.",
    ],
    en: [
      "No direct hands-on experience with edge runtimes (Vercel Edge Functions, Cloudflare Workers).",
      "AWS is partial: hands-on with Lambda and S3, limited exposure to RDS and EC2.",
      "Nest.js: hands-on, but mostly on non-commercial projects — he has not owned a Nest.js service in production.",
    ],
    pl: [
      "Brak bezpośredniego doświadczenia z runtime'ami edge (Vercel Edge Functions, Cloudflare Workers).",
      "AWS zna częściowo: praktyka z Lambda i S3, ograniczone doświadczenie z RDS i EC2.",
      "Nest.js: pracował praktycznie, ale głównie na projektach niekomercyjnych — nie prowadził serwisu Nest.js na produkcji.",
    ],
  },

  availability: {
    ru: "Открыт к senior-ролям: удалённо по Польше или гибрид в Лодзи либо Варшаве, переезд в Варшаву рассматривает. Работает по B2B через собственное JDG или по umowa o pracę. Срок выхода — две недели. Может подстроить часы под US Eastern, с плотным пересечением в первые месяцы онбординга. Предпочитает устоявшиеся компании со здоровой инженерной культурой.",
    en: "Open to senior roles: remote within Poland, or hybrid in Łódź or Warsaw — he is considering a move to Warsaw. Works on B2B through his own sole proprietorship or on a permanent contract (umowa o pracę). Notice period is two weeks. Can align hours with US Eastern time, with heavy overlap during the first months of onboarding. Prefers established companies with a healthy engineering culture.",
    pl: "Otwarty na role senior: zdalnie w Polsce albo hybrydowo w Łodzi lub Warszawie — rozważa przeprowadzkę do Warszawy. Pracuje na B2B przez własną JDG albo na umowę o pracę. Okres wypowiedzenia: dwa tygodnie. Może dopasować godziny do US Eastern, z dużym pokryciem w pierwszych miesiącach onboardingu. Preferuje ustabilizowane firmy ze zdrową kulturą inżynierską.",
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
