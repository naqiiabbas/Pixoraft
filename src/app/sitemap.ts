import type { MetadataRoute } from "next";
import { SERVICE_PILLARS } from "@/data/services";

const BASE = "https://pixoraft.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/services", "/contact"];

  const pillarPaths = SERVICE_PILLARS.map((p) => `/services/${p.slug}`);

  const subPaths = SERVICE_PILLARS.flatMap((p) =>
    p.capabilities.map((c) => `/services/${p.slug}/${c.slug}`),
  );

  return [...staticPaths, ...pillarPaths, ...subPaths].map((path) => ({
    url: `${BASE}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
