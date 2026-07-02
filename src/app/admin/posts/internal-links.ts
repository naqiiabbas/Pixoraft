import { SERVICE_PILLARS } from "@/data/services";
import { getAllPosts } from "@/lib/posts";
import type { InternalLink } from "./PostForm";

/**
 * Builds the list of internal destinations offered in the editor's link picker:
 * core pages, every service page, and existing posts.
 */
export async function getInternalLinks(): Promise<InternalLink[]> {
  const base: InternalLink[] = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const services: InternalLink[] = SERVICE_PILLARS.flatMap((p) => [
    { label: `Service: ${p.title}`, href: `/services/${p.slug}` },
    ...p.capabilities.map((c) => ({
      label: `Service: ${p.title} / ${c.name}`,
      href: `/services/${p.slug}/${c.slug}`,
    })),
  ]);

  let posts: InternalLink[] = [];
  try {
    const all = await getAllPosts();
    posts = all.map((p) => ({ label: `Post: ${p.title}`, href: `/blog/${p.slug}` }));
  } catch {
    posts = [];
  }

  return [...base, ...services, ...posts];
}
