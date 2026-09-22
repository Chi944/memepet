import type { Metadata } from "next";
import { Baloo_2, JetBrains_Mono, Nunito_Sans } from "next/font/google";
import "./globals.css";

/** Display: rounded and toy-like, to match the clay-render mascot. */
const display = Baloo_2({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

/** Body: soft humanist sans, legible at 390px. */
const body = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

/** Utility: on-chain values are ledger data and are set as ledger data. */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "700"],
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
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
