import { createAnswerStream } from "../../src/lib/chat";
import { CHAT_CONTENT_TYPE, chatRequestSchema } from "../../src/lib/chat-config";
import { checkRateLimit } from "../../src/lib/rate-limit";

/**
 * Тот же прокси, что и /api/chat, но для варианта «фронт на GitHub Pages».
 * Логика чата импортируется из src/, поэтому база знаний и лимиты не расходятся.
 */
export interface Env {
  /** wrangler secret put ANTHROPIC_API_KEY */
  ANTHROPIC_API_KEY: string;
  ANTHROPIC_MODEL?: string;
  /** Домены фронтенда через запятую. Пустое значение = запросы отклоняются. */
  ALLOWED_ORIGINS?: string;
}

function corsHeaders(origin: string | null, env: Env): Record<string, string> {
  const allowed = (env.ALLOWED_ORIGINS ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  // Эндпоинт стоит денег за каждый вызов, поэтому Origin — белый список, а не «*».
  if (!origin || !allowed.includes(origin)) return {};

  return {
    "access-control-allow-origin": origin,
    "access-control-allow-methods": "POST, OPTIONS",
    "access-control-allow-headers": "content-type",
    "access-control-max-age": "86400",
    vary: "origin",
  };
}

function json(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", ...headers },
  });
}

const worker = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("origin");
    const cors = corsHeaders(origin, env);

    if (request.method === "OPTIONS") {
      return new Response(null, { status: Object.keys(cors).length ? 204 : 403, headers: cors });
    }
    if (request.method !== "POST") {
      return json({ error: "Method not allowed" }, 405, cors);
    }
    if (!Object.keys(cors).length) {
      return json({ error: "Origin не разрешён." }, 403, {});
    }
    if (!env.ANTHROPIC_API_KEY) {
      return json({ error: "ANTHROPIC_API_KEY не задан в воркере." }, 500, cors);
    }

    const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
    const rate = checkRateLimit(ip);
    if (!rate.allowed) {
      return json({ error: "Слишком много вопросов подряд. Попробуйте позже." }, 429, {
        ...cors,
        "retry-after": String(rate.retryAfterSec),
      });
    }

    const parsed = chatRequestSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return json({ error: "Некорректный запрос." }, 400, cors);
    }

    const stream = createAnswerStream({
      apiKey: env.ANTHROPIC_API_KEY,
      model: env.ANTHROPIC_MODEL,
      messages: parsed.data.messages,
    });

    return new Response(stream, {
      headers: { ...cors, "content-type": CHAT_CONTENT_TYPE, "cache-control": "no-store" },
    });
  },
};

export default worker;
