"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Process", href: "/#process" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/contact" },
] as const;

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion() ?? false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const menuVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduced ? 0 : 0.06 } },
  };
  const itemVariants = {
    hidden: reduced ? { opacity: 1 } : { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        aria-label="Primary"
        className={`relative w-full max-w-6xl overflow-hidden rounded-full border px-4 py-3 shadow-lg backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 sm:px-5 ${
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
        {/* Periodic glare sweep */}
        <span aria-hidden="true" className="header-glare" />

        {/* Content row */}
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
                className="h-8 w-auto sm:h-9"
              />
            </Link>
          </div>

          {/* Center links (desktop) */}
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

          {/* Right: CTA (desktop) + hamburger (mobile) */}
          <div className="flex flex-1 items-center justify-end gap-2">
            <Link
              href="/contact"
              className="hidden rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-foreground backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/20 hover:shadow-lg hover:shadow-black/20 md:inline-flex"
            >
              Book a call
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-foreground transition-colors hover:bg-white/15 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
            className="fixed inset-0 z-[60] flex flex-col bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <Link
                href="/"
                aria-label="Pixoraft home"
                onClick={() => setOpen(false)}
                className="flex items-center"
              >
                <Image
                  src="/pixoraft_logo_header.png"
                  alt="Pixoraft"
                  width={62}
                  height={36}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-foreground transition-colors hover:bg-white/15"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-1 flex-col justify-center gap-2 px-6"
            >
              {NAV_LINKS.map((link) => (
                <motion.li key={link.href} variants={itemVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-display text-3xl font-semibold text-foreground transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={itemVariants} className="mt-6">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
                >
                  Book a strategy call
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
