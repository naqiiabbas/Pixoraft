import type { Metadata } from "next";
import { createPublicClient } from "@/lib/supabase/public";
import { SERVICE_PILLARS } from "@/data/services";

export interface PageSeo {
  path: string;
  title: string | null;
  description: string | null;
  og_image: string | null;
  noindex?: boolean | null;
  updated_at?: string;
}

export interface ManagedPage {
  path: string;
  label: string;
  /** Heading the page is listed under in /admin/seo. */
  group: string;
  defaultTitle: string;
  defaultDescription: string;
}

/** Top-level static pages (fixed copy lives in the components/data). SEO copy
 *  is buyer-intent and US/UK geo-targeted to win client-generating searches. */
const CORE_PAGES: ManagedPage[] = [
  {
    path: "/",
    label: "Home",
    group: "Main pages",
    defaultTitle: "Pixoraft | Web Development Company in the USA & UK",
    defaultDescription:
      "Pixoraft is a digital engineering studio building custom websites, web apps, mobile apps, and AI automation for businesses across the USA and UK. Book a free call.",
  },
  {
    path: "/services",
    label: "Services",
    group: "Main pages",
    defaultTitle: "Web Development & Software Services | USA & UK | Pixoraft",
    defaultDescription:
      "Custom web development, mobile apps, cloud, and AI automation for US and UK businesses. Four practice areas, one accountable team at Pixoraft.",
  },
  {
    path: "/blog",
    label: "Blog",
    group: "Main pages",
    defaultTitle: "Web Development Blog & Insights | Pixoraft",
    defaultDescription:
      "Practical notes on web development, custom websites, AI automation, and shipping software that performs, from the Pixoraft engineering team.",
  },
  {
    path: "/contact",
    label: "Contact",
    group: "Main pages",
    defaultTitle: "Contact Pixoraft | Web Development in the USA & UK",
    defaultDescription:
      "Get a quote for custom web development, apps, or automation. Pixoraft replies within 24 hours, with teams in the US, UK, and Pakistan.",
  },
  {
    path: "/work",
    label: "Work",
    group: "Main pages",
    defaultTitle: "Our Work | Custom Web & Software Projects | Pixoraft",
    defaultDescription:
      "Selected web development and software projects Pixoraft has shipped for clients in the USA and UK. Custom websites and platforms measured by results.",
  },
];

/** Buyer-intent, US/UK geo-targeted SEO copy for every service page, keyed by
 *  path. Kept separate from the on-page marketing copy (pillar.overview,
 *  capability.description) so search titles/descriptions can be tuned for
 *  ranking without changing what renders on the page. */
const SERVICE_SEO: Record<string, { title: string; description: string }> = {
  // Engineering
  "/services/engineering": {
    title: "Software Engineering Services USA & UK | Pixoraft",
    description:
      "Production-grade web platforms, mobile apps, and Web3 built to handle real traffic and revenue. Custom software engineering for US and UK businesses.",
  },
  "/services/engineering/web-development": {
    title: "Custom Web Development Services USA & UK | Pixoraft",
    description:
      "Fast, scalable custom websites, portals, and dashboards built with Next.js and React. Custom web development for US and UK businesses by Pixoraft.",
  },
  "/services/engineering/app-development": {
    title: "Mobile App Development Services USA & UK | Pixoraft",
    description:
      "Native and cross-platform iOS and Android apps that feel fast and stay in sync. Mobile app development for US and UK companies by Pixoraft.",
  },
  "/services/engineering/blockchain-web3": {
    title: "Blockchain & Web3 Development USA & UK | Pixoraft",
    description:
      "Smart contracts, wallets, and on-chain products built on audited, tested patterns. Blockchain and Web3 development for US and UK clients by Pixoraft.",
  },
  // AI and Automation
  "/services/ai-automation": {
    title: "AI & Business Automation Services USA & UK | Pixoraft",
    description:
      "Custom AI solutions, workflow automation, and data analytics that remove manual work. AI and automation built for US and UK teams by Pixoraft.",
  },
  "/services/ai-automation/ai-solutions": {
    title: "Custom AI Solutions & Development USA & UK | Pixoraft",
    description:
      "Custom AI features and RAG assistants grounded in your own data, with guardrails. AI solutions development for US and UK businesses by Pixoraft.",
  },
  "/services/ai-automation/business-process-automation": {
    title: "Business Process Automation Services USA & UK | Pixoraft",
    description:
      "Automate workflows across the tools you already use and cut manual work. Business process automation for US and UK teams by Pixoraft.",
  },
  "/services/ai-automation/data-analytics": {
    title: "Data Analytics & Dashboards Services USA & UK | Pixoraft",
    description:
      "Data pipelines, dashboards, and reporting your team can act on. Custom data analytics for US and UK businesses, built by Pixoraft.",
  },
  // Cloud and DevOps
  "/services/cloud-devops": {
    title: "Cloud & DevOps Services USA & UK | Pixoraft",
    description:
      "Cloud architecture, CI/CD pipelines, and managed infrastructure that deploy fast and scale on demand. DevOps for US and UK businesses by Pixoraft.",
  },
  "/services/cloud-devops/cloud-solutions": {
    title: "Cloud Solutions & Architecture USA & UK | Pixoraft",
    description:
      "Scalable, cost-efficient cloud architecture on AWS, GCP, and Azure. Cloud solutions for US and UK businesses, designed and managed by Pixoraft.",
  },
  "/services/cloud-devops/devops-cicd": {
    title: "DevOps & CI/CD Services USA & UK | Pixoraft",
    description:
      "Automated CI/CD pipelines from commit to production with safe deploys and rollbacks. DevOps services for US and UK teams by Pixoraft.",
  },
  "/services/cloud-devops/infrastructure-management": {
    title: "Infrastructure Management Services USA & UK | Pixoraft",
    description:
      "Monitored, patched, and backed-up infrastructure with alerting and disaster recovery. Infrastructure management for US and UK businesses by Pixoraft.",
  },
  // Design and Growth
  "/services/design-growth": {
    title: "UI/UX Design & Digital Marketing USA & UK | Pixoraft",
    description:
      "Conversion-focused UI/UX design, branding, and SEO campaigns for US and UK businesses. Design and growth measured by results, not decoration.",
  },
  "/services/design-growth/ui-ux-design": {
    title: "UI/UX Design Services USA & UK | Pixoraft",
    description:
      "Product and web interface design, design systems, and prototypes built to convert. UI/UX design for US and UK businesses by Pixoraft.",
  },
  "/services/design-growth/graphic-design-video": {
    title: "Graphic Design & Video Production USA & UK | Pixoraft",
    description:
      "Brand creative, product videos, and motion graphics that perform on every platform. Graphic design and video for US and UK brands by Pixoraft.",
  },
  "/services/design-growth/seo-digital-marketing": {
    title: "SEO & Digital Marketing Services USA & UK | Pixoraft",
    description:
      "Technical SEO, paid campaigns, and landing pages tied to real revenue. SEO and digital marketing for US and UK businesses by Pixoraft.",
  },
};

