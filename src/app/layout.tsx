import type { Metadata } from "next";
import localFont from "next/font/local";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

/**
 * FONTS
 * Google Sans Flex is the global typeface (display + body), per the owner's
 * direction. It is self-hosted from a local variable woff2 (latin subset) via
 * next/font/local. Loading it locally avoids the Google font loader's fallback
 * metric lookup, which has no data for this newer face and warns at build time.
 * JetBrains Mono is kept only for the "system readout" motif.
 *   --font-display : headings / wordmark  (Google Sans Flex)
 *   --font-sans    : body copy            (Google Sans Flex)
 *   --font-mono    : readout accents      (JetBrains Mono)
 */
const fontGoogleSans = localFont({
  src: "./fonts/GoogleSansFlex-latin.woff2",
  variable: "--font-sans",
  display: "swap",
  weight: "1 1000",
  style: "normal",
  fallback: ["system-ui", "arial"],
});

const fontDisplay = localFont({
  src: "./fonts/GoogleSansFlex-latin.woff2",
  variable: "--font-display",
  display: "swap",
  weight: "1 1000",
  style: "normal",
  fallback: ["system-ui", "arial"],
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
        <Footer />
      </body>
    </html>
  );
}
