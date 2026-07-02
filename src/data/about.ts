/**
 * About / Why Pixoraft content. Positioning copy and stats live here so edits
 * never touch components. Stats use correct labels; unverifiable numbers are
 * flagged TODO-CONFIRM.
 */

export interface Stat {
  value: string;
  label: string;
  /** True when the number still needs client confirmation. */
  todo?: boolean;
}

export interface About {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  stats: Stat[];
}

export const ABOUT: About = {
  eyebrow: "[ about us ]",
  title: "We build software that earns its keep.",
  paragraphs: [
    "Pixoraft is a digital engineering studio. We design, build, and run the software that businesses depend on, from the first line of code to production traffic.",
    "We work as one team across Pakistan, the UK, and the US. That means clear scope, steady communication, and delivery you can plan around.",
    "We measure our work the way you do: by what ships, what performs, and what moves the number that matters to your business.",
  ],
  stats: [
    { value: "150+", label: "Projects delivered", todo: true },
    { value: "3", label: "Regions served" },
    { value: "24/7", label: "Support coverage" },
    { value: "10+", label: "Core capabilities" },
  ],
};
