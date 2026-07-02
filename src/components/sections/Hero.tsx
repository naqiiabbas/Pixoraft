import Link from "next/link";
import FloatingLines from "@/components/ui/FloatingLines/FloatingLines";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex h-screen min-h-[640px] w-full items-center justify-center overflow-hidden"
    >
      {/* Background: React Bits FloatingLines (WebGL) */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[10, 15, 20]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
          linesGradient={["#00a0ff", "#5b8cff", "#8b5cf6"]}
        />
        {/* Legibility overlay: keep copy readable over the animation */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
      </div>

      {/* Foreground content */}
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
        <p className="font-mono text-xs text-accent sm:text-sm">
          [ digital engineering studio / islamabad + london + phoenix ]
        </p>

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

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
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

        <p className="mt-4 font-mono text-xs text-muted sm:text-sm">
          [ status: accepting new projects for Q3 2026
          <span className="cursor-blink ml-1 inline-block text-accent">_</span> ]
        </p>
      </div>
    </section>
  );
}
