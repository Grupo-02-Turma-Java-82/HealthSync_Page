import type { Exercises } from "./Exercises";
import type { Workout } from "./Workout";

export type WorkoutExercises = {
  id: number;
  exercicio: Exercises;
  treino: Workout;
};
