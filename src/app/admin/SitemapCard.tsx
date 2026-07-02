"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ExternalLink, Map, RefreshCw } from "lucide-react";
import { revalidateSitemap } from "./actions";

export function SitemapCard() {
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  async function run() {
    setState("loading");
    await revalidateSitemap();
    setState("done");
    setTimeout(() => setState("idle"), 2500);
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <Map className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
          <div>
            <h2 className="font-display text-lg font-semibold">Sitemap</h2>
            <p className="mt-1 max-w-md text-sm text-muted">
              Regenerate <span className="font-mono text-xs">/sitemap.xml</span>{" "}
              so new posts and pages are picked up by search engines.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/sitemap.xml"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
            View
          </Link>
          <button
            type="button"
            onClick={run}
            disabled={state === "loading"}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong disabled:opacity-60"
          >
            {state === "done" ? (
              <>
                <Check className="h-4 w-4" /> Updated
              </>
            ) : state === "loading" ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" /> Updating...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" /> Update sitemap
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
