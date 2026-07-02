"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export interface PageSeoInput {
  path: string;
  title: string;
  description: string;
  og_image: string;
}

export async function savePageSeo(input: PageSeoInput) {
  const supabase = await createClient();

  const { error } = await supabase.from("page_seo").upsert(
    {
      path: input.path,
      title: input.title || null,
      description: input.description || null,
      og_image: input.og_image || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "path" },
  );

  if (error) return { ok: false as const, error: error.message };

  revalidatePath(input.path);
  return { ok: true as const };
}
