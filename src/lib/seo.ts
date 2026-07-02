import type { Metadata } from "next";
import { createPublicClient } from "@/lib/supabase/public";

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
  defaultTitle: string;
  defaultDescription: string;
}

/** Static pages whose SEO is editable from /admin/seo. Dynamic pages (blog
 *  posts, service pages) carry their own per-item SEO. */
export const MANAGED_PAGES: ManagedPage[] = [
  {
    path: "/",
    label: "Home",
    defaultTitle: "Pixoraft, digital engineering studio",
    defaultDescription:
      "Pixoraft designs, builds, and scales web platforms, mobile apps, and AI automation for businesses in Pakistan, the UK, and the US.",
  },
  {
    path: "/services",
    label: "Services",
    defaultTitle: "Services | Pixoraft",
    defaultDescription:
      "Four practice areas, one team: engineering, AI and automation, cloud and DevOps, and design and growth. Web platforms, mobile apps, and AI automation built to perform.",
  },
  {
    path: "/blog",
    label: "Blog",
    defaultTitle: "Blog | Pixoraft",
    defaultDescription:
      "Notes on building software that performs: engineering, AI automation, and how we ship. From the Pixoraft team.",
  },
  {
    path: "/contact",
    label: "Contact",
    defaultTitle: "Contact | Pixoraft",
    defaultDescription:
      "Book a strategy call or send a project inquiry. Pixoraft replies within 24 hours, with offices in the US, UK, and Pakistan.",
  },
  {
    path: "/work",
    label: "Work",
    defaultTitle: "Work | Pixoraft",
    defaultDescription:
      "Selected work from Pixoraft: platforms, apps, and automation built to perform. Measured by results, not screenshots.",
  },
];

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
 * registered defaults. Titles are absolute so the admin controls them exactly.
 */
export async function resolveMetadata(path: string): Promise<Metadata> {
  const page = MANAGED_PAGES.find((p) => p.path === path);
  const seo = await getPageSeo(path);

  const title = seo?.title || page?.defaultTitle || "Pixoraft";
  const description = seo?.description || page?.defaultDescription || undefined;
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
