import { CHAT_CONTENT_TYPE, chatRequestSchema } from "@/lib/chat-config";
import { createAnswerStream } from "@/lib/chat";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";

/**
 * Прокси к Anthropic API. Существует ради одного: ключ живёт на сервере,
 * а браузер видит только вопрос и поток ответа.
 *
 * Этот роут исключается из статической сборки под GitHub Pages
 * (см. scripts/build-static.mjs) — там его роль играет Cloudflare Worker.
 */
export async function POST(request: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "ANTHROPIC_API_KEY не задан на сервере." },
      { status: 500 },
    );
  }

  const rate = checkRateLimit(clientKey(request.headers));
  if (!rate.allowed) {
    return Response.json(
      { error: "Слишком много вопросов подряд. Попробуйте позже." },
      { status: 429, headers: { "retry-after": String(rate.retryAfterSec) } },
    );
  }

  const parsed = chatRequestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return Response.json({ error: "Некорректный запрос." }, { status: 400 });
  }

  const stream = createAnswerStream({
    apiKey,
    model: process.env.ANTHROPIC_MODEL,
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
