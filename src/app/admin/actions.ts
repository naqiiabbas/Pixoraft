"use server";

import { revalidatePath } from "next/cache";

/** Purge the cached sitemap so it regenerates with the latest posts. */
export async function revalidateSitemap() {
  revalidatePath("/sitemap.xml");
  return { ok: true as const };
}
