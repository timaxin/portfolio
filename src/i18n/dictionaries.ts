import type { Locale } from "./config";

/** UI strings. Copy about the candidate lives in src/content; this is just the shell. */
export type Dictionary = {
  nav: { chat: string; projects: string; stack: string; experience: string };
  chat: {
    intro: string;
    placeholder: string;
    send: string;
    stop: string;
    disclaimer: string;
    /** Sits above the follow-up questions the model proposes after an answer. */
    followUps: string;
    /** Names the transcript for a screen reader; never shown. */
    transcript: string;
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
    /** Section headings on a project page. */
    challenge: string;
    howItWorks: string;
    /** Explains the accent outline in the diagram. */
    diagramLegend: string;
    about: string;
    contribution: string;
    /** Banner shown when the list is narrowed to one technology. */
    filteredBy: string;
    clearFilter: string;
    noMatches: string;
  };
  stack: { title: string; subtitle: string };
  experience: {
    title: string;
    subtitle: string;
    notes: string;
    education: string;
  };
  /** Label on the link to the PDF in public/. */
  resume: string;
  /** First thing in the tab order, visible only once focused. */
  skipToContent: string;
  notFound: { title: string; description: string; elsewhere: string };
  errorPage: { title: string; description: string; retry: string; home: string };
  privacy: {
    title: string;
    subtitle: string;
    /** Short word for the footer link. */
    footerLink: string;
    /** "Last updated" label, followed by the date from src/content/privacy.ts. */
    updated: string;
    contactLabel: string;
  };
  home: {
    availability: string;
    /** Follows the number from `profile.yearsOfExperience`, which stays the one source. */
    yearsSuffix: string;
  };
  languageSwitcher: string;
};

