"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Share2, X } from "lucide-react";
import { SITE } from "@/data/site";
import { SocialIcon } from "@/components/ui/SocialIcon";
import { EASE_OUT } from "@/lib/motion";

/**
 * Floating action button pinned bottom-right. Tapping it expands upward to
 * reveal the site's social links (the same set shown in the footer) so visitors
 * can reach our profiles from anywhere on the page. Closes on Escape or an
 * outside click, and respects reduced-motion.
 */
export function FloatingSocials() {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onPointer(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  const itemVariants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y: 12, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1 },
      };

  return (
    <div
      ref={ref}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3 print:hidden"
    >
      <AnimatePresence>
        {open && (
          <motion.ul
            className="flex flex-col items-center gap-3"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={{
              visible: { transition: { staggerChildren: 0.05 } },
              hidden: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
            }}
          >
            {SITE.socials.map((social) => (
              <motion.li
                key={social.platform}
                variants={itemVariants}
                transition={{ duration: reduced ? 0 : 0.2, ease: EASE_OUT }}
              >
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-surface/90 text-muted shadow-lg shadow-black/40 backdrop-blur-md transition-all hover:border-accent/60 hover:bg-white/15 hover:text-foreground"
                >
                  <SocialIcon platform={social.platform} />
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? "Close social links" : "Follow us on social media"}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-contrast shadow-lg shadow-accent/30 transition-colors hover:bg-accent-strong"
      >
        <motion.span
          className="flex"
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: reduced ? 0 : 0.2, ease: EASE_OUT }}
        >
          {open ? <X className="h-6 w-6" /> : <Share2 className="h-6 w-6" />}
        </motion.span>
      </button>
    </div>
  );
}
