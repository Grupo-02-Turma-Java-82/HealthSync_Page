import { Features } from "@/components/Features";
import { Feedbacks } from "@/components/Feedbacks";
import { Hero } from "@/components/Hero";

export function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Feedbacks />
    </div>
  );
}
