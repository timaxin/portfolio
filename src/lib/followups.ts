import { FOLLOWUP_LIMITS, FOLLOWUP_MARKER } from "./chat-config";

/**
 * Pulling the model's follow-up questions out of the answer stream.
 *
 * Kept apart from chat.ts so it can be exercised without the Anthropic SDK: this
 * is the code that decides what a reader sees, and letting the marker slip into
 * the text is exactly the bug worth a test.
 */

/**
 * How many trailing characters have to be withheld because they could still turn
 * out to be the start of the marker. Precise rather than a constant holdback, so
 * an answer that never approaches the marker streams without any lag at all.
 */
export function markerHoldback(text: string): number {
  const longest = Math.min(text.length, FOLLOWUP_MARKER.length - 1);
  for (let length = longest; length > 0; length -= 1) {
    if (text.endsWith(FOLLOWUP_MARKER.slice(0, length))) return length;
  }
  return 0;
}

/** The tail is model output: it is parsed defensively and dropped on any doubt. */
export function parseFollowUps(tail: string): string[] {
  try {
    const parsed: unknown = JSON.parse(tail.trim());
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.trim())
      .filter((item) => item.length > 0 && item.length <= FOLLOWUP_LIMITS.maxChars)
      .slice(0, FOLLOWUP_LIMITS.maxItems);
  } catch {
    return [];
  }
}
