/**
 * FAQ content. Six items in company voice. Rendered as an accordion and also
 * emitted as FAQPage JSON-LD from this same source (see lib/schema.ts).
 */

import type { FaqEntry } from "@/lib/schema";

export type FaqItem = FaqEntry;

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What services does Pixoraft offer?",
    answer:
      "We build and run web platforms, mobile apps, AI automation, cloud and DevOps, and design and growth. Four practice areas, one accountable team.",
  },
  {
    question: "Which regions do you work with?",
    answer:
      "We work with businesses in Pakistan, the UK, and the US, with support coverage across time zones so you are never waiting a full day for a reply.",
  },
  {
    question: "How long does a project take?",
    answer:
      "Most projects ship in weeks, not quarters. We agree on a scoped timeline with fixed milestones before any code is written, so you can plan around it.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "It depends on scope. We offer fixed project pricing, hourly capacity, and monthly maintenance, so you only pay for what your product actually needs.",
  },
  {
    question: "Do you provide support after launch?",
    answer:
      "Yes. We offer 24/7 support coverage and monthly maintenance to keep live products monitored, updated, and fast well after launch day.",
  },
  {
    question: "How do we start a project?",
    answer:
      "Book a strategy call. We review your goals, agree on scope, and send a fixed roadmap with timeline and milestones before work begins.",
  },
];
