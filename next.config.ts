import type { NextConfig } from "next";

/**
 * A baseline that costs nothing to add, on every response. Deliberately not a
 * Content-Security-Policy: that needs an explicit allowlist for Vercel Analytics'
 * script origin and any future third-party script, and getting it wrong breaks
 * things silently rather than insecurely — worth its own pass, not a drive-by one.
 */
const securityHeaders = [
  // Nothing here is meant to sit in someone else's iframe — closes the classic
  // clickjacking setup (an invisible frame of this site over a fake button).
  { key: "X-Frame-Options", value: "DENY" },
  // Stops a browser from re-guessing a response's type from its content, which
  // is how a misconfigured upload endpoint turns into stored XSS elsewhere. This
  // site has no upload endpoint, but the header is free.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Sends the full URL only to this site's own pages; a cross-origin link (a
  // project's GitHub, LinkedIn) gets just the origin, not the page someone was
  // reading when they clicked it.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The page asks none of these of the browser, so it declares that up front
  // rather than leaving the default open to whatever a future script wants.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
