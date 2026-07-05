import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { FloatingSocials } from "@/components/ui/FloatingSocials";
import { resolveMetadata } from "@/lib/seo";

export function generateMetadata() {
  return resolveMetadata("/");
}

export default function Home() {
  return (
    <main className="relative flex-1 bg-black">
      <Hero />
      <Services />
      <About />
      <Process />
      <Testimonials />
      <FAQ />
      <FloatingSocials />
    </main>
  );
}
