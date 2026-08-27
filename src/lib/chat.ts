import Anthropic from "@anthropic-ai/sdk";
import { systemPrompt } from "@/content/system-prompt";
import { dictionaries } from "@/i18n/dictionaries";
import type { Locale } from "@/i18n/config";
import { LIMITS, type ChatEvent, type ChatTurn } from "./chat-config";

/** Q&A over a fixed context is simple and the endpoint is public, so both defaults are the cheapest model. */
const GATEWAY_HOST = "ai-gateway.vercel.sh";
const DIRECT_MODEL = "claude-haiku-4-5";
const GATEWAY_MODEL = "anthropic/claude-haiku-4.5";

export type Target = {
  apiKey: string | undefined;
  baseURL: string | undefined;
  model: string;
};

/**
 * Reads the three LLM_* env vars and fills in whatever they leave out.
 *
 * LLM_BASE_URL unset  → Anthropic directly, model claude-haiku-4-5
 * LLM_BASE_URL set to the gateway → model anthropic/claude-haiku-4.5
 *
 * The id is derived rather than configured because the two routes spell the same
 * model differently, and two env vars that must agree is a trap. LLM_MODEL overrides.
 */
export function resolveTarget(): Target {
  const baseURL = process.env.LLM_BASE_URL?.trim() || undefined;
  const viaGateway = baseURL?.includes(GATEWAY_HOST) ?? false;

  // On a Vercel deployment the gateway also accepts the auto-injected OIDC token,
  // so a key is optional there. Anthropic direct would reject it — hence the guard.
  const apiKey =
    process.env.LLM_API_KEY?.trim() ||
    (viaGateway ? process.env.VERCEL_OIDC_TOKEN?.trim() : undefined) ||
    undefined;

  return {
    apiKey,
    baseURL,
    model: process.env.LLM_MODEL?.trim() || (viaGateway ? GATEWAY_MODEL : DIRECT_MODEL),
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
