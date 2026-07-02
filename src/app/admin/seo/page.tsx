import { MANAGED_PAGES, getAllPageSeo } from "@/lib/seo";
import { SeoManager } from "./SeoManager";

export const dynamic = "force-dynamic";

export default async function AdminSeoPage() {
  const overrides = await getAllPageSeo();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Site SEO
      </h1>
      <p className="mt-2 max-w-2xl text-muted">
        Set the meta title, description, and OpenGraph image for each page. Blank
        fields fall back to the built in defaults. Blog posts and service pages
        carry their own SEO (edit those in Posts and in the code data).
      </p>

      <div className="mt-8">
        <SeoManager pages={MANAGED_PAGES} overrides={overrides} />
      </div>
    </div>
  );
}
