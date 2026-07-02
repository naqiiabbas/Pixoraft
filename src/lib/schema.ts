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

export function buildOrganizationJsonLd(input: {
  socials: string[];
  offices: Array<{ addressLines: string[] }>;
  email: string;
  phone: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: "Pixoraft",
    url: SITE_URL,
    logo: `${SITE_URL}/pixoraft_favicon.png`,
    image: `${SITE_URL}/pixoraft_favicon.png`,
    description:
      "Pixoraft designs, builds, and scales web platforms, mobile apps, and AI automation for businesses in Pakistan, the UK, and the US.",
    email: input.email,
    telephone: input.phone,
    areaServed: ["PK", "GB", "US"],
    sameAs: input.socials,
    address: input.offices.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.addressLines.join(", "),
    })),
  };
}

export function buildArticleJsonLd(input: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: input.title,
    description: input.excerpt,
    datePublished: input.date,
    dateModified: input.date,
    mainEntityOfPage: `${SITE_URL}/blog/${input.slug}`,
    image: `${SITE_URL}/opengraph-image`,
    author: { "@type": "Organization", name: "Pixoraft", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "Pixoraft",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/pixoraft_favicon.png`,
      },
    },
  };
}

export interface BreadcrumbCrumb {
  label: string;
  href?: string;
}

const SITE_URL = "https://pixoraft.com";

export function buildBreadcrumbJsonLd(crumbs: BreadcrumbCrumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${SITE_URL}${crumb.href}` } : {}),
    })),
  };
}
