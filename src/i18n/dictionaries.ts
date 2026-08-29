import type { Locale } from "./config";

/** UI strings. Copy about the candidate lives in src/content; this is just the shell. */
export type Dictionary = {
  nav: { chat: string; projects: string; stack: string };
  chat: {
    intro: string;
    placeholder: string;
    send: string;
    stop: string;
    disclaimer: string;
  };
  /** Errors: some come back from the server, some are raised in the browser. */
  errors: {
    noApiKey: string;
    rateLimited: string;
    badRequest: string;
    upstreamAuth: string;
    upstreamRateLimit: string;
    upstreamApi: string;
    refusal: string;
    generic: string;
    connection: string;
  };
  projects: {
    title: string;
    subtitle: string;
    back: string;
    role: string;
    period: string;
    stack: string;
    /** Badge on a project: client work or something built in-house. */
    commercial: string;
    internal: string;
    client: string;
    /** Stands in for a client the contract does not allow naming. */
    clientUndisclosed: string;
    /** Banner shown when the list is narrowed to one technology. */
    filteredBy: string;
    clearFilter: string;
    noMatches: string;
  };
  stack: { title: string; subtitle: string };
  /** Label on the link to the PDF in public/. */
  resume: string;
  languageSwitcher: string;
};

export const dictionaries: Record<Locale, Dictionary> = {
  ru: {
    nav: { chat: "Чат", projects: "Проекты", stack: "Стек" },
    chat: {
      intro:
        "Спросите что угодно об опыте, стеке и проектах. Ответы собирает модель строго по данным профиля — если чего-то нет, она так и скажет.",
      placeholder: "Спросите об опыте, стеке или проектах…",
      send: "Спросить",
      stop: "Стоп",
      disclaimer: "Отвечает ИИ по фиксированному профилю — детали лучше уточнить напрямую.",
    },
    errors: {
      noApiKey: "LLM_API_KEY не задан на сервере.",
      rateLimited: "Слишком много вопросов подряд. Попробуйте позже.",
      badRequest: "Некорректный запрос.",
      upstreamAuth: "Сервер не смог авторизоваться у провайдера модели. Проверьте LLM_API_KEY.",
      upstreamRateLimit: "Слишком много запросов к модели. Попробуйте через минуту.",
      upstreamApi: "Ошибка API провайдера.",
      refusal: "Модель отказалась отвечать на этот запрос.",
      generic: "Не удалось получить ответ. Попробуйте ещё раз.",
      connection: "Соединение прервалось. Попробуйте ещё раз.",
    },
    projects: {
      title: "Проекты",
      subtitle: "Всё, что здесь перечислено, чат-бот тоже знает — можно спросить его в свободной форме.",
      back: "Все проекты",
      role: "Роль",
      period: "Период",
      stack: "Стек",
      commercial: "Коммерческий",
      internal: "Внутренний",
      client: "Заказчик",
      clientUndisclosed: "не разглашается",
      filteredBy: "Проекты с технологией",
      clearFilter: "Показать все",
      noMatches: "Среди проектов такой технологии нет.",
    },
    stack: {
      title: "Стек",
      subtitle:
        "Инструменты, с которыми я действительно работал. Ниже — домены и то, как я работаю в команде.",
    },
    resume: "Резюме PDF",
    languageSwitcher: "Язык",
  },
  en: {
    nav: { chat: "Chat", projects: "Projects", stack: "Stack" },
    chat: {
      intro:
        "Ask anything about experience, stack and projects. Answers come from a fixed profile — if something isn't there, the bot will say so.",
      placeholder: "Ask about experience, stack or projects…",
      send: "Ask",
      stop: "Stop",
      disclaimer: "Answered by AI from a fixed profile — worth double-checking details directly.",
    },
    errors: {
      noApiKey: "LLM_API_KEY is not set on the server.",
      rateLimited: "Too many questions in a row. Please try again later.",
      badRequest: "Malformed request.",
      upstreamAuth: "The server could not authenticate with the model provider. Check LLM_API_KEY.",
      upstreamRateLimit: "Too many requests to the model. Try again in a minute.",
      upstreamApi: "Model provider error.",
      refusal: "The model declined to answer this request.",
      generic: "Couldn't get an answer. Please try again.",
      connection: "The connection dropped. Please try again.",
    },
    projects: {
      title: "Projects",
      subtitle: "Everything listed here is also in the chatbot's knowledge — feel free to just ask.",
      back: "All projects",
      role: "Role",
      period: "Period",
      stack: "Stack",
      commercial: "Client work",
      internal: "In-house",
      client: "Client",
      clientUndisclosed: "under NDA",
      filteredBy: "Projects using",
      clearFilter: "Show all",
      noMatches: "No project here uses that.",
    },
    stack: {
      title: "Stack",
      subtitle:
        "The tools I have actually worked with. Domains and ways of working are below the grid.",
    },
    resume: "CV in PDF",
    languageSwitcher: "Language",
  },
  pl: {
    nav: { chat: "Czat", projects: "Projekty", stack: "Stack" },
    chat: {
      intro:
        "Zapytaj o doświadczenie, stack i projekty. Odpowiedzi powstają wyłącznie na podstawie profilu — czego tam nie ma, bot tak powie.",
      placeholder: "Zapytaj o doświadczenie, stack lub projekty…",
      send: "Zapytaj",
      stop: "Stop",
      disclaimer: "Odpowiada AI na podstawie stałego profilu — szczegóły lepiej potwierdzić bezpośrednio.",
    },
    errors: {
      noApiKey: "LLM_API_KEY nie jest ustawiony na serwerze.",
      rateLimited: "Za dużo pytań pod rząd. Spróbuj później.",
      badRequest: "Nieprawidłowe żądanie.",
      upstreamAuth: "Serwer nie mógł uwierzytelnić się u dostawcy modelu. Sprawdź LLM_API_KEY.",
      upstreamRateLimit: "Za dużo zapytań do modelu. Spróbuj za minutę.",
      upstreamApi: "Błąd API dostawcy.",
      refusal: "Model odmówił odpowiedzi na to zapytanie.",
      generic: "Nie udało się uzyskać odpowiedzi. Spróbuj ponownie.",
      connection: "Połączenie zostało przerwane. Spróbuj ponownie.",
    },
    projects: {
      title: "Projekty",
      subtitle: "Wszystko, co tu jest, zna też chatbot — można go po prostu zapytać.",
      back: "Wszystkie projekty",
      role: "Rola",
      period: "Okres",
      stack: "Stack",
      commercial: "Komercyjny",
      internal: "Wewnętrzny",
      client: "Klient",
      clientUndisclosed: "objęty NDA",
      filteredBy: "Projekty z technologią",
      clearFilter: "Pokaż wszystkie",
      noMatches: "Żaden projekt tego nie używa.",
    },
    stack: {
      title: "Stack",
      subtitle:
        "Narzędzia, z którymi naprawdę pracowałem. Domeny i sposób pracy — pod siatką.",
    },
    resume: "CV w PDF",
    languageSwitcher: "Język",
  },
};
