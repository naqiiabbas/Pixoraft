import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <FAQ />
    </main>
  );
}
