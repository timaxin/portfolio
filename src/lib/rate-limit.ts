/**
 * In-process limiter. Enough to stop a single bot from burning the budget, but with
 * several instances (serverless, multiple workers) each keeps its own count.
 * For a hard guarantee move the counters to Vercel KV, a Durable Object or Redis.
 */

export type RateLimitConfig = {
  /** Requests allowed per window. */
  limit: number;
  /** Window length in milliseconds. */
  windowMs: number;
};

export const DEFAULT_RATE_LIMIT: RateLimitConfig = { limit: 12, windowMs: 60 * 60 * 1000 };

const hits = new Map<string, number[]>();

export type RateLimitResult = { allowed: boolean; remaining: number; retryAfterSec: number };

export function checkRateLimit(
  key: string,
  { limit, windowMs }: RateLimitConfig = DEFAULT_RATE_LIMIT,
): RateLimitResult {
  const now = Date.now();
  const windowStart = now - windowMs;
  const recent = (hits.get(key) ?? []).filter((ts) => ts > windowStart);

  if (recent.length >= limit) {
    const oldest = recent[0] ?? now;
    hits.set(key, recent);
    return {
      allowed: false,
      remaining: 0,
      retryAfterSec: Math.max(1, Math.ceil((oldest + windowMs - now) / 1000)),
    };
  }

  recent.push(now);
  hits.set(key, recent);

  // One-off sweep so the Map cannot grow without bound on a long-lived instance.
  if (hits.size > 5_000) {
    for (const [k, timestamps] of hits) {
      if (timestamps.every((ts) => ts <= windowStart)) hits.delete(k);
    }
  }

  return { allowed: true, remaining: limit - recent.length, retryAfterSec: 0 };
}

/** Pull the IP out of proxy headers; there are none in dev, so everything shares one bucket. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("cf-connecting-ip") || headers.get("x-real-ip") || "local";
}
