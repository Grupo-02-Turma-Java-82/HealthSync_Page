import { use } from "react";
import { WorkoutContext } from "@/contexts/WorkoutContext";

export function useWorkouts() {
  const context = use(WorkoutContext);

  return context;
}
