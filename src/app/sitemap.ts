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

  const pageEntries: MetadataRoute.Sitemap = [
    ...staticPaths,
    ...pillarPaths,
    ...subPaths,
  ].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const posts = await getPublishedPosts();
    postEntries = posts.map((p) => ({
      url: `${BASE}/blog/${p.slug}`,
      lastModified: new Date(p.updated_at),
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    postEntries = [];
  }

  return [...pageEntries, ...postEntries];
}
