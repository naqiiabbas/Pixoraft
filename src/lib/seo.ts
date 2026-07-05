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

/** Top-level static pages (fixed copy lives in the components/data). */
const CORE_PAGES: ManagedPage[] = [
  {
    path: "/",
    label: "Home",
    group: "Main pages",
    defaultTitle: "Pixoraft, digital engineering studio",
    defaultDescription:
      "Pixoraft designs, builds, and scales web platforms, mobile apps, and AI automation for businesses in Pakistan, the UK, and the US.",
  },
  {
    path: "/services",
    label: "Services",
    group: "Main pages",
    defaultTitle: "Services | Pixoraft",
    defaultDescription:
      "Four practice areas, one team: engineering, AI and automation, cloud and DevOps, and design and growth. Web platforms, mobile apps, and AI automation built to perform.",
  },
  {
    path: "/blog",
    label: "Blog",
    group: "Main pages",
    defaultTitle: "Blog | Pixoraft",
    defaultDescription:
      "Notes on building software that performs: engineering, AI automation, and how we ship. From the Pixoraft team.",
  },
  {
    path: "/contact",
    label: "Contact",
    group: "Main pages",
    defaultTitle: "Contact | Pixoraft",
    defaultDescription:
      "Book a strategy call or send a project inquiry. Pixoraft replies within 24 hours, with offices in the US, UK, and Pakistan.",
  },
  {
    path: "/work",
    label: "Work",
    group: "Main pages",
    defaultTitle: "Work | Pixoraft",
    defaultDescription:
      "Selected work from Pixoraft: platforms, apps, and automation built to perform. Measured by results, not screenshots.",
  },
];

/** Service pillar and sub-service pages, derived from the same data the pages
 *  render from so the admin defaults always match what ships. */
const SERVICE_PAGES: ManagedPage[] = SERVICE_PILLARS.flatMap((pillar) => [
  {
    path: `/services/${pillar.slug}`,
    label: pillar.title,
    group: "Service pages",
    defaultTitle: `${pillar.title} | Pixoraft`,
    defaultDescription: pillar.overview,
  },
  ...pillar.capabilities.map((cap) => ({
    path: `/services/${pillar.slug}/${cap.slug}`,
    label: `${pillar.title} / ${cap.name}`,
    group: "Service pages",
    defaultTitle: `${cap.name} | Pixoraft`,
    defaultDescription: cap.description ?? cap.tagline,
  })),
]);

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
