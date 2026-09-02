import type { Localized } from "@/i18n/config";

/**
 * Portfolio projects. One array feeds both the /projects pages and the system prompt,
 * so adding a project automatically widens what the chatbot knows.
 */

/**
 * Client work versus something built in-house or for myself. Recruiters read the
 * two differently, and a portfolio that blurs them invites the question anyway.
 */
export type ProjectKind = "commercial" | "internal";

export type Project = {
  slug: string;
  kind: ProjectKind;
  /**
   * Who the work was for. Left out when the contract does not allow naming them —
   * the page then says so rather than quietly showing nothing.
   */
  client?: Localized;
  title: Localized;
  tagline: Localized;
  /**
   * What the project had to solve, in a sentence or two. Separating it from the
   * description turns a wall of bullets into a story a reader can follow:
   * problem, then product, then what was mine.
   */
  challenge: Localized;
  /** The long description — goes into the prompt and is shown in full on the page. */
  description: Localized;
  role: Localized;
  period: Localized;
  stack: string[];
  highlights: Localized<string[]>;
  links: { label: string; href: string }[];
};

export const projects: Project[] = [
  {
    slug: "ai-portfolio",
    kind: "internal",

    challenge: {
      ru: "Рекрутёры и так задают по резюме один и тот же набор вопросов. Я хотел проверить, получится ли отдать их модели с условием, что она отвечает только по фактам из профиля и ничего не додумывает.",
      en: "Recruiters ask the same handful of questions about a CV anyway. I wanted to see whether a model could take them, on the condition that it answers only from the facts in the profile and fills in nothing.",
      pl: "Rekruterzy i tak zadają do CV ten sam zestaw pytań. Chciałem sprawdzić, czy da się oddać je modelowi pod warunkiem, że odpowiada tylko z faktów w profilu i niczego nie dopowiada.",
    },
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

    period: { ru: "2026", en: "2026", pl: "2026" },

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
    slug: "price-comparison-platform",
    kind: "commercial",

    challenge: {
      ru: "Несколько продуктовых сайтов живут в одном монорепозитории и делят общий код. Правку в общем месте сразу видят все продукты, поэтому проверять её приходится шире, чем один сайт. Вторая постоянная тема — скорость страниц: от неё зависят позиции в поиске и конверсия.",
      en: "Several product sites live in one monorepo and share the same code. A change in a shared place lands in all of them at once, so it has to be checked wider than a single site. The other constant is page speed: search ranking and conversion depend on it.",
      pl: "Kilka serwisów produktowych żyje w jednym monorepo i dzieli wspólny kod. Zmiana we wspólnym miejscu trafia od razu do wszystkich, więc trzeba ją sprawdzać szerzej niż jeden serwis. Drugi stały temat to szybkość stron: od niej zależą pozycje w wyszukiwarce i konwersja.",
    },
    title: {
      ru: "Платформа сравнения цен",
      en: "Price comparison platform",
      pl: "Platforma porównywania cen",
    },

    tagline: {
      ru: "Один из крупнейших британских сервисов сравнения финансовых продуктов",
      en: "One of the UK's largest comparison services for financial products",
      pl: "Jeden z największych brytyjskich serwisów porównywania produktów finansowych",
    },

    description: {
      ru: "Независимое сравнение финансовых продуктов и услуг для британского рынка: несколько продуктовых сайтов в одном монорепозитории на React и Next.js, между фронтом и внутренними сервисами — слой на Node и Express. Работаю здесь с сентября 2022-го: сначала инженером, с апреля 2024-го — senior'ом. Доставка фич, производительность, тесты и код-ревью в команде.",
      en: "Impartial comparison of financial products and services for the UK market: several product sites in one monorepo on React and Next.js, with a Node and Express layer between the front end and internal services. I have been on it since September 2022 — first as an engineer, since April 2024 as a senior. Feature delivery, performance, tests and code review across the team.",
      pl: "Bezstronne porównanie produktów i usług finansowych dla rynku brytyjskiego: kilka serwisów produktowych w jednym monorepo na React i Next.js, między frontem a usługami wewnętrznymi warstwa na Node i Express. Pracuję tu od września 2022 — najpierw jako inżynier, od kwietnia 2024 jako senior. Dostarczanie funkcji, wydajność, testy i code review w zespole.",
    },

    role: {
      ru: "Full-stack инженер, с 2024 — Senior",
      en: "Full-stack engineer, senior since 2024",
      pl: "Full-stack engineer, od 2024 senior",
    },

    period: {
      ru: "09.2022 — н. в., Godel Technologies Europe",
      en: "09.2022 — present, Godel Technologies Europe",
      pl: "09.2022 — obecnie, Godel Technologies Europe",
    },

    stack: [
      "React",
      "Redux",
      "Next.js",
      "TypeScript",
      "Monorepo",
      "Node.js",
      "Express",
      "Jest",
      "Playwright",
      "Puppeteer",
      "Docker",
      "GitLab CI",
      "GoCD",
      "Claude Code",
      "Windsurf",
      "Codex",
    ],

    highlights: {
      ru: [
        "Возглавил миграцию ключевого клиентского модуля на React + TypeScript: бандл меньше на 30%, Lighthouse performance вырос с 62 до 91.",
        "Довёл покрытие юнит- и интеграционными тестами до 100%.",
        "Автоматизация браузера в проде: сквозные сценарии на Playwright и Puppeteer поверх нескольких продуктовых сайтов сразу.",
        "Сделал пересъёмку скриншотов на падении: когда тест валится в пайплайне, снимки нужного состояния делаются прямо во время прогона, и разбирать падение можно по ним, а не воспроизводить его руками.",
        "Крупный рефакторинг с переходом на новый фреймворк: производительность страниц выросла на 25% без потери функциональности.",
        "Сократил критические баги в проде на 40% через покрытие Jest/React Testing Library и более строгое код-ревью.",
        "Вместе с DevOps перевёл все сервисы на GitLab, внедрял редизайн интерфейса сразу в нескольких продуктах.",
        "Довёл до продакшена два BFF/бэкенд-приложения по spec-driven development, генерируя код из спецификаций через Claude Code, Windsurf и Codex — на 30–40% быстрее.",
      ],
      en: [
        "Led the migration of a core client-facing module to React + TypeScript: 30% smaller bundle, Lighthouse performance up from 62 to 91.",
        "Raised unit and integration test coverage to 100%.",
        "Browser automation in production: end-to-end scenarios on Playwright and Puppeteer running across several product sites at once.",
        "Built screenshot capture on failure: when a test breaks in the pipeline, the shots of the state that mattered are taken during the run, so a failure is read from them instead of being reproduced by hand.",
        "Took part in a major refactoring onto a new framework: 25% better page performance with no loss of functionality.",
        "Cut critical production bugs by 40% through Jest/React Testing Library coverage and stricter code review.",
        "Migrated all services to GitLab with DevOps, and shipped a UI redesign across several products.",
        "Delivered two BFF/backend applications with spec-driven development, scaffolding from specs with Claude Code, Windsurf and Codex — 30–40% faster.",
      ],
      pl: [
        "Poprowadził migrację kluczowego modułu klienckiego na React + TypeScript: bundle mniejszy o 30%, Lighthouse performance z 62 do 91.",
        "Podniósł pokrycie testami jednostkowymi i integracyjnymi do 100%.",
        "Automatyzacja przeglądarki na produkcji: scenariusze end-to-end na Playwright i Puppeteer działające naraz na kilku serwisach produktowych.",
        "Zrobił automatyczne zrzuty ekranu przy awarii: kiedy test pada w pipelinie, zdjęcia istotnego stanu powstają w trakcie przebiegu, więc awarię czyta się z nich, zamiast odtwarzać ją ręcznie.",
        "Duży refaktor z przejściem na nowy framework: wydajność stron wzrosła o 25% bez utraty funkcjonalności.",
        "Zmniejszył liczbę krytycznych błędów produkcyjnych o 40% dzięki pokryciu Jest/React Testing Library i ostrzejszemu code review.",
        "Razem z DevOps przeniósł wszystkie serwisy na GitLab i wdrożył redesign interfejsu w kilku produktach.",
        "Dostarczył dwie aplikacje BFF/backend w podejściu spec-driven development, generując kod ze specyfikacji przez Claude Code, Windsurf i Codex — o 30–40% szybciej.",
      ],
    },

    links: [],
  },
  {
    slug: "ship-tracking-platform",
    kind: "commercial",

    challenge: {
      ru: "Судно шлёт телеметрию непрерывно, по UDP, без подтверждений и без запросов с нашей стороны. Этот поток нужно принять, сохранить и показать оператору так, чтобы он видел состояние конкретного узла на конкретной палубе.",
      en: "A vessel sends telemetry continuously over UDP, with no acknowledgements and nothing for the client to request. That stream has to be taken in, stored, and shown to an operator so they can see the state of a particular node on a particular deck.",
      pl: "Statek wysyła telemetrię bez przerwy, przez UDP, bez potwierdzeń i bez zapytań z naszej strony. Ten strumień trzeba przyjąć, zapisać i pokazać operatorowi tak, żeby widział stan konkretnego węzła na konkretnym pokładzie.",
    },
    title: {
      ru: "Платформа слежения за судами",
      en: "Ship tracking platform",
      pl: "Platforma śledzenia statków",
    },

    tagline: {
      ru: "Данные с судна в реальном времени поверх 3D-модели: палубы, камеры, узлы",
      en: "Live vessel data on a 3D model: decks, cameras and nodes",
      pl: "Dane ze statku w czasie rzeczywistym na modelu 3D: pokłady, kamery, węzły",
    },

    description: {
      ru: "Система мониторинга флота в реальном времени. Телеметрия идёт с судна по UDP: бэкенд на Node парсит поток и складывает в TimescaleDB, фронт забирает данные через GraphQL и Apollo Client. Интерфейс строится вокруг 3D-модели судна, собранной из моделей заказчика: переключение по палубам, камеры и узлы на своих местах, показания по всем доступным датчикам. Отдельно — карта со всеми судами и дашборд с состоянием каждого.",
      en: "A real-time fleet monitoring system. Telemetry leaves the vessel over UDP: a Node backend parses the stream into TimescaleDB, and the front end reads it through GraphQL and Apollo Client. The interface is built around a 3D model of the ship assembled from the client's own models — switching between decks, cameras and nodes where they physically sit, readings from every available sensor. Alongside it, a map of the whole fleet and a dashboard for each vessel.",
      pl: "System monitoringu floty w czasie rzeczywistym. Telemetria idzie ze statku przez UDP: backend na Node parsuje strumień do TimescaleDB, a front pobiera dane przez GraphQL i Apollo Client. Interfejs zbudowany wokół modelu 3D statku złożonego z modeli klienta: przełączanie po pokładach, kamery i węzły na swoich miejscach, odczyty ze wszystkich dostępnych czujników. Obok mapa całej floty i dashboard każdej jednostki.",
    },

    role: {
      ru: "Инженер: 3D-интерфейс, дашборд, GraphQL-слой и приём телеметрии",
      en: "Engineer: 3D interface, dashboard, the GraphQL layer and telemetry intake",
      pl: "Inżynier: interfejs 3D, dashboard, warstwa GraphQL i odbiór telemetrii",
    },

    period: {
      ru: "09.2021 — 09.2022, Godel Technologies Europe",
      en: "09.2021 — 09.2022, Godel Technologies Europe",
      pl: "09.2021 — 09.2022, Godel Technologies Europe",
    },

    stack: [
      "React",
      "Redux",
      "TanStack Query",
      "GraphQL",
      "Apollo Client",
      "TypeScript",
      "Node.js",
      "TimescaleDB",
      "UDP",
      "Docker",
      "Jest",
      "Playwright",
      "GitHub Actions",
    ],

    highlights: {
      ru: [
        "3D-модель судна как основной интерфейс: переключение по палубам, камеры на тех палубах, где они есть, показания по всем доступным узлам.",
        "Приём телеметрии по UDP: бэкенд парсит поток и пишет в TimescaleDB, во фронт данные отдаются по GraphQL, а не по запросу на каждую датаграмму.",
        "Непрерывный поток с 50+ судов одновременно, позиции всех судов на общей карте.",
        "Просмотр видео с судовых камер прямо из модели и дашборд с состоянием конкретного судна.",
        "Apollo Client с нормализованным кэшем: поверх постоянно идущих обновлений интерфейс не перерисовывался целиком.",
      ],
      en: [
        "The 3D model of the ship as the primary interface: switching between decks, cameras on the decks that have them, readings from every available node.",
        "Telemetry over UDP: the backend parses the stream into TimescaleDB and serves the front end over GraphQL, rather than a request per datagram.",
        "A continuous feed from 50+ vessels at once, with every ship's position on a shared map.",
        "Video from the onboard cameras viewed straight from the model, plus a dashboard for an individual vessel.",
        "Apollo Client with a normalised cache, so a constant stream of updates did not repaint the whole interface.",
      ],
      pl: [
        "Model 3D statku jako główny interfejs: przełączanie po pokładach, kamery tam, gdzie są zainstalowane, odczyty ze wszystkich dostępnych węzłów.",
        "Telemetria po UDP: backend parsuje strumień do TimescaleDB i oddaje frontowi przez GraphQL, a nie zapytaniem na każdy datagram.",
        "Ciągły strumień z 50+ statków naraz, pozycje wszystkich jednostek na wspólnej mapie.",
        "Podgląd wideo z kamer pokładowych prosto z modelu i dashboard konkretnego statku.",
        "Apollo Client ze znormalizowanym cache — przy stale napływających aktualizacjach interfejs nie przerysowywał się w całości.",
      ],
    },

    links: [],
  },
  {
    slug: "online-school",
    kind: "commercial",

    challenge: {
      ru: "Контент на платформе ведёт заказчик, а не разработчики. Ему нужен редактор, в котором урок с видео, картинками и таймкодами собирается руками, и при этом результат остаётся в вёрстке платных разделов.",
      en: "The client runs the content on the platform, not the developers. They needed an editor where a lesson with video, images and timecodes is put together by hand, and where the result still fits the layout of the paid sections.",
      pl: "Treści na platformie prowadzi klient, nie programiści. Potrzebowali edytora, w którym lekcję z wideo, obrazami i timecode'ami składa się ręcznie, a wynik nadal mieści się w layoucie płatnych sekcji.",
    },
    title: {
      ru: "Онлайн-школа",
      en: "Online school",
      pl: "Szkoła online",
    },

    tagline: {
      ru: "Платформа обучения с бесплатными и платными разделами, которые заказчик редактирует сам",
      en: "A learning platform with free and paid sections the client edits itself",
      pl: "Platforma edukacyjna z darmowymi i płatnymi sekcjami, które klient edytuje sam",
    },

    description: {
      ru: "Обучающая платформа, где контент ведёт сам заказчик: бесплатные и платные разделы, видеоуроки с таймкодами, домашние задания и переписка учителя с учениками. Я спроектировал архитектуру школьного модуля и отвечал за него целиком — от плеера с таймкодами до админки для учителей. Отдельная часть работы — редактор контента: WYSIWYG с собственным UI, компонентами картинок и видео и встраиванием YouTube и Vimeo с навигацией по таймкодам исходных площадок.",
      en: "A learning platform where the client owns the content: free and paid sections, video lessons with timecodes, homework, and teacher-to-student messaging. I designed the architecture of the school module and owned it end to end — from the player with timecodes to the teachers' admin panel. A separate strand was the content editor: a WYSIWYG with a custom UI, image and video components, and YouTube and Vimeo embedding that navigates by the timecodes of the original platforms.",
      pl: "Platforma edukacyjna, na której treści prowadzi sam klient: sekcje darmowe i płatne, lekcje wideo z timecode'ami, prace domowe i korespondencja nauczyciela z uczniami. Zaprojektowałem architekturę modułu szkoły i odpowiadałem za niego w całości — od odtwarzacza z timecode'ami po panel administracyjny dla nauczycieli. Osobny wątek to edytor treści: WYSIWYG z własnym UI, komponentami obrazów i wideo oraz osadzaniem YouTube i Vimeo z nawigacją po timecode'ach oryginalnych platform.",
    },

    role: {
      ru: "Full-stack инженер, владелец школьного модуля",
      en: "Full-stack engineer, owner of the school module",
      pl: "Full-stack engineer, właściciel modułu szkoły",
    },

    period: {
      ru: "08.2019 — 08.2021, AKDev Group",
      en: "08.2019 — 08.2021, AKDev Group",
      pl: "08.2019 — 08.2021, AKDev Group",
    },

    stack: [
      "TypeScript",
      "Vue",
      "Vuex",
      "Laravel",
      "PHP",
      "MySQL",
      "ElasticSearch",
      "Grafana",
      "SASS",
      "Docker",
      "Jest",
      "GitHub Actions",
    ],

    highlights: {
      ru: [
        "Спроектировал и реализовал архитектуру модуля школы: видеоуроки с таймкодами, домашние задания, прогресс ученика.",
        "Встроил WYSIWYG-редактор с собственным меню и компонентами картинок и видео, добавил встраивание YouTube и Vimeo с навигацией по таймкодам исходных площадок.",
        "Отвечал за весь школьный модуль: админка для учителей и переписка с учениками.",
        "Перевёл проект с Webpack 2 на Webpack 4.",
        "Поиск по урокам и материалам на ElasticSearch, метрики модуля в Grafana.",
      ],
      en: [
        "Designed and built the architecture of the school module: video lessons with timecodes, homework, student progress.",
        "Integrated a WYSIWYG editor with a custom menu and image and video components, and added YouTube and Vimeo embedding that navigates by the timecodes of the original platforms.",
        "Owned the whole school module: the teachers' admin panel and messaging with students.",
        "Upgraded the project from Webpack 2 to Webpack 4.",
        "Search across lessons and materials on ElasticSearch, module metrics in Grafana.",
      ],
      pl: [
        "Zaprojektował i wdrożył architekturę modułu szkoły: lekcje wideo z timecode'ami, prace domowe, postępy ucznia.",
        "Osadził edytor WYSIWYG z własnym menu i komponentami obrazów i wideo, dodał osadzanie YouTube i Vimeo z nawigacją po timecode'ach oryginalnych platform.",
        "Odpowiadał za cały moduł szkoły: panel administracyjny dla nauczycieli i korespondencję z uczniami.",
        "Przeniósł projekt z Webpacka 2 na Webpack 4.",
        "Wyszukiwanie lekcji i materiałów na ElasticSearch, metryki modułu w Grafanie.",
      ],
    },

    links: [],
  },
  {
    slug: "cleverstart",
    kind: "commercial",

    client: { ru: "AKDev Group", en: "AKDev Group", pl: "AKDev Group" },

    challenge: {
      ru: "Дети занимаются сериями: одна задача за другой, без пауз на загрузку между ними. Отдельно стояла коммерческая задача — с главной страницы приходило мало записей на пробное занятие.",
      en: "Children work in runs: one task after another, with no pause to load in between. Separately there was a commercial problem — the landing page brought in few trial-lesson sign-ups.",
      pl: "Dzieci ćwiczą seriami: zadanie po zadaniu, bez przerw na ładowanie pomiędzy nimi. Osobno stał problem biznesowy — strona główna przynosiła mało zapisów na lekcję próbną.",
    },
    title: {
      ru: "CleverStart",
      en: "CleverStart",
      pl: "CleverStart",
    },

    tagline: {
      ru: "Платформа обучения детей ментальной арифметике",
      en: "A platform for teaching children mental arithmetic",
      pl: "Platforma do nauki arytmetyki mentalnej dla dzieci",
    },

    description: {
      ru: "Обучение ментальной арифметике: виртуальные счёты-абакус, генератор заданий, домашние работы, соревнования и олимпиады между учениками. Моя часть — интерфейс: настройки генератора заданий и то, как сами задачи показываются ученику на абакусе. Плюс переделанная под конверсию главная страница и помощь с модулем олимпиад.",
      en: "Teaching mental arithmetic: a virtual abacus, a task generator, homework, contests and olympiads between students. My part was the UI: the settings of the task generator, and how the tasks themselves are presented to a student on the abacus. Plus the landing page rebuilt for conversion and help with the olympiad module.",
      pl: "Nauka arytmetyki mentalnej: wirtualne liczydło abakus, generator zadań, prace domowe, zawody i olimpiady między uczniami. Moja część to interfejs: ustawienia generatora zadań i to, jak same zadania pokazują się uczniowi na abakusie. Do tego przebudowana pod konwersję strona główna i pomoc przy module olimpiad.",
    },

    role: {
      ru: "Фронтенд-инженер: интерфейс генератора заданий и самих задач",
      en: "Frontend engineer: the UI of the task generator and of the tasks themselves",
      pl: "Frontend engineer: interfejs generatora zadań i samych zadań",
    },

    period: {
      ru: "03.2019 — 08.2019, AKDev Group",
      en: "03.2019 — 08.2019, AKDev Group",
      pl: "03.2019 — 08.2019, AKDev Group",
    },

    stack: [
      "TypeScript",
      "React",
      "Redux",
      "Node.js",
      "Express",
      "PostgreSQL",
      "SASS",
      "Docker",
      "Jest",
    ],

    highlights: {
      ru: [
        "Интерфейс генератора заданий: выбор типа упражнения и настройки сложности под возраст группы.",
        "Отображение самих задач на абакусе — ученик решает их подряд, без перезагрузки страницы между задачами.",
        "Переделал главную страницу под конверсию — регистраций на пробное занятие стало больше примерно на 20%.",
        "Помогал строить модуль олимпиад: регистрация, проведение в реальном времени и таблица результатов.",
      ],
      en: [
        "The UI of the task generator: choosing an exercise type and tuning difficulty to the age group.",
        "The presentation of the tasks themselves on the abacus — a student works through them in a run, with no page reload in between.",
        "Rebuilt the landing page for conversion — sign-ups for a trial lesson went up by roughly 20%.",
        "Helped build the olympiad module: registration, running an event live, and a results table.",
      ],
      pl: [
        "Interfejs generatora zadań: wybór typu ćwiczenia i ustawienia trudności pod wiek grupy.",
        "Prezentacja samych zadań na abakusie — uczeń rozwiązuje je seriami, bez przeładowania strony pomiędzy nimi.",
        "Przebudował stronę główną pod konwersję — zapisów na lekcję próbną przybyło o około 20%.",
        "Pomagał budować moduł olimpiad: rejestracja, przebieg na żywo i tabela wyników.",
      ],
    },

    links: [],
  },
  {
    slug: "radioheart",
    kind: "commercial",

    client: { ru: "AKDev Group", en: "AKDev Group", pl: "AKDev Group" },

    challenge: {
      ru: "Радио играет по расписанию само, но ведущему иногда нужно выйти в эфир вживую, поверх идущего потока. Для этого нужен пульт в браузере: свести два трека, поставить рекламу, включить микрофон и услышать, что получилось, до того как это уйдёт слушателям.",
      en: "The radio runs on a schedule by itself, but a host sometimes needs to go live on top of the stream already playing. That needs a mixing desk in the browser: crossfade two tracks, drop in an ad, open the microphone, and hear how it came out before it reaches the listeners.",
      pl: "Radio gra według harmonogramu samo, ale prowadzący czasem musi wejść na żywo, na już lecący strumień. Do tego potrzebny jest pulpit w przeglądarce: zmiksować dwa utwory, wstawić reklamę, włączyć mikrofon i usłyszeć, co wyszło, zanim trafi do słuchaczy.",
    },
    title: {
      ru: "RadioHeart",
      en: "RadioHeart",
      pl: "RadioHeart",
    },

    tagline: {
      ru: "Интернет-радио, которое играет по расписанию без ведущего",
      en: "Internet radio that plays to a schedule with nobody at the desk",
      pl: "Radio internetowe grające według harmonogramu bez prowadzącego",
    },

    description: {
      ru: "Платформа интернет-радио: пользователь составляет вещание на дни или недели вперёд, и эфир идёт сам, без его участия. Моей частью была панель диджея — режим, в котором можно выйти в свой поток вживую. Всё сведение работает на Web Audio API: две деки с песнями и микшированием между ними, джинглы и реклама, микрофон ведущего и возврат эфира в наушники, чтобы услышать результат до того, как он уйдёт в лайв.",
      en: "An internet radio platform: a user schedules broadcasting days or weeks ahead and the stream runs on its own. My part was the DJ console — the mode where you go live into your own stream. The mixing runs on the Web Audio API: two decks with crossfading between them, jingles and ads, the host's microphone, and the stream fed back into the headphones so the host hears the result before it goes out live.",
      pl: "Platforma radia internetowego: użytkownik układa ramówkę na dni lub tygodnie do przodu, a eter idzie sam, bez jego udziału. Moją częścią była konsola DJ-ska — tryb, w którym można wejść na żywo do własnego strumienia. Miksowanie działa na Web Audio API: dwie decki z przechodzeniem między nimi, jingle i reklamy, mikrofon prowadzącego i powrót sygnału do słuchawek, żeby usłyszeć efekt zanim pójdzie na antenę.",
    },

    role: {
      ru: "Фронтенд-инженер: панель диджея",
      en: "Frontend engineer: the DJ console",
      pl: "Frontend engineer: konsola DJ-ska",
    },

    period: {
      ru: "08.2018 — 02.2019, AKDev Group",
      en: "08.2018 — 02.2019, AKDev Group",
      pl: "08.2018 — 02.2019, AKDev Group",
    },

    stack: [
      "TypeScript",
      "Vue",
      "Vuex",
      "Node.js",
      "Express",
      "PHP",
      "Laravel",
      "MySQL",
      "Web Audio API",
      "SASS",
      "Docker",
      "Jest",
    ],

    highlights: {
      ru: [
        "Панель диджея на Web Audio API: две деки с треками и микшированием между ними, джинглы и рекламные вставки поверх эфира.",
        "Микрофон ведущего с раздельной громкостью по каналам и возвратом в наушники — эфир слышно до того, как он уйдёт в лайв.",
        "Тёмная тема панели: за пультом сидят вечером и ночью.",
        "Участвовал в биллинге и суточном пробном режиме до покупки подписки.",
      ],
      en: [
        "The DJ console on the Web Audio API: two decks with tracks and crossfading between them, jingles and ad breaks over the live stream.",
        "The host's microphone with per-channel volume and a headphone return — you hear the mix before it goes out live.",
        "A dark theme for the console: people sit at that desk in the evening and at night.",
        "Contributed to billing and the 24-hour trial before buying a subscription.",
      ],
      pl: [
        "Konsola DJ-ska na Web Audio API: dwie decki z utworami i przejściami między nimi, jingle i bloki reklamowe na żywym sygnale.",
        "Mikrofon prowadzącego z osobną głośnością kanałów i powrotem do słuchawek — miks słychać, zanim pójdzie na antenę.",
        "Ciemny motyw konsoli: przy tym pulpicie siedzi się wieczorem i w nocy.",
        "Brał udział w billingu i dobowym trybie próbnym przed wykupieniem subskrypcji.",
      ],
    },

    links: [],
  },
];
