import { Plans } from '../components/Plans';
import { Feedbacks } from "@/components/Feedbacks";
import { Features } from '@/components/Features';
import { Hero } from "@/components/Hero";


export function Home() {
  return (
    <div>
      <Hero/>
      <Features/>
      <Plans/>
      <Feedbacks/>
    </div>
  )
}
