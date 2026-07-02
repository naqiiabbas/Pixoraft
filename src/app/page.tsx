import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Testimonials } from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Services />
      <Testimonials />
    </main>
  );
}
