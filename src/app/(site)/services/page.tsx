import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SERVICE_PILLARS } from "@/data/services";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Four practice areas, one team: engineering, AI and automation, cloud and DevOps, and design and growth. Web platforms, mobile apps, and AI automation built to perform.",
};

export default function ServicesPage() {
  return (
    <main className="relative flex-1">
      <ServiceBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-32">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Services" }]}
        />

        <header className="mt-10 max-w-2xl">
          <p className="font-mono text-sm text-accent">[ what we do ]</p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Services that ship and scale.
          </h1>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Four practice areas, one accountable team. We build the platform,
            automate the busywork, run the infrastructure, and grow the numbers.
          </p>
        </header>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SERVICE_PILLARS.map((pillar) => (
            <div
              key={pillar.slug}
              className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <p className="font-mono text-xs text-accent">
                  [ {pillar.index} / {pillar.key} ]
                </p>
                <Link
                  href={`/services/${pillar.slug}`}
                  aria-label={`Explore ${pillar.title}`}
                  className="text-faint transition-colors hover:text-accent"
                >
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>

              <h2 className="mt-4 font-display text-2xl font-semibold text-foreground">
                <Link
                  href={`/services/${pillar.slug}`}
                  className="transition-colors hover:text-accent"
                >
                  {pillar.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm text-muted">{pillar.value}</p>

              <ul className="mt-6 space-y-2 border-t border-white/10 pt-6">
                {pillar.capabilities.map((cap) => (
                  <li key={cap.slug}>
                    <Link
                      href={`/services/${pillar.slug}/${cap.slug}`}
                      className="group flex items-center justify-between gap-4 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-white/5"
                    >
                      <span className="font-medium text-foreground">
                        {cap.name}
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                    </Link>
                  </li>
                ))}
              </ul>

              <Link
                href={`/services/${pillar.slug}`}
                className="mt-6 inline-flex text-sm font-medium text-accent transition-colors hover:text-accent-strong"
              >
                Explore {pillar.title}
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <CTASection />
        </div>
      </div>
    </main>
  );
}
