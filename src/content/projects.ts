import type { Localized } from "@/i18n/config";

/**
 * Portfolio projects. One array feeds both the /projects pages and the system prompt,
 * so adding a project automatically widens what the chatbot knows.
 */

export type Project = {
  slug: string;
  title: Localized;
  tagline: Localized;
  /** The long description — goes into the prompt and is shown in full on the page. */
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
      ru: "Портфолио, построенное как чат: рекрутер задаёт вопрос обо мне и получает ответ, собранный моделью строго по базе знаний. Next.js на фронте, тонкий прокси с ключом Anthropic на бэкенде, стриминг ответа через NDJSON.",
      en: "A portfolio built as a chat: a recruiter asks a question and gets an answer composed by the model strictly from the knowledge base. Next.js on the front, a thin proxy holding the Anthropic key on the back, response streamed over NDJSON.",
      pl: "Portfolio zbudowane jako czat: rekruter zadaje pytanie i dostaje odpowiedź złożoną przez model wyłącznie z bazy wiedzy. Next.js na froncie, cienkie proxy z kluczem Anthropic na backendzie, odpowiedź streamowana przez NDJSON.",
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
  {
    slug: "ship-telemetry-dashboard",

    title: {
      ru: "Дашборд телеметрии судов",
      en: "Ship telemetry dashboard",
      pl: "Dashboard telemetrii statków",
    },

    tagline: {
      ru: "Данные с судна в реальном времени поверх 3D-модели: палубы, камеры, узлы, геозоны",
      en: "Live vessel data on a 3D model: decks, cameras, nodes and geofences",
      pl: "Dane ze statku na żywo na modelu 3D: pokłady, kamery, węzły i geostrefy",
    },

    description: {
      ru: "Система мониторинга судов в реальном времени. Телеметрия идёт с судна напрямую по UDP: бэкенд на Express парсит поток и складывает в TimescaleDB, а во фронт отдаёт по WebSocket — пакетами, по мере заполнения входящего буфера, а не на каждую датаграмму. React-интерфейс рисует данные поверх 3D-модели судна: переключение по палубам, камеры там, где они установлены, и показания по всем доступным узлам — угол руля, скорость, обороты лопастей и остальное. Ежедневный инструмент операционных команд, 50+ судов.",
      en: "A real-time vessel monitoring system. Telemetry arrives straight from the ship over UDP: an Express backend parses the stream into TimescaleDB and pushes it to the front over WebSockets in batches, as the incoming buffer fills rather than per datagram. A React interface draws it on a 3D ship model — switch between decks, open cameras on the decks that have them, and watch every available node: rudder angle, speed, propeller RPM and the rest. Used daily by operations teams across 50+ vessels.",
      pl: "System monitoringu statków w czasie rzeczywistym. Telemetria idzie prosto ze statku po UDP: backend na Express parsuje strumień do TimescaleDB i wypycha go na front po WebSocketach paczkami, w miarę zapełniania bufora wejściowego, a nie na każdy datagram. Interfejs w React rysuje dane na modelu 3D statku: przełączanie pokładów, kamery tam, gdzie są zainstalowane, i odczyty ze wszystkich dostępnych węzłów — kąt steru, prędkość, obroty śruby i reszta. Codzienne narzędzie zespołów operacyjnych, 50+ jednostek.",
    },

    role: {
      ru: "Фулстек: приём и хранение потока на бэкенде, интерфейс реального времени на фронте",
      en: "Full-stack: ingestion and storage on the back end, the real-time interface on the front",
      pl: "Full-stack: odbiór i zapis strumienia na backendzie, interfejs czasu rzeczywistego na froncie",
    },

    period: "2024 — present, Godel Technologies Europe",

    stack: ["React", "Node.js", "Express", "TimescaleDB", "WebSockets", "UDP"],

    highlights: {
      ru: [
        "Приём телеметрии по UDP: бэкенд парсит поток и пишет в TimescaleDB, во фронт отдаёт по WebSocket пакетами — по заполнению входящего буфера, а не на каждую датаграмму.",
        "3D-модель судна как основной интерфейс: переключение по палубам, камеры на тех палубах, где они есть, показания по всем доступным узлам.",
        "SMS-уведомления при заходе судна в зоны, выделенные на карте.",
        "Выкатывали через фича-флаги, с мониторингом, логированием и отработанным откатом.",
      ],
      en: [
        "UDP telemetry ingestion: the backend parses the stream into TimescaleDB and pushes to the front over WebSockets in batches — as the incoming buffer fills, not per datagram.",
        "The 3D ship model as the primary interface: deck switching, cameras on the decks that have them, readings from every available node.",
        "SMS alerts when a vessel enters a zone marked out on the map.",
        "Rolled out behind feature flags, with monitoring, logging and a rehearsed rollback path.",
      ],
      pl: [
        "Odbiór telemetrii po UDP: backend parsuje strumień do TimescaleDB i wypycha na front po WebSocketach paczkami — w miarę zapełniania bufora, a nie na każdy datagram.",
        "Model 3D statku jako główny interfejs: przełączanie pokładów, kamery na pokładach, które je mają, odczyty ze wszystkich dostępnych węzłów.",
        "Powiadomienia SMS przy wejściu jednostki w strefy zaznaczone na mapie.",
        "Wdrożenie przez feature flagi, z monitoringiem, logowaniem i przećwiczonym rollbackiem.",
      ],
    },

    links: [],
  },
  {
    slug: "price-comparison-platform",

    title: {
      ru: "Платформа сравнения цен",
      en: "Price comparison platform",
      pl: "Platforma porównywania cen",
    },

    tagline: {
      ru: "Один из крупнейших британских сервисов сравнения финансовых продуктов",
      en: "One of the UK's largest comparison services for financial products",
      pl: "Jeden z największych brytyjskich serwisów porównujących produkty finansowe",
    },

    description: {
      ru: "Британский сервис независимого сравнения финансовых продуктов и услуг. Фронтенд на React и Redux в монорепозитории, серверный рендеринг на Express. За два года: редизайн интерфейса сразу в нескольких продуктах, переход на новый фреймворк, покрытие тестами с нуля до 100% и переезд всех сервисов на GitLab вместе с DevOps.",
      en: "A British service for impartial comparison of financial products and services. React and Redux front end in a monorepo, server-side rendering on Express. Over two years: a UI redesign across several products, a move to a new framework, test coverage taken to 100%, and a migration of every service to GitLab alongside DevOps.",
      pl: "Brytyjski serwis bezstronnego porównywania produktów i usług finansowych. Frontend w React i Redux w monorepo, renderowanie po stronie serwera na Express. Przez dwa lata: redesign interfejsu w kilku produktach, przejście na nowy framework, pokrycie testami do 100% i migracja wszystkich serwisów na GitLab razem z DevOps.",
    },

    role: {
      ru: "Разработка фронтенда и SSR-слоя в продуктовой команде",
      en: "Front-end and SSR work inside the product team",
      pl: "Frontend i warstwa SSR w zespole produktowym",
    },

    period: "2022 — 2024, Godel Technologies Europe",

    stack: [
      "React",
      "Redux",
      "TypeScript",
      "Express",
      "SSR",
      "Monorepo",
      "Docker",
      "SASS",
      "Jest",
      "Playwright",
      "GitLab CI",
    ],

    highlights: {
      ru: [
        "Довёл покрытие юнит- и интеграционными тестами до 100%.",
        "Крупный рефакторинг с переходом на новый фреймворк: +25% к производительности страниц без потери функциональности.",
        "Редизайн интерфейса, выкаченный сразу в нескольких продуктах.",
        "Вместе с DevOps перевёл все сервисы на GitLab.",
      ],
      en: [
        "Took unit and integration test coverage to 100%.",
        "A major refactor onto a new framework: 25% better page performance with no loss of functionality.",
        "A UI redesign rolled out across several products at once.",
        "Migrated every service to GitLab together with DevOps.",
      ],
      pl: [
        "Podniósł pokrycie testami jednostkowymi i integracyjnymi do 100%.",
        "Duży refaktor z przejściem na nowy framework: +25% wydajności stron bez utraty funkcjonalności.",
        "Redesign interfejsu wdrożony w kilku produktach naraz.",
        "Razem z DevOps przeniósł wszystkie serwisy na GitLab.",
      ],
    },

    links: [],
  },
  {
    slug: "radio-dj-console",

    title: {
      ru: "DJ-консоль для онлайн-радио",
      en: "DJ console for online radio",
      pl: "Konsola DJ dla radia online",
    },

    tagline: {
      ru: "Живое сведение эфира прямо в браузере: треки, реклама и голос ведущего",
      en: "Live broadcast mixing in the browser: tracks, ads and the host's voice",
      pl: "Miksowanie audycji na żywo w przeglądarce: utwory, reklamy i głos prowadzącego",
    },

    description: {
      ru: "Платформа с аптаймом 24/7, на которой клиенты заводят собственное онлайн- или офлайн-радио. Моя часть — DJ-консоль: ведущий сводит эфир прямо в браузере, управляя треками, рекламными вставками и собственным микрофоном в реальном времени. Всё микширование на Web Audio API: раздельная громкость по каналам и мониторинг в наушниках отдельно от того, что уходит в эфир.",
      en: "A platform with 24/7 uptime where customers run their own online or offline radio. My part was the DJ console: the host mixes the broadcast straight in the browser, driving tracks, ad inserts and their own microphone in real time. All mixing runs on the Web Audio API — per-channel volume and headphone monitoring separate from what goes out on air.",
      pl: "Platforma z uptime 24/7, na której klienci prowadzą własne radio online lub offline. Moja część to konsola DJ: prowadzący miksuje audycję prosto w przeglądarce, sterując utworami, wstawkami reklamowymi i własnym mikrofonem w czasie rzeczywistym. Całe miksowanie na Web Audio API — osobna głośność kanałów i odsłuch w słuchawkach niezależny od tego, co idzie na antenę.",
    },

    role: {
      ru: "Фулстек: консоль на Vue и бэкенд на Laravel",
      en: "Full-stack: the console on Vue, the backend on Laravel",
      pl: "Full-stack: konsola na Vue, backend na Laravel",
    },

    period: "2018 — 2020, AKDev Group",

    stack: ["Vue", "Vuex", "Laravel", "Web Audio API", "MySQL", "Docker", "SASS"],

    highlights: {
      ru: [
        "Сведение в реальном времени: треки, реклама и микрофон ведущего с раздельной регулировкой громкости.",
        "Мониторинг в наушниках отдельно от эфирного микса.",
        "Тёмная тема консоли.",
        "Платформа держала аптайм 24/7.",
      ],
      en: [
        "Real-time mixing: tracks, ads and the host's microphone, each with its own volume control.",
        "Headphone monitoring kept separate from the on-air mix.",
        "A dark theme for the console.",
        "The platform held 24/7 uptime.",
      ],
      pl: [
        "Miksowanie w czasie rzeczywistym: utwory, reklamy i mikrofon prowadzącego, każde z własną regulacją głośności.",
        "Odsłuch w słuchawkach oddzielony od miksu antenowego.",
        "Ciemny motyw konsoli.",
        "Platforma utrzymywała uptime 24/7.",
      ],
    },

    links: [],
  },
];
