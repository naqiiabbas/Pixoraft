import type { MetadataRoute } from "next";
import { SERVICE_PILLARS } from "@/data/services";
import { getPublishedPosts } from "@/lib/posts";

const BASE = "https://pixoraft.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = ["", "/services", "/blog", "/contact"];

  const pillarPaths = SERVICE_PILLARS.map((p) => `/services/${p.slug}`);

  const subPaths = SERVICE_PILLARS.flatMap((p) =>
    p.capabilities.map((c) => `/services/${p.slug}/${c.slug}`),
  );

  let blogPaths: string[] = [];
  try {
    const posts = await getPublishedPosts();
    blogPaths = posts.map((p) => `/blog/${p.slug}`);
  } catch {
    // If Supabase is unreachable at build, ship the sitemap without posts.
    blogPaths = [];
  }

  return [...staticPaths, ...pillarPaths, ...subPaths, ...blogPaths].map(
    (path) => ({
      url: `${BASE}${path}`,
      changeFrequency: "monthly",
      priority: path === "" ? 1 : 0.7,
    }),
  );
}
