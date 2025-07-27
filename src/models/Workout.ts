import type { WorkoutExercises } from "./WorkoutExercise";

export type Workout = {
  id: number;
  nome: string;
  descricao: string;
  concluido: boolean;
  dataUltimaConclusao: string;
  dataCriacao: string;
  usuario: {
    id: number;
    nome?: string;
  };
  treinoExercicios: WorkoutExercises[];
};

export type CreateWorkoutPayload = Omit<
  Workout,
  | "id"
  | "dataCriacao"
  | "dataUltimaConclusao"
  | "concluido"
  | "treinoExercicios"
>;
