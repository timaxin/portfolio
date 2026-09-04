import type { Localized } from "@/i18n/config";

/**
 * Body of the /privacy page. Kept apart from src/i18n/dictionaries.ts — that
 * file is UI chrome, this is substantive content, same split as profile.ts and
 * projects.ts.
 *
 * The model provider is named explicitly rather than derived from
 * src/lib/chat.ts: that file's GATEWAY_MODEL is only a fallback for when the
 * env vars are unset, not what is actually configured on the live deployment.
 * When the provider changes, update `currentModelProvider` below — Tsimafei
 * said he'd flag it when it happens rather than have this guess at it.
 */
const currentModelProvider = "OpenAI";

export const privacy = {
  updated: "2026-09-04",

  intro: {
    ru: `Личный сайт-CV, не компания и не продукт с учётными записями. Ниже — коротко и честно,
что происходит с данными, когда им пользуются: с вопросом в чате, с адресом при заходе на
страницу, со скачиванием резюме.`,
    en: `A personal CV site, not a company or a product with accounts. Below is a short, honest
account of what happens to data when the site is used: a question asked in the chat, the
address a visit comes from, a resume download.`,
    pl: `Osobista strona CV, nie firma i nie produkt z kontami. Poniżej krótko i szczerze o tym,
co dzieje się z danymi, gdy ktoś korzysta ze strony: z pytaniem w czacie, z adresem, z
którego przychodzi wizyta, z pobraniem CV.`,
  } satisfies Localized,

  sections: [
    {
      heading: {
        ru: "Вопрос в чате",
        en: "A question asked in the chat",
        pl: "Pytanie w czacie",
      },
      body: {
        ru: `Вопрос уходит на сервер этого сайта, а тот пересылает его через Vercel AI Gateway
модели, которая сейчас отвечает — сегодня это ${currentModelProvider}. Провайдера видно только
серверу и самому провайдеру; в базе сайта переписка не хранится — она живёт в браузере, пока
открыта вкладка. Каждый обмен вопросом и ответом дублируется в личный Telegram автора: так
видно, что реально спрашивают, и можно дополнять профиль, если чего-то не хватает. Если
провайдер модели сменится, эта страница будет обновлена.`,
        en: `The question goes to this site's own server, which forwards it through Vercel AI
Gateway to whichever model is answering — today that is ${currentModelProvider}. Only the
server and that provider see it; nothing is stored in a database — the exchange lives in the
browser tab for as long as it stays open. Every question and answer is also mirrored into the
author's own Telegram, so he can see what people actually ask and fill in what's missing. If
the model provider changes, this page will be updated to say so.`,
        pl: `Pytanie trafia na serwer tej strony, a ten przekazuje je przez Vercel AI Gateway do
modelu, który akurat odpowiada — dziś to ${currentModelProvider}. Widzi je tylko serwer i ten
dostawca; w bazie strony rozmowa się nie zapisuje — żyje w karcie przeglądarki, dopóki jest
otwarta. Każda wymiana pytania i odpowiedzi trafia też do prywatnego Telegrama autora — dzięki
temu widać, o co naprawdę pytają, i można uzupełnić profil, jeśli czegoś brakuje. Jeśli dostawca
modelu się zmieni, ta strona zostanie zaktualizowana.`,
      },
    },
    {
      heading: {
        ru: "IP-адрес и ограничение частоты",
        en: "IP address and the rate limit",
        pl: "Adres IP i limit zapytań",
      },
      body: {
        ru: `Чтобы публичный чат не разорил счёт за модель, число вопросов с одного IP-адреса
ограничено — 12 в час. Адрес смотрится только в момент запроса, дольше окна ограничения нигде
не хранится.`,
        en: `The chat is public, so questions from one IP address are capped — 12 an hour — to
keep a script from running up the model bill. The address is read only at the moment of the
request and is not kept past that hour-long window.`,
        pl: `Czat jest publiczny, więc liczba pytań z jednego adresu IP jest ograniczona — 12 na
godzinę — żeby skrypt nie wygenerował rachunku za model. Adres jest odczytywany tylko w chwili
zapytania i nie jest przechowywany dłużej niż to godzinne okno.`,
      },
    },
    {
      heading: {
        ru: "Куки и локальное хранилище",
        en: "Cookies and local storage",
        pl: "Ciasteczka i lokalne przechowywanie",
      },
      body: {
        ru: `Сайт не ставит ни одной куки и ничего не пишет в localStorage или sessionStorage
браузера. Проверить это можно самому — в консоли разработчика.`,
        en: `The site sets no cookies and writes nothing to the browser's localStorage or
sessionStorage. Easy to check directly, in the browser's own developer console.`,
        pl: `Strona nie ustawia żadnych ciasteczek i niczego nie zapisuje w localStorage ani
sessionStorage przeglądarki. Można to łatwo sprawdzić samemu w konsoli deweloperskiej
przeglądarki.`,
      },
    },
    {
      heading: {
        ru: "Аналитика",
        en: "Analytics",
        pl: "Analityka",
      },
      body: {
        ru: `Vercel Web Analytics считает просмотры страниц без куки и без привязки к конкретному
посетителю — агрегированные цифры о том, какие страницы читают, а не профиль читателя.`,
        en: `Vercel Web Analytics counts page views without cookies and without identifying a
particular visitor — aggregate numbers about which pages get read, not a profile of who read
them.`,
        pl: `Vercel Web Analytics liczy odsłony stron bez ciasteczek i bez identyfikowania
konkretnego odwiedzającego — zagregowane liczby o tym, które strony są czytane, a nie profil
czytelnika.`,
      },
    },
    {
      heading: {
        ru: "Кто ещё видит данные",
        en: "Who else sees any of this",
        pl: "Kto jeszcze to widzi",
      },
      body: {
        ru: `Vercel — хостинг, аналитика и AI Gateway. Провайдер модели, которому Gateway
пересылает вопрос (сейчас — ${currentModelProvider}). Telegram — личное зеркало переписки для
автора. Никто из них не получает вопрос вместе с рекламными или маркетинговыми целями — только
чтобы сайт и чат работали.`,
        en: `Vercel — hosting, analytics and the AI Gateway. The model provider the Gateway
forwards the question to (today, ${currentModelProvider}). Telegram — the author's own private
mirror of the exchange. None of them get the question for advertising or marketing purposes —
only to keep the site and the chat running.`,
        pl: `Vercel — hosting, analityka i AI Gateway. Dostawca modelu, do którego Gateway
przekazuje pytanie (dziś ${currentModelProvider}). Telegram — prywatne lustro rozmowy dla
autora. Żaden z nich nie dostaje pytania w celach reklamowych ani marketingowych — tylko po to,
żeby strona i czat działały.`,
      },
    },
    {
      heading: {
        ru: "Резюме в PDF",
        en: "The PDF resume",
        pl: "CV w PDF",
      },
      body: {
        ru: `Файл отдаётся как обычная статика. Сайт не узнаёт, кто его скачал, и не просит
оставить email взамен.`,
        en: `The file is served as a plain static asset. The site has no way of knowing who
downloaded it, and does not ask for an email in exchange.`,
        pl: `Plik jest serwowany jako zwykły statyczny zasób. Strona nie ma jak sprawdzić, kto go
pobrał, i nie prosi w zamian o adres e-mail.`,
      },
    },
  ],

  contact: {
    ru: "Вопросы про эту страницу или про данные — на почту.",
    en: "Questions about this page or about the data — by email.",
    pl: "Pytania dotyczące tej strony lub danych — mailem.",
  } satisfies Localized,
};
