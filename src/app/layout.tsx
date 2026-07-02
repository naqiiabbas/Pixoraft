import type { Metadata } from "next";
import { Google_Sans_Flex, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";

/**
 * FONTS
 * Google Sans Flex is the global typeface (display + body), per the owner's
 * direction. It is a variable font, self-hosted at build time by next/font
 * (no runtime CDN request). JetBrains Mono is kept only for the "system
 * readout" signature motif (bracketed status lines).
 *   --font-display : headings / wordmark  (Google Sans Flex)
 *   --font-sans    : body copy            (Google Sans Flex)
 *   --font-mono    : readout accents      (JetBrains Mono)
 */
const fontGoogleSans = Google_Sans_Flex({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const fontDisplay = Google_Sans_Flex({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://pixoraft.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pixoraft, digital engineering studio",
    template: "%s | Pixoraft",
  },
  description:
    "Pixoraft designs, builds, and scales web platforms, mobile apps, and AI automation for businesses in Pakistan, the UK, and the US.",
  openGraph: {
    type: "website",
    siteName: "Pixoraft",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
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
      className={`${fontGoogleSans.variable} ${fontDisplay.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Header />
        {children}
      </body>
    </html>
  );
}
