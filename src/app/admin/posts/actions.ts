"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { slugify, estimateReadingTime } from "@/lib/posts";

export interface PostInput {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  cover_image: string;
  meta_title: string;
  meta_description: string;
  og_image: string;
  published: boolean;
}

export async function savePost(input: PostInput) {
  const supabase = await createClient();

  const slug = input.slug ? slugify(input.slug) : slugify(input.title);
  const now = new Date().toISOString();

  const row = {
    title: input.title,
    slug,
    excerpt: input.excerpt || null,
    content: input.content || null,
    category: input.category || null,
    author: input.author || "Pixoraft Team",
    cover_image: input.cover_image || null,
    meta_title: input.meta_title || null,
    meta_description: input.meta_description || null,
    og_image: input.og_image || null,
    reading_time: estimateReadingTime(input.content || ""),
    published: input.published,
    updated_at: now,
  };

  if (input.id) {
    const { error } = await supabase
      .from("posts")
      .update(row)
      .eq("id", input.id);
    if (error) return { ok: false, error: error.message };
  } else {
    const { error } = await supabase.from("posts").insert({
      ...row,
      published_at: input.published ? now : null,
    });
    if (error) return { ok: false, error: error.message };
  }

  // If publishing an existing draft, stamp published_at when missing.
  if (input.id && input.published) {
    await supabase
      .from("posts")
      .update({ published_at: now })
      .eq("id", input.id)
      .is("published_at", null);
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/sitemap.xml");
  redirect("/admin/posts");
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  await supabase.from("posts").delete().eq("id", id);
  revalidatePath("/blog");
  revalidatePath("/sitemap.xml");
  redirect("/admin/posts");
}
