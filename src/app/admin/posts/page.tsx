import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { getAllPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Blog posts
        </h1>
        <Link
          href="/admin/posts/new"
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
        >
          <Plus className="h-4 w-4" />
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted">
          No posts yet. Create your first post to get started.
        </p>
      ) : (
        <div className="mt-8 overflow-hidden rounded-2xl border border-border">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-surface text-faint">
              <tr>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="hidden px-4 py-3 font-medium sm:table-cell">
                  Status
                </th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">
                  Updated
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b border-border last:border-0 hover:bg-white/[0.02]"
                >
                  <td className="px-4 py-3">
                    <span className="font-medium text-foreground">
                      {post.title}
                    </span>
                    <span className="block font-mono text-xs text-faint">
                      /blog/{post.slug}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 sm:table-cell">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs ${
                        post.published
                          ? "bg-green-500/15 text-green-400"
                          : "bg-white/10 text-muted"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-muted md:table-cell">
                    {formatDate(post.updated_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/posts/${post.id}/edit`}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
