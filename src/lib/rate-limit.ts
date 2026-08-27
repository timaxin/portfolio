/**
 * Лимитер в памяти процесса. Этого достаточно, чтобы одиночный бот не сжёг бюджет,
 * но при нескольких инстансах (serverless, несколько воркеров) каждый считает свой счёт.
 * Нужна жёсткая гарантия — вынесите счётчики в Cloudflare KV / Durable Object / Redis.
 */

export type RateLimitConfig = {
  /** Сколько запросов разрешено в окне. */
  limit: number;
  /** Длина окна в миллисекундах. */
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

  // Разовая уборка, чтобы Map не рос бесконечно на долгоживущем инстансе.
  if (hits.size > 5_000) {
    for (const [k, timestamps] of hits) {
      if (timestamps.every((ts) => ts <= windowStart)) hits.delete(k);
    }
  }

  return { allowed: true, remaining: limit - recent.length, retryAfterSec: 0 };
}

/** Достаём IP из заголовков прокси; в дев-режиме их нет — падаем в общий бакет. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || headers.get("cf-connecting-ip") || headers.get("x-real-ip") || "local";
}
