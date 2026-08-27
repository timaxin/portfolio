/**
 * Общие для клиента и сервера типы и лимиты.
 * Отдельный модуль без Anthropic SDK — иначе он утянулся бы в клиентский бандл.
 */
import { z } from "zod";
import { locales } from "@/i18n/config";

/**
 * Q&A по фиксированному контексту — задача простая, а эндпоинт публичный,
 * поэтому по умолчанию самая дешёвая модель.
 */
export const DEFAULT_MODEL = "claude-haiku-4-5";

/** Публичный эндпоинт платный, поэтому режем вход на входе. */
export const LIMITS = {
  maxQuestionChars: 600,
  /** Сколько последних сообщений истории уходит в API (включая текущий вопрос). */
  maxMessages: 12,
  /** Ответы короткие по инструкции, thinking у Haiku 4.5 выключен — потолка хватает. */
  maxTokens: 1024,
} as const;

export const chatRequestSchema = z.object({
  locale: z.enum(locales),
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
