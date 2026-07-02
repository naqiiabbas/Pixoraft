import Link from "next/link";
import FloatingLines from "@/components/ui/FloatingLines/FloatingLines";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* Background: React Bits FloatingLines (WebGL). Sits at z-0 so the
          canvas receives pointer events across the whole hero. */}
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <FloatingLines
          linesGradient={["#00a0ff", "#04334f", "#507083"]}
          animationSpeed={1}
          interactive
          bendRadius={6.5}
          bendStrength={-2}
          mouseDamping={0.05}
          parallax
          parallaxStrength={0.2}
        />
        {/* Legibility overlay: keep copy readable over the animation */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      {/* Foreground content. pointer-events-none lets mouse movement pass
          through to the canvas below; buttons re-enable pointer events. */}
      <div className="pointer-events-none relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <h1
          id="hero-heading"
          className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Websites and software that perform, not just impress.
        </h1>

        <p className="max-w-2xl text-base text-muted sm:text-lg">
          Pixoraft designs, builds, and scales web platforms, mobile apps, and
          AI automation for businesses in Pakistan, the UK, and the US.
        </p>

        <div className="pointer-events-auto mt-2 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
          >
            Book a strategy call
          </Link>
          <Link
            href="/work"
            className="rounded-full border border-border-strong px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
          >
            See the work
          </Link>
        </div>
      </div>
    </section>
  );
}
