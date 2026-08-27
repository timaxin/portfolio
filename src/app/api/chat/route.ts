import { createAnswerStream } from "@/lib/chat";
import { CHAT_CONTENT_TYPE, chatRequestSchema } from "@/lib/chat-config";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";
import { defaultLocale, isLocale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

/** Стриминг длиной в целый ответ модели — дефолтных 10 секунд Vercel не хватит. */
export const maxDuration = 30;

/**
 * Прокси к Anthropic API. Существует ради одного: ключ живёт на сервере,
 * а браузер видит только вопрос и поток ответа.
 */
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);

  // Язык нужен для текста ошибки ещё до валидации всего запроса.
  const hinted =
    typeof body === "object" && body !== null && "locale" in body ? String(body.locale) : "";
  const errors = dictionaries[isLocale(hinted) ? hinted : defaultLocale].errors;

  if (!process.env.ANTHROPIC_API_KEY) {
    return Response.json({ error: errors.noApiKey }, { status: 500 });
  }

  const rate = checkRateLimit(clientKey(request.headers));
  if (!rate.allowed) {
    return Response.json(
      { error: errors.rateLimited },
      { status: 429, headers: { "retry-after": String(rate.retryAfterSec) } },
    );
  }

  const parsed = chatRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: errors.badRequest }, { status: 400 });
  }

  const stream = createAnswerStream({
    apiKey: process.env.ANTHROPIC_API_KEY,
    model: process.env.ANTHROPIC_MODEL,
    locale: parsed.data.locale,
    messages: parsed.data.messages,
  });

  return new Response(stream, {
    headers: {
      "content-type": CHAT_CONTENT_TYPE,
      "cache-control": "no-store",
      // Отключает буферизацию у прокси вроде nginx — иначе стриминга не видно.
      "x-accel-buffering": "no",
    },
  });
}
