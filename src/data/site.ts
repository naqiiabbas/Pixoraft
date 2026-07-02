/**
 * Site level data: brand, contact details, and social links.
 * Kept here so layout and footer read from one typed source.
 */

export type SocialPlatform = "instagram" | "linkedin" | "fiverr";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  href: string;
}

export interface PhoneContact {
  label: string;
  /** Human readable number. */
  display: string;
  /** Digits with country code for tel: links. */
  tel: string;
  /** Digits with country code for wa.me links, when WhatsApp is available. */
  whatsapp?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  email: string;
  socials: SocialLink[];
  phones: PhoneContact[];
}

export const SITE: SiteConfig = {
  name: "Pixoraft",
  description:
    "Digital engineering studio building web platforms, mobile apps, and AI automation for teams in Pakistan, the UK, and the US.",
  email: "info@pixoraft.com",
  socials: [
    {
      platform: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/pixoraft_solutions/",
    },
    {
      platform: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/pixoraft/",
    },
    {
      platform: "fiverr",
      label: "Fiverr",
      href: "https://www.fiverr.com/s/GzEdB67",
    },
  ],
  phones: [
    {
      label: "Call, US",
      display: "+1 520 848 3966",
      tel: "+15208483966",
    },
    {
      label: "Call or WhatsApp, UK",
      display: "+44 7877 809492",
      tel: "+447877809492",
      whatsapp: "447877809492",
    },
  ],
};
