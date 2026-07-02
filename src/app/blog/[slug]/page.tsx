import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { BLOG_POSTS, getPost, formatDate, type BlogBlock } from "@/data/blog";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { CodeWindow } from "@/components/ui/CodeWindow";
import { CTASection } from "@/components/sections/CTASection";
import { buildArticleJsonLd } from "@/lib/schema";

type Params = { slug: string };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { type: "article", publishedTime: post.date },
  };
}

function Block({ block, accent }: { block: BlogBlock; accent: string }) {
  switch (block.type) {
    case "heading":
      return (
        <h2 className="mt-10 font-display text-2xl font-semibold text-foreground">
          {block.text}
        </h2>
      );
    case "paragraph":
      return <p className="mt-5 leading-relaxed text-muted">{block.text}</p>;
    case "list":
      return (
        <ul className="mt-5 space-y-2">
          {block.items.map((item) => (
            <li key={item} className="flex items-start gap-3 text-muted">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "code":
      return (
        <div className="mt-8">
          <CodeWindow
            filename={block.filename}
            snippet={block.snippet}
            accent={accent}
          />
        </div>
      );
    default:
      return null;
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);
  const jsonLd = buildArticleJsonLd({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
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

        {/* Article header */}
        <header className="mt-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-faint">
            <span className="text-accent">[ {post.category.toLowerCase()} ]</span>
            <span>{formatDate(post.date)}</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
          <p className="mt-6 text-sm text-faint">
            By {post.author.name}, {post.author.role}
          </p>
        </header>

        {/* Cover */}
        <div className="mt-10">
          <GradientPlaceholder initials={post.initials} index={0} />
        </div>

        {/* Body */}
        <div className="mt-4">
          {post.body.map((block, i) => (
            <Block key={i} block={block} accent={post.accent} />
          ))}
        </div>

        {/* Back link */}
        <Link
          href="/blog"
          className="mt-12 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
        >
          <ArrowLeft className="h-4 w-4" />
          All posts
        </Link>

        {/* Related */}
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
                    <span className="mt-0.5 block font-mono text-xs text-faint">
                      {r.readingTime}
                    </span>
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
