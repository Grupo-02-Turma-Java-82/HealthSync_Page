import type { User } from "./Users";
import type { WorkoutExercises } from "./WorkoutExercise";

export type Workout = {
  id: number;
  nome: string;
  descricao: string;
  concluido: boolean;
  dataUltimaConclusao: string;
  dataCriacao: string;
  usuario: User[];
  treinoExercicios: WorkoutExercises[];
};
