import type { Locale } from "./config";

/** Строки интерфейса. Тексты о кандидате живут в src/content, здесь только обвязка. */
export type Dictionary = {
  nav: { chat: string; projects: string };
  chat: {
    intro: string;
    placeholder: string;
    send: string;
    stop: string;
    disclaimer: string;
  };
  /** Ошибки: часть возвращает сервер, часть возникает в браузере. */
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
  };
  languageSwitcher: string;
};

export const dictionaries: Record<Locale, Dictionary> = {
  ru: {
    nav: { chat: "Чат", projects: "Проекты" },
    chat: {
      intro:
        "Спросите что угодно об опыте, стеке и проектах. Ответы собирает модель строго по данным профиля — если чего-то нет, она так и скажет.",
      placeholder: "Спросите об опыте, стеке или проектах…",
      send: "Спросить",
      stop: "Стоп",
      disclaimer: "Отвечает ИИ по фиксированному профилю — детали лучше уточнить напрямую.",
    },
    errors: {
      noApiKey: "ANTHROPIC_API_KEY не задан на сервере.",
      rateLimited: "Слишком много вопросов подряд. Попробуйте позже.",
      badRequest: "Некорректный запрос.",
      upstreamAuth: "Сервер не смог авторизоваться в Anthropic API. Проверьте ANTHROPIC_API_KEY.",
      upstreamRateLimit: "Слишком много запросов к модели. Попробуйте через минуту.",
      upstreamApi: "Ошибка Anthropic API.",
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
    },
    languageSwitcher: "Язык",
  },
  en: {
    nav: { chat: "Chat", projects: "Projects" },
    chat: {
      intro:
        "Ask anything about experience, stack and projects. Answers come from a fixed profile — if something isn't there, the bot will say so.",
      placeholder: "Ask about experience, stack or projects…",
      send: "Ask",
      stop: "Stop",
      disclaimer: "Answered by AI from a fixed profile — worth double-checking details directly.",
    },
    errors: {
      noApiKey: "ANTHROPIC_API_KEY is not set on the server.",
      rateLimited: "Too many questions in a row. Please try again later.",
      badRequest: "Malformed request.",
      upstreamAuth: "The server could not authenticate with the Anthropic API. Check ANTHROPIC_API_KEY.",
      upstreamRateLimit: "Too many requests to the model. Try again in a minute.",
      upstreamApi: "Anthropic API error.",
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
    },
    languageSwitcher: "Language",
  },
  pl: {
    nav: { chat: "Czat", projects: "Projekty" },
    chat: {
      intro:
        "Zapytaj o doświadczenie, stack i projekty. Odpowiedzi powstają wyłącznie na podstawie profilu — czego tam nie ma, bot tak powie.",
      placeholder: "Zapytaj o doświadczenie, stack lub projekty…",
      send: "Zapytaj",
      stop: "Stop",
      disclaimer: "Odpowiada AI na podstawie stałego profilu — szczegóły lepiej potwierdzić bezpośrednio.",
    },
    errors: {
      noApiKey: "ANTHROPIC_API_KEY nie jest ustawiony na serwerze.",
      rateLimited: "Za dużo pytań pod rząd. Spróbuj później.",
      badRequest: "Nieprawidłowe żądanie.",
      upstreamAuth: "Serwer nie mógł uwierzytelnić się w Anthropic API. Sprawdź ANTHROPIC_API_KEY.",
      upstreamRateLimit: "Za dużo zapytań do modelu. Spróbuj za minutę.",
      upstreamApi: "Błąd Anthropic API.",
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
    },
    languageSwitcher: "Język",
  },
};
