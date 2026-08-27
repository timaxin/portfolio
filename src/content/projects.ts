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

    period: "2018 — 2021, AKDev Group",

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
];
