import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { getPublishedPosts, initialsFromTitle } from "@/lib/posts";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { CTASection } from "@/components/sections/CTASection";
import { resolveMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const meta = await resolveMetadata("/blog");
  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      types: { "application/rss+xml": "/blog/rss.xml" },
    },
  };
}

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="relative flex-1">
      <ServiceBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-32">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />

        <header className="mt-10 max-w-2xl">
          <p className="font-mono text-sm text-accent">[ the blog ]</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Notes on building software that performs.
          </h1>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Short, practical writing on engineering, automation, and how we
            deliver. No fluff.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mt-14 text-muted">No posts yet. Check back soon.</p>
        ) : (
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <article key={post.id} className="min-w-0">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/[0.08]"
                >
                  {post.cover_image ? (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white/10">
                      <Image
                        src={post.cover_image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <GradientPlaceholder
                      initials={initialsFromTitle(post.title)}
                      index={i}
                    />
                  )}
                  <div className="flex flex-1 flex-col p-2">
                    <div className="mt-4 flex items-center gap-3 font-mono text-xs text-faint">
                      {post.category && (
                        <span className="text-accent">
                          [ {post.category.toLowerCase()} ]
                        </span>
                      )}
                      {post.reading_time && <span>{post.reading_time}</span>}
                    </div>
                    <h2 className="mt-2 font-display text-lg font-semibold text-foreground">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="mt-2 flex-1 text-sm text-muted">
                        {post.excerpt}
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-xs text-faint">
                        {formatDate(post.published_at ?? post.created_at)}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-faint transition-colors group-hover:text-accent" />
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}

        <div className="mt-20">
          <CTASection />
        </div>
      </div>
    </main>
  );
}
