import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "@/content/system-prompt";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { LIMITS, type ChatEvent, type ChatTurn } from "./chat-config";

/**
 * Q&A over a fixed context is a simple task and the endpoint is public,
 * so the default is the cheapest model on either route.
 *
 * The two routes spell the same model differently: the Anthropic API uses dashes,
 * AI Gateway prefixes the provider and keeps the dot. Deriving the id from the base
 * URL means switching routes is one env var, not two that must agree.
 */
const GATEWAY_HOST = "ai-gateway.vercel.sh";
const DIRECT_MODEL = "claude-haiku-4-5";
const GATEWAY_MODEL = "anthropic/claude-haiku-4.5";

function resolveTarget(): { baseURL: string | undefined; model: string } {
  const baseURL = process.env.ANTHROPIC_BASE_URL?.trim() || undefined;
  const viaGateway = baseURL?.includes(GATEWAY_HOST) ?? false;

  return {
    baseURL,
    model: process.env.ANTHROPIC_MODEL?.trim() || (viaGateway ? GATEWAY_MODEL : DIRECT_MODEL),
  };
}

function encodeEvent(event: ChatEvent): Uint8Array {
  return new TextEncoder().encode(`${JSON.stringify(event)}\n`);
}

/**
 * History comes from the client, so it cannot be trusted: trim to the tail, align roles
 * (the API requires a user message first) and cap the length of every turn.
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
  locale: Locale;
  messages: ChatTurn[];
};

/**
 * Returns a stream of NDJSON events. Streaming is not cosmetic here: it removes the risk
 * of hitting a request timeout and puts the first words on screen right away.
 */
export function createAnswerStream({
  apiKey,
  locale,
  messages,
}: AnswerStreamOptions): ReadableStream<Uint8Array> {
  const { baseURL, model } = resolveTarget();
  // baseURL undefined leaves the SDK on api.anthropic.com.
  const client = new Anthropic({ apiKey, baseURL });
  const normalized = normalizeMessages(messages);

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const stream = client.messages.stream({
          model,
          max_tokens: LIMITS.maxTokens,
          // The system prompt is stable across requests, so cache the whole thing.
          // Each language is its own prefix and therefore its own cache entry.
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
