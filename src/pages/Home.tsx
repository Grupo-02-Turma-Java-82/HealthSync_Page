import { Plans } from '../components/Plans';
import { Feedbacks } from "@/components/Feedbacks";
import { Features } from '@/components/Features';

export function Home() {
  return (
    <div>
      <Features/>
      <Feedbacks/>
      <Plans/>
    </div>
  )
}
