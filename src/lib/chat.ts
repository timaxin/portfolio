import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "@/content/system-prompt";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { DEFAULT_MODEL, LIMITS, type ChatEvent, type ChatTurn } from "./chat-config";

function encodeEvent(event: ChatEvent): Uint8Array {
  return new TextEncoder().encode(`${JSON.stringify(event)}\n`);
}

/**
 * История приходит от клиента, поэтому доверять ей нельзя: обрезаем хвост,
 * выравниваем роли (API требует, чтобы первым шло сообщение пользователя)
 * и подрезаем длину каждой реплики.
 */
function normalizeMessages(messages: ChatTurn[]): Anthropic.MessageParam[] {
  const tail = messages.slice(-LIMITS.maxMessages);
  const firstUser = tail.findIndex((m) => m.role === "user");
  if (firstUser === -1) return [];

  return tail.slice(firstUser).map((m) => ({
    role: m.role,
    content: m.content.slice(0, LIMITS.maxQuestionChars),
  }));
}

function describeError(error: unknown, locale: Locale): string {
  const errors = dictionaries[locale].errors;
  if (error instanceof Anthropic.AuthenticationError) return errors.upstreamAuth;
  if (error instanceof Anthropic.RateLimitError) return errors.upstreamRateLimit;
  if (error instanceof Anthropic.APIError) return `${errors.upstreamApi} (${error.status ?? "?"})`;
  return errors.generic;
}

export type AnswerStreamOptions = {
  apiKey: string;
  model?: string;
  locale: Locale;
  messages: ChatTurn[];
};

/**
 * Отдаёт поток NDJSON-событий. Стриминг здесь не косметика: он снимает риск
 * упереться в таймаут запроса и позволяет показать первые слова сразу.
 */
export function createAnswerStream({
  apiKey,
  model = DEFAULT_MODEL,
  locale,
  messages,
}: AnswerStreamOptions): ReadableStream<Uint8Array> {
  const client = new Anthropic({ apiKey });
  const normalized = normalizeMessages(messages);

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const stream = client.messages.stream({
          model,
          max_tokens: LIMITS.maxTokens,
          // Системный промпт стабилен от запроса к запросу — кешируем его целиком.
          // На каждый язык свой префикс, то есть своя запись в кеше.
          system: [
            { type: "text", text: systemPrompt(locale), cache_control: { type: "ephemeral" } },
          ],
          messages: normalized,
        });

        for await (const event of stream) {
          if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
            controller.enqueue(encodeEvent({ type: "delta", text: event.delta.text }));
          }
        }

        const final = await stream.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(
            encodeEvent({ type: "error", message: dictionaries[locale].errors.refusal }),
          );
        }

        controller.enqueue(encodeEvent({ type: "done" }));
      } catch (error) {
        console.error("[chat] stream failed", error);
        controller.enqueue(encodeEvent({ type: "error", message: describeError(error, locale) }));
      } finally {
        controller.close();
      }
    },
  });
}
