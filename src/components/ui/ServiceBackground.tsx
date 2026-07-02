import FloatingLines from "@/components/ui/FloatingLines/FloatingLines";

/**
 * Fixed full-screen hero animation used as a page background on the contact and
 * services pages. Glass content cards sit above it. The animation stays
 * interactive over empty margins; content above uses its own pointer events.
 */
export function ServiceBackground() {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/50 to-background" />
    </div>
  );
}
