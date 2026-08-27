import { createAnswerStream } from "@/lib/chat";
import { CHAT_CONTENT_TYPE, chatRequestSchema } from "@/lib/chat-config";
import { checkRateLimit, clientKey } from "@/lib/rate-limit";
import { defaultLocale, isLocale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";

/** Streaming runs for as long as the model answers — Vercel's default 10s is not enough. */
export const maxDuration = 30;

/**
 * Proxy to the Anthropic API. It exists for one reason: the key stays on the server
 * and the browser only ever sees the question and the streamed answer.
 */
export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);

  // The locale is needed for error copy before the request as a whole is validated.
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
      // Disables buffering in proxies like nginx — otherwise the stream is invisible.
      "x-accel-buffering": "no",
    },
  });
}
