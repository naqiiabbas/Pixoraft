"use client";

import { motion } from "motion/react";
import { ABOUT } from "@/data/about";
import { CodeWindow } from "@/components/ui/CodeWindow";
import { useMotion, IN_VIEW } from "@/lib/motion";

export function About() {
  const { fadeUp, stagger } = useMotion();

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="relative overflow-hidden bg-black py-24 sm:py-32"
    >
      {/* Moving blue glow (same treatment as other sections) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="section-glow-b absolute -left-[6%] top-[10%] h-[480px] w-[480px]" />
        <div className="section-glow-c absolute bottom-[4%] right-[2%] h-[460px] w-[460px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: positioning copy + stats */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={IN_VIEW}
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-sm text-accent"
            >
              {ABOUT.eyebrow}
            </motion.p>
            <motion.h2
              variants={fadeUp}
              id="about-heading"
              className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            >
              {ABOUT.title}
            </motion.h2>

            <div className="mt-6 space-y-4">
              {ABOUT.paragraphs.map((p) => (
                <motion.p
                  key={p.slice(0, 24)}
                  variants={fadeUp}
                  className="text-base text-muted sm:text-lg"
                >
                  {p}
                </motion.p>
              ))}
            </div>

            <motion.div variants={fadeUp} className="relative mt-10">
              {/* Blue gradient behind the glass stat card */}
              <div
                aria-hidden="true"
                className="stat-glow absolute -inset-3 -z-10 rounded-[28px]"
              />
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/15 bg-white/10 backdrop-blur-2xl">
                {ABOUT.stats.map((stat) => (
                  <div key={stat.label} className="bg-white/[0.03] p-5">
                    <dt className="sr-only">{stat.label}</dt>
                    <dd>
                      <span className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
                        {stat.value}
                      </span>
                      <span className="mt-1 block text-sm text-muted">
                        {stat.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </motion.div>

          {/* Right: graphical code window */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={IN_VIEW}
            className="relative"
          >
            <CodeWindow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
