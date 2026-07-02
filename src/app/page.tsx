import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <Services />
    </main>
  );
}
