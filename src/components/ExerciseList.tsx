import type { Exercises } from "@/models/Exercises";
import { ExerciseCard } from "./ExerciseCard";
import { EmptyTable } from "./EmptyTable";

type Props = {
  exercises: Exercises[];
};

export function ExerciseList({ exercises }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {exercises.length === 0 ? (
        <div className="col-span-full flex flex-col justify-center items-center py-16">
          <EmptyTable
            icon="dumbbell"
            iconSize={44}
            title="Não há exercícos cadastrados"
          />
        </div>
      ) : (
        exercises.map((exercise) => (
          <ExerciseCard key={exercise.id} exercicio={exercise} />
        ))
      )}
    </div>
  );
}
