"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { PROCESS_STEPS } from "@/data/process";
import { useMotion, IN_VIEW } from "@/lib/motion";

export function Process() {
  const { fadeUp, stagger, reduced } = useMotion();

  // Scroll-linked progress: the accent line fills as the timeline moves through
  // the viewport. Starts filling as the list enters, completes before it leaves.
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.55"],
  });
  const rawHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const lineHeight = reduced ? "100%" : rawHeight;

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative overflow-x-clip py-24 sm:py-32"
    >
      {/* Moving blue glow (same theme), un-clipped so it bleeds across the
          section boundaries for a soft merge. */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="section-glow-b absolute left-[8%] top-[10%] h-[420px] w-[420px]" />
        <div className="section-glow-c absolute bottom-[8%] right-[6%] h-[460px] w-[460px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          {/* Sticky heading */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="font-mono text-sm text-accent">[ how we work ]</p>
            <h2
              id="process-heading"
              className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            >
              A process you can see.
            </h2>
            <p className="mt-4 text-base text-muted sm:text-lg">
              Six steps from first call to production. At each one you get
              something concrete to review, not just a status update.
            </p>
            <p className="mt-8 font-mono text-xs text-faint">
              [ {PROCESS_STEPS.length} steps · fixed milestones ]
            </p>
          </div>

          {/* Scroll timeline */}
          <div ref={timelineRef} className="relative">
            {/* Track + scroll-linked accent fill */}
            <div
              aria-hidden="true"
              className="absolute left-[19px] top-2 bottom-2 w-0.5 overflow-hidden rounded-full bg-white/10"
            >
              <motion.div
                style={{ height: lineHeight }}
                className="w-full rounded-full bg-gradient-to-b from-accent via-accent to-accent/20"
              />
            </div>

            <motion.ol
              variants={stagger}
              initial="hidden"
              whileInView="visible"
              viewport={IN_VIEW}
              className="space-y-6"
            >
              {PROCESS_STEPS.map((step, i) => (
                <motion.li
                  key={step.title}
                  variants={fadeUp}
                  className="group relative pl-14"
                >
                  {/* Numbered node, masks the line like a station stop */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black font-mono text-xs text-accent shadow-[0_0_0_6px_var(--background)] transition-colors group-hover:border-accent/50"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Step card */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 group-hover:border-white/25 group-hover:bg-white/[0.07] sm:p-6">
                    <h3 className="font-display text-lg font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{step.deliverable}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>
        </div>
      </div>
    </section>
  );
}
