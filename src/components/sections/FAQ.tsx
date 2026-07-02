"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { FAQ_ITEMS } from "@/data/faq";
import { buildFaqJsonLd } from "@/lib/schema";
import { EASE_OUT } from "@/lib/motion";

export function FAQ() {
  const reduced = useReducedMotion() ?? false;
  // One item open by default (spec).
  const [openIndex, setOpenIndex] = useState(0);

  const jsonLd = buildFaqJsonLd(FAQ_ITEMS);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative overflow-hidden bg-black py-24 sm:py-32"
    >
      {/* FAQPage structured data, emitted from the same data source */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Moving blue glow (same theme) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="section-glow-b absolute left-[8%] top-[12%] h-[440px] w-[440px]" />
        <div className="section-glow-c absolute bottom-[6%] right-[6%] h-[500px] w-[500px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Sticky heading */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-sm text-accent">[ faq ]</p>
            <h2
              id="faq-heading"
              className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            >
              Questions, answered.
            </h2>
            <p className="mt-4 text-base text-muted sm:text-lg">
              Everything worth knowing before we start. Still curious about
              something specific?
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex rounded-full border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-foreground backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/20"
            >
              Book a strategy call
            </Link>
          </div>

          {/* Accordion */}
          <ul className="space-y-4">
            {FAQ_ITEMS.map((item, i) => {
              const isOpen = openIndex === i;
              const panelId = `faq-panel-${i}`;
              const buttonId = `faq-button-${i}`;
              return (
                <li
                  key={item.question}
                  className={`overflow-hidden rounded-2xl border backdrop-blur-xl transition-colors ${
                    isOpen
                      ? "border-white/25 bg-white/[0.07]"
                      : "border-white/10 bg-white/[0.03] hover:border-white/20"
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      id={buttonId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(isOpen ? -1 : i)}
                      className="flex w-full items-center gap-4 px-6 py-5 text-left"
                    >
                      <span className="font-mono text-xs text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 font-display text-lg font-medium text-foreground">
                        {item.question}
                      </span>
                      <Plus
                        aria-hidden="true"
                        className={`h-5 w-5 shrink-0 text-muted transition-transform duration-300 ${
                          isOpen ? "rotate-45 text-accent" : ""
                        }`}
                      />
                    </button>
                  </h3>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        id={panelId}
                        role="region"
                        aria-labelledby={buttonId}
                        initial={
                          reduced ? { opacity: 1 } : { height: 0, opacity: 0 }
                        }
                        animate={
                          reduced
                            ? { opacity: 1 }
                            : { height: "auto", opacity: 1 }
                        }
                        exit={
                          reduced ? { opacity: 1 } : { height: 0, opacity: 0 }
                        }
                        transition={{
                          duration: reduced ? 0 : 0.3,
                          ease: EASE_OUT,
                        }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-muted sm:pl-16">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
