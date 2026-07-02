import { getPublishedPosts, type Post } from "@/lib/posts";

const BASE = "https://pixoraft.com";

export const dynamic = "force-dynamic";

function escapeXml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  let posts: Post[] = [];
  try {
    posts = await getPublishedPosts();
  } catch {
    posts = [];
  }

  const items = posts
    .map(
      (p) => `
    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${BASE}/blog/${p.slug}</link>
      <guid isPermaLink="true">${BASE}/blog/${p.slug}</guid>
      <description>${escapeXml(p.excerpt ?? "")}</description>
      <pubDate>${new Date(p.published_at ?? p.created_at).toUTCString()}</pubDate>${
        p.category ? `\n      <category>${escapeXml(p.category)}</category>` : ""
      }
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Pixoraft Blog</title>
    <link>${BASE}/blog</link>
    <description>Notes on building software that performs. Engineering, AI automation, and how we ship.</description>
    <language>en</language>
    <atom:link href="${BASE}/blog/rss.xml" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600",
    },
  });
}
