"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Bold,
  Code2,
  Eye,
  Heading2,
  Italic,
  Link2,
  List,
  Pencil,
  Trash2,
} from "lucide-react";
import type { Post } from "@/lib/posts";

export interface InternalLink {
  label: string;
  href: string;
}

function ToolbarButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      aria-label={label}
      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-white/5 hover:text-foreground"
    >
      {children}
    </button>
  );
}
import { Markdown } from "@/components/ui/Markdown";
import { ImageUpload } from "@/components/admin/ImageUpload";
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

export function PostForm({
  post,
  internalLinks = [],
}: {
  post?: Post;
  internalLinks?: InternalLink[];
}) {
  const router = useRouter();
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkText, setLinkText] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
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

  // ----- Markdown editor helpers -----

  function restoreSelection(start: number, end: number) {
    requestAnimationFrame(() => {
      const ta = contentRef.current;
      if (!ta) return;
      ta.focus();
      ta.selectionStart = start;
      ta.selectionEnd = end;
    });
  }

  function surround(before: string, after = before) {
    const ta = contentRef.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e } = ta;
    const selected = content.slice(s, e) || "text";
    const next =
      content.slice(0, s) + before + selected + after + content.slice(e);
    setContent(next);
    restoreSelection(s + before.length, s + before.length + selected.length);
  }

  function prefixLine(prefix: string) {
    const ta = contentRef.current;
    if (!ta) return;
    const { selectionStart: s } = ta;
    const lineStart = content.lastIndexOf("\n", s - 1) + 1;
    const next = content.slice(0, lineStart) + prefix + content.slice(lineStart);
    setContent(next);
    restoreSelection(s + prefix.length, s + prefix.length);
  }

  function openLinkDialog() {
    const ta = contentRef.current;
    const selected = ta ? content.slice(ta.selectionStart, ta.selectionEnd) : "";
    setLinkText(selected);
    setLinkUrl("");
    setLinkOpen(true);
  }

  function insertLink() {
    const url = linkUrl.trim();
    if (!url) return;
    const text = linkText.trim() || url;
    const md = `[${text}](${url})`;
    const ta = contentRef.current;
    if (!ta) {
      setContent(content + md);
    } else {
      const { selectionStart: s, selectionEnd: e } = ta;
      setContent(content.slice(0, s) + md + content.slice(e));
      restoreSelection(s + md.length, s + md.length);
    }
    setLinkOpen(false);
    setLinkText("");
    setLinkUrl("");
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
            <div className="rounded-xl border border-border bg-background">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center gap-1 border-b border-border p-2">
                <ToolbarButton label="Bold" onClick={() => surround("**")}>
                  <Bold className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton label="Italic" onClick={() => surround("*")}>
                  <Italic className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton label="Heading" onClick={() => prefixLine("## ")}>
                  <Heading2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton label="List item" onClick={() => prefixLine("- ")}>
                  <List className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton
                  label="Inline code"
                  onClick={() => surround("`")}
                >
                  <Code2 className="h-4 w-4" />
                </ToolbarButton>
                <ToolbarButton label="Insert link" onClick={openLinkDialog}>
                  <Link2 className="h-4 w-4" />
                </ToolbarButton>
              </div>

              {/* Link dialog */}
              {linkOpen && (
                <div className="space-y-3 border-b border-border bg-surface p-3">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <input
                      className={inputClass}
                      placeholder="Link text"
                      value={linkText}
                      onChange={(e) => setLinkText(e.target.value)}
                    />
                    <input
                      className={inputClass}
                      placeholder="URL (https://... or /internal/path)"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                    />
                  </div>
                  {internalLinks.length > 0 && (
                    <select
                      className={inputClass}
                      value=""
                      onChange={(e) => {
                        if (e.target.value) setLinkUrl(e.target.value);
                      }}
                    >
                      <option value="">Or pick an internal page...</option>
                      {internalLinks.map((l) => (
                        <option key={l.href} value={l.href} className="bg-surface">
                          {l.label} ({l.href})
                        </option>
                      ))}
                    </select>
                  )}
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={insertLink}
                      className="rounded-lg bg-accent px-4 py-2 text-xs font-semibold text-accent-contrast hover:bg-accent-strong"
                    >
                      Insert link
                    </button>
                    <button
                      type="button"
                      onClick={() => setLinkOpen(false)}
                      className="rounded-lg border border-border px-4 py-2 text-xs text-muted hover:text-foreground"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <textarea
                ref={contentRef}
                className="min-h-[300px] w-full resize-y bg-transparent p-4 font-mono text-xs text-foreground outline-none"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={"## Heading\n\nWrite in Markdown. Use the link button for internal or external links. Fenced ```code``` renders as a code window."}
              />
            </div>
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
