import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, Wrench } from "lucide-react";
import { SERVICE_PILLARS, getCapability } from "@/data/services";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { CodeWindow } from "@/components/ui/CodeWindow";
import { CTASection } from "@/components/sections/CTASection";

type Params = { pillar: string; sub: string };

export function generateStaticParams() {
  return SERVICE_PILLARS.flatMap((p) =>
    p.capabilities.map((c) => ({ pillar: p.slug, sub: c.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { pillar, sub } = await params;
  const found = getCapability(pillar, sub);
  if (!found) return {};
  return {
    title: found.capability.name,
    description: found.capability.description ?? found.capability.tagline,
    alternates: { canonical: `/services/${pillar}/${sub}` },
  };
}

export default async function SubServicePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { pillar: pillarSlug, sub: subSlug } = await params;
  const found = getCapability(pillarSlug, subSlug);
  if (!found) notFound();

  const { pillar, capability } = found;
  const siblings = pillar.capabilities.filter((c) => c.slug !== capability.slug);
  const whatWeBuild = capability.whatWeBuild ?? [];
  const outcomes = capability.outcomes ?? [];

  return (
    <main className="relative flex-1">
      <ServiceBackground />

      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-32">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Services", href: "/services" },
            { label: pillar.title, href: `/services/${pillar.slug}` },
            { label: capability.name },
          ]}
        />

        {/* Hero + code */}
        <div className="mt-10 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-mono text-sm text-accent">
              [ {pillar.key} / {capability.slug} ]
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {capability.name}
            </h1>
            <p className="mt-4 text-base text-muted sm:text-lg">
              {capability.description ?? capability.tagline}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {capability.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-mono text-xs text-faint"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {capability.code && (
            <CodeWindow
              filename={capability.code.filename}
              snippet={capability.code.snippet}
              accent={pillar.accent}
            />
          )}
        </div>

        {/* What we build + outcomes */}
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-2 text-foreground">
              <Wrench className="h-5 w-5 text-accent" />
              <h2 className="font-display text-lg font-semibold">
                What we build
              </h2>
            </div>
            <ul className="mt-5 space-y-3">
              {whatWeBuild.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl sm:p-8">
            <div className="flex items-center gap-2 text-foreground">
              <Check className="h-5 w-5 text-accent" />
              <h2 className="font-display text-lg font-semibold">
                What you get
              </h2>
            </div>
            <ul className="mt-5 space-y-3">
              {outcomes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-muted">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Siblings + back to pillar */}
        <section aria-labelledby="more-heading" className="mt-16">
          <h2
            id="more-heading"
            className="font-display text-xl font-semibold tracking-tight"
          >
            More in {pillar.title}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {siblings.map((sib) => (
              <Link
                key={sib.slug}
                href={`/services/${pillar.slug}/${sib.slug}`}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4 backdrop-blur-xl transition-all hover:border-white/25 hover:bg-white/[0.08]"
              >
                <span>
                  <span className="block font-medium text-foreground">
                    {sib.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">
                    {sib.tagline}
                  </span>
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-faint transition-colors group-hover:text-accent" />
              </Link>
            ))}
          </div>

          <Link
            href={`/services/${pillar.slug}`}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent-strong"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to {pillar.title}
          </Link>
        </section>

        <div className="mt-20">
          <CTASection />
        </div>
      </div>
    </main>
  );
}
