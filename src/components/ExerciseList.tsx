import type { Exercises } from "@/models/Exercises";
import { ExerciseCard } from "./ExerciseCard";

type Props = {
  exercises: Exercises[];
};

export function ExerciseList({ exercises }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-col-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {exercises.map((exercise) => (
        <ExerciseCard exercicio={exercise} />
      ))}
    </div>
  );
}
