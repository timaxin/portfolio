"use client";

import { useEffect, useRef, useState } from "react";

/** Resting speed in characters per second, once the reveal has caught up. */
const BASE_SPEED = 42;
/** Every queued character adds speed, so a burst of tokens drains instead of piling up. */
const CATCH_UP = 4;
const MAX_SPEED = 1200;

/**
 * Reveals `target` one character at a time.
 *
 * The target keeps growing while the answer streams, so the reveal chases it:
 * the further behind it falls, the faster it types. That keeps the rhythm even
 * whether the model sends one token or twenty in the same frame.
 *
 * Pass `skip` to jump to the full text — used when the reader hits Stop.
 */
export function useTypewriter(target: string, skip = false): string {
  const [count, setCount] = useState(0);
  // Fractional progress: at 42 chars/s a frame is worth less than one character.
  const progress = useRef(0);

  useEffect(() => {
    // A shorter target is a different message, not a rewind of this one.
    if (progress.current > target.length) progress.current = 0;

    const finish = () => {
      progress.current = target.length;
      setCount(target.length);
    };

    // A hidden tab gets no animation frames at all, and nobody wants to watch a
    // replay of typing they missed — so the answer is simply already there.
    const instant =
      skip || document.hidden || window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (instant) {
      finish();
      return;
    }

    if (progress.current >= target.length) {
      setCount(Math.floor(progress.current));
      return;
    }

    let frame = 0;
    let last = performance.now();

    const onHidden = () => {
      if (!document.hidden) return;
      cancelAnimationFrame(frame);
      finish();
    };
    document.addEventListener("visibilitychange", onHidden);

    const tick = (now: number) => {
      // A backgrounded tab hands back a huge delta; cap it so nothing teleports.
      const seconds = Math.min((now - last) / 1000, 0.1);
      last = now;

      const backlog = target.length - progress.current;
      const speed = Math.min(MAX_SPEED, BASE_SPEED + backlog * CATCH_UP);
      progress.current = Math.min(target.length, progress.current + speed * seconds);
      setCount(Math.floor(progress.current));

      if (progress.current < target.length) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener("visibilitychange", onHidden);
      cancelAnimationFrame(frame);
    };
  }, [target, skip]);

  return target.slice(0, count);
}
