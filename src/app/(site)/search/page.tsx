import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { getPublishedPosts } from "@/lib/posts";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { Breadcrumb } from "@/components/ui/Breadcrumb";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search | Pixoraft",
  description: "Search Pixoraft blog posts.",
  robots: { index: false, follow: true },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();

  const results = query
    ? (await getPublishedPosts()).filter((p) =>
        `${p.title} ${p.excerpt ?? ""} ${p.content ?? ""}`
          .toLowerCase()
          .includes(query),
      )
    : [];

  return (
    <main className="relative flex-1">
      <ServiceBackground />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-32">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Search" }]}
        />

        <h1 className="mt-10 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Search
        </h1>

        <form action="/search" method="get" className="mt-6">
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur-md focus-within:border-accent">
            <Search className="h-5 w-5 text-faint" />
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search blog posts..."
              className="w-full bg-transparent py-1.5 text-sm text-foreground outline-none placeholder:text-faint"
              autoFocus
            />
          </div>
        </form>

        <div className="mt-10">
          {!query ? (
            <p className="text-muted">Type a query to search the blog.</p>
          ) : results.length === 0 ? (
            <p className="text-muted">
              No results for <span className="text-foreground">{q}</span>.
            </p>
          ) : (
            <ul className="space-y-4">
              {results.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/[0.08]"
                  >
                    <h2 className="font-display text-lg font-semibold text-foreground">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-1 text-sm text-muted">{post.excerpt}</p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}
