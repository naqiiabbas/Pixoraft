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
        className={`relative w-full max-w-6xl overflow-hidden rounded-full border px-5 py-3 shadow-lg backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ${
          scrolled
            ? "border-white/25 bg-white/15 shadow-black/30"
            : "border-white/15 bg-white/10 shadow-black/20"
        }`}
      >
        {/* Glass top-edge highlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"
        />
        {/* Periodic glare sweep (left to right, ~every 4s) */}
        <span aria-hidden="true" className="header-glare" />

        {/* Content row: three equal sections (logo / menu / button) */}
        <div className="relative z-10 flex items-center">
          {/* Logo (left) */}
          <div className="flex flex-1 justify-start">
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
          </div>

          {/* Center links */}
          <ul className="hidden flex-1 items-center justify-center gap-8 md:flex">
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

          {/* CTA (right) */}
          <div className="flex flex-1 justify-end">
            <Link
              href="/contact"
              className="rounded-full border border-border-strong px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-contrast"
            >
              Book a call
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
