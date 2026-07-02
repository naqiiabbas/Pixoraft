import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { SERVICE_PILLARS, getPillar } from "@/data/services";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CodeWindow } from "@/components/ui/CodeWindow";
import { CTASection } from "@/components/sections/CTASection";

type Params = { pillar: string };

export function generateStaticParams() {
  return SERVICE_PILLARS.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) return {};
  return {
    title: pillar.title,
    description: pillar.overview,
    alternates: { canonical: `/services/${pillar.slug}` },
  };
}

export default async function PillarPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { pillar: slug } = await params;
  const pillar = getPillar(slug);
  if (!pillar) notFound();

  const related = SERVICE_PILLARS.filter((p) => p.slug !== pillar.slug);

  return (
    <main className="relative flex-1">
      <ServiceBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-32">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: pillar.title },
          ]}
        />

        {/* Hero + code */}
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-mono text-sm text-accent">
              [ {pillar.index} / {pillar.key} ]
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {pillar.title}
            </h1>
            <p className="mt-4 text-base text-muted sm:text-lg">
              {pillar.overview}
            </p>

            <ul className="mt-8 space-y-3">
              {pillar.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="text-muted">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <CodeWindow
            filename={pillar.code.filename}
            snippet={pillar.code.snippet}
            accent={pillar.accent}
          />
        </div>

        {/* Capabilities */}
        <section aria-labelledby="capabilities-heading" className="mt-20">
          <h2
            id="capabilities-heading"
            className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            What we do in {pillar.title}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pillar.capabilities.map((cap) => (
              <Link
                key={cap.slug}
                href={`/services/${pillar.slug}/${cap.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/[0.08]"
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {cap.name}
                  </h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-faint transition-colors group-hover:text-accent" />
                </div>
                <p className="mt-2 text-sm text-muted">{cap.tagline}</p>
                <p className="mt-4 font-mono text-xs text-faint">
                  {cap.tags.join("  ")}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Related pillars */}
        <section aria-labelledby="related-heading" className="mt-20">
          <h2
            id="related-heading"
            className="font-display text-xl font-semibold tracking-tight"
          >
            Other practice areas
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/services/${p.slug}`}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-muted backdrop-blur-md transition-colors hover:border-white/30 hover:text-foreground"
              >
                {p.title}
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-20">
          <CTASection />
        </div>
      </div>
    </main>
  );
}
