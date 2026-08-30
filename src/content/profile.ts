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

  yearsOfExperience: 8,

  summary: {
    ru: "Senior full-stack инженер, 8 лет строит масштабируемые веб-платформы на React, Node.js и TypeScript; около пяти из них — с британскими и европейскими клиентами. Ведёт разработку фич, наставляет инженеров и вытаскивает производительность в FinTech, EdTech и B2B SaaS. Последнее время работает spec-first с AI-инструментами и оценивает ответы LLM для AI-лабораторий.",
    en: "Senior full-stack engineer with 8 years building scalable web platforms on React, Node.js and TypeScript, about five of them with UK and EU clients. Leads feature delivery, mentors engineers and pushes on performance across FinTech, EdTech and B2B SaaS. Lately works spec-first with AI-assisted tooling and evaluates LLM output for AI labs.",
    pl: "Senior full-stack engineer z 8 latami budowania skalowalnych platform webowych na React, Node.js i TypeScript, w tym około pięciu lat z klientami z UK i UE. Prowadzi rozwój funkcji, mentoruje inżynierów i wyciąga wydajność w FinTech, EdTech i B2B SaaS. Ostatnio pracuje spec-first z narzędziami AI i ocenia odpowiedzi LLM dla laboratoriów AI.",
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
        "SASS",
        "Vue / Vuex",
        "Apollo Client",
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
        "GraphQL",
        "PHP",
        "WebSockets",
        "Web Audio API",
        "REST API",
        "Authentication",
        "Laravel",
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
        "Monorepo",
        "ElasticSearch",
        "Grafana",
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
      company: "Alignerr, Outlier",
      location: "Remote",
      role: {
        ru: "AI-тренер и prompt-инженер (фриланс)",
        en: "Freelance AI Trainer & Prompt Engineer",
        pl: "AI Trainer i Prompt Engineer (freelance)",
      },
      period: { ru: "05.2026 — н. в.", en: "05.2026 — present", pl: "05.2026 — obecnie" },
      highlights: {
        ru: [
          "Обучение и разметка моделей на реальном коде: оценка и ранжирование ответов LLM на задачах генерации кода.",
          "Валидация кода, написанного моделью: где он работает, где ломается и почему проверка глазами разработчика всё ещё нужна.",
          "Выстроил процессы prompt engineering для технических задач оценки, подняв согласованность разметки в распределённой команде ревьюеров.",
        ],
        en: [
          "Training and annotating models on real code: evaluating and ranking LLM output on code-generation tasks.",
          "Validating model-written code — where it holds up, where it breaks, and why a developer's review is still the check that matters.",
          "Designed prompt engineering workflows for technical evaluation tasks, improving annotation consistency across a distributed reviewer team.",
        ],
        pl: [
          "Trenowanie i anotacja modeli na prawdziwym kodzie: ocena i ranking odpowiedzi LLM w zadaniach generowania kodu.",
          "Walidacja kodu napisanego przez model — gdzie się broni, gdzie się sypie i dlaczego przegląd programisty wciąż jest potrzebny.",
          "Zaprojektował procesy prompt engineeringu dla technicznych zadań oceny, podnosząc spójność adnotacji w rozproszonym zespole recenzentów.",
        ],
      },
      stack: ["LLM evaluation", "Prompt engineering", "JavaScript", "TypeScript", "React"],
    },
    {
      company: "Preply, freelance",
      location: "Remote",
      role: {
        ru: "Преподаватель JavaScript и React, фриланс-разработка",
        en: "JavaScript & React tutor, freelance development",
        pl: "Nauczyciel JavaScriptu i Reacta, rozwój freelance",
      },
      period: { ru: "03.2025 — н. в.", en: "03.2025 — present", pl: "03.2025 — obecnie" },
      highlights: {
        ru: [
          "350+ часов индивидуальных занятий по JavaScript и React — от основ до портфолио-проектов уровня найма.",
          "Как минимум четверо студентов вышли на работу в IT — в Израиле, Польше, на Кипре и в Канаде.",
          "Фриланс-проект об озеленении планеты: сведение данных о посадках деревьев из разных источников в открытую публикацию.",
        ],
        en: [
          "350+ hours of one-on-one JavaScript and React tutoring, taking students from fundamentals to job-ready portfolio projects.",
          "At least four students have since been hired in IT — in Israel, Poland, Cyprus and Canada.",
          "A freelance project on global reforestation: pulling tree-planting data from several sources into one openly published picture.",
        ],
        pl: [
          "350+ godzin indywidualnych zajęć z JavaScriptu i Reacta — od podstaw do projektów portfolio na poziomie zatrudnienia.",
          "Co najmniej czworo studentów znalazło pracę w IT — w Izraelu, Polsce, na Cyprze i w Kanadzie.",
          "Projekt freelance o zazielenianiu planety: zbieranie danych o nasadzeniach drzew z różnych źródeł w jedną otwartą publikację.",
        ],
      },
      stack: ["JavaScript", "TypeScript", "React", "Node.js", "Mentoring"],
    },
    {
      company: "Godel Technologies Europe",
      location: "Łódź, Poland — hybrid",
      role: {
        ru: "Senior Software Engineer",
        en: "Senior Software Engineer",
        pl: "Senior Software Engineer",
      },
      period: { ru: "04.2024 — н. в.", en: "04.2024 — present", pl: "04.2024 — obecnie" },
      highlights: {
        ru: [
          "Возглавил миграцию ключевого клиентского модуля на React + TypeScript: бандл меньше на 30%, Lighthouse performance вырос с 62 до 91.",
          "Сократил критические баги в проде на 40% через покрытие Jest/React Testing Library и более строгое код-ревью в команде из пяти человек.",
          "Наставлял двух мидл-инженеров — их онбординг стал короче на две недели.",
          "07.2023 — 12.2024, внутренний проект по зрелости разработки: комплексно разобрал около 30 проектов компании с командами и британскими заказчиками по собственному фреймворку оценки — где процесс проваливается и что чинить в первую очередь. Оценка удовлетворённости проектом выросла на 20%, около 70% рекомендаций команды закрывали в течение квартала.",
          "Довёл до продакшена два BFF/бэкенд-приложения по spec-driven development в команде из трёх человек, генерируя код из спецификаций через Claude Code, Windsurf и Codex — на 30–40% быстрее.",
        ],
        en: [
          "Led the migration of a core client-facing module to React + TypeScript: 30% smaller bundle, Lighthouse performance up from 62 to 91.",
          "Cut critical production bugs by 40% through Jest/React Testing Library coverage and a stricter review process across a team of five.",
          "Mentored two mid-level engineers, shortening their onboarding by two weeks.",
          "07.2023 — 12.2024, an internal engineering-maturity programme: reviewed around 30 company projects end to end with their teams and UK clients against an in-house assessment framework — where the process breaks and what to fix first. Project satisfaction scores rose by 20%, and teams closed about 70% of the recommendations within a quarter.",
          "Delivered two BFF/backend applications end to end with spec-driven development in a team of three, scaffolding from specs with Claude Code, Windsurf and Codex — 30–40% faster delivery.",
        ],
        pl: [
          "Poprowadził migrację kluczowego modułu klienckiego na React + TypeScript: bundle mniejszy o 30%, Lighthouse performance z 62 do 91.",
          "Zmniejszył liczbę krytycznych błędów produkcyjnych o 40% dzięki pokryciu Jest/React Testing Library i ostrzejszemu code review w pięcioosobowym zespole.",
          "Mentorował dwóch inżynierów mid — ich onboarding skrócił się o dwa tygodnie.",
          "07.2023 — 12.2024, wewnętrzny program dojrzałości inżynierskiej: kompleksowo przejrzał około 30 projektów firmy z zespołami i brytyjskimi klientami według własnego frameworku oceny — gdzie proces się sypie i co naprawić najpierw. Ocena zadowolenia z projektu wzrosła o 20%, zespoły zamykały około 70% rekomendacji w ciągu kwartału.",
          "Dostarczył end-to-end dwie aplikacje BFF/backend w podejściu spec-driven development w trzyosobowym zespole, generując kod ze specyfikacji przez Claude Code, Windsurf i Codex — o 30–40% szybciej.",
        ],
      },
      stack: ["React", "Next.js", "TypeScript", "Node.js", "Express", "Monorepo", "Jest", "Playwright"],
    },
    {
      company: "Godel Technologies Europe",
      location: "Minsk, Belarus → Łódź, Poland",
      role: {
        ru: "Software Engineer",
        en: "Software Engineer",
        pl: "Software Engineer",
      },
      period: { ru: "09.2021 — 04.2024", en: "09.2021 — 04.2024", pl: "09.2021 — 04.2024" },
      highlights: {
        ru: [
          "09.2021 — 09.2022, платформа слежения за судами: интерфейс вокруг 3D-модели судна с палубами, камерами и узлами, карта флота и приём телеметрии по UDP в TimescaleDB — непрерывный поток с 50+ судов одновременно.",
          "С 09.2022 — один из крупнейших британских сервисов сравнения цен: независимое сравнение финансовых продуктов и услуг.",
          "Довёл покрытие юнит- и интеграционными тестами до 100%.",
          "Вместе с DevOps перевёл все сервисы на GitLab.",
          "Внедрял редизайн интерфейса сразу в нескольких продуктах.",
          "Участвовал в крупном рефакторинге с переходом на новый фреймворк: производительность страниц выросла на 25% без потери функциональности.",
          "Участвовал в общекорпоративной работе над соблюдением стандартов кода и процессов на разных проектах.",
        ],
        en: [
          "09.2021 — 09.2022, a ship tracking platform: an interface built around a 3D model of the vessel with decks, cameras and nodes, a fleet map, and telemetry intake over UDP into TimescaleDB — a continuous feed from 50+ vessels at once.",
          "From 09.2022, one of the UK's largest price comparison websites — impartial comparison of financial products and services.",
          "Raised unit and integration test coverage to 100%.",
          "Migrated all services to GitLab together with DevOps.",
          "Shipped a UI redesign across several products.",
          "Took part in a major refactoring effort onto a new framework: 25% better page performance with no loss of functionality.",
          "Contributed to company-wide work on code and process compliance across projects.",
        ],
        pl: [
          "09.2021 — 09.2022, platforma śledzenia statków: interfejs wokół modelu 3D jednostki z pokładami, kamerami i węzłami, mapa floty i odbiór telemetrii przez UDP do TimescaleDB — ciągły strumień z 50+ statków naraz.",
          "Od 09.2022 jeden z największych brytyjskich serwisów porównywania cen — bezstronne porównanie produktów i usług finansowych.",
          "Podniósł pokrycie testami jednostkowymi i integracyjnymi do 100%.",
          "Razem z DevOps przeniósł wszystkie serwisy na GitLab.",
          "Wdrażał redesign interfejsu w kilku produktach naraz.",
          "Brał udział w dużym refaktorze z przejściem na nowy framework: wydajność stron wzrosła o 25% bez utraty funkcjonalności.",
          "Uczestniczył w firmowych pracach nad zgodnością kodu i procesów w różnych projektach.",
        ],
      },
      stack: [
        "React",
        "Redux",
        "TanStack Query",
        "TypeScript",
        "GraphQL",
        "Apollo Client",
        "Node.js",
        "TimescaleDB",
        "Monorepo",
        "Docker",
        "Jest",
        "Playwright",
      ],
    },
    {
      company: "AKDev Group",
      location: "Minsk, Belarus",
      role: {
        ru: "Full Stack Engineer (Vue, Laravel)",
        en: "Full Stack Engineer (Vue, Laravel)",
        pl: "Full Stack Engineer (Vue, Laravel)",
      },
      period: { ru: "02.2018 — 08.2021", en: "02.2018 — 08.2021", pl: "02.2018 — 08.2021" },
      highlights: {
        ru: [
          "Начал стажёром на платформе выставления счетов, затем работал part-time параллельно с университетом и вышел на полную занятость в 2021-м.",
          "RadioHeart (08.2018 — 02.2019): платформа интернет-радио с аптаймом 24/7. Сделал панель диджея на Web Audio API — две деки с микшированием, джинглы и реклама, микрофон с раздельной громкостью и возвратом эфира в наушники.",
          "CleverStart (03.2019 — 08.2019): обучение детей ментальной арифметике. Расширил генератор заданий для абакуса, переделал главную под конверсию (+20% регистраций на пробное занятие), помогал строить модуль олимпиад.",
          "Онлайн-школа (08.2019 — 08.2021): спроектировал и реализовал архитектуру модуля школы, встроил WYSIWYG-редактор с собственным меню и компонентами картинок и видео.",
          "Добавил встраивание YouTube и Vimeo с навигацией по таймкодам с исходных площадок.",
          "Перевёл проект с Webpack 2 на Webpack 4.",
        ],
        en: [
          "Started as an intern on an invoice-building platform, then worked part-time alongside university and moved to full time in 2021.",
          "RadioHeart (08.2018 — 02.2019): an internet radio platform with 24/7 uptime. Built the DJ console on the Web Audio API — two decks with crossfading, jingles and ads, a microphone with per-channel volume and a headphone return of the live mix.",
          "CleverStart (03.2019 — 08.2019): mental arithmetic for children. Extended the abacus task generator, rebuilt the landing page for conversion (+20% trial-lesson sign-ups) and helped build the olympiad module.",
          "Online school (08.2019 — 08.2021): designed and implemented the school module architecture and integrated a WYSIWYG editor with a custom menu and image/video components.",
          "Added YouTube and Vimeo embedding with navigation by timecodes from the original platforms.",
          "Upgraded the project from Webpack 2 to Webpack 4.",
        ],
        pl: [
          "Zaczynał jako stażysta przy platformie do wystawiania faktur, potem pracował na część etatu równolegle ze studiami, a w 2021 przeszedł na pełny etat.",
          "RadioHeart (08.2018 — 02.2019): platforma radia internetowego z uptime 24/7. Zbudował konsolę DJ-ską na Web Audio API — dwie decki z miksowaniem, jingle i reklamy, mikrofon z osobną głośnością i powrotem sygnału do słuchawek.",
          "CleverStart (03.2019 — 08.2019): arytmetyka mentalna dla dzieci. Rozbudował generator zadań na abakus, przebudował stronę główną pod konwersję (+20% zapisów na lekcję próbną) i pomagał budować moduł olimpiad.",
          "Szkoła online (08.2019 — 08.2021): zaprojektował i wdrożył architekturę modułu szkoły oraz osadził edytor WYSIWYG z własnym menu i komponentami obrazów i wideo.",
          "Dodał osadzanie YouTube i Vimeo z nawigacją po timecode'ach z oryginalnych platform.",
          "Przeniósł projekt z Webpacka 2 na Webpack 4.",
        ],
      },
      stack: [
        "Vue",
        "Vuex",
        "React",
        "Redux",
        "Laravel",
        "PHP",
        "Node.js",
        "Web Audio API",
        "MySQL",
        "PostgreSQL",
        "Docker",
        "SASS",
        "ElasticSearch",
        "Grafana",
      ],
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
      "12.2020 — 05.2021: полгода срочной службы в армии, работа в AKDev Group на это время прерывалась.",
      "Лето 2022: переезд из Минска в Лодзь внутри той же компании — первый год в Godel отработан ещё из Минска.",
      "Апрель 2024: повышение до Senior Software Engineer внутри Godel.",
    ],
    en: [
      "12.2020 — 05.2021: six months of mandatory military service; the AKDev Group work paused for that period.",
      "Summer 2022: relocation from Minsk to Łódź within the same company — the first year at Godel was worked from Minsk.",
      "April 2024: promoted to Senior Software Engineer within Godel.",
    ],
    pl: [
      "12.2020 — 05.2021: pół roku obowiązkowej służby wojskowej; praca w AKDev Group była wtedy przerwana.",
      "Lato 2022: przeprowadzka z Mińska do Łodzi w ramach tej samej firmy — pierwszy rok w Godel przepracowany jeszcze z Mińska.",
      "Kwiecień 2024: awans na Senior Software Engineer w Godel.",
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
