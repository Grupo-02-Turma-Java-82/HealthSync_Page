import { Plans } from "../components/Plans";
import { Feedbacks } from "@/components/Feedbacks";
import { Features } from "@/components/Features";
import { Hero } from "@/components/Hero";

export function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <Plans />
      <Feedbacks />

      {/* <div className="absolute flex flex-col gap-3 bottom-4 right-4">
        <Button
          className="bg-blue-600 hover:bg-blue-600/80"
          onClick={() => save(dataToLoginPersonal)}
        >
          Demo Treinador
        </Button>
        <Button
          className="bg-green-600 hover:bg-green-600/80"
          onClick={() => save(dataToLoginStudent)}
        >
          Demo Aluno
        </Button>
      </div> */}
    </div>
  );
}
