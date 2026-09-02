import { LIMITS } from "./chat-config";
import type { Locale } from "@/i18n/config";

/**
 * Mirrors every exchange into a Telegram chat.
 *
 * The deployment's own logs are kept for an hour on the free plan, which is not
 * long enough to notice anything; a Telegram chat keeps the history for good,
 * arrives as a push, and costs nothing. Without both env vars set — local dev,
 * preview deployments — this does nothing at all.
 */

/** Telegram rejects anything past 4096 characters, so both halves are capped. */
const MAX_ANSWER = 2600;
const SEND_TIMEOUT_MS = 4000;

export type Exchange = {
  locale: Locale;
  question: string;
  answer: string;
  followUps: number;
  ms: number;
};

function compose(exchange: Exchange): string {
  const seconds = (exchange.ms / 1000).toFixed(1);
  const answer =
    exchange.answer.length > MAX_ANSWER
      ? `${exchange.answer.slice(0, MAX_ANSWER)}…`
      : exchange.answer;

  return [
    `❓ ${exchange.question.slice(0, LIMITS.maxQuestionChars)}`,
    "",
    `💬 ${answer || "(empty)"}`,
    "",
    `${exchange.locale} · ${seconds}s · ${exchange.followUps} follow-ups`,
  ].join("\n");
}

export async function notifyTelegram(exchange: Exchange): Promise<void> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chat = process.env.TELEGRAM_CHAT_ID?.trim();
  if (!token || !chat) return;

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chat_id: chat,
        // No parse_mode: the answer is model output and may hold any punctuation
        // Telegram's Markdown would choke on.
        text: compose(exchange),
        disable_web_page_preview: true,
      }),
      // A chat notification is never worth holding a serverless function open.
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });

    if (!response.ok) {
      console.error("[chat] telegram rejected", response.status, await response.text());
    }
  } catch (error) {
    // Losing a notification must never surface as a failed answer.
    console.error("[chat] telegram send failed", error);
  }
}
