import Link from "next/link";
import { FileText, Search, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SitemapCard } from "./SitemapCard";

const CARDS = [
  {
    href: "/admin/posts",
    icon: FileText,
    title: "Blog posts",
    desc: "Create, edit, publish, and delete posts. Upload images and set per-post SEO.",
  },
  {
    href: "/admin/seo",
    icon: Search,
    title: "Site SEO",
    desc: "Manage meta title, description, and OpenGraph for every page of the site.",
  },
];

export default async function AdminDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold tracking-tight">
        Dashboard
      </h1>
      <p className="mt-2 text-muted">
        Signed in as {user?.email}. Manage your content and SEO below.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {CARDS.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong"
          >
            <card.icon className="h-6 w-6 text-accent" />
            <h2 className="mt-4 font-display text-lg font-semibold">
              {card.title}
            </h2>
            <p className="mt-2 text-sm text-muted">{card.desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
              Open
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <SitemapCard />
      </div>
    </div>
  );
}
