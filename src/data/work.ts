/**
 * Portfolio / case studies. Phase 1 placeholders.
 *
 * TODO-CONFIRM: Every entry here is representative placeholder work. Client
 * names, industries, and all metrics must be replaced with real, approved case
 * studies before this page is promoted. Structured so a CMS can replace it.
 */

export interface CaseStudy {
  slug: string;
  title: string;
  industry: string;
  /** One line result statement. */
  result: string;
  /** Initials shown on the gradient cover. */
  initials: string;
  tags: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "dispatch-platform",
    title: "Dispatch platform rebuild", // TODO-CONFIRM
    industry: "Logistics",
    result: "Rebuilt dispatch platform, 40% faster booking flow", // TODO-CONFIRM
    initials: "DP",
    tags: ["next.js", "node", "postgres"],
  },
  {
    slug: "patient-booking",
    title: "Patient booking portal", // TODO-CONFIRM
    industry: "Healthcare",
    result: "Online scheduling, 3x faster appointment booking", // TODO-CONFIRM
    initials: "PB",
    tags: ["react", "node", "stripe"],
  },
  {
    slug: "headless-storefront",
    title: "Headless storefront", // TODO-CONFIRM
    industry: "E-commerce",
    result: "Replatformed storefront, 55% faster page loads", // TODO-CONFIRM
    initials: "HS",
    tags: ["next.js", "shopify", "cdn"],
  },
  {
    slug: "listings-marketplace",
    title: "Listings marketplace", // TODO-CONFIRM
    industry: "Real Estate",
    result: "Property marketplace, 2x lead conversion", // TODO-CONFIRM
    initials: "LM",
    tags: ["next.js", "maps", "search"],
  },
  {
    slug: "ops-automation",
    title: "Operations automation", // TODO-CONFIRM
    industry: "Startups",
    result: "Automated onboarding, 20 hours saved each week", // TODO-CONFIRM
    initials: "OA",
    tags: ["n8n", "webhooks", "openai"],
  },
  {
    slug: "analytics-dashboard",
    title: "Unified analytics dashboard", // TODO-CONFIRM
    industry: "SaaS",
    result: "One source of truth across five data sources", // TODO-CONFIRM
    initials: "AD",
    tags: ["python", "sql", "dashboards"],
  },
];
