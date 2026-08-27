/**
 * Общие для клиента и сервера типы и лимиты.
 * Отдельный модуль без Anthropic SDK — иначе он утянулся бы в клиентский бандл.
 */
import { z } from "zod";

/** Модель по умолчанию. Дешёвая альтернатива для публичного эндпоинта — claude-haiku-4-5. */
export const DEFAULT_MODEL = "claude-opus-5";

/** Публичный эндпоинт платный, поэтому режем вход на входе. */
export const LIMITS = {
  maxQuestionChars: 600,
  /** Сколько последних сообщений истории уходит в API (включая текущий вопрос). */
  maxMessages: 12,
  maxTokens: 4096,
} as const;

export const chatRequestSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(LIMITS.maxQuestionChars),
      }),
    )
    .min(1)
    .max(LIMITS.maxMessages),
});

export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ChatTurn = ChatRequest["messages"][number];

/** Построчный NDJSON-протокол: одна строка — одно событие. */
export type ChatEvent =
  | { type: "delta"; text: string }
  | { type: "done" }
  | { type: "error"; message: string };

export const CHAT_CONTENT_TYPE = "application/x-ndjson; charset=utf-8";
