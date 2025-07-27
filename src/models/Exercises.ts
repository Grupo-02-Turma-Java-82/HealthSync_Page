import type { Workout } from "./Workout";

export type Exercises = {
  id: number;
  nome: string;
  categoria: {
    id: number;
    nome?: string;
  };
  treinoExercicios?: {
    id: number;
    treino: Workout;
  };
  urlVideoDemonstrativo: string;
  descricaoDetalhada: string;
  nivelDificuldade: "INICIANTE" | "INTERMEDIÁRIO" | "AVANCADO";
  equipamentoNecessario: string;
  dataCriacao: string;
};

export type CreateExercisePayload = Omit<Exercises, "id" | "dataCriacao">;
