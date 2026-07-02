import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import FloatingLines from "@/components/ui/FloatingLines/FloatingLines";
import { ContactForm } from "@/components/forms/ContactForm";
import { Offices } from "@/components/sections/Offices";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a strategy call or send a project inquiry. Pixoraft replies within 24 hours, with offices in the US, UK, and Pakistan.",
};

export default function ContactPage() {
  return (
    <main className="relative flex-1">
      {/* Background: hero FloatingLines animation, cards sit above it */}
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

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-32">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-muted">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="h-4 w-4 text-faint" />
            </li>
            <li aria-current="page" className="text-foreground">
              Contact
            </li>
          </ol>
        </nav>

        {/* Heading */}
        <header className="mt-10 max-w-2xl">
          <p className="font-mono text-sm text-accent">
            [ let us build something that performs ]
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            Start a project.
          </h1>
          <p className="mt-4 text-base text-muted sm:text-lg">
            Tell us what you are building. We reply within 24 hours with next
            steps, not a sales pitch.
          </p>
        </header>

        {/* Contact form */}
        <div className="mt-10 max-w-3xl">
          <ContactForm />
        </div>

        {/* Offices switcher */}
        <div className="mt-20">
          <Offices />
        </div>
      </div>
    </main>
  );
}
