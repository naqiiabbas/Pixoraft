/**
 * Testimonials, written in company voice (not freelancer voice).
 *
 * TODO-CONFIRM: All attribution (name, role) is placeholder and must be
 * verified with the client before launch. Only the Siragl entry maps to a real
 * client; its quote is reworded from the original review into company voice and
 * should be signed off by the client. The other two entries are placeholders.
 */

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    // Reworded from the real Siragl review into company voice. TODO-CONFIRM wording + attribution.
    quote:
      "Pixoraft rebuilt our platform and delivered on schedule. The scope was clear, communication stayed steady throughout, and the final product did exactly what our business needed.",
    name: "Bilal A.", // TODO-CONFIRM
    role: "Founder", // TODO-CONFIRM
    company: "Siragl",
  },
  {
    // Placeholder testimonial. TODO-CONFIRM: name and company are invented.
    quote:
      "They automated the manual steps that were slowing our operations down. What used to take our team a full day now runs on its own in the background.",
    name: "Daniyal Khan", // TODO-CONFIRM
    role: "Operations Lead", // TODO-CONFIRM
    company: "Meridian Logistics", // TODO-CONFIRM
  },
  {
    // Placeholder testimonial. TODO-CONFIRM: name and company are invented.
    quote:
      "The new site loads fast, ranks well, and converts. We can point to real numbers, not just a nicer design, and that is what mattered to us.",
    name: "Sarah Whitfield", // TODO-CONFIRM
    role: "Marketing Director", // TODO-CONFIRM
    company: "Northbridge Retail", // TODO-CONFIRM
  },
];
