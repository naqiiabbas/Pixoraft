import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, LayoutDashboard, FileText, Search, ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const ADMIN_NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Posts", href: "/admin/posts", icon: FileText },
  { label: "SEO", href: "/admin/seo", icon: Search },
];

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  async function signOut() {
    "use server";
    const sb = await createClient();
    await sb.auth.signOut();
    redirect("/admin/login");
  }

  // Login page renders bare (no chrome). Middleware guards the rest.
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        {children}
      </div>
    );
  }

  // Only allowlisted admins may use the panel (data is also protected by RLS).
  const { data: isAdmin } = await supabase.rpc("is_admin");
  if (isAdmin === false) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
        <p className="font-display text-xl font-semibold text-foreground">
          This account is not an admin.
        </p>
        <p className="max-w-sm text-sm text-muted">
          Ask an existing admin to add your user to the allowlist, then sign in
          again.
        </p>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-full border border-border px-5 py-2.5 text-sm text-muted hover:text-foreground"
          >
            Sign out
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-6">
            <span className="font-display text-lg font-semibold">
              <span className="text-foreground">pixo</span>
              <span className="text-accent">raft</span>
              <span className="ml-2 font-mono text-xs text-faint">admin</span>
            </span>
            <nav className="hidden items-center gap-1 sm:flex">
              {ADMIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="hidden items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground sm:flex"
            >
              <ExternalLink className="h-4 w-4" />
              View site
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>
    </div>
  );
}
