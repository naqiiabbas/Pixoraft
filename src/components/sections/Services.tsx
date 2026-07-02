"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { SERVICE_PILLARS } from "@/data/services";
import { useMotion, IN_VIEW } from "@/lib/motion";

export function Services() {
  const { fadeUp, stagger } = useMotion();

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="relative overflow-hidden bg-black py-24 sm:py-32"
    >
      {/* Moving blue glow behind the cards (hero animation blues) */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="section-glow-a absolute left-[6%] top-[18%] h-[460px] w-[460px]" />
        <div className="section-glow-b absolute bottom-[6%] right-[4%] h-[520px] w-[520px]" />
        <div className="section-glow-c absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section heading */}
        <header className="max-w-2xl">
          <p className="font-mono text-sm text-accent">[ what we do ]</p>
          <h2
            id="services-heading"
            className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          >
            Services that ship and scale.
          </h2>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Four practice areas, one accountable team. We build the platform,
            automate the busywork, run the infrastructure, and grow the numbers.
          </p>
        </header>

        {/* Pillar cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={IN_VIEW}
          className="mt-14 grid gap-6 md:grid-cols-2"
        >
          {SERVICE_PILLARS.map((pillar) => (
            <motion.div key={pillar.slug} variants={fadeUp}>
              <Link
                href={`/services/${pillar.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-mono text-xs text-accent">
                    [ {pillar.index} / {pillar.key} ]
                  </p>
                  <ArrowUpRight className="h-5 w-5 text-faint transition-colors group-hover:text-accent" />
                </div>

                <h3 className="mt-4 font-display text-2xl font-semibold text-foreground">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm text-muted">{pillar.value}</p>

                <ul className="mt-6 space-y-3 border-t border-white/10 pt-6">
                  {pillar.capabilities.map((cap) => (
                    <li
                      key={cap.name}
                      className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                    >
                      <span className="text-sm font-medium text-foreground">
                        {cap.name}
                      </span>
                      <span className="font-mono text-xs text-faint">
                        {cap.tags.join("  ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
