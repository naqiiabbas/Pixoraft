/**
 * Delivery process: six steps. Each step states the concrete deliverable the
 * client receives at that stage (not just an activity). Numbering is a genuine
 * sequence, so it is justified here.
 */

export interface ProcessStep {
  title: string;
  deliverable: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    title: "Analysis",
    deliverable:
      "We map your goals, users, and constraints, and you get a clear picture of what to build and why.",
  },
  {
    title: "Planning",
    deliverable:
      "You get a scoped roadmap with timeline and fixed milestones before any code is written.",
  },
  {
    title: "Design",
    deliverable:
      "You get clickable designs and a design system, so you see the product before we build it.",
  },
  {
    title: "Development",
    deliverable:
      "We build in short cycles, and you review working software at the end of each one.",
  },
  {
    title: "Testing",
    deliverable:
      "We test across devices and load, and you get a build that is checked before it ships.",
  },
  {
    title: "Deployment",
    deliverable:
      "We ship to production with monitoring in place, and hand over a product your team can run.",
  },
];
