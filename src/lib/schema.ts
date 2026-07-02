/**
 * JSON-LD builders. Keep structured data generation here so pages and sections
 * emit consistent schema.org markup from the same typed data sources.
 */

export interface FaqEntry {
  question: string;
  answer: string;
}

export function buildFaqJsonLd(items: FaqEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
