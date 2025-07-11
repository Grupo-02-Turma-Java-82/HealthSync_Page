import { use } from "react";
import { ExerciseContext } from "@/contexts/ExerciseContext";

export function useExercises() {
  const context = use(ExerciseContext);

  return context;
}