export const dictionaries: Record<Locale, Dictionary> = {
  ru: {
    nav: { chat: "Чат", projects: "Проекты", stack: "Стек", experience: "Опыт" },
    chat: {
      intro:
        "Спросите что угодно об опыте, стеке и проектах. Ответы собирает модель строго по данным профиля, если чего-то нет, она так и скажет.",
      placeholder: "Спросите об опыте, стеке или проектах…",
      send: "Спросить",
      stop: "Стоп",
      disclaimer: "Отвечает ИИ по фиксированному профилю, детали лучше уточнить напрямую.",
      followUps: "Спросить дальше",
      transcript: "Переписка с ботом",
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
      subtitle: "Всё, что здесь перечислено, чат-бот тоже знает, можно спросить его в свободной форме.",
      back: "Все проекты",
      role: "Роль",
      period: "Период",
      stack: "Стек",
      commercial: "Коммерческий",
      internal: "Внутренний",
      client: "Заказчик",
      clientUndisclosed: "не разглашается",
      challenge: "Задача",
      howItWorks: "Как устроено",
      diagramLegend: "Обведённые блоки я делал сам",
      about: "О проекте",
      contribution: "Что я сделал",
      filteredBy: "Проекты с технологией",
      clearFilter: "Показать все",
      noMatches: "Среди проектов такой технологии нет.",
    },
    stack: {
      title: "Стек",
      subtitle:
        "Инструменты, с которыми я действительно работал. Плюс домены и то, как я работаю в команде.",
    },
    experience: {
      title: "Опыт",
      subtitle: "Места работы, роли и что после меня осталось. Об этом же можно спросить чат.",
      notes: "О датах",
      education: "Образование",
    },
    skipToContent: "К содержимому",
    notFound: {
      title: "Страницы нет",
      description: "Ссылка устарела или в адресе опечатка. Часть адресов на сайте менялась.",
      elsewhere: "Что здесь есть",
    },
    errorPage: {
      title: "Что-то сломалось",
      description: "Страница не смогла открыться. Попробуйте ещё раз. Если не поможет, вернитесь на главную.",
      retry: "Попробовать снова",
      home: "На главную",
    },
    privacy: {
      title: "Приватность",
      subtitle: "Что происходит с данными на этом сайте, простыми словами.",
      footerLink: "Приватность",
      updated: "Обновлено",
      contactLabel: "Написать",
    },
    home: { availability: "Что ищу", yearsSuffix: "лет опыта" },
    resume: "Резюме PDF",
    languageSwitcher: "Язык",
  },
  en: {
    nav: { chat: "Chat", projects: "Projects", stack: "Stack", experience: "Experience" },
    chat: {
      intro:
        "Ask anything about experience, stack and projects. Answers come from a fixed profile. If something isn't there, the bot will say so.",
      placeholder: "Ask about experience, stack or projects…",
      send: "Ask",
      stop: "Stop",
      disclaimer: "Answered by AI from a fixed profile. Details are worth double-checking directly.",
      followUps: "Ask next",
      transcript: "Conversation with the bot",
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
      subtitle: "Everything listed here is also in the chatbot's knowledge. Feel free to just ask.",
      back: "All projects",
      role: "Role",
      period: "Period",
      stack: "Stack",
      commercial: "Client work",
      internal: "In-house",
      client: "Client",
      clientUndisclosed: "under NDA",
      challenge: "The problem",
      howItWorks: "How it works",
      diagramLegend: "Outlined boxes are the parts I built",
      about: "About the project",
      contribution: "What I did",
      filteredBy: "Projects using",
      clearFilter: "Show all",
      noMatches: "No project here uses that.",
    },
    stack: {
      title: "Stack",
      subtitle:
        "The tools I have actually worked with, plus domains and ways of working.",
    },
    experience: {
      title: "Experience",
      subtitle: "Where I worked, in what role, and what outlived me. The chat knows all of it too.",
      notes: "About the dates",
      education: "Education",
    },
    skipToContent: "Skip to content",
    notFound: {
      title: "No such page",
      description: "The link is out of date, or the address has a typo. Some of these have changed.",
      elsewhere: "What is here",
    },
    errorPage: {
      title: "Something broke",
      description: "The page failed to load. Try again. If that doesn't help, head back to the homepage.",
      retry: "Try again",
      home: "Go home",
    },
    privacy: {
      title: "Privacy",
      subtitle: "What happens to data on this site, in plain terms.",
      footerLink: "Privacy",
      updated: "Last updated",
      contactLabel: "Email",
    },
    home: { availability: "What I'm looking for", yearsSuffix: "years of experience" },
    resume: "CV in PDF",
    languageSwitcher: "Language",
  },
  pl: {
    nav: { chat: "Czat", projects: "Projekty", stack: "Stack", experience: "Doświadczenie" },
    chat: {
      intro:
        "Zapytaj o doświadczenie, stack i projekty. Odpowiedzi powstają wyłącznie na podstawie profilu. Czego tam nie ma, bot tak powie.",
      placeholder: "Zapytaj o doświadczenie, stack lub projekty…",
      send: "Zapytaj",
      stop: "Stop",
      disclaimer: "Odpowiada AI na podstawie stałego profilu. Szczegóły lepiej potwierdzić bezpośrednio.",
      followUps: "Zapytaj dalej",
      transcript: "Rozmowa z botem",
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
      subtitle: "Wszystko, co tu jest, zna też chatbot. Można go po prostu zapytać.",
      back: "Wszystkie projekty",
      role: "Rola",
      period: "Okres",
      stack: "Stack",
      commercial: "Komercyjny",
      internal: "Wewnętrzny",
      client: "Klient",
      clientUndisclosed: "objęty NDA",
      challenge: "Zadanie",
      howItWorks: "Jak to działa",
      diagramLegend: "Obramowane elementy to moja część",
      about: "O projekcie",
      contribution: "Co zrobiłem",
      filteredBy: "Projekty z technologią",
      clearFilter: "Pokaż wszystkie",
      noMatches: "Żaden projekt tego nie używa.",
    },
    stack: {
      title: "Stack",
      subtitle:
        "Narzędzia, z którymi naprawdę pracowałem, plus domeny i sposób pracy.",
    },
    experience: {
      title: "Doświadczenie",
      subtitle: "Gdzie pracowałem, w jakiej roli i co po mnie zostało. Czat też o tym wie.",
      notes: "O datach",
      education: "Wykształcenie",
    },
    skipToContent: "Przejdź do treści",
    notFound: {
      title: "Nie ma takiej strony",
      description: "Link jest nieaktualny albo w adresie jest literówka. Część adresów się zmieniała.",
      elsewhere: "Co tu jest",
    },
    errorPage: {
      title: "Coś się zepsuło",
      description: "Strona nie mogła się załadować. Spróbuj ponownie. Jeśli to nie pomoże, wróć na stronę główną.",
      retry: "Spróbuj ponownie",
      home: "Strona główna",
    },
    privacy: {
      title: "Prywatność",
      subtitle: "Co dzieje się z danymi na tej stronie, prostymi słowami.",
      footerLink: "Prywatność",
      updated: "Zaktualizowano",
      contactLabel: "Napisz",
    },
    home: { availability: "Czego szukam", yearsSuffix: "lat doświadczenia" },
    resume: "CV w PDF",
    languageSwitcher: "Język",
  },
};
