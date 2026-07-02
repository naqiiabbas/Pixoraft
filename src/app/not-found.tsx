import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-1 flex-col items-center justify-center gap-6 px-6 py-24 text-center">
      <Link href="/" aria-label="Pixoraft home">
        <Image
          src="/pixoraft_logo_header.png"
          alt="Pixoraft"
          width={62}
          height={36}
          className="h-10 w-auto"
        />
      </Link>

      <p className="font-mono text-sm text-accent">[ 404 ]</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Page not found.
      </h1>
      <p className="max-w-md text-muted">
        The page you are looking for does not exist or has moved. Try one of
        these instead.
      </p>

      <nav className="mt-2 flex flex-wrap items-center justify-center gap-3">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm text-foreground backdrop-blur-md transition-colors hover:border-white/40 hover:bg-white/15"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link
        href="/contact"
        className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
      >
        Book a strategy call
        <ArrowRight className="h-4 w-4" />
      </Link>
    </main>
  );
}
