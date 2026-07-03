"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { TESTIMONIALS } from "@/data/testimonials";

export function Testimonials() {
  const reduced = useReducedMotion() ?? false;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Auto advance every 6s, paused on hover and under reduced motion.
  useEffect(() => {
    if (!emblaApi || reduced || paused) return;
    const id = setInterval(() => emblaApi.scrollNext(), 6000);
    return () => clearInterval(id);
  }, [emblaApi, reduced, paused]);

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="relative py-24 sm:py-32"
    >
      {/* Moving blue glow (same treatment as the services section), un-clipped
          so it bleeds across the section boundaries for a soft merge. */}
      <div className="absolute inset-0" aria-hidden="true">
        <div className="section-glow-c absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2" />
        <div className="section-glow-a absolute bottom-[8%] right-[8%] h-[420px] w-[420px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <header className="mx-auto max-w-2xl text-center">
          <p className="font-mono text-sm text-accent">[ what clients say ]</p>
          <h2
            id="testimonials-heading"
            className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          >
            Results, in their words.
          </h2>
        </header>

        <div
          className="mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            {/* Track */}
            <div className="flex">
              {TESTIMONIALS.map((t, i) => (
                <div
                  key={`${t.company}-${i}`}
                  className="min-w-0 flex-[0_0_100%] px-2"
                >
                  <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl sm:p-12">
                    <Quote
                      className="h-8 w-8 text-accent"
                      aria-hidden="true"
                    />
                    <blockquote className="mt-6 font-display text-xl font-medium leading-relaxed text-foreground sm:text-2xl">
                      {t.quote}
                    </blockquote>
                    <figcaption className="mt-8 flex flex-col">
                      <span className="font-semibold text-foreground">
                        {t.name}
                      </span>
                      <span className="text-sm text-muted">
                        {t.role}, {t.company}
                      </span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              type="button"
              onClick={scrollPrev}
              aria-label="Previous testimonial"
              className="rounded-full border border-white/20 bg-white/5 p-2 text-foreground backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/20"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollTo(i)}
                  aria-label={`Go to testimonial ${i + 1}`}
                  aria-current={selected === i}
                  className={`h-2 rounded-full transition-all ${
                    selected === i
                      ? "w-6 bg-accent"
                      : "w-2 bg-white/25 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={scrollNext}
              aria-label="Next testimonial"
              className="rounded-full border border-white/20 bg-white/5 p-2 text-foreground backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/20"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
