"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { ManagedPage, PageSeo } from "@/lib/seo";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { savePageSeo } from "./actions";

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors focus:border-accent";
const labelClass = "mb-2 block text-sm text-muted";

function PageRow({
  page,
  existing,
}: {
  page: ManagedPage;
  existing?: PageSeo;
}) {
  const [title, setTitle] = useState(existing?.title ?? "");
  const [description, setDescription] = useState(existing?.description ?? "");
  const [ogImage, setOgImage] = useState(existing?.og_image ?? "");
  const [noindex, setNoindex] = useState(existing?.noindex ?? false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSave() {
    setSaving(true);
    setSaved(false);
    setError(null);
    const res = await savePageSeo({
      path: page.path,
      title,
      description,
      og_image: ogImage,
      noindex,
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } else {
      setError(res.error);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h3 className="font-display text-lg font-semibold text-foreground">
            {page.label}
          </h3>
          <p className="font-mono text-xs text-faint">{page.path}</p>
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong disabled:opacity-60"
        >
          {saved ? (
            <>
              <Check className="h-4 w-4" /> Saved
            </>
          ) : saving ? (
            "Saving..."
          ) : (
            "Save"
          )}
        </button>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <div className="space-y-5">
          <div>
            <label className={labelClass}>Meta title</label>
            <input
              className={inputClass}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={page.defaultTitle}
            />
          </div>
          <div>
            <label className={labelClass}>Meta description</label>
            <textarea
              className={`${inputClass} resize-y`}
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={page.defaultDescription}
            />
          </div>
          <p className="text-xs text-faint">
            Leave blank to use the default shown as placeholder.
          </p>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={noindex}
              onChange={(e) => setNoindex(e.target.checked)}
              className="h-4 w-4 accent-[color:var(--accent)]"
            />
            <span className="text-sm text-muted">
              Hide from search engines (noindex)
            </span>
          </label>
        </div>
        <ImageUpload
          label="OpenGraph image"
          value={ogImage}
          onChange={setOgImage}
        />
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}

export function SeoManager({
  pages,
  overrides,
}: {
  pages: ManagedPage[];
  overrides: PageSeo[];
}) {
  const map = new Map(overrides.map((o) => [o.path, o]));

  // Group pages by their `group`, preserving first-seen order.
  const groups: { name: string; items: ManagedPage[] }[] = [];
  for (const page of pages) {
    let group = groups.find((g) => g.name === page.group);
    if (!group) {
      group = { name: page.group, items: [] };
      groups.push(group);
    }
    group.items.push(page);
  }

  return (
    <div className="space-y-12">
      {groups.map((group) => (
        <section key={group.name}>
          <h2 className="mb-4 font-mono text-sm text-accent">
            [ {group.name} ]
          </h2>
          <div className="space-y-5">
            {group.items.map((page) => (
              <PageRow
                key={page.path}
                page={page}
                existing={map.get(page.path)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
