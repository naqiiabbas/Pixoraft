import { createPublicClient } from "@/lib/supabase/public";
import { createClient } from "@/lib/supabase/server";

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  author: string | null;
  cover_image: string | null;
  reading_time: string | null;
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

// ----- Public reads (anon client, no cookies) -----

export async function getPublishedPosts(): Promise<Post[]> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("published", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("created_at", { ascending: false });
  return (data as Post[] | null) ?? [];
}

export async function getPublishedPostBySlug(slug: string): Promise<Post | null> {
  const supabase = createPublicClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  return (data as Post | null) ?? null;
}

// ----- Admin reads (authenticated server client, RLS gates to admins) -----

export async function getAllPosts(): Promise<Post[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .order("updated_at", { ascending: false });
  return (data as Post[] | null) ?? [];
}

export async function getPostById(id: string): Promise<Post | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  return (data as Post | null) ?? null;
}

// ----- Helpers -----

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function initialsFromTitle(title: string): string {
  const words = title.trim().split(/\s+/).filter(Boolean);
  const letters = words.slice(0, 2).map((w) => w[0] ?? "");
  return letters.join("").toUpperCase() || "PX";
}
