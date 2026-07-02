"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2 } from "lucide-react";
import type { Post } from "@/lib/posts";
import { Markdown } from "@/components/ui/Markdown";
import { ImageUpload } from "./ImageUpload";
import { savePost, deletePost } from "./actions";

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent";
const labelClass = "mb-2 block text-sm text-muted";

function autoSlug(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function PostForm({ post }: { post?: Post }) {
  const router = useRouter();
  const [title, setTitle] = useState(post?.title ?? "");
  const [slug, setSlug] = useState(post?.slug ?? "");
  const [slugEdited, setSlugEdited] = useState(!!post);
  const [excerpt, setExcerpt] = useState(post?.excerpt ?? "");
  const [category, setCategory] = useState(post?.category ?? "");
  const [author, setAuthor] = useState(post?.author ?? "Pixoraft Team");
  const [content, setContent] = useState(post?.content ?? "");
  const [coverImage, setCoverImage] = useState(post?.cover_image ?? "");
  const [ogImage, setOgImage] = useState(post?.og_image ?? "");
  const [metaTitle, setMetaTitle] = useState(post?.meta_title ?? "");
  const [metaDescription, setMetaDescription] = useState(
    post?.meta_description ?? "",
  );
  const [published, setPublished] = useState(post?.published ?? false);

  const [preview, setPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onTitleChange(value: string) {
    setTitle(value);
    if (!slugEdited) setSlug(autoSlug(value));
  }

  async function onSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const res = await savePost({
      id: post?.id,
      title,
      slug,
      excerpt,
      content,
      category,
      author,
      cover_image: coverImage,
      meta_title: metaTitle,
      meta_description: metaDescription,
      og_image: ogImage,
      published,
    });
    if (res && !res.ok) {
      setError(res.error);
      setSaving(false);
    }
  }

  async function onDelete() {
    if (!post) return;
    if (!confirm("Delete this post? This cannot be undone.")) return;
    await deletePost(post.id);
  }

  return (
    <form onSubmit={onSave} className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      {/* Main column */}
      <div className="space-y-5">
        <div>
          <label className={labelClass}>Title</label>
          <input
            className={inputClass}
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Slug</label>
          <input
            className={inputClass}
            value={slug}
            onChange={(e) => {
              setSlug(e.target.value);
              setSlugEdited(true);
            }}
            required
          />
          <p className="mt-1 text-xs text-faint">/blog/{slug || "..."}</p>
        </div>

        <div>
          <label className={labelClass}>Excerpt</label>
          <textarea
            className={`${inputClass} resize-y`}
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className={labelClass + " mb-0"}>Content (Markdown)</label>
            <button
              type="button"
              onClick={() => setPreview((p) => !p)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted hover:text-foreground"
            >
              {preview ? (
                <>
                  <Pencil className="h-3.5 w-3.5" /> Edit
                </>
              ) : (
                <>
                  <Eye className="h-3.5 w-3.5" /> Preview
                </>
              )}
            </button>
          </div>
          {preview ? (
            <div className="min-h-[300px] rounded-xl border border-border bg-background p-5">
              {content ? (
                <Markdown content={content} />
              ) : (
                <p className="text-sm text-faint">Nothing to preview.</p>
              )}
            </div>
          ) : (
            <textarea
              className={`${inputClass} min-h-[300px] resize-y font-mono text-xs`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder={"## Heading\n\nWrite in Markdown. Fenced ```code``` renders as a code window."}
            />
          )}
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-surface p-5">
          <label className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              Published
            </span>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-5 w-5 accent-[color:var(--accent)]"
            />
          </label>
          <p className="mt-2 text-xs text-faint">
            Unpublished posts are hidden from the site.
          </p>

          <div className="mt-5 flex flex-col gap-3">
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong disabled:opacity-60"
            >
              {saving ? "Saving..." : post ? "Save changes" : "Create post"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/admin/posts")}
              className="rounded-full border border-border px-6 py-2.5 text-sm text-muted hover:text-foreground"
            >
              Cancel
            </button>
            {post && (
              <button
                type="button"
                onClick={onDelete}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-red-500/30 px-6 py-2.5 text-sm text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
                Delete
              </button>
            )}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-border bg-surface p-5">
          <ImageUpload
            label="Cover image"
            value={coverImage}
            onChange={setCoverImage}
          />
          <div>
            <label className={labelClass}>Category</label>
            <input
              className={inputClass}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Engineering"
            />
          </div>
          <div>
            <label className={labelClass}>Author</label>
            <input
              className={inputClass}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-border bg-surface p-5">
          <p className="text-sm font-semibold text-foreground">SEO</p>
          <div>
            <label className={labelClass}>Meta title</label>
            <input
              className={inputClass}
              value={metaTitle}
              onChange={(e) => setMetaTitle(e.target.value)}
              placeholder={title || "Falls back to the post title"}
            />
          </div>
          <div>
            <label className={labelClass}>Meta description</label>
            <textarea
              className={`${inputClass} resize-y`}
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              placeholder="Falls back to the excerpt"
            />
          </div>
          <ImageUpload
            label="OpenGraph image"
            value={ogImage}
            onChange={setOgImage}
          />
        </div>
      </div>
    </form>
  );
}
