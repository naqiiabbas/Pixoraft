"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/work" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className={`flex w-full max-w-6xl items-center justify-between gap-6 rounded-full border px-5 py-3 backdrop-blur-xl transition-all duration-300 ${
          scrolled
            ? "border-border-strong bg-overlay shadow-lg shadow-black/20"
            : "border-border/60 bg-surface/40"
        }`}
      >
        {/* Logo */}
        <Link href="/" aria-label="Pixoraft home" className="flex items-center">
          <Image
            src="/pixoraft_logo_header.png"
            alt="Pixoraft"
            width={62}
            height={36}
            priority
            className="h-9 w-auto"
          />
        </Link>

        {/* Center links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/contact"
          className="rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-contrast"
        >
          Book a call
        </Link>
      </nav>
    </header>
  );
}
