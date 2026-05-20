import type { Metadata, Viewport } from "next";
import { DM_Sans, Noto_Sans_JP, Syne, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const notoJp = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-jp",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-syne",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://z-data.io";
const BASE_PATH = "/company";
const CANONICAL_URL = `${SITE_URL}${BASE_PATH}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Genova Inc. — 価値あるデータを、ゼロから。",
    template: "%s | Genova Inc.",
  },
  description:
    "Genova株式会社は、企業が「自分たちだけの声」を集め、AIで価値に変えるためのインフラを開発するスタートアップです。ゼロパーティデータプラットフォーム「Z-Data」を提供。",
  keywords: [
    "Genova",
    "ジェノバ",
    "Z-Data",
    "ゼロパーティデータ",
    "ZPD",
    "B2B SaaS",
    "AI",
    "営業",
    "マーケティング",
  ],
  authors: [{ name: "Genova Inc." }],
  creator: "Genova Inc.",
  publisher: "Genova Inc.",
  alternates: {
    canonical: CANONICAL_URL,
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: CANONICAL_URL,
    siteName: "Genova Inc.",
    title: "Genova Inc. — 価値あるデータを、ゼロから。",
    description: "日本を、AI時代の勝者にする。",
  },
  twitter: {
    card: "summary_large_image",
    title: "Genova Inc. — 価値あるデータを、ゼロから。",
    description: "日本を、AI時代の勝者にする。",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF7" },
    { media: "(prefers-color-scheme: dark)", color: "#1A1A1A" },
  ],
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Genova株式会社",
  alternateName: "Genova Inc.",
  url: CANONICAL_URL,
  logo: `${CANONICAL_URL}/logos/genova/horizontal/genova_h_color.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "南青山3-5-2 南青山第一韮澤ビル3F",
    addressLocality: "港区",
    addressRegion: "東京都",
    postalCode: "107-0062",
    addressCountry: "JP",
  },
  foundingDate: "2026-05-01",
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      className={`${dmSans.variable} ${notoJp.variable} ${syne.variable} ${spaceGrotesk.variable}`}
    >
      <body className="font-sans bg-paper text-charcoal antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded-sm focus:bg-charcoal focus:px-3 focus:py-2 focus:text-white"
        >
          メインコンテンツへスキップ
        </a>
        {children}

        {/* Structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />

        {/* Vercel Web Analytics & Speed Insights — page views, visitors,
            Core Web Vitals. Free on Hobby/Pro; no cookies. */}
        <Analytics />
        <SpeedInsights />

        {/* Google Analytics 4 — only loads if env var is set, so the
            site stays cookie-free until we explicitly opt in. */}
        {GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
