import Anthropic from "@anthropic-ai/sdk";
import { SYSTEM_PROMPT } from "../content/system-prompt";
import {
  DEFAULT_MODEL,
  LIMITS,
  type ChatEvent,
  type ChatTurn,
} from "./chat-config";

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

function describeError(error: unknown): string {
  if (error instanceof Anthropic.AuthenticationError) {
    return "Сервер не смог авторизоваться в Anthropic API. Проверьте ANTHROPIC_API_KEY.";
  }
  if (error instanceof Anthropic.RateLimitError) {
    return "Слишком много запросов к модели. Попробуйте через минуту.";
  }
  if (error instanceof Anthropic.APIError) {
    return `Ошибка Anthropic API (${error.status ?? "?"}).`;
  }
  return "Не удалось получить ответ. Попробуйте ещё раз.";
}

export type AnswerStreamOptions = {
  apiKey: string;
  model?: string;
  messages: ChatTurn[];
};

/**
 * Отдаёт поток NDJSON-событий. Стриминг здесь не косметика: он снимает риск
 * упереться в таймаут запроса и позволяет показать первые слова сразу.
 */
export function createAnswerStream({
  apiKey,
  model = DEFAULT_MODEL,
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
          system: [
            { type: "text", text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" } },
          ],
          // Вопросы простые, ответы короткие: низкий effort экономит и токены, и время до первого слова.
          output_config: { effort: "low" },
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
            encodeEvent({ type: "error", message: "Модель отказалась отвечать на этот запрос." }),
          );
        }

        controller.enqueue(encodeEvent({ type: "done" }));
      } catch (error) {
        console.error("[chat] stream failed", error);
        controller.enqueue(encodeEvent({ type: "error", message: describeError(error) }));
      } finally {
        controller.close();
      }
    },
  });
}
