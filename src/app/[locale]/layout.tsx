import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { profile } from "@/content/profile";
import { isLocale, locales, t, type Locale } from "@/i18n/config";
import { pageAlternates, SITE_URL } from "@/lib/seo";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin", "cyrillic"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Unknown params render rather than being rejected at routing time, which is
 * what lets `notFound()` reach not-found.tsx instead of the framework's bare
 * 404. Nothing is lost by it: src/proxy.ts redirects anything without a known
 * locale prefix before it gets here, and the guard below still catches the rest.
 */
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return {
    // Absolute base for canonical and hreflang links; without it Next resolves the
    // relative alternates below against localhost.
    metadataBase: new URL(SITE_URL),
    alternates: pageAlternates(locale, ""),
    title: {
      default: `${profile.name} — ${t(profile.headline, locale)}`,
      template: `%s — ${profile.name}`,
    },
    description: t(profile.summary, locale),
    openGraph: {
      type: "profile",
      url: `/${locale}`,
      siteName: profile.name,
      title: `${profile.name} — ${t(profile.headline, locale)}`,
      description: t(profile.summary, locale),
      locale,
    },
    // The image itself comes from twitter-image.tsx; without the card type X
    // falls back to the small square thumbnail.
    twitter: { card: "summary_large_image" },
  };
}

/**
 * Person schema. Search engines read the page for a name and a job title anyway;
 * stating them outright is a few lines and removes the guesswork.
 */
function personSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: t(profile.headline, locale),
    description: t(profile.summary, locale),
    url: `${SITE_URL}/${locale}`,
    image: `${SITE_URL}/${locale}/opengraph-image`,
    email: profile.contacts.find((contact) => contact.label === "Email")?.value,
    address: { "@type": "PostalAddress", addressLocality: "Łódź", addressCountry: "PL" },
    sameAs: profile.contacts
      .filter((contact) => contact.href.startsWith("http"))
      .map((contact) => contact.href),
    knowsAbout: profile.stack.flatMap((group) => group.items),
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          // The value is built from local content, never from user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema(locale)) }}
        />
        <SiteHeader locale={locale} />
        <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-5 py-8">
          {children}
        </main>
        <SiteFooter locale={locale} />
        {/* Page views only, no cookies and no consent banner to owe anyone. */}
        <Analytics />
      </body>
    </html>
  );
}
