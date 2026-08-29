"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Draws the timeline's spine as the reader scrolls and lifts each entry in as it
 * arrives.
 *
 * The entries are rendered on the server and are readable without any of this;
 * the spine is a decorative element that simply stays at full height when the
 * script never runs.
 */
export function Timeline({ children, className }: { children: ReactNode; className?: string }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = root.current;
      if (!container) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const spine = container.querySelector<HTMLElement>("[data-spine]");
      const entries = gsap.utils.toArray<HTMLElement>("[data-entry]", container);

      // The spine is tied to the scrollbar rather than to a duration: it should
      // read as a progress bar for the page, not as a clip that plays once.
      if (spine) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 70%",
              end: "bottom 60%",
              scrub: 0.4,
            },
          },
        );
      }

      // Entries animate once, on their own trigger, so a reader scrolling back up
      // is not shown the same reveal twice.
      entries.forEach((entry) => {
        // Whatever is already on screen is left alone. Hiding it to reveal it
        // again would blink at the reader, and an entry parked at opacity 0
        // never comes back if the frames stop — a background tab gets none.
        if (entry.getBoundingClientRect().top < window.innerHeight * 0.85) return;

        gsap.fromTo(
          entry,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: { trigger: entry, start: "top 85%", once: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