/** Service pillar and sub-service pages. Structure (path/label) is derived from
 *  the service data so it always matches what ships; SEO defaults come from the
 *  tuned SERVICE_SEO copy above (with a safe fallback). */
const SERVICE_PAGES: ManagedPage[] = SERVICE_PILLARS.flatMap((pillar) => {
  const pillarPath = `/services/${pillar.slug}`;
  return [
    {
      path: pillarPath,
      label: pillar.title,
      group: "Service pages",
      defaultTitle: SERVICE_SEO[pillarPath]?.title ?? `${pillar.title} | Pixoraft`,
      defaultDescription: SERVICE_SEO[pillarPath]?.description ?? pillar.overview,
    },
    ...pillar.capabilities.map((cap) => {
      const subPath = `${pillarPath}/${cap.slug}`;
      return {
        path: subPath,
        label: `${pillar.title} / ${cap.name}`,
        group: "Service pages",
        defaultTitle: SERVICE_SEO[subPath]?.title ?? `${cap.name} | Pixoraft`,
        defaultDescription:
          SERVICE_SEO[subPath]?.description ?? cap.description ?? cap.tagline,
      };
    }),
  ];
});

/** Every static page whose SEO is editable from /admin/seo: the core pages plus
 *  all service pages. Individual blog posts carry their own SEO (edit in Posts). */
export const MANAGED_PAGES: ManagedPage[] = [...CORE_PAGES, ...SERVICE_PAGES];

export async function getPageSeo(path: string): Promise<PageSeo | null> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("page_seo")
    .select("*")
    .eq("path", path)
    .maybeSingle();
  return (data as PageSeo | null) ?? null;
}

export async function getAllPageSeo(): Promise<PageSeo[]> {
  const supabase = createPublicClient();
  const { data } = await supabase.from("page_seo").select("*");
  return (data as PageSeo[] | null) ?? [];
}

/**
 * Builds a page's Metadata from its admin override, falling back to the
 * supplied defaults. Titles are absolute so the admin controls them exactly.
 * Use this for pages whose defaults come from data (e.g. service pages).
 */
export async function resolveMetadataFor(
  path: string,
  fallback: { title: string; description?: string },
): Promise<Metadata> {
  const seo = await getPageSeo(path);

  const title = seo?.title || fallback.title;
  const description = seo?.description || fallback.description || undefined;
  const ogImage = seo?.og_image || undefined;

  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    ...(seo?.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      url: path,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
  };
}

/**
 * Builds Metadata for a registered managed page, using its admin override and
 * falling back to the page's registered defaults.
 */
export async function resolveMetadata(path: string): Promise<Metadata> {
  const page = MANAGED_PAGES.find((p) => p.path === path);
  return resolveMetadataFor(path, {
    title: page?.defaultTitle || "Pixoraft",
    description: page?.defaultDescription,
  });
}
