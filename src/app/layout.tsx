import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

/** A precise sans lets the mascot supply the playfulness. */
const body = Geist({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

/** Utility: on-chain values are ledger data and are set as ledger data. */
const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

/**
 * Canonical origin for metadataBase, so OpenGraph images resolve to absolute
 * URLs. NEXT_PUBLIC_SITE_URL wins when set; otherwise Vercel supplies the
 * project's production domain (set even on preview deployments), which means a
 * correct link preview needs no dashboard configuration.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/+$/, "");
  }

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercelProduction) {
    return `https://${vercelProduction.replace(/^https?:\/\//, "").replace(/\/+$/, "")}`;
  }

  return "http://localhost:3000";
}

const siteUrl = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MemePet — adopt the meme, grow the community",
    template: "%s · MemePet",
  },
  description:
    "Adopt a meme-community mascot, care for it once a day, and add to shared habitat progress. Growth comes from participation, not from spending a token.",
  applicationName: "MemePet",
  openGraph: {
    type: "website",
    siteName: "MemePet",
    title: "MemePet — adopt the meme, grow the community",
    description:
      "Adopt a meme-community mascot, care for it once a day, and add to shared habitat progress.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MemePet — adopt the meme, grow the community",
    description:
      "Adopt a meme-community mascot, care for it once a day, and add to shared habitat progress.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
