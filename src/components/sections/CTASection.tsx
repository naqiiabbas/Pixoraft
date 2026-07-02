import Link from "next/link";

/**
 * Reusable final call to action band. Used at the bottom of service pages.
 */
export function CTASection({
  heading = "Ready to build something that performs?",
  subline = "Tell us what you are building. We reply within 24 hours with next steps, not a sales pitch.",
}: {
  heading?: string;
  subline?: string;
}) {
  return (
    <section
      aria-labelledby="cta-heading"
      className="rounded-3xl border border-white/15 bg-white/[0.06] p-8 text-center backdrop-blur-xl sm:p-12"
    >
      <h2
        id="cta-heading"
        className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl md:text-4xl"
      >
        {heading}
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-muted">{subline}</p>
      <div className="mt-6 flex justify-center">
        <Link
          href="/contact"
          className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
        >
          Book a strategy call
        </Link>
      </div>
      <p className="mt-6 font-mono text-xs text-faint">
        [ response time: under 24 hours ]
      </p>
    </section>
  );
}
