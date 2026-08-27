import type { Locale } from "@/i18n/config";
import type { ChatEvent, ChatTurn } from "./chat-config";

const CHAT_ENDPOINT = "/api/chat";

/** Читает NDJSON-поток построчно: последняя строка чанка может быть неполной. */
export async function* streamChat(
  locale: Locale,
  messages: ChatTurn[],
  signal?: AbortSignal,
): AsyncGenerator<ChatEvent> {
  const response = await fetch(CHAT_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ locale, messages }),
    signal,
  });

  if (!response.ok || !response.body) {
    const body = (await response.json().catch(() => null)) as { error?: string } | null;
    yield { type: "error", message: body?.error ?? `HTTP ${response.status}` };
    return;
  }

  const reader = response.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += value;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.trim()) continue;
      try {
        yield JSON.parse(line) as ChatEvent;
      } catch {
        // Битую строку молча пропускаем — поток важнее одного события.
      }
    }
  }
}
