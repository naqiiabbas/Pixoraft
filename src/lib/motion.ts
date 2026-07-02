import type { Transition, Variants } from "motion/react";
import { useReducedMotion } from "motion/react";

/**
 * Shared animation vocabulary for the site.
 *
 * Rule: every animated component must respect prefers-reduced-motion. Use the
 * `useMotion()` hook below to get variants that collapse to instant, transform
 * free states when the user has reduced motion enabled. Do not hand-roll
 * transforms in components; pull from here so the behavior stays consistent.
 */

export const EASE_OUT: Transition["ease"] = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.25,
  base: 0.4,
  slow: 0.6,
} as const;

/** Default stagger between children (matches the 120ms hero spec). */
export const STAGGER = 0.12;

type MotionSet = {
  /** Fade and rise into place. Pair with `whileInView` or `animate`. */
  fadeUp: Variants;
  /** Plain opacity fade, no transform. */
  fade: Variants;
  /** Container that staggers its direct children. */
  stagger: Variants;
  /** Whether motion is currently reduced (final states rendered instantly). */
  reduced: boolean;
};

/**
 * Returns motion variants wired to the user's reduced-motion preference.
 * When reduced motion is on, transforms are dropped and durations collapse to
 * zero so the final state renders immediately.
 */
export function useMotion(): MotionSet {
  const reduced = useReducedMotion() ?? false;

  const fadeUp: Variants = {
    hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduced
        ? { duration: 0 }
        : { duration: DURATION.base, ease: EASE_OUT },
    },
  };

  const fade: Variants = {
    hidden: { opacity: reduced ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: reduced ? { duration: 0 } : { duration: DURATION.base },
    },
  };

  const stagger: Variants = {
    hidden: {},
    visible: {
      transition: reduced
        ? { staggerChildren: 0 }
        : { staggerChildren: STAGGER, delayChildren: 0.05 },
    },
  };

  return { fadeUp, fade, stagger, reduced };
}

/**
 * Standard `whileInView` viewport config: animate once, when the element is
 * meaningfully on screen. Shared so every section triggers consistently.
 */
export const IN_VIEW = {
  once: true,
  amount: 0.3,
} as const;
