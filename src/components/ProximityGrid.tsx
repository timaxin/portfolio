"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

/** How close the pointer has to be before a tile reacts at all, in pixels. */
const RADIUS = 180;
const MAX_SCALE = 1.55;
/** Frames of stillness after the pointer leaves before the loop stops working. */
const SETTLE_FRAMES = 40;

/**
 * Scales the tiles it wraps by their distance to the pointer.
 *
 * The children are rendered on the server; this only adds behaviour, so the grid
 * is complete without JavaScript. One ticker drives every tile — a listener per
 * tile would mean fifty handlers competing for the same frame.
 */
export function ProximityGrid({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = root.current;
      if (!container) return;

      const tiles = gsap.utils.toArray<HTMLElement>("[data-tile]", container);
      if (tiles.length === 0) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      let disposed = false;
      let released: (() => void) | undefined;

      // Proximity only starts once the entrance is done: two tweens writing the
      // same scale on the same tile fight, and the loser is whichever renders
      // first that frame.
      const startProximity = () => {
        if (disposed) return;

        // quickTo silently ignores the `scale` shorthand — CSSPlugin expands it
        // into two properties and quickTo drives exactly one. The axes have to be
        // handed over separately.
        const setScale = tiles.map((tile) => {
          const box = tile.querySelector<HTMLElement>("[data-scale]");
          const tween = { duration: 0.4, ease: "power3.out" };
          const scaleX = gsap.quickTo(box, "scaleX", tween);
          const scaleY = gsap.quickTo(box, "scaleY", tween);
          return (value: number) => {
            scaleX(value);
            scaleY(value);
          };
        });
        const setLabel = tiles.map((tile) => {
          const label = tile.querySelector<HTMLElement>("[data-label]");
          return label && gsap.quickTo(label, "opacity", { duration: 0.4, ease: "power3.out" });
        });

        let bounds = container.getBoundingClientRect();
        const centers = tiles.map(() => ({ x: 0, y: 0 }));
        const layers = tiles.map(() => 0);

        // Tiles scale around their own centre, so a measured centre stays correct
        // however large the tile currently is.
        const measure = () => {
          bounds = container.getBoundingClientRect();
          tiles.forEach((tile, index) => {
            const rect = tile.getBoundingClientRect();
            centers[index].x = rect.left - bounds.left + rect.width / 2;
            centers[index].y = rect.top - bounds.top + rect.height / 2;
          });
        };
        measure();

        const pointer = { x: 0, y: 0, near: false };
        let idleFrames = 0;

        const onMove = (event: PointerEvent) => {
          pointer.x = event.clientX - bounds.left;
          pointer.y = event.clientY - bounds.top;
          pointer.near =
            pointer.x > -RADIUS &&
            pointer.y > -RADIUS &&
            pointer.x < bounds.width + RADIUS &&
            pointer.y < bounds.height + RADIUS;
          if (pointer.near) idleFrames = 0;
        };

        const clamp = gsap.utils.clamp(0, RADIUS);
        const toScale = gsap.utils.mapRange(0, RADIUS, MAX_SCALE, 1);
        const toOpacity = gsap.utils.mapRange(0, RADIUS, 1, 0.55);

        const update = () => {
          // With the pointer away and everything back at rest, the frame costs
          // nothing at all.
          if (!pointer.near) {
            if (idleFrames > SETTLE_FRAMES) return;
            idleFrames += 1;
          }

          for (let index = 0; index < tiles.length; index += 1) {
            const center = centers[index];
            const distance = pointer.near
              ? clamp(Math.hypot(pointer.x - center.x, pointer.y - center.y))
              : RADIUS;

            setScale[index](toScale(distance));
            setLabel[index]?.(toOpacity(distance));

            // Keeps a magnified tile over its neighbours; only written on change,
            // and z-index costs no layout.
            const layer = Math.round((RADIUS - distance) / 20);
            if (layer !== layers[index]) {
              tiles[index].style.zIndex = String(layer);
              layers[index] = layer;
            }
          }
        };

        window.addEventListener("pointermove", onMove, { passive: true });
        window.addEventListener("scroll", measure, { passive: true });
        const observer = new ResizeObserver(measure);
        observer.observe(container);
        gsap.ticker.add(update);

        released = () => {
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("scroll", measure);
          observer.disconnect();
          gsap.ticker.remove(update);
        };
      };

      // The grid assembles outwards from its middle. Scale only: the tiles are
      // already painted from the server, and fading them from zero on hydration
      // would blink them out first. `fromTo` rather than `from`, because `from`
      // captures whatever scale it finds as the end value — and on a remount
      // mid-animation that is a shrunken tile that never grows back.
      gsap.fromTo(
        tiles,
        { scale: 0.8 },
        {
          scale: 1,
          duration: 0.5,
          ease: "power3.out",
          stagger: { each: 0.02, from: "center", grid: "auto" },
          // Nothing to hover with — the entrance is the whole show on touch.
          onComplete: window.matchMedia("(pointer: fine)").matches ? startProximity : undefined,
        },
      );

      return () => {
        disposed = true;
        released?.();
      };
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
