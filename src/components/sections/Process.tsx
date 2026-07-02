"use client";

import { motion } from "motion/react";
import { PROCESS_STEPS } from "@/data/process";
import { useMotion, IN_VIEW } from "@/lib/motion";

export function Process() {
  const { fadeUp, stagger } = useMotion();

  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="relative overflow-hidden bg-black py-24 sm:py-32"
    >
      {/* Moving blue glow (same theme) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="section-glow-b absolute left-[8%] top-[10%] h-[420px] w-[420px]" />
        <div className="section-glow-c absolute bottom-[8%] right-[6%] h-[460px] w-[460px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <header className="max-w-2xl">
          <p className="font-mono text-sm text-accent">[ how we work ]</p>
          <h2
            id="process-heading"
            className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          >
            How we work.
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Six steps from first call to production. At each one you get
            something concrete, not just a status update.
          </p>
        </header>

        {/* Timeline: horizontal on desktop, vertical on mobile */}
        <motion.ol
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW}
          className="relative mt-14 grid gap-10 lg:grid-cols-6 lg:gap-6"
        >
          {/* Connecting line: vertical on mobile, horizontal on desktop */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-4 bottom-4 w-px bg-white/12 lg:left-0 lg:right-0 lg:top-4 lg:bottom-auto lg:h-px lg:w-full"
          />

          {PROCESS_STEPS.map((step, i) => (
            <motion.li
              key={step.title}
              variants={fadeUp}
              className="relative pl-12 lg:pl-0"
            >
              {/* Numbered node (sits on the line) */}
              <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black font-mono text-xs text-accent lg:relative">
                {String(i + 1).padStart(2, "0")}
              </div>

              <h3 className="font-display text-lg font-semibold text-foreground lg:mt-5">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{step.deliverable}</p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
