/**
 * Types and limits shared by the client and the server.
 * Kept free of the Anthropic SDK — importing it here would drag it into the client bundle.
 */
import { z } from "zod";
import { locales } from "@/i18n/config";

/** The public endpoint costs money per call, so input is capped up front. */
export const LIMITS = {
  maxQuestionChars: 600,
  /** How many trailing history messages reach the API (the current question included). */
  maxMessages: 12,
  /** Answers are short by instruction and Haiku 4.5 does no thinking — this ceiling is plenty. */
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

/** Line-delimited NDJSON protocol: one line, one event. */
export type ChatEvent =
  | { type: "delta"; text: string }
  | { type: "suggestions"; items: string[] }
  | { type: "done" }
  | { type: "error"; message: string };

/**
 * The model closes an answer with this marker followed by a JSON array of
 * follow-up questions. It is stripped from the stream server-side and arrives as
 * its own event, so the reader never sees the machinery.
 */
export const FOLLOWUP_MARKER = "<<FOLLOWUPS>>";

/** A stray or malformed tail must never reach the page as a suggestion. */
export const FOLLOWUP_LIMITS = { maxItems: 3, maxChars: 90 } as const;

export const CHAT_CONTENT_TYPE = "application/x-ndjson; charset=utf-8";
