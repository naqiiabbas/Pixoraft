import type { Metadata } from "next";
import { CASE_STUDIES } from "@/data/work";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { GradientPlaceholder } from "@/components/ui/GradientPlaceholder";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work from Pixoraft: platforms, apps, and automation built to perform. Measured by results, not screenshots.",
};

export default function WorkPage() {
  return (
    <main className="relative flex-1">
      <ServiceBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-32">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Work" }]} />

        <header className="mt-10 max-w-2xl">
          <p className="font-mono text-sm text-accent">[ selected work ]</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Work that performs.
          </h1>
          <p className="mt-4 text-base text-muted sm:text-lg">
            A sample of what we build across industries. Each project is measured
            by the number that mattered to the client.
          </p>
        </header>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((study, i) => (
            <article
              key={study.slug}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl"
            >
              <GradientPlaceholder initials={study.initials} index={i} />
              <div className="flex flex-1 flex-col p-2">
                <p className="mt-4 font-mono text-xs text-accent">
                  [ {study.industry.toLowerCase()} ]
                </p>
                <h2 className="mt-2 font-display text-lg font-semibold text-foreground">
                  {study.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-muted">{study.result}</p>
                <p className="mt-4 font-mono text-xs text-faint">
                  {study.tags.join("  ")}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20">
          <CTASection
            heading="Want results like these?"
            subline="Tell us what you are building. We reply within 24 hours with next steps."
          />
        </div>
      </div>
    </main>
  );
}
