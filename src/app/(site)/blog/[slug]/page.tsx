import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import {
  getPublishedPostBySlug,
  getPublishedPosts,
  initialsFromTitle,
} from "@/lib/posts";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { Markdown } from "@/components/ui/Markdown";
import { CTASection } from "@/components/sections/CTASection";
import { buildArticleJsonLd } from "@/lib/schema";

export const dynamic = "force-dynamic";

type Params = { slug: string };

function formatDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt || undefined,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      publishedTime: post.published_at ?? undefined,
      images: post.og_image ? [post.og_image] : undefined,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const all = await getPublishedPosts();
  const related = all.filter((p) => p.slug !== post.slug).slice(0, 2);

  const jsonLd = buildArticleJsonLd({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    date: post.published_at ?? post.created_at,
  });

  return (
    <main className="relative flex-1">
      <ServiceBackground />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-24 pt-32">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Blog", href: "/blog" },
            { label: post.title },
          ]}
        />

        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-faint">
            {post.category && (
              <span className="text-accent">[ {post.category.toLowerCase()} ]</span>
            )}
            <span>{formatDate(post.published_at ?? post.created_at)}</span>
            {post.reading_time && <span>{post.reading_time}</span>}
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
          )}
          {post.author && (
            <p className="mt-6 text-sm text-faint">By {post.author}</p>
          )}
        </header>

        {/* Cover */}
        <div className="mt-10">
          {post.cover_image ? (
            <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/10">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <GradientPlaceholder initials={initialsFromTitle(post.title)} index={0} />
          )}
        </div>

        {/* Body */}
        <article className="mt-8">
          {post.content ? (
            <Markdown content={post.content} />
          ) : (
            <p className="text-muted">This post has no content yet.</p>
          )}
        </article>

        <Link
          href="/blog"
          className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>

        {related.length > 0 && (
          <section aria-labelledby="related-posts" className="mt-16">
            <h2
              id="related-posts"
              className="font-display text-xl font-semibold tracking-tight"
            >
              Keep reading
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/[0.08]"
                >
                  <span className="min-w-0">
                    <span className="block truncate font-medium text-foreground">
                      {r.title}
                    </span>
                    {r.reading_time && (
                      <span className="mt-0.5 block font-mono text-xs text-faint">
                        {r.reading_time}
                      </span>
                    )}
                  </span>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-faint transition-colors group-hover:text-accent" />
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-20">
          <CTASection />
        </div>
      </div>
    </main>
  );
}
