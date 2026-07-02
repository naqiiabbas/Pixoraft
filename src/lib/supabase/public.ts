import { createClient } from "@supabase/supabase-js";

/**
 * Anonymous Supabase client for public reads that must work without request
 * cookies (e.g. sitemap at build time, or cache-friendly public pages).
 */
export function createPublicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
