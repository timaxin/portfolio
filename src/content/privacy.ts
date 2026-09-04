import type { Localized } from "@/i18n/config";

/**
 * Body of the /privacy page. Kept apart from src/i18n/dictionaries.ts — that
 * file is UI chrome, this is substantive content, same split as profile.ts and
 * projects.ts.
 *
 * The model provider is named explicitly rather than derived from
 * src/lib/chat.ts: that file's GATEWAY_MODEL is only a fallback for when the
 * env vars are unset, not what is actually configured on the live deployment.
 * When the provider changes, update `currentModelProvider` below. Tsimafei
 * said he'd flag it when it happens rather than have this guess at it.
 */
const currentModelProvider = "OpenAI";

export const privacy = {
  updated: "2026-09-04",

  intro: {
    ru: `Это личный сайт-резюме. Не компания, не продукт с учётными записями. Ниже просто и
честно написано, что происходит с данными на этом сайте. Вопрос в чате, адрес, с которого
пришёл человек, скачивание резюме.`,
    en: `This is a personal CV site. Not a company, not a product with accounts. Here's a plain
account of what happens to data on it, a question asked in the chat, the address a visit comes
from, a resume download.`,
    pl: `To osobista strona CV. Nie firma, nie produkt z kontami. Poniżej jasno napisane, co
dzieje się z danymi na tej stronie, pytanie w czacie, adres, z którego przychodzi wizyta,
pobranie CV.`,
  } satisfies Localized,

  sections: [
    {
      heading: {
        ru: "Вопрос в чате",
        en: "A question asked in the chat",
        pl: "Pytanie w czacie",
      },
      body: {
        ru: `Вопрос уходит на сервер этого сайта. Сервер пересылает его через Vercel AI Gateway
модели, которая сейчас отвечает. Сегодня это ${currentModelProvider}. Вопрос видят только
сервер и этот провайдер. В базе сайта переписка не хранится, она живёт в браузере, пока открыта
вкладка. Каждый обмен вопросом и ответом дублируется в личный Telegram автора. Так видно, что
реально спрашивают, и можно дополнять профиль, если чего-то не хватает. Если провайдер модели
сменится, эта страница это скажет.`,
        en: `The question goes to this site's own server. The server forwards it through Vercel
AI Gateway to whichever model is answering. Today that's ${currentModelProvider}. Only the
server and that provider see it. Nothing is stored in a database, the exchange lives in the
browser tab for as long as it stays open. Every question and answer is also mirrored into the
author's own Telegram, so he can see what people actually ask and fill in what's missing. If
the model provider changes, this page will say so.`,
        pl: `Pytanie trafia na serwer tej strony. Serwer przekazuje je przez Vercel AI Gateway do
modelu, który akurat odpowiada. Dziś to ${currentModelProvider}. Widzi je tylko serwer i ten
dostawca. W bazie strony rozmowa się nie zapisuje, żyje w karcie przeglądarki, dopóki jest
otwarta. Każda wymiana pytania i odpowiedzi trafia też do prywatnego Telegrama autora. Dzięki
temu widać, o co naprawdę pytają, i można uzupełnić profil, jeśli czegoś brakuje. Jeśli dostawca
modelu się zmieni, ta strona to pokaże.`,
      },
    },
    {
      heading: {
        ru: "IP-адрес и ограничение частоты",
        en: "IP address and the rate limit",
        pl: "Adres IP i limit zapytań",
      },
      body: {
        ru: `Чат публичный, поэтому число вопросов с одного IP-адреса ограничено. Не больше 12 в
час, чтобы бот не разорил счёт за модель. Адрес смотрят только в момент запроса и нигде не
хранят дольше этого часа.`,
        en: `The chat is public, so questions from one IP address are capped at 12 an hour.
That's to keep a script from running up the model bill. The address is read only at the moment
of the request and isn't kept past that hour.`,
        pl: `Czat jest publiczny, więc liczba pytań z jednego adresu IP jest ograniczona do 12 na
godzinę. To po to, żeby skrypt nie wygenerował rachunku za model. Adres jest odczytywany tylko w
chwili zapytania i nie jest przechowywany dłużej niż tę godzinę.`,
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
браузера. Это легко проверить самому, через консоль разработчика.`,
        en: `The site sets no cookies and writes nothing to the browser's localStorage or
sessionStorage. Easy to check directly, in the browser's own developer console.`,
        pl: `Strona nie ustawia żadnych ciasteczek i niczego nie zapisuje w localStorage ani
sessionStorage przeglądarki. Można to łatwo sprawdzić samemu, w konsoli deweloperskiej
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
        ru: `Vercel Web Analytics считает просмотры страниц без куки и без привязки к
конкретному посетителю. Это просто цифры о том, какие страницы читают, а не профиль читателя.`,
        en: `Vercel Web Analytics counts page views without cookies and without identifying a
particular visitor. It's just numbers about which pages get read, not a profile of who read
them.`,
        pl: `Vercel Web Analytics liczy odsłony stron bez ciasteczek i bez identyfikowania
konkretnego odwiedzającego. To po prostu liczby o tym, które strony są czytane, a nie profil
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
        ru: `Данные видит и Vercel, он хостит сайт, считает аналитику и пропускает запросы через
AI Gateway. Видит их и провайдер модели, к которому Gateway пересылает вопрос, сейчас это
${currentModelProvider}. Вопрос и ответ ещё дублируются в личный Telegram автора. Никто из них
не получает вопрос ради рекламы или маркетинга, только чтобы сайт и чат работали.`,
        en: `Vercel sees it too, since it hosts the site, runs the analytics and routes requests
through the AI Gateway. So does the model provider the Gateway forwards the question to, today
that's ${currentModelProvider}. The question and answer also go to the author's own Telegram.
None of them get it for advertising or marketing, only to keep the site and the chat running.`,
        pl: `Widzi je też Vercel, bo hostuje stronę, liczy analitykę i przekazuje zapytania przez
AI Gateway. Widzi je też dostawca modelu, do którego Gateway przekazuje pytanie, dziś to
${currentModelProvider}. Pytanie i odpowiedź trafiają też do prywatnego Telegrama autora. Żaden
z nich nie dostaje pytania w celach reklamowych ani marketingowych, tylko po to, żeby strona i
czat działały.`,
      },
    },
    {
      heading: {
        ru: "Резюме в PDF",
        en: "The PDF resume",
        pl: "CV w PDF",
      },
      body: {
        ru: `Файл отдаётся как обычный файл на сервере. Сайт не узнаёт, кто его скачал, и не
просит оставить email взамен.`,
        en: `The file is served as a plain file on the server. The site has no way of knowing
who downloaded it, and doesn't ask for an email in exchange.`,
        pl: `Plik jest po prostu zwykłym plikiem na serwerze. Strona nie ma jak sprawdzić, kto go
pobrał, i nie prosi w zamian o adres e-mail.`,
      },
    },
  ],

  contact: {
    ru: "Вопросы про эту страницу или про данные можно написать на почту.",
    en: "For questions about this page or the data, email works.",
    pl: "Pytania dotyczące tej strony lub danych można wysłać mailem.",
  } satisfies Localized,
};
