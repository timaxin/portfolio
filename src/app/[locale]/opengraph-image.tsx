import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { locales } from "@/i18n/config";

/** Image routes do not inherit the layout's params — without this the card is
 *  rendered on demand instead of being baked into the deployment. */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const alt = `${profile.name} — Senior Full-Stack Engineer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * The card a link to the site unfurls into on LinkedIn, Slack and X.
 *
 * Deliberately locale-independent: the name, the headline and the host read the
 * same in all three languages, and skipping Cyrillic means no font file has to
 * be shipped to the image renderer.
 */
export default async function Image() {
  const photo = await readFile(join(process.cwd(), "src/images/profile-photo.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 88px",
          // The dark palette from globals.css — a card is read against dark
          // chrome far more often than light.
          background: "linear-gradient(135deg, #04050b 0%, #0d1020 55%, #171a30 100%)",
          color: "#f4f5ff",
          fontFamily: "sans-serif",
        }}
      >
        {/* Satori renders plain img tags — next/image has no meaning here. */}
        <img
          src={photoSrc}
          alt=""
          width={300}
          height={300}
          style={{ borderRadius: 150, border: "4px solid #8b7dff" }}
        />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, letterSpacing: -1.5 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 30, color: "#8b7dff", marginTop: 14 }}>
            Senior Full-Stack Engineer
          </div>
          <div style={{ fontSize: 26, color: "#a9b0d4", marginTop: 8 }}>
            React · Next.js · Node.js · TypeScript
          </div>
          {/* One expression, not text plus expression: Satori rejects a div with
              more than one child unless it is told how to lay them out. */}
          <div style={{ fontSize: 24, color: "#a9b0d4", marginTop: 40 }}>
            {`${profile.yearsOfExperience} years · Łódź, Poland · www.timcv.pl`}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
