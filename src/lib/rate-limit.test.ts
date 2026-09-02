import { describe, expect, it } from "vitest";
import { checkRateLimit, clientKey } from "./rate-limit";

/** Each test gets its own bucket: the limiter's state is module-level on purpose. */
let counter = 0;
const freshKey = () => `test-${counter++}`;

describe("checkRateLimit", () => {
  const config = { limit: 3, windowMs: 60_000 };

  it("allows requests up to the limit and counts down", () => {
    const key = freshKey();
    expect(checkRateLimit(key, config)).toMatchObject({ allowed: true, remaining: 2 });
    expect(checkRateLimit(key, config)).toMatchObject({ allowed: true, remaining: 1 });
    expect(checkRateLimit(key, config)).toMatchObject({ allowed: true, remaining: 0 });
  });

  it("refuses the one past the limit and says when to come back", () => {
    const key = freshKey();
    for (let i = 0; i < config.limit; i += 1) checkRateLimit(key, config);

    const blocked = checkRateLimit(key, config);
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
    expect(blocked.retryAfterSec).toBeGreaterThan(0);
    expect(blocked.retryAfterSec).toBeLessThanOrEqual(config.windowMs / 1000);
  });

  it("counts each caller separately", () => {
    const mine = freshKey();
    const theirs = freshKey();
    for (let i = 0; i < config.limit; i += 1) checkRateLimit(mine, config);

    expect(checkRateLimit(mine, config).allowed).toBe(false);
    expect(checkRateLimit(theirs, config).allowed).toBe(true);
  });

  it("forgets hits once their window has passed", () => {
    const key = freshKey();
    const instant = { limit: 2, windowMs: 1 };
    checkRateLimit(key, instant);
    checkRateLimit(key, instant);

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(checkRateLimit(key, instant).allowed).toBe(true);
        resolve();
      }, 5);
    });
  });
});

describe("clientKey", () => {
  it("takes the first address in a proxy chain, not the last", () => {
    const headers = new Headers({ "x-forwarded-for": "203.0.113.5, 70.41.3.18, 150.172.238.178" });
    expect(clientKey(headers)).toBe("203.0.113.5");
  });

  it("falls back through the other proxy headers", () => {
    expect(clientKey(new Headers({ "cf-connecting-ip": "203.0.113.7" }))).toBe("203.0.113.7");
    expect(clientKey(new Headers({ "x-real-ip": "203.0.113.9" }))).toBe("203.0.113.9");
  });

  it("puts everything in one bucket when there is no proxy, as in dev", () => {
    expect(clientKey(new Headers())).toBe("local");
  });

  it("does not treat an empty forwarded header as an address", () => {
    expect(clientKey(new Headers({ "x-forwarded-for": "" }))).toBe("local");
  });
});
