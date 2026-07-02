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

export interface Office {
  id: "usa" | "uk" | "pk";
  label: string;
  region: string;
  addressLines: string[];
  phoneDisplay: string;
  tel: string;
  whatsapp?: string;
}

export interface SiteConfig {
  name: string;
  description: string;
  email: string;
  socials: SocialLink[];
  phones: PhoneContact[];
}

/** Offices in switch order. USA is the default (shown first). */
export const OFFICES: Office[] = [
  {
    id: "usa",
    label: "United States",
    region: "Phoenix HQ",
    addressLines: ["101 North First Avenue", "Suite 2325", "Phoenix, AZ 85003", "USA"],
    phoneDisplay: "+1 520 848 3966",
    tel: "+15208483966",
  },
  {
    id: "uk",
    label: "United Kingdom",
    region: "Birmingham",
    addressLines: ["3rd Floor, 10 Livery St", "Birmingham B3 2NU", "United Kingdom"],
    phoneDisplay: "+44 7877 809492",
    tel: "+447877809492",
    whatsapp: "447877809492",
  },
  {
    id: "pk",
    label: "Pakistan",
    region: "Islamabad",
    addressLines: [
      "Office No 12, Business Square",
      "Gulberg Greens",
      "Islamabad, 44000",
      "Pakistan",
    ],
    phoneDisplay: "+92 346 1513212",
    tel: "+923461513212",
  },
];

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
