import type { Exercises } from "./Exercises";

export type Categories = {
  id: number;
  nome: string;
  descricao?: string;
  exercicios?: Exercises[];
};
