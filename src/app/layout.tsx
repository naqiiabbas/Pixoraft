import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/**
 * PLACEHOLDER FONTS (TODO-CONFIRM): The final type direction is supplied by the
 * project owner before build. These next/font/google faces are self-hosted at
 * build time (no runtime CDN request) and stand in until the real faces land.
 * Swap the imports here only; components reference the CSS variables below.
 *   --font-display : headings / wordmark
 *   --font-sans    : body copy
 *   --font-mono    : the "system readout" signature motif
 */
const fontDisplay = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const fontSans = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
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
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
