import type { Metadata } from "next";
import { ServiceBackground } from "@/components/ui/ServiceBackground";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
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
      <ServiceBackground />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-6 pb-24 pt-32">
        <Breadcrumb
          items={[{ label: "Home", href: "/" }, { label: "Contact" }]}
        />

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
